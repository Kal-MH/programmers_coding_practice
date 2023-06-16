const API_END_POINT = "/src/data";

const request = async (url) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`);

    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error("Error: 데이터를 가져오지 못했습니다.");
  } catch (e) {
    throw new Error(e);
  }
};

export const getData = async (url) => {
  try {
    const data = await request(url);

    return data;
  } catch (e) {
    throw new Error(e);
  }
};
