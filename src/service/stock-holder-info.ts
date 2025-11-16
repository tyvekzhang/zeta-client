// SPDX-License-Identifier: MIT
import httpClient, { fetcher } from '@/lib/http';
import { downloadBlob } from '@/service/util';
import { PageResult } from '@/types';
import {
  BatchCreateStockHolderInfosRequest,
  BatchDeleteStockHolderInfosRequest,
  BatchUpdateStockHolderInfosRequest,
  BatchUpdateStockHolderInfosResponse,
  CreateStockHolderInfoRequest,
  ExportStockHolderInfosRequest,
  ImportStockHolderInfosRequest,
  ImportStockHolderInfosResponse,
  ListStockHolderInfosRequest,
  StockHolderInfo,
  StockHolderInfoDetail,
  UpdateStockHolderInfoRequest,
} from '@/types/stock-holder-info';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';


/**
 * Retrieve stockHolderInfo details.
 *
 * @param ID of the stockHolderInfo resource.
 * @returns The stockHolderInfo object containing all its details.
 */
export function useStockHolderInfo(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<StockHolderInfoDetail>(
    id ? `/stockHolderInfos/${id}` : null,
    fetcher,
  );

  return {
    stockHolderInfo: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * List stockHolderInfos with pagination.
 *
 * @param req Request object containing pagination, filter and sort parameters.
 * @returns Paginated list of stockHolderInfos and total count.
 */
export function useStockHolderInfos(req: Partial<ListStockHolderInfosRequest>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PageResult<StockHolderInfo>
  >(['/stockHolderInfos', req], ([url, params]) => fetcher(url, params));

  return {
    stockHolderInfos: data?.records,
    total: data?.total,
    isLoading,
    isError: error,
    isValidating,
    mutateStockHolderInfos: mutate,
  };
}


/**
 * Create a new stockHolderInfo.
 *
 * @param req Request object containing stockHolderInfo creation data.
 * @returns The stockHolderInfo object.
 */
export function createStockHolderInfo(req: CreateStockHolderInfoRequest) {
  return httpClient.post<number>('/stockHolderInfos', req);
}


/**
 * Update an existing stockHolderInfo.
 *
 * @param req Request object containing stockHolderInfo update data.
 */
export function updateStockHolderInfo(req: UpdateStockHolderInfoRequest) {
  return httpClient.put<StockHolderInfo>('/stockHolderInfos', req);
}


/**
 * Delete stockHolderInfo by ID
 *
 * @param id The ID of the stockHolderInfo to delete.
 */
export function deleteStockHolderInfo(id: string) {
  return httpClient.delete<void>(`/stockHolderInfos/${id}`);
}


/**
 *  Batch create stockHolderInfos.
 *
 * @param req Request body containing a list of stockHolderInfo creation items.
 * @returns Response containing the list of created stockHolderInfos.
 */
export function batchCreateStockHolderInfos(req: BatchCreateStockHolderInfosRequest) {
  return httpClient.post<number[]>('/stockHolderInfos:batchCreate', req);
}


/**
 * Batch updates multiple stockHolderInfos in a single operation.
 *
 * @param req The batch update request data.
 */
export function batchUpdateStockHolderInfos(req: BatchUpdateStockHolderInfosRequest) {
  return httpClient.put<BatchUpdateStockHolderInfosResponse>('/stockHolderInfo:batchUpdate', req);
}


/**
 * Batch delete stockHolderInfos.
 *
 * @param req Request object containing delete info.
 */
export function batchDeleteStockHolderInfo(req: BatchDeleteStockHolderInfosRequest) {
  return httpClient.delete<void>('/stockHolderInfos:batchDelete', { data: req });
}


/**
 *  Export the Excel template for stockHolderInfo import.
 *
 */
export async function exportStockHolderInfoTemplate() {
  const response = await httpClient.get<AxiosResponse>(
    `/stockHolderInfos:exportTemplate`,
    {},
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'stockHolderInfo_import_tpl.xlsx');
}


/**
 * Export stockHolderInfo data based on the provided stockHolderInfo IDs.
 *
 * @param req Query parameters specifying the stockHolderInfos to export.
 */
export async function exportStockHolderInfo(req: ExportStockHolderInfosRequest) {
  const params = {
    ids: req.ids,
  };
  const response = await httpClient.get<AxiosResponse>(
    `/stockHolderInfos:export`,
    params,
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'stockHolderInfo_data_export.xlsx');
}


/**
 * Import stockHolderInfos from an uploaded Excel file.
 *
 * @param req The request with file to import.
 * @returns  List of successfully parsed stockHolderInfo data.
 */
export function importStockHolderInfo(req: ImportStockHolderInfosRequest) {
  const formData = new FormData();
  formData.append('file', req.file);
  return httpClient.post<ImportStockHolderInfosResponse>('/stockHolderInfos:import', formData);
}