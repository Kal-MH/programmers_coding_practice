export const getStorage = (key, defaultValue) => {
  try {
    const data = JSON.parse(localStorage.getItem(key));

    return data ? data : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    throw new Error(e);
  }
};

export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    throw new Error(e);
  }
};
