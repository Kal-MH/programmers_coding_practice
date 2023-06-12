const API_END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

const cache = {};

export const request = async (url) => {
  if (cache[url]) {
    const { data, time } = cache[url];
    const curTime = new Date();

    if (curTime - time > 60 * 1000) delete cache[url];
    else return data;
  }

  const res = await fetch(url);

  if (res.ok) {
    const data = await res.json();
    cache[url] = { data, time: new Date() };
    return data;
  }

  throw Error;
};

export const fetchLanguage = async (keyword) => {
  const data = await request(`${API_END_POINT}/languages?keyword=${keyword}`);

  return data;
};
