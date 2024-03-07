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
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[];
}

// 商品属性对象
export interface AttrValueObj {
  id?: number | string;
  valueName: string;
  attrId?: number | string;
  lookFlag?: boolean;
}

// 商品属性data对象
export interface attrDataObj {
  id?: number | string;
  attrName: string;
  categoryId: number | string;
  categoryLevel: number | string;
  attrValueList: AttrValueObj[];
}
// 商品属性接口返回结果
export interface AttrResponseData extends ResponseData {
  data: attrDataObj[];
}
