import Dropdown from "./Dropdown.js";
import Pagination from "./Pagination.js";
import Table from "./Table.js";
import { getWorkers } from "./api/api.js";

const TABLE_HEAD_KEY = ["name", "title", "email", "role"];
const OPTION_VALUES = [5, 10];

function App({ target }) {
  let state = null;
  let table = null;
  let pagination = null;
  let dropdown = null;

  this.setState = (nextState) => {
    state = {
      ...state,
      ...nextState,
    };

    const { workers, maxPageNum, curPageNum, optionValue } = state;

    table &&
      table.setState({
        workers: workers.slice(
          (curPageNum - 1) * optionValue,
          curPageNum * optionValue
        ),
      });

    pagination &&
      pagination.setState({
        maxPageNum: maxPageNum,
        curPageNum: curPageNum,
      });
  };

  const init = async () => {
    try {
      const { keys, data } = await getWorkers();

      state = {
        workers: data,
        maxPageNum: Math.ceil(data.length / 5),
        curPageNum: 1,
        optionValue: 5,
      };

      const { workers, maxPageNum, curPageNum, optionValue } = state;

      dropdown = new Dropdown({
        target,
        initialState: {
          options: OPTION_VALUES,
        },
        onSelect: (option) => {
          this.setState({
            optionValue: option,
            maxPageNum: Math.ceil(data.length / option),
            curPageNum: 1,
          });
        },
      });

      table = new Table({
        target,
        initialState: {
          workers: workers.slice(0, optionValue),
        },
        tableKeys: keys,
      });

      pagination = new Pagination({
        target,
        initialState: {
          maxPageNum: maxPageNum,
          curPageNum: curPageNum,
        },
        onClick: (curPage) => {
          this.setState({
            curPageNum: curPage,
          });
        },
      });
    } catch (e) {
      const HomeHeaderComponent = document.createElement("h1");
      HomeHeaderComponent.appendChild(document.createTextNode("Table"));

      target.appendChild(HomeHeaderComponent);
      throw new Error(e);
    }
  };

  init();
}

export default App;
