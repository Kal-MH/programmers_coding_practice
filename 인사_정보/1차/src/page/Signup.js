import Title from "../components/Title.js";

function Signup({ target }) {
  this.render = () => {
    target.innerHTML = ``;

    new Title({
      target,
      titleText: "Hello, GreatPeople!",
      divClass: "content_title",
    });
  };
}

export default Signup;
