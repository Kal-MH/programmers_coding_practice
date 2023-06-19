import { getWorkers } from "./api/api.js";
import Dropdown from "./components/Dropdown.js";
import Pagination from "./components/Pagination.js";
import Table from "./components/Table.js";

const OPTION_VALUES = [5, 10];

function App({ target }) {
  const init = async () => {
    let state = null;
    let table = null;
    let pagination = null;

    const setState = (nextState) => {
      state = {
        ...state,
        ...nextState,
      };

      const { workers, optionValue, curIdx, maxIdx } = state;

      table.setState({
        workers: workers.slice(
          optionValue * (curIdx - 1),
          optionValue * curIdx
        ),
      });
      pagination.setState({ curIdx: curIdx, maxIdx: maxIdx });
    };

    try {
      const { keys, data } = await getWorkers();

      state = {
        workers: data,
        optionValue: OPTION_VALUES[0],
        curIdx: 1,
        maxIdx: Math.ceil(data.length / OPTION_VALUES[0]),
      };

      const { workers, optionValue, curIdx, maxIdx } = state;

      new Dropdown({
        target,
        optionValues: OPTION_VALUES,
        onChange: (optionValue) => {
          const { workers } = state;

          setState({
            optionValue,
            curIdx: 1,
            maxIdx: Math.ceil(workers.length / optionValue),
          });
        },
      });

      table = new Table({
        target,
        initialState: {
          workers: workers.slice(0, optionValue),
          tableKeys: keys,
        },
      });

      pagination = new Pagination({
        target,
        initialState: {
          curIdx: curIdx,
          maxIdx: maxIdx,
        },
        onClick: (idx) => {
          setState({ curIdx: idx });
        },
      });
    } catch (e) {
      const TableTitleComponent = document.createElement("h1");
      TableTitleComponent.textContent = "Table";

      target.appendChild(TableTitleComponent);
    }
  };

  init();
}

export default App;
