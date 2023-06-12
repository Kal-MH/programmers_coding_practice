import { getWorkers } from "./apis/api.js";
import Dropdown from "./components/Dropdown.js";
import Pagination from "./components/Pagination.js";
import Table from "./components/Table.js";

function App({ target }) {
  this.state = {
    workers: [],
    maxPageCnt: 1,
    currentPage: 1,
    pagePerCnt: 5,
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };

    table.setState(
      this.state.workers.slice(
        (this.state.currentPage - 1) * this.state.pagePerCnt,
        this.state.currentPage * this.state.pagePerCnt
      )
    );
    pagination.setState({
      maxPageCnt: this.state.maxPageCnt,
      currentPage: this.state.currentPage,
    });
  };

  new Dropdown({
    target,
    initialData: [5, 15],
    onChange: (option) => {
      const length = this.state.workers.length;
      const maxPageCnt = parseInt(length / option);

      this.setState({
        maxPageCnt: length % option === 0 ? maxPageCnt : maxPageCnt + 1,
        pagePerCnt: option,
        currentPage: 1,
      });
    },
  });

  const table = new Table({
    target,
    initialData: [],
  });
  const pagination = new Pagination({
    target,
    initialData: {
      maxPageCnt: 1,
      currentPage: 1,
    },
    onClick: (index) => {
      this.setState({ currentPage: index });
    },
  });

  this.init = async () => {
    try {
      const workers = await getWorkers();

      const length = workers.length;
      const maxPageCnt = parseInt(length / this.state.pagePerCnt);

      this.setState({
        workers,
        maxPageCnt:
          length % this.state.pagePerCnt === 0 ? maxPageCnt : maxPageCnt + 1,
        currentPage: 1,
      });

      table.setState(
        this.state.workers.slice(
          (this.state.currentPage - 1) * this.state.pagePerCnt,
          this.state.currentPage * this.state.pagePerCnt
        )
      );
      pagination.setState({
        maxPageCnt: this.state.maxPageCnt,
        currentPage: this.state.currentPage,
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  this.init();
}

export default App;
