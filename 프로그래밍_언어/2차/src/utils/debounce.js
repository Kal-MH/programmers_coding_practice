export const debounce = (fn, delay) => {
  let time = null;

  return (args) => {
    if (time) clearTimeout(time);
    time = setTimeout(() => {
      fn(args);
    }, delay);
  };
};
