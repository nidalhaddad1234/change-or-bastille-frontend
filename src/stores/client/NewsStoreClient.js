import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../agent";

export default class NewsStoreClient {
  news = [];
  isLoading = true;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getbyId(id) {
    if (this.news.length > 0) {
      return this.news.find((x) => x._id === id);
    } else {
      await this.loadNews();
      if (this.news.length > 0) return this.news.find((x) => x._id === id);
    }
  }
  async loadNews() {
    if (this.isLoaded) {
      this.isLoading = false;
      return this.news; // Return if news are already loaded
    }
    try {
      this.isLoading = true;
      const response = await agent.news.list(true);
      const data = response.data;

      runInAction(() => {
        this.news = data;
        this.isLoaded = true;
      });
    } catch (error) {
      this.isLoading = false;
    } finally {
      this.isLoading = false;
      return this.news;
    }
  }
}
