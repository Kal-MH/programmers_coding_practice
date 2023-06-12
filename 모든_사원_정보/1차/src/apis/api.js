const API_END_POINT =
  "http://localhost:5500/과제테스트/모든_사원_정보/1차/src/fakeDB";

const request = async (url) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`);

    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return [];
  } catch (e) {
    throw new Error(e);
  }
};

export const getWorkers = async () => {
  try {
    const data = await request("/data.json");

    return data;
  } catch (e) {
    throw new Error(e);
  }
};
