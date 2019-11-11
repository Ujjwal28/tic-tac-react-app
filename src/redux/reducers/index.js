function creatorReducer(prevState = { creator: false }, action) {
  let newState;
  switch (action.type) {
    case "SET_CREATOR":
      newState = {
        ...prevState,
        creator: action.flag
      };
      break;
    case "SET_PLAYER":
      newState = {
        ...prevState,
        player2: action.flag
      };
      break;
    default:
      newState = prevState;
      break;
  }

  return newState;
}

export default creatorReducer;
