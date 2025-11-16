// SPDX-License-Identifier: MIT
'use client';

import ActionButtonComponent from '@/components/base/action-button';
import { PaginatedTable } from '@/components/base/paginated-table';
import TransitionWrapper from '@/components/base/transition-wrapper';
import {
  batchCreateStockFinancialReports,
  batchDeleteStockFinancialReport,
  batchUpdateStockFinancialReports,
  createStockFinancialReport,
  deleteStockFinancialReport,
  exportStockFinancialReport,
  importStockFinancialReport,
  updateStockFinancialReport,
  useStockFinancialReport,
  useStockFinancialReports,
} from '@/service/stock-financial-report';
import { createPaginationRequest } from '@/types';
import {
  BatchUpdateStockFinancialReport,
  CreateStockFinancialReport,
  ListStockFinancialReportsRequest,
  StockFinancialReport,
  UpdateStockFinancialReport,
} from '@/types/stock-financial-report';
import { Form, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Eye, MoreHorizontal, PenLine, Trash2 } from 'lucide-react';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';
import BatchUpdateStockFinancialReportComponent from './components/batch-update-stock-financial-report';
import CreateStockFinancialReportComponent from './components/create-stock-financial-report';
import ImportStockFinancialReportComponent from './components/import-stock-financial-report';
import StockFinancialReportDetailComponent from './components/stock-financial-report-detail';
import QueryStockFinancialReportComponent from './components/query-stock-financial-report';
import UpdateStockFinancialReportComponent from './components/update-stock-financial-report';

