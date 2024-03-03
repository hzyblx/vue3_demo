// 品牌接口
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 已有品牌
export interface TradeMark {
  id?: number;
  logoUrl: string;
  tmName: string;
}

// 包含全部品牌数据的ts类型
export type Records = TradeMark[];

// 获取已有品牌的数据ts类型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    pages: number;
    searchCount: boolean;
  };
}
