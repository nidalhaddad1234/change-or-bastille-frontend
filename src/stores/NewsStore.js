import { makeAutoObservable, runInAction } from "mobx";
import agent from "../agent";

export default class NewsStore {
  news = [];
  isLoading = true;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  addNews(news) {
    this.news.push(news);
  }

  removeNews(id) {
    const item = this.news.find((x) => x._id === id);
    const index = this.news.indexOf(item);
    if (index !== -1) {
      this.news.splice(index, 1);
    }
  }

  updateNews(newUpdatedNews, id) {
    this.news = this.news.map((news) =>
      news._id === id ? { ...news, ...newUpdatedNews } : news
    );
  }
  async getbyId(id) {
    if (this.news.length > 0) {
      return this.news.find((x) => x._id === id);
    } else {
      await this.loadNews(false);
      if (this.news.length > 0) return this.news.find((x) => x._id === id);
    }
  }
  async loadNews(isVisible) {
    if (this.isLoaded) {
      this.isLoading = false;
      return this.news; // Return if news are already loaded
    }
    try {
      this.isLoading = true;
      const response = await agent.news.list(isVisible);
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
