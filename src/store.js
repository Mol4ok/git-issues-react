import { createStore } from "redux"
import rootReducer from "reducers"
import { applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
