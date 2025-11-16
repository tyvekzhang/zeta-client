// SPDX-License-Identifier: MIT
import {PaginationRequest} from '.';

export interface ListStockDailyRecommendationsRequest extends PaginationRequest {
    
    id: string;
    
    stock_symbol_full: string;
    
    recommend_date: string;
    
    recommend_level: number;
    
    price: number;
    
    target_price: number;
    
    recommend_reason: string;
    
    analyst: string;
    
    institution: string;
    
    risk_level: string;
    
    validity_period: string;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface StockDailyRecommendation {
    
    id: string;
    
    stock_symbol_full: string;
    
    recommend_date: string;
    
    recommend_level: number;
    
    price: number;
    
    target_price: number;
    
    recommend_reason: string;
    
    analyst: string;
    
    institution: string;
    
    risk_level: string;
    
    validity_period: string;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface StockDailyRecommendationDetail extends StockDailyRecommendation {

}

export interface CreateStockDailyRecommendation {
    
    stock_symbol_full: string;
    
    recommend_date: string;
    
    recommend_level: number;
    
    price: number;
    
    target_price: number;
    
    recommend_reason: string;
    
    analyst: string;
    
    institution: string;
    
    risk_level: string;
    
    validity_period: string;
    
    updated_at: string;
    
}

export interface CreateStockDailyRecommendationRequest {
stockDailyRecommendation: CreateStockDailyRecommendation;
}

export interface UpdateStockDailyRecommendation {
    
    id: string;
    
    stock_symbol_full: string;
    
    recommend_date: string;
    
    recommend_level: number;
    
    price: number;
    
    target_price: number;
    
    recommend_reason: string;
    
    analyst: string;
    
    institution: string;
    
    risk_level: string;
    
    validity_period: string;
    
    updated_at: string;
    
}

export interface UpdateStockDailyRecommendationRequest {
stockDailyRecommendation: UpdateStockDailyRecommendation;
}

export interface BatchGetStockDailyRecommendationsResponse {
    stockDailyRecommendations: StockDailyRecommendationDetail[];
}

export interface BatchCreateStockDailyRecommendationsRequest {
    stockDailyRecommendations: CreateStockDailyRecommendation[];
}

export interface BatchCreateStockDailyRecommendationResponse {
    stockDailyRecommendations: StockDailyRecommendation[];
}

export interface BatchUpdateStockDailyRecommendation {
    
    stock_symbol_full: string;
    
    recommend_date: string;
    
    recommend_level: number;
    
    price: number;
    
    target_price: number;
    
    recommend_reason: string;
    
    analyst: string;
    
    institution: string;
    
    risk_level: string;
    
    validity_period: string;
    
    updated_at: string;
    
}

export interface BatchUpdateStockDailyRecommendationsRequest {
    ids: string[];
    stockDailyRecommendation: BatchUpdateStockDailyRecommendation;
}

export interface BatchPatchStockDailyRecommendationsRequest {
    stockDailyRecommendations: UpdateStockDailyRecommendation[];
}

export interface BatchUpdateStockDailyRecommendationsResponse {
    stockDailyRecommendations: StockDailyRecommendation[];
}

export interface BatchDeleteStockDailyRecommendationsRequest {
    ids: string[];
}

export interface ExportStockDailyRecommendation extends StockDailyRecommendation {
}

export interface ExportStockDailyRecommendationsRequest {
    ids: string[];
}

export interface ImportStockDailyRecommendationsRequest {
    file: File;
}

export interface ImportStockDailyRecommendation extends CreateStockDailyRecommendation {
    errMsg: string;
}

export interface ImportStockDailyRecommendationsResponse {
    stockDailyRecommendations: ImportStockDailyRecommendation[];
}