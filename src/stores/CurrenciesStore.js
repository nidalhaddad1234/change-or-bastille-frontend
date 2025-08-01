import { makeAutoObservable, runInAction } from "mobx";
import agent from "../agent";

export default class CurrenciesStore {
  currencies = [];
  featuredCurrencies = [];
  searchResults = [];
  isLoading = true;
  isLoaded = false;
  searchLoading = false;

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

  async loadFeaturedCurrencies() {
    try {
      this.isLoading = true;
      const response = await agent.currencies.listIsFeaturedCurrencies();
      const data = response.data;

      runInAction(() => {
        this.featuredCurrencies = data || [];
      });
    } catch (error) {
      console.error('Error loading featured currencies:', error);
      runInAction(() => {
        this.featuredCurrencies = [];
      });
    } finally {
      this.isLoading = false;
    }
  }

  searchCurrencies(query) {
    if (!query || query.trim().length < 2) {
      runInAction(() => {
        this.searchResults = [];
        this.searchLoading = false;
      });
      return [];
    }

    try {
      this.searchLoading = true;
      const searchTerm = query.trim().toLowerCase();
      
      // Filter currencies by name or ISO code
      const filteredCurrencies = this.currencies.filter(currency => 
        currency.currencyName?.toLowerCase().includes(searchTerm) ||
        currency.moneyName?.toLowerCase().includes(searchTerm) ||
        currency.iso?.toLowerCase().includes(searchTerm)
      );

      runInAction(() => {
        this.searchResults = filteredCurrencies.map(currency => ({
          ...currency,
          type: 'currency',
          displayName: currency.currencyName
        }));
        this.searchLoading = false;
      });
      
      return this.searchResults;
    } catch (error) {
      console.error('Error searching currencies:', error);
      runInAction(() => {
        this.searchResults = [];
        this.searchLoading = false;
      });
      return [];
    }
  }

  clearSearchResults() {
    runInAction(() => {
      this.searchResults = [];
      this.searchLoading = false;
    });
  }
}
