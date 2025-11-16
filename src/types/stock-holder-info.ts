// SPDX-License-Identifier: MIT
import {PaginationRequest} from '.';

export interface ListStockHolderInfosRequest extends PaginationRequest {
    
    id: string;
    
    stock_symbol_full: string;
    
    holder_name: string;
    
    holder_info: string;
    
    holder_type: number;
    
    share_amount: number;
    
    share_ratio: number;
    
    change_amount: number;
    
    change_type: number;
    
    report_date: string;
    
    is_top_ten: number;
    
    ranking: number;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface StockHolderInfo {
    
    id: string;
    
    stock_symbol_full: string;
    
    holder_name: string;
    
    holder_info: string;
    
    holder_type: number;
    
    share_amount: number;
    
    share_ratio: number;
    
    change_amount: number;
    
    change_type: number;
    
    report_date: string;
    
    is_top_ten: number;
    
    ranking: number;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface StockHolderInfoDetail extends StockHolderInfo {

}

export interface CreateStockHolderInfo {
    
    stock_symbol_full: string;
    
    holder_name: string;
    
    holder_info: string;
    
    holder_type: number;
    
    share_amount: number;
    
    share_ratio: number;
    
    change_amount: number;
    
    change_type: number;
    
    report_date: string;
    
    is_top_ten: number;
    
    ranking: number;
    
    updated_at: string;
    
}

export interface CreateStockHolderInfoRequest {
stockHolderInfo: CreateStockHolderInfo;
}

export interface UpdateStockHolderInfo {
    
    id: string;
    
    stock_symbol_full: string;
    
    holder_name: string;
    
    holder_info: string;
    
    holder_type: number;
    
    share_amount: number;
    
    share_ratio: number;
    
    change_amount: number;
    
    change_type: number;
    
    report_date: string;
    
    is_top_ten: number;
    
    ranking: number;
    
    updated_at: string;
    
}

export interface UpdateStockHolderInfoRequest {
stockHolderInfo: UpdateStockHolderInfo;
}

export interface BatchGetStockHolderInfosResponse {
    stockHolderInfos: StockHolderInfoDetail[];
}

export interface BatchCreateStockHolderInfosRequest {
    stockHolderInfos: CreateStockHolderInfo[];
}

export interface BatchCreateStockHolderInfoResponse {
    stockHolderInfos: StockHolderInfo[];
}

export interface BatchUpdateStockHolderInfo {
    
    stock_symbol_full: string;
    
    holder_name: string;
    
    holder_info: string;
    
    holder_type: number;
    
    share_amount: number;
    
    share_ratio: number;
    
    change_amount: number;
    
    change_type: number;
    
    report_date: string;
    
    is_top_ten: number;
    
    ranking: number;
    
    updated_at: string;
    
}

export interface BatchUpdateStockHolderInfosRequest {
    ids: string[];
    stockHolderInfo: BatchUpdateStockHolderInfo;
}

export interface BatchPatchStockHolderInfosRequest {
    stockHolderInfos: UpdateStockHolderInfo[];
}

export interface BatchUpdateStockHolderInfosResponse {
    stockHolderInfos: StockHolderInfo[];
}

export interface BatchDeleteStockHolderInfosRequest {
    ids: string[];
}

export interface ExportStockHolderInfo extends StockHolderInfo {
}

export interface ExportStockHolderInfosRequest {
    ids: string[];
}

export interface ImportStockHolderInfosRequest {
    file: File;
}

export interface ImportStockHolderInfo extends CreateStockHolderInfo {
    errMsg: string;
}

export interface ImportStockHolderInfosResponse {
    stockHolderInfos: ImportStockHolderInfo[];
}