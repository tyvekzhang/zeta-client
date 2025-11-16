// SPDX-License-Identifier: MIT
import httpClient, { fetcher } from '@/lib/http';
import { downloadBlob } from '@/service/util';
import { PageResult } from '@/types';
import {
  BatchCreateStockFinancialReportsRequest,
  BatchDeleteStockFinancialReportsRequest,
  BatchUpdateStockFinancialReportsRequest,
  BatchUpdateStockFinancialReportsResponse,
  CreateStockFinancialReportRequest,
  ExportStockFinancialReportsRequest,
  ImportStockFinancialReportsRequest,
  ImportStockFinancialReportsResponse,
  ListStockFinancialReportsRequest,
  StockFinancialReport,
  StockFinancialReportDetail,
  UpdateStockFinancialReportRequest,
} from '@/types/stock-financial-report';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';


/**
 * Retrieve stockFinancialReport details.
 *
 * @param ID of the stockFinancialReport resource.
 * @returns The stockFinancialReport object containing all its details.
 */
export function useStockFinancialReport(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<StockFinancialReportDetail>(
    id ? `/stockFinancialReports/${id}` : null,
    fetcher,
  );

  return {
    stockFinancialReport: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * List stockFinancialReports with pagination.
 *
 * @param req Request object containing pagination, filter and sort parameters.
 * @returns Paginated list of stockFinancialReports and total count.
 */
export function useStockFinancialReports(req: Partial<ListStockFinancialReportsRequest>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PageResult<StockFinancialReport>
  >(['/stockFinancialReports', req], ([url, params]) => fetcher(url, params));

  return {
    stockFinancialReports: data?.records,
    total: data?.total,
    isLoading,
    isError: error,
    isValidating,
    mutateStockFinancialReports: mutate,
  };
}


/**
 * Create a new stockFinancialReport.
 *
 * @param req Request object containing stockFinancialReport creation data.
 * @returns The stockFinancialReport object.
 */
export function createStockFinancialReport(req: CreateStockFinancialReportRequest) {
  return httpClient.post<number>('/stockFinancialReports', req);
}


/**
 * Update an existing stockFinancialReport.
 *
 * @param req Request object containing stockFinancialReport update data.
 */
export function updateStockFinancialReport(req: UpdateStockFinancialReportRequest) {
  return httpClient.put<StockFinancialReport>('/stockFinancialReports', req);
}


/**
 * Delete stockFinancialReport by ID
 *
 * @param id The ID of the stockFinancialReport to delete.
 */
export function deleteStockFinancialReport(id: string) {
  return httpClient.delete<void>(`/stockFinancialReports/${id}`);
}


/**
 *  Batch create stockFinancialReports.
 *
 * @param req Request body containing a list of stockFinancialReport creation items.
 * @returns Response containing the list of created stockFinancialReports.
 */
export function batchCreateStockFinancialReports(req: BatchCreateStockFinancialReportsRequest) {
  return httpClient.post<number[]>('/stockFinancialReports:batchCreate', req);
}


/**
 * Batch updates multiple stockFinancialReports in a single operation.
 *
 * @param req The batch update request data.
 */
export function batchUpdateStockFinancialReports(req: BatchUpdateStockFinancialReportsRequest) {
  return httpClient.put<BatchUpdateStockFinancialReportsResponse>('/stockFinancialReport:batchUpdate', req);
}


/**
 * Batch delete stockFinancialReports.
 *
 * @param req Request object containing delete info.
 */
export function batchDeleteStockFinancialReport(req: BatchDeleteStockFinancialReportsRequest) {
  return httpClient.delete<void>('/stockFinancialReports:batchDelete', { data: req });
}


/**
 *  Export the Excel template for stockFinancialReport import.
 *
 */
export async function exportStockFinancialReportTemplate() {
  const response = await httpClient.get<AxiosResponse>(
    `/stockFinancialReports:exportTemplate`,
    {},
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'stockFinancialReport_import_tpl.xlsx');
}


/**
 * Export stockFinancialReport data based on the provided stockFinancialReport IDs.
 *
 * @param req Query parameters specifying the stockFinancialReports to export.
 */
export async function exportStockFinancialReport(req: ExportStockFinancialReportsRequest) {
  const params = {
    ids: req.ids,
  };
  const response = await httpClient.get<AxiosResponse>(
    `/stockFinancialReports:export`,
    params,
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'stockFinancialReport_data_export.xlsx');
}


/**
 * Import stockFinancialReports from an uploaded Excel file.
 *
 * @param req The request with file to import.
 * @returns  List of successfully parsed stockFinancialReport data.
 */
export function importStockFinancialReport(req: ImportStockFinancialReportsRequest) {
  const formData = new FormData();
  formData.append('file', req.file);
  return httpClient.post<ImportStockFinancialReportsResponse>('/stockFinancialReports:import', formData);
}