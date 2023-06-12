import { fetchLanguages } from "../apis/api.js";
import { debounce } from "../utils/debounce.js";
import { getStorage, setStorage } from "../utils/storage.js";
import SearchInput from "./SearchInput.js";
import SelectedLanguages from "./SelectedLanguages.js";
import Suggestion from "./Suggestion.js";

const LOCAL_KEY = "programming_lan";

function App({ target }) {
  const localData = getStorage(LOCAL_KEY, {
    keyword: "",
    fetchedLanguages: [],
    selectedLanguages: [],
  });

  this.state = localData;

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };

    suggestionComponent.setState({
      keyword: this.state.keyword,
      items: this.state.fetchedLanguages,
    });

    selectedLanguagesComponent.setState(this.state.selectedLanguages);

    setStorage(LOCAL_KEY, this.state);
  };
  //TODO
  //1. selected
  const selectedLanguagesComponent = new SelectedLanguages({
    target,
    initialState: this.state.selectedLanguages,
  });
  //2. searchInput
  new SearchInput({
    target,
    initialState: this.state.keyword,
    onChange: debounce(async (keyword) => {
      const keywordWithTrim = keyword.trim();

      if (!keywordWithTrim) {
        this.setState({ keyword: keywordWithTrim, fetchedLanguages: [] });
      } else {
        const { data } = await fetchLanguages(keywordWithTrim);
        this.setState({ keyword: keywordWithTrim, fetchedLanguages: data });
      }
    }, 300),
  });
  //3. suggestion
  const suggestionComponent = new Suggestion({
    target,
    initialState: {
      keyword: this.state.keyword,
      items: this.state.fetchedLanguages,
    },
    onSelect: (keyword) => {
      const nextSelectedLan = this.state.selectedLanguages;

      if (nextSelectedLan.includes(keyword)) {
        const index = nextSelectedLan.findIndex((lan) => lan === keyword);
        nextSelectedLan.splice(index, 1);
      }
      nextSelectedLan.push(keyword);

      this.setState({
        selectedLanguages: nextSelectedLan,
      });
    },
  });
}

export default App;
