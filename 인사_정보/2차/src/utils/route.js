import { HISTORY } from "./constants.js";

export const historyPush = (url) => {
  window.history.pushState("", "", url);
  window.dispatchEvent(new CustomEvent(HISTORY.EVENT_NAME));
};

export const addHistoryEventWindow = (route) => {
  if (!route) return;

  window.addEventListener(HISTORY.EVENT_NAME, () => route());
  window.addEventListener("popstate", () => route());
};
