import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// import reporter from "./middleware/reporter.js";
import thunk from "redux-thunk";

import reducer from "../components/resty/reducers.js";
// import historyReducer from '../components/resty/history/history-reducers.js';
// import formReducer from '../components/resty/form/form-reducers.js';
// import resultsReducer from '../components/resty/results/results-reducers.js';

let reducers = combineReducers({
  data: reducer,
  // history: historyReducer,
  // form: formReducer,
  // results: resultsReducer
});

const store = () => createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
export default store;
