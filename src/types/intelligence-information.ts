// SPDX-License-Identifier: MIT
import {PaginationRequest} from '.';

export interface ListIntelligenceInformationRequest extends PaginationRequest {
    
    id: string;
    
    stock_symbol_full: string;
    
    news_title: string;
    
    news_content: string;
    
    news_source: string;
    
    publish_time: string;
    
    news_url: string;
    
    impact_direction: number;
    
    impact_level: number;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface IntelligenceInformation {
    
    id: string;
    
    stock_symbol_full: string;
    
    news_title: string;
    
    news_content: string;
    
    news_source: string;
    
    publish_time: string;
    
    news_url: string;
    
    impact_direction: number;
    
    impact_level: number;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface IntelligenceInformationDetail extends IntelligenceInformation {

}

export interface CreateIntelligenceInformation {
    
    stock_symbol_full: string;
    
    news_title: string;
    
    news_content: string;
    
    news_source: string;
    
    publish_time: string;
    
    news_url: string;
    
    impact_direction: number;
    
    impact_level: number;
    
    updated_at: string;
    
}

export interface CreateIntelligenceInformationRequest {
intelligenceInformation: CreateIntelligenceInformation;
}

export interface UpdateIntelligenceInformation {
    
    id: string;
    
    stock_symbol_full: string;
    
    news_title: string;
    
    news_content: string;
    
    news_source: string;
    
    publish_time: string;
    
    news_url: string;
    
    impact_direction: number;
    
    impact_level: number;
    
    updated_at: string;
    
}

export interface UpdateIntelligenceInformationRequest {
intelligenceInformation: UpdateIntelligenceInformation;
}

export interface BatchGetIntelligenceInformationResponse {
    intelligenceInformation: IntelligenceInformationDetail[];
}

export interface BatchCreateIntelligenceInformationRequest {
    intelligenceInformation: CreateIntelligenceInformation[];
}

export interface BatchCreateIntelligenceInformationResponse {
    intelligenceInformation: IntelligenceInformation[];
}

export interface BatchUpdateIntelligenceInformation {
    
    stock_symbol_full: string;
    
    news_title: string;
    
    news_content: string;
    
    news_source: string;
    
    publish_time: string;
    
    news_url: string;
    
    impact_direction: number;
    
    impact_level: number;
    
    updated_at: string;
    
}

export interface BatchUpdateIntelligenceInformationRequest {
    ids: string[];
    intelligenceInformation: BatchUpdateIntelligenceInformation;
}

export interface BatchPatchIntelligenceInformationRequest {
    intelligenceInformation: UpdateIntelligenceInformation[];
}

export interface BatchUpdateIntelligenceInformationResponse {
    intelligenceInformation: IntelligenceInformation[];
}

export interface BatchDeleteIntelligenceInformationRequest {
    ids: string[];
}

export interface ExportIntelligenceInformation extends IntelligenceInformation {
}

export interface ExportIntelligenceInformationRequest {
    ids: string[];
}

export interface ImportIntelligenceInformationRequest {
    file: File;
}

export interface ImportIntelligenceInformation extends CreateIntelligenceInformation {
    errMsg: string;
}

export interface ImportIntelligenceInformationResponse {
    intelligenceInformation: ImportIntelligenceInformation[];
}