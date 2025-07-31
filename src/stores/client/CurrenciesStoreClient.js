import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../agent";

export default class CurrenciesStoreClient {
  currencies = [];
  isLoading = true;
  isLoaded = false;
  constructor() {
    makeAutoObservable(this);
  }
  async getbyId(id) {
    if (this.currencies.data && this.currencies.data.length > 0) {
      return this.currencies.data.find((x) => x._id === id);
    } else {
      await this.loadCurrencies();
      if (this.currencies.data.length > 0)
        return this.currencies.data.find((x) => x._id === id);
    }
  }
  async loadCurrencies() {
    if (this.isLoaded) {
      this.isLoading = false;
      return this.currencies; // Return if currencies are already loaded
    }
    try {
      this.isLoading = true;
      const response = await agent.currencies.list(true);

      runInAction(() => {
        this.currencies = response;
        this.isLoaded = true;
      });
    } catch (error) {
      this.isLoading = false;
    } finally {
      this.isLoading = false;
      return this.currencies;
    }
  }
}
