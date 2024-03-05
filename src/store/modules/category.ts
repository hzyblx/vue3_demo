import { defineStore } from "pinia";
// 商品分类接口
import { reqC1, reqC2, reqC3 } from "@/api/product/attr";
// 商品分类仓库字段
import type { CategoryState } from "@/store/types/userState";
// 商品分类接口字段
import type { CategoryResponDataData } from "@/api/product/attr/type";

let useCategoryStore = defineStore("Category", {
  state: (): CategoryState => {
    return {
      c1Arr: [],
      c1Id: "",
      c2Arr: [],
      c2Id: "",
      c3Arr: [],
      c3Id: "",
    };
  },
  actions: {
    async getC1() {
      let res: CategoryResponDataData = await reqC1();
      if (res.code == 200) {
        this.c1Arr = res.data;
      }
    },
    async getC2() {
      let res: CategoryResponDataData = await reqC2(this.c1Id);
      if (res.code == 200) {
        this.c2Arr = res.data;
      }
    },
    async getC3() {
      let res: CategoryResponDataData = await reqC3(this.c2Id);
      if (res.code == 200) {
        this.c3Arr = res.data;
      }
    },
  },
  getters: {},
});

export default useCategoryStore;
