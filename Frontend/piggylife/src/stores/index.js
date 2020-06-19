import ColorStore from "./colorStore";
import UserStore from "./userStore";
import StoreStore from "./storeStore";
import StatisticStore from "./statisticStore";

class RootStore {
  constructor() {
    this.colorStore = new ColorStore(this);
    this.userStore = new UserStore(this);
    this.storeStore = new StoreStore(this);
    this.statisticStore = new StatisticStore(this);
  }
}

export default RootStore;
