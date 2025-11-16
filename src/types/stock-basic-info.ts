// SPDX-License-Identifier: MIT
import {PaginationRequest} from '.';

export interface ListStockBasicInfosRequest extends PaginationRequest {
    
    id: string;
    
    symbol: string;
    
    symbol_full: string;
    
    name: string;
    
    exchange: string;
    
    listing_date: string;
    
    industry: string;
    
    industry_gy: string;
    
    province: string;
    
    city: string;
    
    website: string;
    
    price_tick: number;
    
    data_source: string;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface StockBasicInfo {
    
    id: string;
    
    symbol: string;
    
    symbol_full: string;
    
    name: string;
    
    exchange: string;
    
    listing_date: string;
    
    industry: string;
    
    industry_gy: string;
    
    province: string;
    
    city: string;
    
    website: string;
    
    price_tick: number;
    
    data_source: string;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface StockBasicInfoDetail extends StockBasicInfo {

}

export interface CreateStockBasicInfo {
    
    symbol: string;
    
    symbol_full: string;
    
    name: string;
    
    exchange: string;
    
    listing_date: string;
    
    industry: string;
    
    industry_gy: string;
    
    province: string;
    
    city: string;
    
    website: string;
    
    price_tick: number;
    
    data_source: string;
    
    updated_at: string;
    
}

export interface CreateStockBasicInfoRequest {
stockBasicInfo: CreateStockBasicInfo;
}

export interface UpdateStockBasicInfo {
    
    id: string;
    
    symbol: string;
    
    symbol_full: string;
    
    name: string;
    
    exchange: string;
    
    listing_date: string;
    
    industry: string;
    
    industry_gy: string;
    
    province: string;
    
    city: string;
    
    website: string;
    
    price_tick: number;
    
    data_source: string;
    
    updated_at: string;
    
}

export interface UpdateStockBasicInfoRequest {
stockBasicInfo: UpdateStockBasicInfo;
}

export interface BatchGetStockBasicInfosResponse {
    stockBasicInfos: StockBasicInfoDetail[];
}

export interface BatchCreateStockBasicInfosRequest {
    stockBasicInfos: CreateStockBasicInfo[];
}

export interface BatchCreateStockBasicInfoResponse {
    stockBasicInfos: StockBasicInfo[];
}

export interface BatchUpdateStockBasicInfo {
    
    symbol: string;
    
    symbol_full: string;
    
    name: string;
    
    exchange: string;
    
    listing_date: string;
    
    industry: string;
    
    industry_gy: string;
    
    province: string;
    
    city: string;
    
    website: string;
    
    price_tick: number;
    
    data_source: string;
    
    updated_at: string;
    
}

export interface BatchUpdateStockBasicInfosRequest {
    ids: string[];
    stockBasicInfo: BatchUpdateStockBasicInfo;
}

export interface BatchPatchStockBasicInfosRequest {
    stockBasicInfos: UpdateStockBasicInfo[];
}

export interface BatchUpdateStockBasicInfosResponse {
    stockBasicInfos: StockBasicInfo[];
}

export interface BatchDeleteStockBasicInfosRequest {
    ids: string[];
}

export interface ExportStockBasicInfo extends StockBasicInfo {
}

export interface ExportStockBasicInfosRequest {
    ids: string[];
}

export interface ImportStockBasicInfosRequest {
    file: File;
}

export interface ImportStockBasicInfo extends CreateStockBasicInfo {
    errMsg: string;
}

export interface ImportStockBasicInfosResponse {
    stockBasicInfos: ImportStockBasicInfo[];
}