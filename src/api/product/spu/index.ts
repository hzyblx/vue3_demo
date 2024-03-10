import request from "@/utils/request";

import {
  SpuResonseData,
  TrademarkRespnseData,
  SpuImageRespnseData,
  SpuSaleAttrResponseData,
  SpuBaseAttrResponseData,
} from "@/api/product/spu/type";
enum API {
  // 获取已有的SPU
  HASSPU_URL = "/admin/product/",
  // 获取全部品牌
  ALL_TRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList",
  // 根据SPU的ID获取图片
  IMAGE_URL = "/admin/product/spuImageList/",
  // 根据SPU的ID获取销售属性
  SALE_ATTR_URL = "/admin/product/spuSaleAttrList/",
  // 根据商品基础属性
  BASE_ATTR_URL = "/admin/product/baseSaleAttrList",
}

// 获取已有的SPU
export const reqHasSPU = (
  page: number | string,
  limit: number | string,
  category3Id: number | string
) =>
  request.get<any, SpuResonseData>(
    API.HASSPU_URL + `${page}/${limit}/?category3Id=${category3Id}`
  );

// 获取全部品牌
export const reqGetTrademark = () =>
  request.get<any, TrademarkRespnseData>(API.ALL_TRADEMARK_URL);

// 根据SPU的ID获取图片
export const reqGetSpuImage = (id: number) =>
  request.get<any, SpuImageRespnseData>(API.IMAGE_URL + id);

// 根据SPU的ID获取商品销售属性
export const reqGetSaleAttrList = (id: number) =>
  request.get<any, SpuSaleAttrResponseData>(API.SALE_ATTR_URL + id);

// 根据SPU的ID获取商品基础属性
export const reqGetBaseAttrList = () =>
  request.get<any, SpuBaseAttrResponseData>(API.BASE_ATTR_URL);