import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../agent";

export default class GlobalStore {
  featuredMetals = [];
  featuredCurrencies = [];
  featuredNews = [];
  banner = [];
  mainSeo;
  isLoading = true;
  isLoadingTopBanner = true;
  isLoaded = false;
  isLoadedBanner = false;

  constructor() {
    makeAutoObservable(this);
  }
  async loadIndexPage(isVisible) {
    if (this.isLoaded) {
      this.isLoading = false;
      return {
        metals: this.featuredMetals,
        currencies: this.featuredCurrencies,
        news: this.featuredNews,
      }; // Return if metals are already loaded
    }
    try {
      this.isLoading = true;
      const responseMetals = await agent.metals.listFeaturedMetals();
      const responseSeo = await agent.seo.getByPage("main");
      const responseCurrencies =
        await agent.currencies.listIsFeaturedCurrencies();
      const responseNews = await agent.news.list(true);

      runInAction(() => {
        this.featuredMetals = responseMetals.data;
        this.featuredCurrencies = responseCurrencies.data;
        this.featuredNews = responseNews.data;
        this.mainSeo = responseSeo;
        this.isLoaded = true;
      });
    } catch (error) {
      this.isLoading = false;
    } finally {
      this.isLoading = false;
      return {
        metals: this.featuredMetals,
        currencies: this.featuredCurrencies,
        news: this.featuredNews,
      };
    }
  }
  async loadConfiguration() {
    if (this.isLoaded) {
      this.isLoading = false;
      return {
        metals: this.featuredMetals,
        currencies: this.featuredCurrencies,
        news: this.featuredNews,
      }; // Return if metals are already loaded
    }
    try {
      this.isLoading = true;
      const responseMetals = await agent.metals.listFeaturedMetals();
      const responseCurrencies =
        await agent.currencies.listIsFeaturedCurrencies();
      const responseNews = await agent.news.list(true);

      runInAction(() => {
        this.featuredMetals = responseMetals.data;
        this.featuredCurrencies = responseCurrencies.data;
        this.featuredNews = responseNews.data;
        this.isLoaded = true;
      });
    } catch (error) {
      this.isLoading = false;
    } finally {
      this.isLoading = false;
      return {
        metals: this.featuredMetals,
        currencies: this.featuredCurrencies,
        news: this.featuredNews,
      };
    }
  }
  async loadTopBanner() {
    if (this.isLoadedBanner) {
      this.isLoadingTopBanner = false;
      return this.banner;
    }
    try {
      this.isLoadingTopBanner = true;
      const result = await agent.configuration.list();
      runInAction(() => {
        this.banner = result;
        this.isLoadedBanner = true;
      });
    } catch (error) {
      this.isLoadingTopBanner = false;
    } finally {
      this.isLoadingTopBanner = false;
      return this.banner;
    }
  }
}
