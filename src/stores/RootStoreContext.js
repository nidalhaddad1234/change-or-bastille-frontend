import React, { useContext } from "react";
import CurrenciesStore from "./CurrenciesStore";
import MetalsStore from "./MetalsStore";
import UsersStore from "./UsersStrore";
import NewsStore from "./NewsStore";
import CurrenciesStoreClient from "./client/CurrenciesStoreClient";
import MetalsStoreClient from "./client/MetalsStoreClient";
import NewsStoreClient from "./client/NewsStoreClient";
import GlobalStore from "./client/GlobalStore";
export const rootStore = {
  currenciesStore: new CurrenciesStore(),
  metalsStore: new MetalsStore(),
  usersStore: new UsersStore(),
  newsStore: new NewsStore(),
  currenciesStoreClient: new CurrenciesStoreClient(),
  metalsStoreClient: new MetalsStoreClient(),
  newsStoreClient: new NewsStoreClient(),
  globalStoreClient: new GlobalStore(),
};
export const RootStoreContext = React.createContext(rootStore);

export function useContextStore() {
  return useContext(RootStoreContext);
}
