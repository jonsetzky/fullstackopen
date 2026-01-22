const initialState = "";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.data.filter.slice(0);
    default:
      return state;
  }
};

export const setFilter = (filter) => {
  return {
    type: "SET_FILTER",
    data: { filter },
  };
};

export default reducer;
