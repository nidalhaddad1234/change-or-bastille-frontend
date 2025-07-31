import { makeAutoObservable, runInAction } from "mobx";
import agent from "../agent";

export default class MetalsStore {
  metals = [];
  isLoading = true;
  isLoaded = false;

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
}
