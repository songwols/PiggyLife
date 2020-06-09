import { observable, action } from "mobx";
import agent from "../agent";

export default class StatisticStore {
  @observable areaList = [];
  @observable bestarea = {
    area: "",
    city: "",
    cnt: 0,
  };
  @observable area1 = {
    area: "",
    city: "",
    cnt: 0,
  };
  @observable area2 = {
    area: "",
    city: "",
    cnt: 0,
  };
  @observable area3 = {
    area: "",
    city: "",
    cnt: 0,
  };
  @observable area4 = {
    area: "",
    city: "",
    cnt: 0,
  };
  @observable area5 = {
    area: "",
    city: "",
    cnt: 0,
  };
  @observable cate1 = {
    category_group: "",
    count: 0,
  };
  @observable cate2 = {
    category_group: "",
    count: 0,
  };
  @observable cate3 = {
    category_group: "",
    count: 0,
  };
  @observable cate4 = {
    category_group: "",
    count: 0,
  };
  @observable cate5 = {
    category_group: "",
    count: 0,
  };
  @observable fcate1 = {
    category_group: "",
    count: 0,
  };
  @observable fcate2 = {
    category_group: "",
    count: 0,
  };
  @observable fcate3 = {
    category_group: "",
    count: 0,
  };

  @observable categoryList = [];

  @action
  getAreaStatistic(uId) {
    return agent.Data.getAreaStatistic(uId)
      .then((res) => {
        this.areaList = res.data;
        this.bestarea = res.data[0];
        if (res.data.length > 0) {
          this.area1 = res.data[0];
        }
        if (res.data.length > 1) {
          this.area2 = res.data[1];
        }
        if (res.data.length > 2) {
          this.area3 = res.data[2];
        }
        if (res.data.length > 3) {
          this.area4 = res.data[3];
        }
        if (res.data.length > 4) {
          this.area5 = res.data[4];
        }
      })
      .catch((err) => console.log(err));
  }

  @action
  getCategoryStatistic(uId) {
    return agent.Data.getCategoryStatistic(uId)
      .then((res) => {
        this.categoryList = res.data;
        if (res.data.length > 0) {
          this.cate1 = res.data[0];
        }
        if (res.data.length > 1) {
          this.cate2 = res.data[1];
        }
        if (res.data.length > 2) {
          this.cate3 = res.data[2];
        }
        if (res.data.length > 3) {
          this.cate4 = res.data[3];
        }
        if (res.data.length > 4) {
          this.cate5 = res.data[4];
        }
      })
      .catch((err) => console.log(err));
  }
  @action
  getCategoryStatisticByEmail(email) {
    return agent.Data.getCategoryStatisticByEmail(email)
      .then((res) => {
        this.categoryList = res.data;
        if (res.data.length > 0) {
          this.cate1 = res.data[0];
        } else {
          this.cate1.category_group = "";
        }
        if (res.data.length > 1) {
          this.cate2 = res.data[1];
        } else {
          this.cate2.category_group = "";
        }
        if (res.data.length > 2) {
          this.cate3 = res.data[2];
        } else {
          this.cate3.category_group = "";
        }
      })
      .catch((err) => console.log(err));
  }
  @action
  fgetCategoryStatisticByEmail(email) {
    return agent.Data.getCategoryStatisticByEmail(email)
      .then((res) => {
        if (res.data.length > 0) {
          this.fcate1 = res.data[0];
        } else {
          this.fcate1.category_group = "";
        }
        if (res.data.length > 1) {
          this.fcate2 = res.data[1];
        } else {
          this.fcate2.category_group = "";
        }
        if (res.data.length > 2) {
          this.fcate3 = res.data[2];
        } else {
          this.fcate3.category_group = "";
        }
      })
      .catch((err) => console.log(err));
  }

  constructor(root) {
    this.root = root;
  }
}
