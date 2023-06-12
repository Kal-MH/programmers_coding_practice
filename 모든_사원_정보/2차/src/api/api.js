const API_END_POINT =
  "http://localhost:5500/과제테스트/모든_사원_정보/2차/src/fakeDB";

export async function request(url) {
  try {
    const res = await fetch(`${API_END_POINT}${url}`);

    if (res.ok) {
      const data = await res.json();
      return data;
    }

    throw new Error("Error: res fail");
  } catch (e) {
    throw new Error(e);
  }
}

export async function getWorkers(url) {
  try {
    const data = await request("/data.json");

    return {
      keys: Object.keys(data[0]),
      data,
    };
  } catch (e) {
    throw new Error(e);
  }
}
