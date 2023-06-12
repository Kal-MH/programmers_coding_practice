export const getLocalStorage = (key, defaultValue) => {
  try {
    const data = localStorage.getItem(key);

    if (data) return JSON.parse(data);
    return defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    throw Error(e);
  }
};

export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    throw Error(e);
  }
};
