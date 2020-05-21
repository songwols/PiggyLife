import ColorStore from "./colorStore";

class RootStore {
  constructor() {
    this.colorStore = new ColorStore(this);
  }
}

export default RootStore;
