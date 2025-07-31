import { makeAutoObservable, runInAction } from "mobx";
import agent from "../agent";

export default class CurrenciesStore {
  currencies = [];
  isLoading = true;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  addCurrency(currency) {
    this.currencies.push(currency);
  }

  removeCurrency(id) {
    const item = this.currencies.find((x) => x._id === id);
    const index = this.currencies.indexOf(item);
    if (index !== -1) {
      this.currencies.splice(index, 1);
    }
  }

  updateCurrency(newUpdatedCurrencies, id) {
    this.currencies = this.currencies.map((currency) =>
      currency._id === id ? { ...currency, ...newUpdatedCurrencies } : currency
    );
  }
  async getbyId(id) {
    if (this.currencies.length > 0) {
      return this.currencies.find((x) => x._id === id);
    } else {
      await this.loadCurrencies(false);
      if (this.currencies.length > 0)
        return this.currencies.find((x) => x._id === id);
    }
  }
  async loadCurrencies(isVisible) {
    if (this.isLoaded) {
      this.isLoading = false;
      return this.currencies; // Return if currencies are already loaded
    }
    try {
      this.isLoading = true;
      const response = await agent.currencies.list(isVisible);
      const data = response.data;

      runInAction(() => {
        this.currencies = data;
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
