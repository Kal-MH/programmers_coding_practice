const API_END_POINT = "./src/data";

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

export const getData = async () => {
  try {
    const data = await request("/new_data.json");

    return data;
  } catch (e) {
    throw new Error(e);
  }
};
