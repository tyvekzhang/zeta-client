// SPDX-License-Identifier: MIT
import {PaginationRequest} from '.';

export interface ListStockDailyInfosRequest extends PaginationRequest {
    
    id: string;
    
    stock_symbol_full: string;
    
    trade_date: string;
    
    open_price: number;
    
    close_price: number;
    
    high_price: number;
    
    low_price: number;
    
    volume: number;
    
    turnover: number;
    
    change_amount: number;
    
    change_rate: number;
    
    pe_ratio: number;
    
    pb_ratio: number;
    
    market_cap: number;
    
    circulating_market_cap: number;
    
    turnover_rate: number;
    
    bid_price1: string;
    
    bid_price2: string;
    
    bid_price3: string;
    
    bid_price4: string;
    
    bid_price5: string;
    
    bid_volume1: string;
    
    bid_volume2: string;
    
    bid_volume3: string;
    
    bid_volume4: string;
    
    bid_volume5: string;
    
    ask_price1: number;
    
    ask_price2: number;
    
    ask_price3: number;
    
    ask_price4: number;
    
    ask_price5: number;
    
    ask_volume1: number;
    
    ask_volume2: number;
    
    ask_volume3: number;
    
    ask_volume4: number;
    
    ask_volume5: number;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface StockDailyInfo {
    
    id: string;
    
    stock_symbol_full: string;
    
    trade_date: string;
    
    open_price: number;
    
    close_price: number;
    
    high_price: number;
    
    low_price: number;
    
    volume: number;
    
    turnover: number;
    
    change_amount: number;
    
    change_rate: number;
    
    pe_ratio: number;
    
    pb_ratio: number;
    
    market_cap: number;
    
    circulating_market_cap: number;
    
    turnover_rate: number;
    
    bid_price1: string;
    
    bid_price2: string;
    
    bid_price3: string;
    
    bid_price4: string;
    
    bid_price5: string;
    
    bid_volume1: string;
    
    bid_volume2: string;
    
    bid_volume3: string;
    
    bid_volume4: string;
    
    bid_volume5: string;
    
    ask_price1: number;
    
    ask_price2: number;
    
    ask_price3: number;
    
    ask_price4: number;
    
    ask_price5: number;
    
    ask_volume1: number;
    
    ask_volume2: number;
    
    ask_volume3: number;
    
    ask_volume4: number;
    
    ask_volume5: number;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface StockDailyInfoDetail extends StockDailyInfo {

}

export interface CreateStockDailyInfo {
    
    stock_symbol_full: string;
    
    trade_date: string;
    
    open_price: number;
    
    close_price: number;
    
    high_price: number;
    
    low_price: number;
    
    volume: number;
    
    turnover: number;
    
    change_amount: number;
    
    change_rate: number;
    
    pe_ratio: number;
    
    pb_ratio: number;
    
    market_cap: number;
    
    circulating_market_cap: number;
    
    turnover_rate: number;
    
    bid_price1: string;
    
    bid_price2: string;
    
    bid_price3: string;
    
    bid_price4: string;
    
    bid_price5: string;
    
    bid_volume1: string;
    
    bid_volume2: string;
    
    bid_volume3: string;
    
    bid_volume4: string;
    
    bid_volume5: string;
    
    ask_price1: number;
    
    ask_price2: number;
    
    ask_price3: number;
    
    ask_price4: number;
    
    ask_price5: number;
    
    ask_volume1: number;
    
    ask_volume2: number;
    
    ask_volume3: number;
    
    ask_volume4: number;
    
    ask_volume5: number;
    
    updated_at: string;
    
}

export interface CreateStockDailyInfoRequest {
stockDailyInfo: CreateStockDailyInfo;
}

export interface UpdateStockDailyInfo {
    
    id: string;
    
    stock_symbol_full: string;
    
    trade_date: string;
    
    open_price: number;
    
    close_price: number;
    
    high_price: number;
    
    low_price: number;
    
    volume: number;
    
    turnover: number;
    
    change_amount: number;
    
    change_rate: number;
    
    pe_ratio: number;
    
    pb_ratio: number;
    
    market_cap: number;
    
    circulating_market_cap: number;
    
    turnover_rate: number;
    
    bid_price1: string;
    
    bid_price2: string;
    
    bid_price3: string;
    
    bid_price4: string;
    
    bid_price5: string;
    
    bid_volume1: string;
    
    bid_volume2: string;
    
    bid_volume3: string;
    
    bid_volume4: string;
    
    bid_volume5: string;
    
    ask_price1: number;
    
    ask_price2: number;
    
    ask_price3: number;
    
    ask_price4: number;
    
    ask_price5: number;
    
    ask_volume1: number;
    
    ask_volume2: number;
    
    ask_volume3: number;
    
    ask_volume4: number;
    
    ask_volume5: number;
    
    updated_at: string;
    
}

export interface UpdateStockDailyInfoRequest {
stockDailyInfo: UpdateStockDailyInfo;
}

export interface BatchGetStockDailyInfosResponse {
    stockDailyInfos: StockDailyInfoDetail[];
}

export interface BatchCreateStockDailyInfosRequest {
    stockDailyInfos: CreateStockDailyInfo[];
}

export interface BatchCreateStockDailyInfoResponse {
    stockDailyInfos: StockDailyInfo[];
}

export interface BatchUpdateStockDailyInfo {
    
    stock_symbol_full: string;
    
    trade_date: string;
    
    open_price: number;
    
    close_price: number;
    
    high_price: number;
    
    low_price: number;
    
    volume: number;
    
    turnover: number;
    
    change_amount: number;
    
    change_rate: number;
    
    pe_ratio: number;
    
    pb_ratio: number;
    
    market_cap: number;
    
    circulating_market_cap: number;
    
    turnover_rate: number;
    
    bid_price1: string;
    
    bid_price2: string;
    
    bid_price3: string;
    
    bid_price4: string;
    
    bid_price5: string;
    
    bid_volume1: string;
    
    bid_volume2: string;
    
    bid_volume3: string;
    
    bid_volume4: string;
    
    bid_volume5: string;
    
    ask_price1: number;
    
    ask_price2: number;
    
    ask_price3: number;
    
    ask_price4: number;
    
    ask_price5: number;
    
    ask_volume1: number;
    
    ask_volume2: number;
    
    ask_volume3: number;
    
    ask_volume4: number;
    
    ask_volume5: number;
    
    updated_at: string;
    
}

export interface BatchUpdateStockDailyInfosRequest {
    ids: string[];
    stockDailyInfo: BatchUpdateStockDailyInfo;
}

export interface BatchPatchStockDailyInfosRequest {
    stockDailyInfos: UpdateStockDailyInfo[];
}

export interface BatchUpdateStockDailyInfosResponse {
    stockDailyInfos: StockDailyInfo[];
}

export interface BatchDeleteStockDailyInfosRequest {
    ids: string[];
}

export interface ExportStockDailyInfo extends StockDailyInfo {
}

export interface ExportStockDailyInfosRequest {
    ids: string[];
}

export interface ImportStockDailyInfosRequest {
    file: File;
}

export interface ImportStockDailyInfo extends CreateStockDailyInfo {
    errMsg: string;
}

export interface ImportStockDailyInfosResponse {
    stockDailyInfos: ImportStockDailyInfo[];
}