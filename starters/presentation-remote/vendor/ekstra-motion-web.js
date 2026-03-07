// Legacy compatibility browser SDK (zero-build ESM module).
// Primary browser SDK path is TypeScript: sdk/ts/src/browser.ts.
export function createMotionClient(options = {}) {
  const url = options.url || "ws://127.0.0.1:8787/ws";
  const reconnectEnabled = options.reconnect !== false;
  const reconnectInitialMs = Math.max(50, options.reconnectInitialMs || 250);
  const reconnectMaxMs = Math.max(reconnectInitialMs, options.reconnectMaxMs || 4000);
  const reconnectMultiplier = Math.max(1.0, options.reconnectMultiplier || 1.7);
  let ws = null;
  let closedByClient = false;
  let reconnectTimer = null;
  let reconnectAttempt = 0;
  let connectPromise = null;
  let connectResolve = null;
  let connectReject = null;
  const listeners = new Set();
  const stateListeners = new Set();
  const bound = [];

  function connect() {
    if (connectPromise) return connectPromise;
    if (ws && ws.readyState === WebSocket.OPEN) return Promise.resolve();
    if (ws && ws.readyState === WebSocket.CONNECTING) return Promise.resolve();
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    closedByClient = false;
    connectPromise = new Promise((resolve, reject) => {
      ws = new WebSocket(url);
      setState("connecting");
      ws.onmessage = (ev) => {
        let payload = null;
        try {
          payload = JSON.parse(ev.data);
        } catch {
          return;
        }
        for (const handler of listeners) {
          try {
            handler(payload);
          } catch {
            // Keep dispatch resilient for all handlers.
          }
        }
        if (payload && payload.type === "event") {
          applyBindings(payload);
        }
      };
      ws.onopen = () => {
        reconnectAttempt = 0;
        setState("connected");
        const resolve = connectResolve;
        connectResolve = null;
        connectReject = null;
        connectPromise = null;
        if (resolve) resolve();
      };
      ws.onerror = (err) => {
        setState("error");
        const reject = connectReject;
        connectResolve = null;
        connectReject = null;
        connectPromise = null;
        if (reject) reject(err);
      };
      ws.onclose = () => {
        const wasConnecting = connectPromise !== null;
        setState("disconnected");
        if (wasConnecting) {
          const reject = connectReject;
          connectResolve = null;
          connectReject = null;
          connectPromise = null;
          if (reject) reject(new Error("motion client connection closed"));
        }
        if (!closedByClient && reconnectEnabled) scheduleReconnect();
      };
      connectResolve = resolve;
      connectReject = reject;
    });
    return connectPromise;
  }

  function disconnect() {
    closedByClient = true;
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (ws) {
      ws.close();
      ws = null;
    }
    connectResolve = null;
    connectReject = null;
    connectPromise = null;
    setState("disconnected");
  }

  function publish(topic, event) {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      throw new Error("motion client is not connected");
    }
    ws.send(JSON.stringify({ type: "publish", topic, event }));
  }

  function on(handler) {
    listeners.add(handler);
    return () => listeners.delete(handler);
  }

  function onState(handler) {
    stateListeners.add(handler);
    return () => stateListeners.delete(handler);
  }

  function scheduleReconnect() {
    if (reconnectTimer) return;
    reconnectAttempt += 1;
    const jitter = 1.0 + (Math.random() * 0.2) - 0.1;
    const delay = Math.min(
      reconnectMaxMs,
      reconnectInitialMs * Math.pow(reconnectMultiplier, reconnectAttempt - 1),
    );
    const waitMs = Math.max(50, Math.round(delay * jitter));
    setState("reconnecting", { attempt: reconnectAttempt, waitMs });
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      connect().catch(() => {
        // Keep retry loop alive until explicit disconnect.
      });
    }, waitMs);
  }

  function setState(state, detail = {}) {
    const payload = { state, ...detail };
    for (const handler of stateListeners) {
      try {
        handler(payload);
      } catch {
        // State observer failures must not affect client operation.
      }
    }
  }

  function onTopic(topicPattern, handler) {
    return on((msg) => {
      if (!msg || msg.type !== "event") return;
      if (matchTopic(msg.topic || "", topicPattern)) {
        handler(msg);
      }
    });
  }

  function onMotionSample(handler) {
    return onTopic("motion.samples", handler);
  }

  function onComposition(handler) {
    return onTopic("events.composition", handler);
  }

  function bind(selector, options = {}) {
    const entry = {
      selector,
      composition: options.composition || null,
      eventType: options.eventType || null,
      onMatch: options.onMatch || null,
      effect: options.effect || null,
    };
    bound.push(entry);
    return () => {
      const idx = bound.indexOf(entry);
      if (idx >= 0) bound.splice(idx, 1);
    };
  }

  function setFocus(actorId, surfaceId) {
    publish("control.surface.focus", {
      actor_id: actorId,
      surface_id: surfaceId,
      timestamp: monotonicSeconds(),
    });
  }

  function setClutch(actorId, engaged) {
    publish("control.surface.clutch", {
      actor_id: actorId,
      engaged: !!engaged,
      timestamp: monotonicSeconds(),
    });
  }

  function confirm(actorId, token) {
    publish("control.surface.confirm", {
      actor_id: actorId,
      token,
      timestamp: monotonicSeconds(),
    });
  }

  function applyBindings(msg) {
    const topic = msg.topic || "";
    const evt = msg.event || {};
    for (const b of bound) {
      const el = document.querySelector(b.selector);
      if (!el) continue;
      if (b.composition && !(topic === "events.composition" && evt.composition_type === b.composition)) {
        continue;
      }
      if (b.eventType && !(evt.event_type === b.eventType)) {
        continue;
      }
      if (typeof b.onMatch === "function") {
        b.onMatch({ message: msg, element: el, client: api });
      }
      if (typeof b.effect === "function") {
        b.effect({ message: msg, element: el, client: api });
      } else if (typeof b.effect === "string") {
        applyNamedEffect(b.effect, el, msg);
      }
    }
  }

  const api = {
    connect,
    disconnect,
    publish,
    on,
    onState,
    onTopic,
    onMotionSample,
    onComposition,
    bind,
    setFocus,
    setClutch,
    confirm,
  };
  return api;
}

function applyNamedEffect(name, element, msg) {
  if (name === "pulse") {
    element.animate(
      [
        { transform: "scale(1.0)" },
        { transform: "scale(1.03)" },
        { transform: "scale(1.0)" },
      ],
      { duration: 220, easing: "ease-out" },
    );
    return;
  }
  if (name === "flash") {
    const prev = element.style.outline;
    element.style.outline = "2px solid #13a10e";
    setTimeout(() => {
      element.style.outline = prev;
    }, 160);
    return;
  }
  if (name === "tilt") {
    const deg = ((msg?.event?.confidence ?? 0.5) * 8) - 4;
    element.style.transform = `rotate(${deg.toFixed(2)}deg)`;
  }
}

function matchTopic(topic, pattern) {
  if (pattern === "*") return true;
  if (!pattern.includes("*")) return topic === pattern;
  if (pattern.endsWith("*")) {
    const prefix = pattern.slice(0, -1);
    return topic.startsWith(prefix);
  }
  return false;
}

function monotonicSeconds() {
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    return performance.now() / 1000;
  }
  return Date.now() / 1000;
}
