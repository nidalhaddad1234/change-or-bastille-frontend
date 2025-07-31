import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../agent";

export default class MetalsStoreClient {
  ingots = [];
  collections = [];
  investments = [];
  isLoading = true;
  isLoadedIngots = false;
  isLoadedCollection = false;
  isLoadedInvestment = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getbyIdIngots(id) {
    if (this.ingots.data && this.ingots.data.length > 0) {
      return this.ingots.data.find((x) => x._id === id);
    } else {
      await this.loadIngots();
      if (this.ingots.data.length > 0)
        return this.ingots.data.find((x) => x._id === id);
    }
  }
  async getbyIdInvestment(id) {
    if (this.investments.data && this.investments.data.length > 0) {
      return this.investments.data.find((x) => x._id === id);
    } else {
      await this.loadInvestments();
      if (this.investments.data.length > 0)
        return this.investments.data.find((x) => x._id === id);
    }
  }
  async getbyIdCollections(id) {
    if (this.collections.data && this.collections.data.length > 0) {
      return this.collections.data.find((x) => x._id === id);
    } else {
      await this.loadCollections();
      if (this.collections.data.length > 0)
        return this.collections.data.find((x) => x._id === id);
    }
  }
  async loadIngots() {
    if (this.isLoadedIngots) {
      this.isLoading = false;
      return this.ingots; // Return if metals are already loaded
    }
    try {
      this.isLoading = true;
      const response = await agent.metals.listByType("Lingots");
      const data = response;

      runInAction(() => {
        this.ingots = data;
        this.isLoadedIngots = true;
      });
    } catch (error) {
      this.isLoading = false;
    } finally {
      this.isLoading = false;
      return this.ingots;
    }
  }
  async loadInvestments() {
    if (this.isLoadedInvestment) {
      this.isLoading = false;
      return this.investments; // Return if metals are already loaded
    }
    try {
      this.isLoading = true;
      const response = await agent.metals.listByType("Piece D'investissment");
      const data = response;

      runInAction(() => {
        this.investments = data;
        this.isLoadedInvestment = true;
      });
    } catch (error) {
      this.isLoading = false;
    } finally {
      this.isLoading = false;
      return this.investments;
    }
  }
  async loadCollections() {
    if (this.isLoadedCollection) {
      this.isLoading = false;
      return this.collections; // Return if metals are already loaded
    }
    try {
      this.isLoading = true;
      const response = await agent.metals.listByType("Piece De Collection");
      const data = response;

      runInAction(() => {
        this.collections = data;
        this.isLoadedCollection = true;
      });
    } catch (error) {
      this.isLoading = false;
    } finally {
      this.isLoading = false;
      return this.collections;
    }
  }
}
