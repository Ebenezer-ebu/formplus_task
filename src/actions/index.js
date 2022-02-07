import { getData } from "../utils/api";
import { formatDoc } from "../utils/helpers";

export const GET_DATA = "GET_DATA";
export const NEXT_PAGE = "NEXT_PAGE";
export const SEARCH = "SEARCH";
export const ERROR = "ERROR";

function templateData(info) {
  return {
    type: GET_DATA,
    info,
  };
}

function nextPage(info) {
  return {
    type: NEXT_PAGE,
    info,
  };
}

function sorted(info) {
  return {
    type: SEARCH,
    info,
  };
}

function error(err) {
  return {
    type: ERROR,
    err
  }
}

export function handleInitialData() {
  return (dispatch) => {
    return getData()
      .then((data) => {
        dispatch(templateData(data));
      })
      .catch((e) => {
        console.log("Error: ", e);
        dispatch(error(e.message))
      });
  };
}

export function handlePagination(data) {
  return (dispatch) => {
    dispatch(nextPage(data));
  };
}

export function handleFilter(data, filter) {
  return (dispatch) => {
    const filtered = formatDoc(data, filter);
    dispatch(sorted({ filtered, filter }));
  };
}
