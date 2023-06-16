import SignupView from "../components/Signup/SignupView.js";
import Title from "../components/common/Title.js";

function Signup({ target }) {
  this.render = () => {
    target.innerHTML = "";

    new Title({ target, text: "Hello, Great PeoPle!" });
    new SignupView({ target });
  };
}

export default Signup;
