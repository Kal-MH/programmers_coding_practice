import SignupView from "../components/Signup/SignupView.js";
import Title from "../components/Title.js";

function Signup({ target }) {
  this.render = () => {
    target.innerHTML = ``;

    new Title({
      target,
      titleText: "Sign Up, GreatPeople!",
      divClass: "content_title",
    });

    new SignupView({
      target,
    });
  };
}

export default Signup;
