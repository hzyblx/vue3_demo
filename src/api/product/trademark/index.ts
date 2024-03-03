import request from "@/utils/request";
// 数据类型
import { TradeMarkResponseData } from "@/api/product/trademark/type";
// 品牌模块接口地址
enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = "/admin/product/baseTrademark/",
}

// 获取已有品牌
export const reqHasTradeMark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`
  );
