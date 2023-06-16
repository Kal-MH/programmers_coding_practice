import createElement from "../../utils/createElement.js";
import { Button, Input, Select } from "./Form.js";

const roleValList = ["", "backend", "frontend", "fullstack"];
const roleTxtList = ["직군을 선택해주세요", "백엔드", "프론트엔드", "풀스택"];
const mbtiValList = [
  "",
  "ENFJ",
  "ENTJ",
  "ENFP",
  "ENTP",
  "ESFJ",
  "ESTJ",
  "ESFP",
  "ESTP",
  "INFJ",
  "INTJ",
  "INFP",
  "INTP",
  "ISFJ",
  "ISTJ",
  "ISFP",
  "ISTP",
];
const mbtiTxtList = [
  "mbti를 선택해주세요",
  "ENFJ",
  "ENTJ",
  "ENFP",
  "ENTP",
  "ESFJ",
  "ESTJ",
  "ESFP",
  "ESTP",
  "INFJ",
  "INTJ",
  "INFP",
  "INTP",
  "ISFJ",
  "ISTJ",
  "ISFP",
  "ISTP",
];

function SignupView({ target }) {
  const form = createElement({ name: "form", id: "form_container" });
  target.appendChild(form);

  form.innerHTML = `
    ${Input({
      type: "text",
      id: "name",
      placeholder: "이름",
      required: true,
      pattern: "^[ㄱ-힣]{2,4}$",
      title: "2~4 글자의 한글만 입력이 가능합니다.",
    })}
    ${Input({
      type: "text",
      id: "email",
      placeholder: "이메일",
      required: true,
      pattern: "^[a-zA-Z0-9]+@grepp.co$",
      title:
        "이메일 ID는 영문(대소문자 구분 없음)과 숫자만 입력이 가능하며, @grepp.co 형식의 이메일만 입력이 가능합니다.",
    })}
    ${Input({
      type: "text",
      id: "nickname",
      placeholder: "닉네임",
      required: true,
      pattern: "^[a-zA-Z]{3,10}$",
      title: "대소문자 구분 없이 3~10 글자의 영문만 입력이 가능합니다.",
    })}
    ${Select({
      id: "role",
      name: "직군",
      optValList: roleValList,
      optTxtList: roleTxtList,
      required: true,
    })}
      ${Select({
        id: "mbti",
        name: "MBTI",
        optValList: mbtiValList,
        optTxtList: mbtiTxtList,
      })}
      ${Button({ type: "submit", text: "등록" })}
  `;

  form.addEventListener("click", (e) => {
    e.preventDefault();
  });
}

export default SignupView;
