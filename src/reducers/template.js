import { GET_DATA, NEXT_PAGE, SEARCH, ERROR } from "../actions/index";

export default function template(
  state = {
    data: [],
    offset: 0,
    numberPerPage: 180,
    pageCount: 0,
    currentData: [],
    filterData: [],
    loading: true,
    category: "All",
    order: "Default",
    date: "Default",
    error: "",
  },
  action
) {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        data: action.info,
        pageCount: Math.ceil(action.info.length / state.numberPerPage),
        currentData: action.info.slice(
          state.offset,
          state.offset + state.numberPerPage
        ),
        loading: false,
      };
    case NEXT_PAGE:
      const check =
        action.info.filterData.length > 0
          ? action.info.filterData
          : action.info.data;
      return {
        ...state,
        offset: action.info.offset,
        pageCount: Math.ceil(check.length / state.numberPerPage),
        currentData: check.slice(
          action.info.offset,
          action.info.offset + state.numberPerPage
        ),
      };
    case SEARCH:
      const check2 =
        action.info.filtered.length > 0 ? action.info.filtered : state.data;
      return {
        ...state,
        filterData: action.info.filtered,
        category: action.info.filter.category,
        order: action.info.filter.order,
        date: action.info.filter.date,
        pageCount: Math.ceil(check2.length / state.numberPerPage),
        currentData: check2.slice(
          state.offset,
          state.offset + state.numberPerPage
        ),
      };
    case ERROR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    default:
      return state;
  }
}
