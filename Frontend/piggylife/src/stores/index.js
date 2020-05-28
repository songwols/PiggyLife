import ColorStore from "./colorStore";
import UserStore from "./userStore";
import StoreStore from "./storeStore";

class RootStore {
  constructor() {
    this.colorStore = new ColorStore(this);
    this.userStore = new UserStore(this);
    this.storeStore = new StoreStore(this);
  }
}

export default RootStore;
