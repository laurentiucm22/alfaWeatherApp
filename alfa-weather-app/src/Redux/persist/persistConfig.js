import storage from "redux-persist/lib/storage";

export const uiPersistConfig = {
  key: "ui",
  storage,
  whitelist: ["isAuthenticated"],
};
