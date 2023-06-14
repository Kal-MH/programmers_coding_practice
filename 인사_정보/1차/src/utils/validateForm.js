const validateName = (name) => {
  const error = { type: "name", msg: "" };

  const regex = /^[ㄱ-힣]{2,4}$/;
  if (!regex.test(name)) error.msg = "2~4 글자의 한글만 입력이 가능합니다.";
  return error;
};

const validateEmail = (email) => {
  const error = { type: "name", msg: "" };

  const regex = /^[a-zA-Z0-9]+@grepp.co$/;
  if (!regex.test(email))
    error.msg =
      "이메일 ID는 영문(대소문자 구분 없음)과 숫자만 입력이 가능하며, @grepp.co 형식의 이메일만 입력이 가능합니다.";
  return error;
};

const validateNickname = (nickname) => {
  const error = { type: "name", msg: "" };

  const regex = /^[a-zA-Z]{3,10}$/;
  if (!regex.test(nickname))
    error.msg = "대소문자 구분 없이 3~10 글자의 영문만 입력이 가능합니다.";
  return error;
};

export const validateForm = (e) => {
  const { id, value } = e.target;
  let error = {};

  switch (id) {
    case "name":
      error = validateName(value);
      break;
    case "email":
      error = validateEmail(value);
      break;
    case "nickname":
      error = validateNickname(value);
      break;
    default:
      break;
  }

  return error;
};
