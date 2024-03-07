// 商品属性接口
import request from "@/utils/request";
// 商品字段类型
import type {
  CategoryResponseData,
  attrDataObj,
} from "@/api/product/attr/type";

enum API {
  C1_URL = "/admin/product/getCategory1",
  C2_URL = "/admin/product/getCategory2/",
  C3_URL = "/admin/product/getCategory3/",
  // 获取商品属性列表
  ATTR_URL = "/admin/product/attrInfoList/",
  // 编辑或新增商品属性
  EDIT_ADD_ATTR_URL = "/admin/product/saveAttrInfo",
}

// 获取一级分类接口
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL);
// 获取二级分类接口
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + `${category1Id}`);
// 获取三级分类接口
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + `${category2Id}`);
// 获取商品属性信息
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string
) =>
  request.get<any, any>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`
  );
// 新增或编辑商品属性
export const reqAddOrUpdateAttr = (data: attrDataObj) =>
  request.post<any, any>(API.EDIT_ADD_ATTR_URL, data);
// 删除商品属性
