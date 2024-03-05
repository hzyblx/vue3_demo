// 商品属性
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface CategoryObj {
  id: string | number;
  name: string;
  category1Id?: number;
  category2Id?: number;
  category3Id?: number;
}

// 商品分类接口返回数据类型
export interface CategoryResponDataData extends ResponseData {
  data: CategoryObj[];
}
