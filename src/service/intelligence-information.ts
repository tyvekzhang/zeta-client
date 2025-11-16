// SPDX-License-Identifier: MIT
import httpClient, { fetcher } from '@/lib/http';
import { downloadBlob } from '@/service/util';
import { PageResult } from '@/types';
import {
  BatchCreateIntelligenceInformationRequest,
  BatchDeleteIntelligenceInformationRequest,
  BatchUpdateIntelligenceInformationRequest,
  BatchUpdateIntelligenceInformationResponse,
  CreateIntelligenceInformationRequest,
  ExportIntelligenceInformationRequest,
  ImportIntelligenceInformationRequest,
  ImportIntelligenceInformationResponse,
  ListIntelligenceInformationRequest,
  IntelligenceInformation,
  IntelligenceInformationDetail,
  UpdateIntelligenceInformationRequest,
} from '@/types/intelligence-information';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';


/**
 * Retrieve intelligenceInformation details.
 *
 * @param ID of the intelligenceInformation resource.
 * @returns The intelligenceInformation object containing all its details.
 */
export function useIntelligenceInformation(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<IntelligenceInformationDetail>(
    id ? `/intelligenceInformation/${id}` : null,
    fetcher,
  );

  return {
    intelligenceInformation: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * List intelligenceInformation with pagination.
 *
 * @param req Request object containing pagination, filter and sort parameters.
 * @returns Paginated list of intelligenceInformation and total count.
 */
export function useIntelligenceInformation(req: Partial<ListIntelligenceInformationRequest>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PageResult<IntelligenceInformation>
  >(['/intelligenceInformation', req], ([url, params]) => fetcher(url, params));

  return {
    intelligenceInformation: data?.records,
    total: data?.total,
    isLoading,
    isError: error,
    isValidating,
    mutateIntelligenceInformation: mutate,
  };
}


/**
 * Create a new intelligenceInformation.
 *
 * @param req Request object containing intelligenceInformation creation data.
 * @returns The intelligenceInformation object.
 */
export function createIntelligenceInformation(req: CreateIntelligenceInformationRequest) {
  return httpClient.post<number>('/intelligenceInformation', req);
}


/**
 * Update an existing intelligenceInformation.
 *
 * @param req Request object containing intelligenceInformation update data.
 */
export function updateIntelligenceInformation(req: UpdateIntelligenceInformationRequest) {
  return httpClient.put<IntelligenceInformation>('/intelligenceInformation', req);
}


/**
 * Delete intelligenceInformation by ID
 *
 * @param id The ID of the intelligenceInformation to delete.
 */
export function deleteIntelligenceInformation(id: string) {
  return httpClient.delete<void>(`/intelligenceInformation/${id}`);
}


/**
 *  Batch create intelligenceInformation.
 *
 * @param req Request body containing a list of intelligenceInformation creation items.
 * @returns Response containing the list of created intelligenceInformation.
 */
export function batchCreateIntelligenceInformation(req: BatchCreateIntelligenceInformationRequest) {
  return httpClient.post<number[]>('/intelligenceInformation:batchCreate', req);
}


/**
 * Batch updates multiple intelligenceInformation in a single operation.
 *
 * @param req The batch update request data.
 */
export function batchUpdateIntelligenceInformation(req: BatchUpdateIntelligenceInformationRequest) {
  return httpClient.put<BatchUpdateIntelligenceInformationResponse>('/intelligenceInformation:batchUpdate', req);
}


/**
 * Batch delete intelligenceInformation.
 *
 * @param req Request object containing delete info.
 */
export function batchDeleteIntelligenceInformation(req: BatchDeleteIntelligenceInformationRequest) {
  return httpClient.delete<void>('/intelligenceInformation:batchDelete', { data: req });
}


/**
 *  Export the Excel template for intelligenceInformation import.
 *
 */
export async function exportIntelligenceInformationTemplate() {
  const response = await httpClient.get<AxiosResponse>(
    `/intelligenceInformation:exportTemplate`,
    {},
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'intelligenceInformation_import_tpl.xlsx');
}


/**
 * Export intelligenceInformation data based on the provided intelligenceInformation IDs.
 *
 * @param req Query parameters specifying the intelligenceInformation to export.
 */
export async function exportIntelligenceInformation(req: ExportIntelligenceInformationRequest) {
  const params = {
    ids: req.ids,
  };
  const response = await httpClient.get<AxiosResponse>(
    `/intelligenceInformation:export`,
    params,
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'intelligenceInformation_data_export.xlsx');
}


/**
 * Import intelligenceInformation from an uploaded Excel file.
 *
 * @param req The request with file to import.
 * @returns  List of successfully parsed intelligenceInformation data.
 */
export function importIntelligenceInformation(req: ImportIntelligenceInformationRequest) {
  const formData = new FormData();
  formData.append('file', req.file);
  return httpClient.post<ImportIntelligenceInformationResponse>('/intelligenceInformation:import', formData);
}