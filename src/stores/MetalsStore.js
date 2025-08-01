import { makeAutoObservable, runInAction } from "mobx";
import agent from "../agent";

export default class MetalsStore {
  metals = [];
  searchResults = [];
  isLoading = true;
  isLoaded = false;
  searchLoading = false;
  featuredMetals = [];

  constructor() {
    makeAutoObservable(this);
  }

  addMetal(metal) {
    if (Array.isArray(this.metals))
      this.metals.push(metal);
    else
      this.metals = [metal];
  }

  removeMetal(id) {
    const item = this.metals.find((x) => x._id === id);
    const index = this.metals.indexOf(item);
    if (index !== -1) {
      this.metals.splice(index, 1);
    }
  }

  updateMetal(newUpdatedmetals, id) {
    this.metals = this.metals.map((metal) =>
      metal._id === id ? { ...metal, ...newUpdatedmetals } : metal
    );
  }
  async getbyId(id) {
    if (this.metals.length > 0) {
      return this.metals.find((x) => x._id === id);
    } else {
      await this.loadmetals();
      if (this.metals.length > 0) return this.metals.find((x) => x._id === id);
    }
  }
  async loadmetals(isVisible) {
    if (this.isLoaded) {
      this.isLoading = false;
      return this.metals; // Return if metals are already loaded
    }
    try {
      this.isLoading = true;
      const response = await agent.metals.list(isVisible);
      const data = response.data;

      runInAction(() => {
        debugger;
        this.metals = data;
        this.isLoaded = true;
      });
    } catch (error) {
      this.isLoading = false;
    } finally {
      this.isLoading = false;
      return this.metals;
    }
  }

  async searchMetals(query) {
    if (!query || query.trim().length < 2) {
      runInAction(() => {
        this.searchResults = [];
        this.searchLoading = false;
      });
      return [];
    }

    try {
      this.searchLoading = true;
      const response = await agent.metals.Search(query.trim());
      const data = response.data || [];

      runInAction(() => {
        this.searchResults = data.map(metal => ({
          ...metal,
          type: 'metal',
          displayName: metal.metalName
        }));
      });
      return this.searchResults;
    } catch (error) {
      console.error('Error searching metals:', error);
      runInAction(() => {
        this.searchResults = [];
      });
      return [];
    } finally {
      runInAction(() => {
        this.searchLoading = false;
      });
    }
  }

  async loadFeaturedMetals() {
    try {
      this.isLoading = true;
      const response = await agent.metals.listFeaturedMetals();
      const data = response.data;

      runInAction(() => {
        this.featuredMetals = data || [];
      });
    } catch (error) {
      console.error('Error loading featured metals:', error);
      runInAction(() => {
        this.featuredMetals = [];
      });
    } finally {
      this.isLoading = false;
    }
  }

  clearSearchResults() {
    runInAction(() => {
      this.searchResults = [];
      this.searchLoading = false;
    });
  }
}