const StockFinancialReportPage: React.FC = () => {
  // 配置模块
  const actionConfig = {
    showCreate: true,
    showImport: true,
    showExport: true,
    showModify: true,
    showRemove: true,
  };
  const showMore = false;
  

  // 查询模块
  const [isQueryStockFinancialReportShow, setIsQueryStockFinancialReportShow] = useState<boolean>(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [queryStockFinancialReportForm] = Form.useForm();
  const [stockFinancialReportQueryParams, setStockFinancialReportQueryParams] = useState<ListStockFinancialReportsRequest>();

  // 用 useStockFinancialReports 获取菜单列表数据
  const {
    stockFinancialReports: stockFinancialReportListDataSource,
    total,
    isLoading: isStockFinancialReportListLoading,
    mutateStockFinancialReports,
  } = useStockFinancialReports({
    ...stockFinancialReportQueryParams,
    ...createPaginationRequest(current, pageSize),
  });

  const onQueryStockFinancialReportShow = () => {
    setIsQueryStockFinancialReportShow((prevState) => !prevState);
  };

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setCurrent(newPage);
    setPageSize(newPageSize);
  };

  const resetPagination = () => {
    setCurrent(1);
    setPageSize(10);
  };

  const handleQueryStockFinancialReportReset = () => {
    resetPagination();
    queryStockFinancialReportForm.resetFields();
    setStockFinancialReportQueryParams(undefined)
    mutateStockFinancialReports();
  };

  const onQueryStockFinancialReportFinish = async () => {
    const values = queryStockFinancialReportForm.getFieldsValue();
    const { create_time } = values;
    if (create_time) {
      const [startDate, endDate] = create_time;
      values.create_time = [
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD'),
      ];
    }
    const queryStockFinancialReport = values as ListStockFinancialReportsRequest;
    const filteredQueryStockFinancialReport = Object.fromEntries(
      Object.entries(queryStockFinancialReport).filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      ),
    );
    resetPagination();
    setStockFinancialReportQueryParams(filteredQueryStockFinancialReport as ListStockFinancialReportsRequest);
  };

  // 详情模块
  const [isStockFinancialReportDetailDrawerVisible, setIsStockFinancialReportDetailDrawerVisible] =
    useState(false);
  const [selectedStockFinancialReportId, setSelectedStockFinancialReportId] = useState<string | null>(null);

  const { stockFinancialReport: stockFinancialReportDetail, isLoading: isStockFinancialReportDetailLoading } = useStockFinancialReport(
    selectedStockFinancialReportId || '',
  );

  const onStockFinancialReportDetail = (stockFinancialReport: StockFinancialReport) => {
    setSelectedStockFinancialReportId(stockFinancialReport.id);
    setIsStockFinancialReportDetailDrawerVisible(true);
  };

  const onStockFinancialReportDetailClose = () => {
    setSelectedStockFinancialReportId(null);
    setIsStockFinancialReportDetailDrawerVisible(false);
  };

  // 表格列信息
  const stockFinancialReportColumns: ColumnsType<StockFinancialReport> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      hidden: true,
    },
    {
      title: "序号",
      dataIndex: "No",
      key: "No",
      render: (_: number, _record: StockFinancialReport, rowIndex: number) => rowIndex + 1,
      width: "8%",
    },
    {
      title: "文件主键",
      dataIndex: "file_id",
      key: "file_id",
      width: "6%",
    },
    {
      title: "股票代码",
      dataIndex: "stock_symbol_full",
      key: "stock_symbol_full",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "报告期",
      dataIndex: "report_date",
      key: "report_date",
      render: (text: string) => (
        text ? <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>: "-"
      ),
      width: "14%",
      ellipsis: true,
    },
    {
      title: "报告类型",
      dataIndex: "report_type",
      key: "report_type",
      width: "6%",
    },
    {
      title: "营业收入",
      dataIndex: "total_revenue",
      key: "total_revenue",
      width: "6%",
    },
    {
      title: "净利润",
      dataIndex: "net_profit",
      key: "net_profit",
      width: "6%",
    },
    {
      title: "总资产",
      dataIndex: "total_assets",
      key: "total_assets",
      width: "6%",
    },
    {
      title: "总负债",
      dataIndex: "total_liabilities",
      key: "total_liabilities",
      width: "6%",
    },
    {
      title: "净资产",
      dataIndex: "net_assets",
      key: "net_assets",
      width: "6%",
    },
    {
      title: "每股收益",
      dataIndex: "eps",
      key: "eps",
      width: "6%",
    },
    {
      title: "净资产收益率",
      dataIndex: "roe",
      key: "roe",
      width: "6%",
    },
    {
      title: "毛利率",
      dataIndex: "gross_profit_margin",
      key: "gross_profit_margin",
      width: "6%",
    },
    {
      title: "报告来源",
      dataIndex: "report_source",
      key: "report_source",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "预约披露日期",
      dataIndex: "earnings_announcement_date",
      key: "earnings_announcement_date",
      render: (text: string) => (
        text ? <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>: "-"
      ),
      width: "14%",
      ellipsis: true,
    },
    {
      title: "发布日期",
      dataIndex: "published_date",
      key: "published_date",
      render: (text: string) => (
        text ? <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>: "-"
      ),
      width: "14%",
      ellipsis: true,
    },
    {
      title: "备注",
      dataIndex: "comment",
      key: "comment",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text: string) => (
        text ? <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>: "-"
      ),
      width: "14%",
      ellipsis: true,
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 items-center justify-center">
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs btn-operation"
            onClick={ () => onStockFinancialReportDetail(record)}
          >
            <Eye className="w-3 h-3" />
            详情
          </button>
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs btn-operation"
            onClick={ () => onUpdateStockFinancialReport(record)}
          >
            <PenLine className="w-3 h-3" />
            编辑
          </button>
          <Popconfirm
            title="确认删除"
            description="确定删除吗? 删除后将无法找回"
            onConfirm={() => handleDeleteStockFinancialReport(record)}
            okText="确认"
            cancelText="取消"
          >
            <button
              type="button"
              className="flex items-center gap-0.5 text-xs btn-remove"
            >
              <Trash2 className="w-3 h-3" />
              删除
            </button>
          </Popconfirm>

          {showMore && (
            <button type="button" className="flex items-center gap-0.5 text-xs btn-operation">
              <span>更多</span>
              <MoreHorizontal className="w-3 h-3" />
            </button>
          )}
        </div>
      ),
    },
  ]

  const [visibleColumns, setVisibleColumns] = useState(
    stockFinancialReportColumns.map((col) => col.key),
  );
  const onToggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((prevVisibleColumns) => {
      if (prevVisibleColumns.includes(columnKey)) {
        return prevVisibleColumns.filter((key) => key !== columnKey);
      } else {
        return [...prevVisibleColumns, columnKey];
      }
    });
  };
  const filteredStockFinancialReportColumns = stockFinancialReportColumns.filter((col) =>
    visibleColumns.includes(col.key),
  );

  // 新增模块
  const [isCreateStockFinancialReportModalVisible, setIsCreateStockFinancialReportModalVisible] =
    useState(false);
  const [isCreateStockFinancialReportLoading, setIsCreateStockFinancialReportLoading] = useState(false);
  const [createStockFinancialReportForm] = Form.useForm();

  const onCreateStockFinancialReport = () => {
    setIsCreateStockFinancialReportModalVisible(true);
  };
  const handleCreateStockFinancialReportCancel = () => {
    createStockFinancialReportForm.resetFields();
    setIsCreateStockFinancialReportModalVisible(false);
  };
  const handleCreateStockFinancialReportFinish = async (data: CreateStockFinancialReport) => {
    setIsCreateStockFinancialReportLoading(true);
    try {
      await createStockFinancialReport({ stockFinancialReport: data });
      message.success('新增成功');
      createStockFinancialReportForm.resetFields();
      setIsCreateStockFinancialReportModalVisible(false);
      mutateStockFinancialReports();
    } finally {
      setIsCreateStockFinancialReportLoading(false);
    }
  };

  // 单个删除模块
  const handleDeleteStockFinancialReport = async (stockFinancialReport: StockFinancialReport) => {
    await deleteStockFinancialReport(stockFinancialReport.id);
    message.success('删除成功');
    mutateStockFinancialReports();
  };

  // 批量删除模块
  const [isBatchRemoveLoading, setIsBatchRemoveLoading] =
    useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<StockFinancialReport[]>([]);

  const resetSelectedRows = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const handleSelectionChange = (
    selectedRowKeys: React.Key[],
    selectedRows: StockFinancialReport[],
  ) => {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleStockFinancialReportBatchRemove = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的项目');
      return;
    }
    try {
      setIsBatchRemoveLoading(true);
      await batchDeleteStockFinancialReport({ ids: selectedRows.map((row) => row.id) });
      message.success('删除成功');
      mutateStockFinancialReports();
      resetSelectedRows();
    } finally {
      setIsBatchRemoveLoading(false);
    }
  };

  const handleStockFinancialReportBatchRemoveCancel = async () => {
    resetSelectedRows();
    message.info('操作已取消');
  };

  // 单个更新模块
  const [isUpdateStockFinancialReportModalVisible, setIsUpdateStockFinancialReportModalVisible] =
    useState<boolean>(false);
  const [isUpdateStockFinancialReportLoading, setIsUpdateStockFinancialReportLoading] =
    useState<boolean>(false);
  const [updateStockFinancialReportForm] = Form.useForm();

  const onUpdateStockFinancialReport = (stockFinancialReport: StockFinancialReport) => {
    setIsUpdateStockFinancialReportModalVisible(true);
    setSelectedRowKeys([stockFinancialReport.id]);
    setSelectedRows([stockFinancialReport]);
    updateStockFinancialReportForm.setFieldsValue({ ...stockFinancialReport });
  };

  const handleUpdateStockFinancialReportCancel = () => {
    resetSelectedRows();
    updateStockFinancialReportForm.resetFields();
    setIsUpdateStockFinancialReportModalVisible(false);
  };

  const handleUpdateStockFinancialReportFinish = async () => {
    const updateStockFinancialReportData =
      (await updateStockFinancialReportForm.validateFields()) as UpdateStockFinancialReport;
    const req = { ...updateStockFinancialReportData, id: selectedRows[0].id };
    setIsUpdateStockFinancialReportLoading(true);
    try {
      await updateStockFinancialReport({ stockFinancialReport: req });
      updateStockFinancialReportForm.resetFields();
      message.success('更新成功');
      mutateStockFinancialReports();
      resetSelectedRows();
    } finally {
      setIsUpdateStockFinancialReportLoading(false);
      setIsUpdateStockFinancialReportModalVisible(false);
    }
  };

  // 批量更新模块
  const onStockFinancialReportBatchModify = () => {
    if (selectedRowKeys.length === 1) {
      setIsUpdateStockFinancialReportModalVisible(true);
      updateStockFinancialReportForm.setFieldsValue({ ...selectedRows[0] });
    } else {
      setIsBatchUpdateStockFinancialReportsModalVisible(true);
      batchUpdateStockFinancialReportsForm.resetFields();
    }
  };
  const [isBatchUpdateStockFinancialReportsModalVisible, setIsBatchUpdateStockFinancialReportsModalVisible] =
    useState<boolean>(false);
  const [isBatchUpdateStockFinancialReportsLoading, setIsBatchUpdateStockFinancialReportsLoading] =
    useState<boolean>(false);
  const [batchUpdateStockFinancialReportsForm] = Form.useForm();

  const handleBatchUpdateStockFinancialReportsCancel = async () => {
    batchUpdateStockFinancialReportsForm.resetFields();
    setIsBatchUpdateStockFinancialReportsModalVisible(false);
    resetSelectedRows();
    message.info('操作已取消');
  };

  const handleBatchUpdateStockFinancialReportsFinish = async () => {
    const stockFinancialReportBatchModify =
      (await batchUpdateStockFinancialReportsForm.validateFields()) as BatchUpdateStockFinancialReport;
    setIsBatchUpdateStockFinancialReportsLoading(true);
    if (selectedRows === null || selectedRows.length === 0) {
      message.warning('请选择要更新的项目');
      return;
    }
    try {
      const ids = selectedRows.map((row) => row.id);
      await batchUpdateStockFinancialReports({ ids: ids, stockFinancialReport: stockFinancialReportBatchModify });
      batchUpdateStockFinancialReportsForm.resetFields();
      message.success('更新成功');
      mutateStockFinancialReports();
      resetSelectedRows();
    } finally {
      setIsBatchUpdateStockFinancialReportsLoading(false);
      setIsBatchUpdateStockFinancialReportsModalVisible(false);
    }
  };

  // 导入模块
  const [isImportStockFinancialReportModalVisible, setIsImportStockFinancialReportModalVisible] =
    useState<boolean>(false);
  const [isImportStockFinancialReportLoading, setIsImportStockFinancialReportLoading] =
    useState<boolean>(false);
  const [createStockFinancialReportList, setCreateStockFinancialReportList] = useState<CreateStockFinancialReport[]>([]);

  const onImportStockFinancialReport = () => {
    setIsImportStockFinancialReportModalVisible(true);
  };

  const handleImportStockFinancialReportCancel = () => {
    setIsImportStockFinancialReportModalVisible(false);
  };

  const onImportStockFinancialReportFinish = async (fileList: RcFile[]) => {
    try {
      setIsImportStockFinancialReportLoading(true);
      const createStockFinancialReportList = await importStockFinancialReport({ file: fileList[0] });
      setCreateStockFinancialReportList(createStockFinancialReportList.stockFinancialReports);
      return createStockFinancialReportList;
    } finally {
      setIsImportStockFinancialReportLoading(false);
    }
  };

  const handleImportStockFinancialReport = async () => {
    setIsImportStockFinancialReportLoading(true);
    try {
      await batchCreateStockFinancialReports({ stockFinancialReports: createStockFinancialReportList });
      message.success('导入成功');
      setIsImportStockFinancialReportModalVisible(false);
      mutateStockFinancialReports();
    } finally {
      setIsImportStockFinancialReportLoading(false);
      setCreateStockFinancialReportList([]);
    }
  };

  // 导出模块
  const [isExportLoading, setIsExportLoading] = useState<boolean>(false);
  const onStockFinancialReportExport = async () => {
    if (selectedRowKeys === null || selectedRowKeys.length === 0) {
      message.warning('请先选择导出的项目');
      return;
    }
    try {
      setIsExportLoading(true);
      await exportStockFinancialReport({ ids: selectedRows.map((row) => row.id) });
      resetSelectedRows();
    } finally {
      setIsExportLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 bg-white">
      <TransitionWrapper show={isQueryStockFinancialReportShow}>
        <QueryStockFinancialReportComponent
          onQueryStockFinancialReportFinish={onQueryStockFinancialReportFinish}
          onQueryStockFinancialReportReset={handleQueryStockFinancialReportReset}
          onQueryStockFinancialReportForm={queryStockFinancialReportForm}
        />
      </TransitionWrapper>
      <div>
        <ActionButtonComponent
          onCreate={onCreateStockFinancialReport }
          onImport={onImportStockFinancialReport }
          onExport={onStockFinancialReportExport}
          onBatchModify={onStockFinancialReportBatchModify}
          onConfirmBatchRemove={handleStockFinancialReportBatchRemove}
          onConfirmBatchRemoveCancel={handleStockFinancialReportBatchRemoveCancel}
          isQueryShow={isQueryStockFinancialReportShow}
          onQueryShow={onQueryStockFinancialReportShow}
          isExportDisabled={selectedRowKeys.length === 0}
          isBatchModifyDisabled={selectedRowKeys.length === 0}
          isBatchRemoveDisabled={selectedRowKeys.length === 0}
          isBatchRemoveLoading={isBatchRemoveLoading}
          isExportLoading={isExportLoading}
          rawColumns={ stockFinancialReportColumns as any[]}
          visibleColumns={visibleColumns as any[]}
          onToggleColumnVisibility={onToggleColumnVisibility}
          actionConfig={actionConfig}
          className="mb-2 mt-4"
        />
      </div>
      <div>
        <PaginatedTable<StockFinancialReport>
          columns={filteredStockFinancialReportColumns}
          dataSource={ stockFinancialReportListDataSource || []}
          total={total || 0}
          current={current}
          page_size={pageSize}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleSelectionChange}
          selectedRowKeys={selectedRowKeys}
          rowKey="id"
          loading={isStockFinancialReportListLoading}
        />
      </div>
      <div>
        <div>
          <CreateStockFinancialReportComponent
            isCreateStockFinancialReportModalVisible={isCreateStockFinancialReportModalVisible}
            onCreateStockFinancialReportCancel={handleCreateStockFinancialReportCancel}
            onCreateStockFinancialReportFinish={handleCreateStockFinancialReportFinish}
            isCreateStockFinancialReportLoading={isCreateStockFinancialReportLoading}
            createStockFinancialReportForm={createStockFinancialReportForm}
          />
        </div>
        <div>
          <StockFinancialReportDetailComponent
            isStockFinancialReportDetailDrawerVisible={isStockFinancialReportDetailDrawerVisible}
            onStockFinancialReportDetailClose={onStockFinancialReportDetailClose}
            stockFinancialReportDetail={ stockFinancialReportDetail}
            loading={isStockFinancialReportDetailLoading}
          />
        </div>
        <div>
          <UpdateStockFinancialReportComponent
            isUpdateStockFinancialReportModalVisible={isUpdateStockFinancialReportModalVisible}
            onUpdateStockFinancialReportCancel={handleUpdateStockFinancialReportCancel}
            onUpdateStockFinancialReportFinish={handleUpdateStockFinancialReportFinish}
            isUpdateStockFinancialReportLoading={isUpdateStockFinancialReportLoading}
            updateStockFinancialReportForm={updateStockFinancialReportForm}
          />
        </div>
        <div>
          <BatchUpdateStockFinancialReportComponent
            isBatchUpdateStockFinancialReportsModalVisible={isBatchUpdateStockFinancialReportsModalVisible}
            onBatchUpdateStockFinancialReportsCancel={handleBatchUpdateStockFinancialReportsCancel}
            onBatchUpdateStockFinancialReportsFinish={handleBatchUpdateStockFinancialReportsFinish}
            isBatchUpdateStockFinancialReportsLoading={isBatchUpdateStockFinancialReportsLoading}
            batchUpdateStockFinancialReportsForm={ batchUpdateStockFinancialReportsForm}
          />
        </div>

        <div>
          <ImportStockFinancialReportComponent
            isImportStockFinancialReportModalVisible={isImportStockFinancialReportModalVisible}
            isImportStockFinancialReportLoading={isImportStockFinancialReportLoading}
            onImportStockFinancialReportFinish={onImportStockFinancialReportFinish}
            onImportStockFinancialReportCancel={handleImportStockFinancialReportCancel}
            handleImportStockFinancialReport={handleImportStockFinancialReport }
          />
        </div>
      </div>
    </div>
  );
};

export default StockFinancialReportPage;