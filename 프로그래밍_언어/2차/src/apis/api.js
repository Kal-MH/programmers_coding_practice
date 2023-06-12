const API_END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

const cache = {};

const hasValidateCacheData = (url) => {
  if (!cache[url]) return false;

  const { time } = cache[url];
  if (new Date() - time > 10 * 1000) return false;
  return true;
};

const request = async (url) => {
  if (hasValidateCacheData(url)) return cache[url];

  try {
    const res = await fetch(url);

    if (res.ok) {
      const data = await res.json();

      cache[url] = { data, time: new Date() };
      return { isSuccess: true, data };
    }
    return { isSuccess: false, data: [] };
  } catch (e) {
    throw new Error(e);
  }
};

export const fetchLanguages = async (keyword) => {
  const data = await request(`${API_END_POINT}/languages?keyword=${keyword}`);

  return data;
};
