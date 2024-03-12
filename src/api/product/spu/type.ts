export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
// 图片对象
export interface SpuImage {
  id?: number;
  spuId?: number;
  imgName?: string;
  imgUrl?: string;
  name?: string;
  url?: string;
}
// 品牌
export interface Trademark {
  id: number;
  logoUrl: string;
  tmName: string;
}
// SPU商品销售属性对象
export interface SpuSaleAttrValue {
  id?: number;
  spuId?: number;
  isChecked?: string;
  baseSaleAttrId: number;
  saleAttrName?: string;
  saleAttrValueName: string;
}
// SPU销售属性整体数组
export interface SpuSaleAttr {
  id?: number;
  spuId?: number;
  flag?: boolean;
  input?: string;
  baseSaleAttrId: number;
  saleAttrName: string;
  spuSaleAttrValueList: SpuSaleAttrValue[];
}
// SPU商品基本属性对象
export interface SpuBaseAttrValue {
  id: number;
  name: string;
}
// SPU整体Record对象
export interface SpuRecords {
  id?: number | null; //SPU ID
  tmId: number | null; //品牌ID
  category3Id: number;
  description: string;
  spuName: string;
  spuSaleAttrList: null | SpuSaleAttr[];
  spuImageList: null | SpuImage[];
}
// Spu返回data
export interface SpuData {
  current: string;
  hitCount: boolean;
  pages: number;
  records: SpuRecords[];
  searchCount: boolean;
  size: number;
  total: number;
}
// SPU整体返回
export interface SpuResonseData extends ResponseData {
  data: SpuData;
}

// 品牌整体返回
export interface TrademarkRespnseData extends ResponseData {
  data: Trademark[];
}

// 品牌图片整体返回
export interface SpuImageRespnseData extends ResponseData {
  data: SpuImage[];
}

// 品牌销售属性整体返回
export interface SpuSaleAttrResponseData extends ResponseData {
  data: SpuSaleAttr[];
}

// 品牌基础属性整体返回
export interface SpuBaseAttrResponseData extends ResponseData {
  data: SpuBaseAttrValue[];
}
