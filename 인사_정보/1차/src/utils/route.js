export const historyPush = (url) => {
  window.history.pushState("", "", url);
  const homeEvent = new CustomEvent("urlChange");
  window.dispatchEvent(homeEvent);
};

export const addHistoryPushEventWindow = (route) => {
  if (!route) return;

  window.addEventListener("popstate", () => route());
  window.addEventListener("urlChange", () => route());
};
