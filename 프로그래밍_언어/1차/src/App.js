import { fetchLanguage } from "./api/api.js";
import SearchInput from "./components/SearchInput.js";
import SelectedLanguage from "./components/SelectedLanguage.js";
import Suggestion from "./components/Suggestion.js";
import { debounce } from "./utils/debounce.js";
import { getLocalStorage, setLocalStorage } from "./utils/utils.js";

function App({ target }) {
  this.state = {
    keyword: "",
    fetchedLanguages: [],
    selectedLanguages: getLocalStorage("selectedLanguages", []),
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    suggestion.setState({
      keyword: this.state.keyword,
      selectedIndex: 0,
      items: this.state.fetchedLanguages,
    });
    selectedLanguage.setState(this.state.selectedLanguages);

    setLocalStorage("selectedLanguages", this.state.selectedLanguages);
  };

  const selectedLanguage = new SelectedLanguage({
    target,
    initialState: this.state.selectedLanguages,
  });

  new SearchInput({
    target,
    initialState: "",
    onChange: debounce(async (keyword) => {
      const keywordWithTrim = keyword.trim();
      if (!keywordWithTrim) {
        this.setState({ keywordWithTrim, fetchedLanguages: [] });
      } else {
        const languageList = await fetchLanguage(keywordWithTrim);
        this.setState({ keywordWithTrim, fetchedLanguages: languageList });
      }
    }, 300),
  });

  const suggestion = new Suggestion({
    target,
    initialState: {
      selectedIndex: 0,
      items: this.state.fetchedLanguages,
      keyword: "",
    },
    onSelect: (item) => {
      //이미 선택되었다면 뒤로 넘기기
      let nextSelectedLanguages = [...this.state.selectedLanguages];
      const languageIndex = nextSelectedLanguages.findIndex((l) => l === item);

      if (languageIndex > -1) nextSelectedLanguages.splice(languageIndex, 1);
      nextSelectedLanguages.push(item);

      if (nextSelectedLanguages.length > 5) {
        nextSelectedLanguages = nextSelectedLanguages.slice(-5);
      }

      this.setState({ selectedLanguages: nextSelectedLanguages });
    },
  });
}

export default App;
