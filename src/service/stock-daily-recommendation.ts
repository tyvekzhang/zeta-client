// SPDX-License-Identifier: MIT
import httpClient, { fetcher } from '@/lib/http';
import { downloadBlob } from '@/service/util';
import { PageResult } from '@/types';
import {
  BatchCreateStockDailyRecommendationsRequest,
  BatchDeleteStockDailyRecommendationsRequest,
  BatchUpdateStockDailyRecommendationsRequest,
  BatchUpdateStockDailyRecommendationsResponse,
  CreateStockDailyRecommendationRequest,
  ExportStockDailyRecommendationsRequest,
  ImportStockDailyRecommendationsRequest,
  ImportStockDailyRecommendationsResponse,
  ListStockDailyRecommendationsRequest,
  StockDailyRecommendation,
  StockDailyRecommendationDetail,
  UpdateStockDailyRecommendationRequest,
} from '@/types/stock-daily-recommendation';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';


/**
 * Retrieve stockDailyRecommendation details.
 *
 * @param ID of the stockDailyRecommendation resource.
 * @returns The stockDailyRecommendation object containing all its details.
 */
export function useStockDailyRecommendation(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<StockDailyRecommendationDetail>(
    id ? `/stockDailyRecommendations/${id}` : null,
    fetcher,
  );

  return {
    stockDailyRecommendation: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * List stockDailyRecommendations with pagination.
 *
 * @param req Request object containing pagination, filter and sort parameters.
 * @returns Paginated list of stockDailyRecommendations and total count.
 */
export function useStockDailyRecommendations(req: Partial<ListStockDailyRecommendationsRequest>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PageResult<StockDailyRecommendation>
  >(['/stockDailyRecommendations', req], ([url, params]) => fetcher(url, params));

  return {
    stockDailyRecommendations: data?.records,
    total: data?.total,
    isLoading,
    isError: error,
    isValidating,
    mutateStockDailyRecommendations: mutate,
  };
}


/**
 * Create a new stockDailyRecommendation.
 *
 * @param req Request object containing stockDailyRecommendation creation data.
 * @returns The stockDailyRecommendation object.
 */
export function createStockDailyRecommendation(req: CreateStockDailyRecommendationRequest) {
  return httpClient.post<number>('/stockDailyRecommendations', req);
}


/**
 * Update an existing stockDailyRecommendation.
 *
 * @param req Request object containing stockDailyRecommendation update data.
 */
export function updateStockDailyRecommendation(req: UpdateStockDailyRecommendationRequest) {
  return httpClient.put<StockDailyRecommendation>('/stockDailyRecommendations', req);
}


/**
 * Delete stockDailyRecommendation by ID
 *
 * @param id The ID of the stockDailyRecommendation to delete.
 */
export function deleteStockDailyRecommendation(id: string) {
  return httpClient.delete<void>(`/stockDailyRecommendations/${id}`);
}


/**
 *  Batch create stockDailyRecommendations.
 *
 * @param req Request body containing a list of stockDailyRecommendation creation items.
 * @returns Response containing the list of created stockDailyRecommendations.
 */
export function batchCreateStockDailyRecommendations(req: BatchCreateStockDailyRecommendationsRequest) {
  return httpClient.post<number[]>('/stockDailyRecommendations:batchCreate', req);
}


/**
 * Batch updates multiple stockDailyRecommendations in a single operation.
 *
 * @param req The batch update request data.
 */
export function batchUpdateStockDailyRecommendations(req: BatchUpdateStockDailyRecommendationsRequest) {
  return httpClient.put<BatchUpdateStockDailyRecommendationsResponse>('/stockDailyRecommendation:batchUpdate', req);
}


/**
 * Batch delete stockDailyRecommendations.
 *
 * @param req Request object containing delete info.
 */
export function batchDeleteStockDailyRecommendation(req: BatchDeleteStockDailyRecommendationsRequest) {
  return httpClient.delete<void>('/stockDailyRecommendations:batchDelete', { data: req });
}


/**
 *  Export the Excel template for stockDailyRecommendation import.
 *
 */
export async function exportStockDailyRecommendationTemplate() {
  const response = await httpClient.get<AxiosResponse>(
    `/stockDailyRecommendations:exportTemplate`,
    {},
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'stockDailyRecommendation_import_tpl.xlsx');
}


/**
 * Export stockDailyRecommendation data based on the provided stockDailyRecommendation IDs.
 *
 * @param req Query parameters specifying the stockDailyRecommendations to export.
 */
export async function exportStockDailyRecommendation(req: ExportStockDailyRecommendationsRequest) {
  const params = {
    ids: req.ids,
  };
  const response = await httpClient.get<AxiosResponse>(
    `/stockDailyRecommendations:export`,
    params,
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'stockDailyRecommendation_data_export.xlsx');
}


/**
 * Import stockDailyRecommendations from an uploaded Excel file.
 *
 * @param req The request with file to import.
 * @returns  List of successfully parsed stockDailyRecommendation data.
 */
export function importStockDailyRecommendation(req: ImportStockDailyRecommendationsRequest) {
  const formData = new FormData();
  formData.append('file', req.file);
  return httpClient.post<ImportStockDailyRecommendationsResponse>('/stockDailyRecommendations:import', formData);
}