export const getStorage = (key, defaultValue) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    throw new Error(e);
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
