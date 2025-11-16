// SPDX-License-Identifier: MIT
import {PaginationRequest} from '.';

export interface ListStockFinancialReportsRequest extends PaginationRequest {
    
    id: string;
    
    stock_symbol_full: string;
    
    report_date: string;
    
    report_type: number;
    
    total_revenue: number;
    
    net_profit: number;
    
    total_assets: number;
    
    total_liabilities: number;
    
    net_assets: number;
    
    eps: number;
    
    roe: number;
    
    gross_profit_margin: number;
    
    report_source: string;
    
    earnings_announcement_date: string;
    
    published_date: string;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface StockFinancialReport {
    
    id: string;
    
    file_id: string;
    
    stock_symbol_full: string;
    
    report_date: string;
    
    report_type: number;
    
    total_revenue: number;
    
    net_profit: number;
    
    total_assets: number;
    
    total_liabilities: number;
    
    net_assets: number;
    
    eps: number;
    
    roe: number;
    
    gross_profit_margin: number;
    
    report_source: string;
    
    earnings_announcement_date: string;
    
    published_date: string;
    
    comment: string;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface StockFinancialReportDetail extends StockFinancialReport {

}

export interface CreateStockFinancialReport {
    
    file_id: string;
    
    stock_symbol_full: string;
    
    report_date: string;
    
    report_type: number;
    
    total_revenue: number;
    
    net_profit: number;
    
    total_assets: number;
    
    total_liabilities: number;
    
    net_assets: number;
    
    eps: number;
    
    roe: number;
    
    gross_profit_margin: number;
    
    report_source: string;
    
    earnings_announcement_date: string;
    
    published_date: string;
    
    comment: string;
    
    updated_at: string;
    
}

export interface CreateStockFinancialReportRequest {
stockFinancialReport: CreateStockFinancialReport;
}

export interface UpdateStockFinancialReport {
    
    id: string;
    
    file_id: string;
    
    stock_symbol_full: string;
    
    report_date: string;
    
    report_type: number;
    
    total_revenue: number;
    
    net_profit: number;
    
    total_assets: number;
    
    total_liabilities: number;
    
    net_assets: number;
    
    eps: number;
    
    roe: number;
    
    gross_profit_margin: number;
    
    report_source: string;
    
    earnings_announcement_date: string;
    
    published_date: string;
    
    comment: string;
    
    updated_at: string;
    
}

export interface UpdateStockFinancialReportRequest {
stockFinancialReport: UpdateStockFinancialReport;
}

export interface BatchGetStockFinancialReportsResponse {
    stockFinancialReports: StockFinancialReportDetail[];
}

export interface BatchCreateStockFinancialReportsRequest {
    stockFinancialReports: CreateStockFinancialReport[];
}

export interface BatchCreateStockFinancialReportResponse {
    stockFinancialReports: StockFinancialReport[];
}

export interface BatchUpdateStockFinancialReport {
    
    file_id: string;
    
    stock_symbol_full: string;
    
    report_date: string;
    
    report_type: number;
    
    total_revenue: number;
    
    net_profit: number;
    
    total_assets: number;
    
    total_liabilities: number;
    
    net_assets: number;
    
    eps: number;
    
    roe: number;
    
    gross_profit_margin: number;
    
    report_source: string;
    
    earnings_announcement_date: string;
    
    published_date: string;
    
    comment: string;
    
    updated_at: string;
    
}

export interface BatchUpdateStockFinancialReportsRequest {
    ids: string[];
    stockFinancialReport: BatchUpdateStockFinancialReport;
}

export interface BatchPatchStockFinancialReportsRequest {
    stockFinancialReports: UpdateStockFinancialReport[];
}

export interface BatchUpdateStockFinancialReportsResponse {
    stockFinancialReports: StockFinancialReport[];
}

export interface BatchDeleteStockFinancialReportsRequest {
    ids: string[];
}

export interface ExportStockFinancialReport extends StockFinancialReport {
}

export interface ExportStockFinancialReportsRequest {
    ids: string[];
}

export interface ImportStockFinancialReportsRequest {
    file: File;
}

export interface ImportStockFinancialReport extends CreateStockFinancialReport {
    errMsg: string;
}

export interface ImportStockFinancialReportsResponse {
    stockFinancialReports: ImportStockFinancialReport[];
}