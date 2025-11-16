// SPDX-License-Identifier: MIT
import httpClient, { fetcher } from '@/lib/http';
import { downloadBlob } from '@/service/util';
import { PageResult } from '@/types';
import {
  BatchCreateStockBasicInfosRequest,
  BatchDeleteStockBasicInfosRequest,
  BatchUpdateStockBasicInfosRequest,
  BatchUpdateStockBasicInfosResponse,
  CreateStockBasicInfoRequest,
  ExportStockBasicInfosRequest,
  ImportStockBasicInfosRequest,
  ImportStockBasicInfosResponse,
  ListStockBasicInfosRequest,
  StockBasicInfo,
  StockBasicInfoDetail,
  UpdateStockBasicInfoRequest,
} from '@/types/stock-basic-info';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';


/**
 * Retrieve stockBasicInfo details.
 *
 * @param ID of the stockBasicInfo resource.
 * @returns The stockBasicInfo object containing all its details.
 */
export function useStockBasicInfo(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<StockBasicInfoDetail>(
    id ? `/stockBasicInfos/${id}` : null,
    fetcher,
  );

  return {
    stockBasicInfo: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * List stockBasicInfos with pagination.
 *
 * @param req Request object containing pagination, filter and sort parameters.
 * @returns Paginated list of stockBasicInfos and total count.
 */
export function useStockBasicInfos(req: Partial<ListStockBasicInfosRequest>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PageResult<StockBasicInfo>
  >(['/stockBasicInfos', req], ([url, params]) => fetcher(url, params));

  return {
    stockBasicInfos: data?.records,
    total: data?.total,
    isLoading,
    isError: error,
    isValidating,
    mutateStockBasicInfos: mutate,
  };
}


/**
 * Create a new stockBasicInfo.
 *
 * @param req Request object containing stockBasicInfo creation data.
 * @returns The stockBasicInfo object.
 */
export function createStockBasicInfo(req: CreateStockBasicInfoRequest) {
  return httpClient.post<number>('/stockBasicInfos', req);
}


/**
 * Update an existing stockBasicInfo.
 *
 * @param req Request object containing stockBasicInfo update data.
 */
export function updateStockBasicInfo(req: UpdateStockBasicInfoRequest) {
  return httpClient.put<StockBasicInfo>('/stockBasicInfos', req);
}


/**
 * Delete stockBasicInfo by ID
 *
 * @param id The ID of the stockBasicInfo to delete.
 */
export function deleteStockBasicInfo(id: string) {
  return httpClient.delete<void>(`/stockBasicInfos/${id}`);
}


/**
 *  Batch create stockBasicInfos.
 *
 * @param req Request body containing a list of stockBasicInfo creation items.
 * @returns Response containing the list of created stockBasicInfos.
 */
export function batchCreateStockBasicInfos(req: BatchCreateStockBasicInfosRequest) {
  return httpClient.post<number[]>('/stockBasicInfos:batchCreate', req);
}


/**
 * Batch updates multiple stockBasicInfos in a single operation.
 *
 * @param req The batch update request data.
 */
export function batchUpdateStockBasicInfos(req: BatchUpdateStockBasicInfosRequest) {
  return httpClient.put<BatchUpdateStockBasicInfosResponse>('/stockBasicInfo:batchUpdate', req);
}


/**
 * Batch delete stockBasicInfos.
 *
 * @param req Request object containing delete info.
 */
export function batchDeleteStockBasicInfo(req: BatchDeleteStockBasicInfosRequest) {
  return httpClient.delete<void>('/stockBasicInfos:batchDelete', { data: req });
}


/**
 *  Export the Excel template for stockBasicInfo import.
 *
 */
export async function exportStockBasicInfoTemplate() {
  const response = await httpClient.get<AxiosResponse>(
    `/stockBasicInfos:exportTemplate`,
    {},
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'stockBasicInfo_import_tpl.xlsx');
}


/**
 * Export stockBasicInfo data based on the provided stockBasicInfo IDs.
 *
 * @param req Query parameters specifying the stockBasicInfos to export.
 */
export async function exportStockBasicInfo(req: ExportStockBasicInfosRequest) {
  const params = {
    ids: req.ids,
  };
  const response = await httpClient.get<AxiosResponse>(
    `/stockBasicInfos:export`,
    params,
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'stockBasicInfo_data_export.xlsx');
}


/**
 * Import stockBasicInfos from an uploaded Excel file.
 *
 * @param req The request with file to import.
 * @returns  List of successfully parsed stockBasicInfo data.
 */
export function importStockBasicInfo(req: ImportStockBasicInfosRequest) {
  const formData = new FormData();
  formData.append('file', req.file);
  return httpClient.post<ImportStockBasicInfosResponse>('/stockBasicInfos:import', formData);
}