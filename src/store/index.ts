import { Action, AnyAction, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
// eslint-disable-next-line no-use-before-define
type Store = ReturnType<typeof setupStore>;

export type AppDispatch = Store["dispatch"];
// eslint-disable-next-line no-use-before-define
export type RootState = ReturnType<typeof combinedReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
const combinedReducer = combineReducers({});
const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  if (action.type === "LOGOUT") {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
    localStorage.removeItem("token");
  }
  return combinedReducer(state, action);
};

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
}
