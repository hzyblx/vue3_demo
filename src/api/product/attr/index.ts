// 商品属性接口
import request from "@/utils/request";
// 商品字段类型
import type { CategoryResponDataData } from "@/api/product/attr/type";

enum API {
  C1_URL = "/admin/product/getCategory1",
  C2_URL = "/admin/product/getCategory2/",
  C3_URL = "/admin/product/getCategory3/",
}

// 获取一级分类接口
export const reqC1 = () => request.get<any, CategoryResponDataData>(API.C1_URL);
// 获取二级分类接口
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponDataData>(API.C2_URL + `${category1Id}`);
// 获取三级分类接口
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponDataData>(API.C3_URL + `${category2Id}`);
