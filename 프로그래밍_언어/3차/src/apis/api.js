const API_END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`);

    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error("Error: 데이터를 가져오는데 실패했습니다.");
  } catch (e) {
    throw new Error(e);
  }
};

export const getLanguages = async (keyword) => {
  try {
    const data = await request(`/languages?keyword=${keyword}`);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};
