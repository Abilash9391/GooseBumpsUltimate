export function getOrCreate(key: string) {
  let value = localStorage.getItem(key);
  if (!value) {
    value = crypto.randomUUID();
    localStorage.setItem(key, value);
  }
  return value;
}

export function getSessionId() {
  const now = Date.now();
  const sessionData = JSON.parse(localStorage.getItem("session") || "{}");

  if (!sessionData.id || now - sessionData.time > 30 * 60 * 1000) {
    const newSession = {
      id: crypto.randomUUID(),
      time: now,
    };
    localStorage.setItem("session", JSON.stringify(newSession));
    return newSession.id;
  }

  sessionData.time = now;
  localStorage.setItem("session", JSON.stringify(sessionData));
  return sessionData.id;
}