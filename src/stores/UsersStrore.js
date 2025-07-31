import { makeAutoObservable, runInAction } from "mobx";
import agent from "../agent";

export default class UsersStore {
  users = [];
  isLoading = true;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  removeUser(id) {
    const item = this.users.find((x) => x._id === id);
    const index = this.users.indexOf(item);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  updateUser(newUser, id) {
    this.users = this.users.map((user) =>
      user._id === id ? { ...user, ...newUser } : user
    );
  }
  async getbyId(id) {
    var result = await agent.account.getUserIdentity(id);
    return result.data;
  }
  async getUserbyId(id) {
    if (this.users.length > 0) {
      return this.users.find((x) => x._id === id);
    } else {
      await this.loadUsers(false);
      if (this.users.length > 0) return this.users.find((x) => x._id === id);
    }
  }
  async loadUsers(isVisible) {
    if (this.isLoaded) {
      this.isLoading = false;
      return this.users; // Return if metals are already loaded
    }
    try {
      this.isLoading = true;
      const response = await agent.account.list();
      const data = response.data;

      runInAction(() => {
        this.users = data;
        this.isLoaded = true;
      });
    } catch (error) {
      this.isLoading = false;
    } finally {
      this.isLoading = false;
      return this.users;
    }
  }
}
