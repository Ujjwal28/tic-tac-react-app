import { createStore } from "redux";
import creatorReducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";

const storage = require("redux-persist/lib/storage").default;

// const store = createStore(creatorReducer, composeWithDevTools());

let store;
const persistConfig = {
  key: "root",
  storage
};
store = createStore(
  persistReducer(persistConfig, creatorReducer),
  composeWithDevTools()
);
store.__PERSISTOR = persistStore(store);

export default store;
// const persistConfig = {
//   key: "root",
//   storage
// };

// const persistedReducer = persistReducer(persistConfig, creatorReducer);

// export default () => {
//   let store = createStore(persistedReducer, composeWithDevTools);
//   let persistor = persistStore(store);
//   return { store, persistor };
// };
