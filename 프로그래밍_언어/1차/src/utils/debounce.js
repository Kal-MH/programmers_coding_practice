export const debounce = (fn, delay) => {
  let timer = null;

  return function () {
    const args = arguments;

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
