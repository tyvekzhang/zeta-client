// SPDX-License-Identifier: MIT
import httpClient, { fetcher } from '@/lib/http';
import { downloadBlob } from '@/service/util';
import { PageResult } from '@/types';
import {
  BatchCreateStockDailyInfosRequest,
  BatchDeleteStockDailyInfosRequest,
  BatchUpdateStockDailyInfosRequest,
  BatchUpdateStockDailyInfosResponse,
  CreateStockDailyInfoRequest,
  ExportStockDailyInfosRequest,
  ImportStockDailyInfosRequest,
  ImportStockDailyInfosResponse,
  ListStockDailyInfosRequest,
  StockDailyInfo,
  StockDailyInfoDetail,
  UpdateStockDailyInfoRequest,
} from '@/types/stock-daily-info';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';


/**
 * Retrieve stockDailyInfo details.
 *
 * @param ID of the stockDailyInfo resource.
 * @returns The stockDailyInfo object containing all its details.
 */
export function useStockDailyInfo(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<StockDailyInfoDetail>(
    id ? `/stockDailyInfos/${id}` : null,
    fetcher,
  );

  return {
    stockDailyInfo: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * List stockDailyInfos with pagination.
 *
 * @param req Request object containing pagination, filter and sort parameters.
 * @returns Paginated list of stockDailyInfos and total count.
 */
export function useStockDailyInfos(req: Partial<ListStockDailyInfosRequest>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PageResult<StockDailyInfo>
  >(['/stockDailyInfos', req], ([url, params]) => fetcher(url, params));

  return {
    stockDailyInfos: data?.records,
    total: data?.total,
    isLoading,
    isError: error,
    isValidating,
    mutateStockDailyInfos: mutate,
  };
}


/**
 * Create a new stockDailyInfo.
 *
 * @param req Request object containing stockDailyInfo creation data.
 * @returns The stockDailyInfo object.
 */
export function createStockDailyInfo(req: CreateStockDailyInfoRequest) {
  return httpClient.post<number>('/stockDailyInfos', req);
}


/**
 * Update an existing stockDailyInfo.
 *
 * @param req Request object containing stockDailyInfo update data.
 */
export function updateStockDailyInfo(req: UpdateStockDailyInfoRequest) {
  return httpClient.put<StockDailyInfo>('/stockDailyInfos', req);
}


/**
 * Delete stockDailyInfo by ID
 *
 * @param id The ID of the stockDailyInfo to delete.
 */
export function deleteStockDailyInfo(id: string) {
  return httpClient.delete<void>(`/stockDailyInfos/${id}`);
}


/**
 *  Batch create stockDailyInfos.
 *
 * @param req Request body containing a list of stockDailyInfo creation items.
 * @returns Response containing the list of created stockDailyInfos.
 */
export function batchCreateStockDailyInfos(req: BatchCreateStockDailyInfosRequest) {
  return httpClient.post<number[]>('/stockDailyInfos:batchCreate', req);
}


/**
 * Batch updates multiple stockDailyInfos in a single operation.
 *
 * @param req The batch update request data.
 */
export function batchUpdateStockDailyInfos(req: BatchUpdateStockDailyInfosRequest) {
  return httpClient.put<BatchUpdateStockDailyInfosResponse>('/stockDailyInfo:batchUpdate', req);
}


/**
 * Batch delete stockDailyInfos.
 *
 * @param req Request object containing delete info.
 */
export function batchDeleteStockDailyInfo(req: BatchDeleteStockDailyInfosRequest) {
  return httpClient.delete<void>('/stockDailyInfos:batchDelete', { data: req });
}


/**
 *  Export the Excel template for stockDailyInfo import.
 *
 */
export async function exportStockDailyInfoTemplate() {
  const response = await httpClient.get<AxiosResponse>(
    `/stockDailyInfos:exportTemplate`,
    {},
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'stockDailyInfo_import_tpl.xlsx');
}


/**
 * Export stockDailyInfo data based on the provided stockDailyInfo IDs.
 *
 * @param req Query parameters specifying the stockDailyInfos to export.
 */
export async function exportStockDailyInfo(req: ExportStockDailyInfosRequest) {
  const params = {
    ids: req.ids,
  };
  const response = await httpClient.get<AxiosResponse>(
    `/stockDailyInfos:export`,
    params,
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'stockDailyInfo_data_export.xlsx');
}


/**
 * Import stockDailyInfos from an uploaded Excel file.
 *
 * @param req The request with file to import.
 * @returns  List of successfully parsed stockDailyInfo data.
 */
export function importStockDailyInfo(req: ImportStockDailyInfosRequest) {
  const formData = new FormData();
  formData.append('file', req.file);
  return httpClient.post<ImportStockDailyInfosResponse>('/stockDailyInfos:import', formData);
}