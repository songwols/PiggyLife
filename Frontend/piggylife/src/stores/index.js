import ColorStore from "./colorStore";
import UserStore from "./userStore";

class RootStore {
  constructor() {
    this.colorStore = new ColorStore(this);
    this.userStore = new UserStore(this);
  }
}

export default RootStore;
