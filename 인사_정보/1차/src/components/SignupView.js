import { getStorage, setStorage } from "../utils/storage.js";
import { Button, Input, Select } from "./Form.js";

function SignupView({ target }) {
  const div = document.createElement("div");
  div.id = "form_container";
  target.appendChild(div);

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

  const render = () => {
    div.innerHTML = `
        <form id="grep_form">
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
        </form>
    `;

    div.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();

      const { name, email, nickname, role, mbti } = e.target;

      const personalInfo = getStorage("personalInfo", []);
      const worker = personalInfo.find(
        (person) =>
          person.email === email.value || person.nickname === nickname.value
      );

      if (worker) {
        alert("이메일 혹은 닉네임이 이미 등록되어 있습니다");
      } else {
        try {
          const cardsData = getStorage("cardStatus", []);
          const newWorker = {
            name: name.value,
            email: email.value,
            nickname: nickname.value,
            role: role.value,
            mbti: mbti.value || "CUTE",
          };

          personalInfo.push({
            ...newWorker,
            idx: personalInfo.length,
          });
          cardsData.push({
            idx: personalInfo.length,
            status: "card",
          });

          setStorage("personalInfo", personalInfo);
          setStorage("cardStatus", cardsData);

          alert("성공적으로 등록되었습니다");
        } catch (e) {
          alert("저장에 실패했습니다!");
        }
      }

      name.value = "";
      email.value = "";
      nickname.value = "";
      role.value = "";
      mbti.value = "";
    });
  };

  render();
}

export default SignupView;
