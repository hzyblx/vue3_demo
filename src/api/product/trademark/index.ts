import request from "@/utils/request";
// 数据类型
import { TradeMarkResponseData, TradeMark } from "@/api/product/trademark/type";
// 品牌模块接口地址
enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  // 添加品牌
  ADD_TRADEMARK_URL = "/admin/product/baseTrademark/save",
  // 更新品牌
  UPDATE_TRADEMARK_URL = "/admin/product/baseTrademark/update/",
  // 删除品牌
  DELETET_RADEMARK_URL = "/admin/product/baseTrademark/remove/",
}

// 获取已有品牌
export const reqHasTradeMark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`
  );

// 添加品牌
export const reqAddOrUpdateTradeMark = (data: TradeMark) => {
  // 修改
  if (data.id) {
    return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data);
  }
  // 新增
  else {
    return request.post<any, any>(API.ADD_TRADEMARK_URL, data);
  }
};

// 删除品牌
export const reqDeleteTradeMark = (id: number) =>
  request.delete<any, any>(API.DELETET_RADEMARK_URL + `${id}`);
