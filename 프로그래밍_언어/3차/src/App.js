import { getLanguages } from "./apis/api.js";
import Form from "./components/Form.js";
import SelectedLanguage from "./components/SelectedLanguage.js";
import Suggestion from "./components/Suggestion.js";
import debounce from "./utils/debounce.js";

function App({ target }) {
  let state = {
    keyword: "",
    searchedLanguages: [],
    selectedLanguage: [],
  };

  const setState = (nextState) => {
    state = {
      ...state,
      ...nextState,
    };

    suggestion.setState({
      keyword: state.keyword,
      languages: state.searchedLanguages,
    });
    selectedLanguage.setState(state.selectedLanguage);
  };

  const selectedLanguage = new SelectedLanguage({
    target,
    initialState: state.selectedLanguage,
  });

  new Form({
    target,
    onChange: debounce(async (keyword) => {
      const keywordWithTrim = keyword.trim();
      let searchedLanguages = [];

      if (keywordWithTrim !== "") {
        searchedLanguages = await getLanguages(keyword);
      }
      setState({ keyword: keywordWithTrim, searchedLanguages });
    }, 300),
  });

  const suggestion = new Suggestion({
    target,
    initialState: {
      keyword: state.keyword,
      languages: state.searchedLanguages,
    },
    onSelect: (keyword) => {
      alert(keyword);

      //5개만
      let selectedLanguage = state.selectedLanguage;

      if (selectedLanguage.includes(keyword))
        selectedLanguage = selectedLanguage.filter((s) => s !== keyword);
      selectedLanguage.push(keyword);
      if (selectedLanguage.length > 5)
        selectedLanguage = selectedLanguage.slice(1);

      setState({ selectedLanguage });
    },
  });
}

export default App;
