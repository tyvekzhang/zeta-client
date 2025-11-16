// SPDX-License-Identifier: MIT
'use client';

import ActionButtonComponent from '@/components/base/action-button';
import { PaginatedTable } from '@/components/base/paginated-table';
import TransitionWrapper from '@/components/base/transition-wrapper';
import {
  batchCreateStockDailyRecommendations,
  batchDeleteStockDailyRecommendation,
  batchUpdateStockDailyRecommendations,
  createStockDailyRecommendation,
  deleteStockDailyRecommendation,
  exportStockDailyRecommendation,
  importStockDailyRecommendation,
  updateStockDailyRecommendation,
  useStockDailyRecommendation,
  useStockDailyRecommendations,
} from '@/service/stock-daily-recommendation';
import { createPaginationRequest } from '@/types';
import {
  BatchUpdateStockDailyRecommendation,
  CreateStockDailyRecommendation,
  ListStockDailyRecommendationsRequest,
  StockDailyRecommendation,
  UpdateStockDailyRecommendation,
} from '@/types/stock-daily-recommendation';
import { Form, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Eye, MoreHorizontal, PenLine, Trash2 } from 'lucide-react';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';
import BatchUpdateStockDailyRecommendationComponent from './components/batch-update-stock-daily-recommendation';
import CreateStockDailyRecommendationComponent from './components/create-stock-daily-recommendation';
import ImportStockDailyRecommendationComponent from './components/import-stock-daily-recommendation';
import StockDailyRecommendationDetailComponent from './components/stock-daily-recommendation-detail';
import QueryStockDailyRecommendationComponent from './components/query-stock-daily-recommendation';
import UpdateStockDailyRecommendationComponent from './components/update-stock-daily-recommendation';

const StockDailyRecommendationPage: React.FC = () => {
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
  const [isQueryStockDailyRecommendationShow, setIsQueryStockDailyRecommendationShow] = useState<boolean>(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [queryStockDailyRecommendationForm] = Form.useForm();
  const [stockDailyRecommendationQueryParams, setStockDailyRecommendationQueryParams] = useState<ListStockDailyRecommendationsRequest>();

  // 用 useStockDailyRecommendations 获取菜单列表数据
  const {
    stockDailyRecommendations: stockDailyRecommendationListDataSource,
    total,
    isLoading: isStockDailyRecommendationListLoading,
    mutateStockDailyRecommendations,
  } = useStockDailyRecommendations({
    ...stockDailyRecommendationQueryParams,
    ...createPaginationRequest(current, pageSize),
  });

  const onQueryStockDailyRecommendationShow = () => {
    setIsQueryStockDailyRecommendationShow((prevState) => !prevState);
  };

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setCurrent(newPage);
    setPageSize(newPageSize);
  };

  const resetPagination = () => {
    setCurrent(1);
    setPageSize(10);
  };

  const handleQueryStockDailyRecommendationReset = () => {
    resetPagination();
    queryStockDailyRecommendationForm.resetFields();
    setStockDailyRecommendationQueryParams(undefined)
    mutateStockDailyRecommendations();
  };

  const onQueryStockDailyRecommendationFinish = async () => {
    const values = queryStockDailyRecommendationForm.getFieldsValue();
    const { create_time } = values;
    if (create_time) {
      const [startDate, endDate] = create_time;
      values.create_time = [
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD'),
      ];
    }
    const queryStockDailyRecommendation = values as ListStockDailyRecommendationsRequest;
    const filteredQueryStockDailyRecommendation = Object.fromEntries(
      Object.entries(queryStockDailyRecommendation).filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      ),
    );
    resetPagination();
    setStockDailyRecommendationQueryParams(filteredQueryStockDailyRecommendation as ListStockDailyRecommendationsRequest);
  };

  // 详情模块
  const [isStockDailyRecommendationDetailDrawerVisible, setIsStockDailyRecommendationDetailDrawerVisible] =
    useState(false);
  const [selectedStockDailyRecommendationId, setSelectedStockDailyRecommendationId] = useState<string | null>(null);

  const { stockDailyRecommendation: stockDailyRecommendationDetail, isLoading: isStockDailyRecommendationDetailLoading } = useStockDailyRecommendation(
    selectedStockDailyRecommendationId || '',
  );

  const onStockDailyRecommendationDetail = (stockDailyRecommendation: StockDailyRecommendation) => {
    setSelectedStockDailyRecommendationId(stockDailyRecommendation.id);
    setIsStockDailyRecommendationDetailDrawerVisible(true);
  };

  const onStockDailyRecommendationDetailClose = () => {
    setSelectedStockDailyRecommendationId(null);
    setIsStockDailyRecommendationDetailDrawerVisible(false);
  };

  // 表格列信息
  const stockDailyRecommendationColumns: ColumnsType<StockDailyRecommendation> = [
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
      render: (_: number, _record: StockDailyRecommendation, rowIndex: number) => rowIndex + 1,
      width: "8%",
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
      title: "推荐日期",
      dataIndex: "recommend_date",
      key: "recommend_date",
      render: (text: string) => (
        text ? <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>: "-"
      ),
      width: "14%",
      ellipsis: true,
    },
    {
      title: "推荐等级",
      dataIndex: "recommend_level",
      key: "recommend_level",
      width: "6%",
    },
    {
      title: "当前价",
      dataIndex: "price",
      key: "price",
      width: "6%",
    },
    {
      title: "目标价",
      dataIndex: "target_price",
      key: "target_price",
      width: "6%",
    },
    {
      title: "推荐理由",
      dataIndex: "recommend_reason",
      key: "recommend_reason",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "分析师",
      dataIndex: "analyst",
      key: "analyst",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "机构名称",
      dataIndex: "institution",
      key: "institution",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "风险等级",
      dataIndex: "risk_level",
      key: "risk_level",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "有效期",
      dataIndex: "validity_period",
      key: "validity_period",
      width: "6%",
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
            onClick={ () => onStockDailyRecommendationDetail(record)}
          >
            <Eye className="w-3 h-3" />
            详情
          </button>
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs btn-operation"
            onClick={ () => onUpdateStockDailyRecommendation(record)}
          >
            <PenLine className="w-3 h-3" />
            编辑
          </button>
          <Popconfirm
            title="确认删除"
            description="确定删除吗? 删除后将无法找回"
            onConfirm={() => handleDeleteStockDailyRecommendation(record)}
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
    stockDailyRecommendationColumns.map((col) => col.key),
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
  const filteredStockDailyRecommendationColumns = stockDailyRecommendationColumns.filter((col) =>
    visibleColumns.includes(col.key),
  );

  // 新增模块
  const [isCreateStockDailyRecommendationModalVisible, setIsCreateStockDailyRecommendationModalVisible] =
    useState(false);
  const [isCreateStockDailyRecommendationLoading, setIsCreateStockDailyRecommendationLoading] = useState(false);
  const [createStockDailyRecommendationForm] = Form.useForm();

  const onCreateStockDailyRecommendation = () => {
    setIsCreateStockDailyRecommendationModalVisible(true);
  };
  const handleCreateStockDailyRecommendationCancel = () => {
    createStockDailyRecommendationForm.resetFields();
    setIsCreateStockDailyRecommendationModalVisible(false);
  };
  const handleCreateStockDailyRecommendationFinish = async (data: CreateStockDailyRecommendation) => {
    setIsCreateStockDailyRecommendationLoading(true);
    try {
      await createStockDailyRecommendation({ stockDailyRecommendation: data });
      message.success('新增成功');
      createStockDailyRecommendationForm.resetFields();
      setIsCreateStockDailyRecommendationModalVisible(false);
      mutateStockDailyRecommendations();
    } finally {
      setIsCreateStockDailyRecommendationLoading(false);
    }
  };

  // 单个删除模块
  const handleDeleteStockDailyRecommendation = async (stockDailyRecommendation: StockDailyRecommendation) => {
    await deleteStockDailyRecommendation(stockDailyRecommendation.id);
    message.success('删除成功');
    mutateStockDailyRecommendations();
  };

  // 批量删除模块
  const [isBatchRemoveLoading, setIsBatchRemoveLoading] =
    useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<StockDailyRecommendation[]>([]);

  const resetSelectedRows = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const handleSelectionChange = (
    selectedRowKeys: React.Key[],
    selectedRows: StockDailyRecommendation[],
  ) => {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleStockDailyRecommendationBatchRemove = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的项目');
      return;
    }
    try {
      setIsBatchRemoveLoading(true);
      await batchDeleteStockDailyRecommendation({ ids: selectedRows.map((row) => row.id) });
      message.success('删除成功');
      mutateStockDailyRecommendations();
      resetSelectedRows();
    } finally {
      setIsBatchRemoveLoading(false);
    }
  };

  const handleStockDailyRecommendationBatchRemoveCancel = async () => {
    resetSelectedRows();
    message.info('操作已取消');
  };

  // 单个更新模块
  const [isUpdateStockDailyRecommendationModalVisible, setIsUpdateStockDailyRecommendationModalVisible] =
    useState<boolean>(false);
  const [isUpdateStockDailyRecommendationLoading, setIsUpdateStockDailyRecommendationLoading] =
    useState<boolean>(false);
  const [updateStockDailyRecommendationForm] = Form.useForm();

  const onUpdateStockDailyRecommendation = (stockDailyRecommendation: StockDailyRecommendation) => {
    setIsUpdateStockDailyRecommendationModalVisible(true);
    setSelectedRowKeys([stockDailyRecommendation.id]);
    setSelectedRows([stockDailyRecommendation]);
    updateStockDailyRecommendationForm.setFieldsValue({ ...stockDailyRecommendation });
  };

  const handleUpdateStockDailyRecommendationCancel = () => {
    resetSelectedRows();
    updateStockDailyRecommendationForm.resetFields();
    setIsUpdateStockDailyRecommendationModalVisible(false);
  };

  const handleUpdateStockDailyRecommendationFinish = async () => {
    const updateStockDailyRecommendationData =
      (await updateStockDailyRecommendationForm.validateFields()) as UpdateStockDailyRecommendation;
    const req = { ...updateStockDailyRecommendationData, id: selectedRows[0].id };
    setIsUpdateStockDailyRecommendationLoading(true);
    try {
      await updateStockDailyRecommendation({ stockDailyRecommendation: req });
      updateStockDailyRecommendationForm.resetFields();
      message.success('更新成功');
      mutateStockDailyRecommendations();
      resetSelectedRows();
    } finally {
      setIsUpdateStockDailyRecommendationLoading(false);
      setIsUpdateStockDailyRecommendationModalVisible(false);
    }
  };

  // 批量更新模块
  const onStockDailyRecommendationBatchModify = () => {
    if (selectedRowKeys.length === 1) {
      setIsUpdateStockDailyRecommendationModalVisible(true);
      updateStockDailyRecommendationForm.setFieldsValue({ ...selectedRows[0] });
    } else {
      setIsBatchUpdateStockDailyRecommendationsModalVisible(true);
      batchUpdateStockDailyRecommendationsForm.resetFields();
    }
  };
  const [isBatchUpdateStockDailyRecommendationsModalVisible, setIsBatchUpdateStockDailyRecommendationsModalVisible] =
    useState<boolean>(false);
  const [isBatchUpdateStockDailyRecommendationsLoading, setIsBatchUpdateStockDailyRecommendationsLoading] =
    useState<boolean>(false);
  const [batchUpdateStockDailyRecommendationsForm] = Form.useForm();

  const handleBatchUpdateStockDailyRecommendationsCancel = async () => {
    batchUpdateStockDailyRecommendationsForm.resetFields();
    setIsBatchUpdateStockDailyRecommendationsModalVisible(false);
    resetSelectedRows();
    message.info('操作已取消');
  };

  const handleBatchUpdateStockDailyRecommendationsFinish = async () => {
    const stockDailyRecommendationBatchModify =
      (await batchUpdateStockDailyRecommendationsForm.validateFields()) as BatchUpdateStockDailyRecommendation;
    setIsBatchUpdateStockDailyRecommendationsLoading(true);
    if (selectedRows === null || selectedRows.length === 0) {
      message.warning('请选择要更新的项目');
      return;
    }
    try {
      const ids = selectedRows.map((row) => row.id);
      await batchUpdateStockDailyRecommendations({ ids: ids, stockDailyRecommendation: stockDailyRecommendationBatchModify });
      batchUpdateStockDailyRecommendationsForm.resetFields();
      message.success('更新成功');
      mutateStockDailyRecommendations();
      resetSelectedRows();
    } finally {
      setIsBatchUpdateStockDailyRecommendationsLoading(false);
      setIsBatchUpdateStockDailyRecommendationsModalVisible(false);
    }
  };

  // 导入模块
  const [isImportStockDailyRecommendationModalVisible, setIsImportStockDailyRecommendationModalVisible] =
    useState<boolean>(false);
  const [isImportStockDailyRecommendationLoading, setIsImportStockDailyRecommendationLoading] =
    useState<boolean>(false);
  const [createStockDailyRecommendationList, setCreateStockDailyRecommendationList] = useState<CreateStockDailyRecommendation[]>([]);

  const onImportStockDailyRecommendation = () => {
    setIsImportStockDailyRecommendationModalVisible(true);
  };

  const handleImportStockDailyRecommendationCancel = () => {
    setIsImportStockDailyRecommendationModalVisible(false);
  };

  const onImportStockDailyRecommendationFinish = async (fileList: RcFile[]) => {
    try {
      setIsImportStockDailyRecommendationLoading(true);
      const createStockDailyRecommendationList = await importStockDailyRecommendation({ file: fileList[0] });
      setCreateStockDailyRecommendationList(createStockDailyRecommendationList.stockDailyRecommendations);
      return createStockDailyRecommendationList;
    } finally {
      setIsImportStockDailyRecommendationLoading(false);
    }
  };

  const handleImportStockDailyRecommendation = async () => {
    setIsImportStockDailyRecommendationLoading(true);
    try {
      await batchCreateStockDailyRecommendations({ stockDailyRecommendations: createStockDailyRecommendationList });
      message.success('导入成功');
      setIsImportStockDailyRecommendationModalVisible(false);
      mutateStockDailyRecommendations();
    } finally {
      setIsImportStockDailyRecommendationLoading(false);
      setCreateStockDailyRecommendationList([]);
    }
  };

  // 导出模块
  const [isExportLoading, setIsExportLoading] = useState<boolean>(false);
  const onStockDailyRecommendationExport = async () => {
    if (selectedRowKeys === null || selectedRowKeys.length === 0) {
      message.warning('请先选择导出的项目');
      return;
    }
    try {
      setIsExportLoading(true);
      await exportStockDailyRecommendation({ ids: selectedRows.map((row) => row.id) });
      resetSelectedRows();
    } finally {
      setIsExportLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 bg-white">
      <TransitionWrapper show={isQueryStockDailyRecommendationShow}>
        <QueryStockDailyRecommendationComponent
          onQueryStockDailyRecommendationFinish={onQueryStockDailyRecommendationFinish}
          onQueryStockDailyRecommendationReset={handleQueryStockDailyRecommendationReset}
          onQueryStockDailyRecommendationForm={queryStockDailyRecommendationForm}
        />
      </TransitionWrapper>
      <div>
        <ActionButtonComponent
          onCreate={onCreateStockDailyRecommendation }
          onImport={onImportStockDailyRecommendation }
          onExport={onStockDailyRecommendationExport}
          onBatchModify={onStockDailyRecommendationBatchModify}
          onConfirmBatchRemove={handleStockDailyRecommendationBatchRemove}
          onConfirmBatchRemoveCancel={handleStockDailyRecommendationBatchRemoveCancel}
          isQueryShow={isQueryStockDailyRecommendationShow}
          onQueryShow={onQueryStockDailyRecommendationShow}
          isExportDisabled={selectedRowKeys.length === 0}
          isBatchModifyDisabled={selectedRowKeys.length === 0}
          isBatchRemoveDisabled={selectedRowKeys.length === 0}
          isBatchRemoveLoading={isBatchRemoveLoading}
          isExportLoading={isExportLoading}
          rawColumns={ stockDailyRecommendationColumns as any[]}
          visibleColumns={visibleColumns as any[]}
          onToggleColumnVisibility={onToggleColumnVisibility}
          actionConfig={actionConfig}
          className="mb-2 mt-4"
        />
      </div>
      <div>
        <PaginatedTable<StockDailyRecommendation>
          columns={filteredStockDailyRecommendationColumns}
          dataSource={ stockDailyRecommendationListDataSource || []}
          total={total || 0}
          current={current}
          page_size={pageSize}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleSelectionChange}
          selectedRowKeys={selectedRowKeys}
          rowKey="id"
          loading={isStockDailyRecommendationListLoading}
        />
      </div>
      <div>
        <div>
          <CreateStockDailyRecommendationComponent
            isCreateStockDailyRecommendationModalVisible={isCreateStockDailyRecommendationModalVisible}
            onCreateStockDailyRecommendationCancel={handleCreateStockDailyRecommendationCancel}
            onCreateStockDailyRecommendationFinish={handleCreateStockDailyRecommendationFinish}
            isCreateStockDailyRecommendationLoading={isCreateStockDailyRecommendationLoading}
            createStockDailyRecommendationForm={createStockDailyRecommendationForm}
          />
        </div>
        <div>
          <StockDailyRecommendationDetailComponent
            isStockDailyRecommendationDetailDrawerVisible={isStockDailyRecommendationDetailDrawerVisible}
            onStockDailyRecommendationDetailClose={onStockDailyRecommendationDetailClose}
            stockDailyRecommendationDetail={ stockDailyRecommendationDetail}
            loading={isStockDailyRecommendationDetailLoading}
          />
        </div>
        <div>
          <UpdateStockDailyRecommendationComponent
            isUpdateStockDailyRecommendationModalVisible={isUpdateStockDailyRecommendationModalVisible}
            onUpdateStockDailyRecommendationCancel={handleUpdateStockDailyRecommendationCancel}
            onUpdateStockDailyRecommendationFinish={handleUpdateStockDailyRecommendationFinish}
            isUpdateStockDailyRecommendationLoading={isUpdateStockDailyRecommendationLoading}
            updateStockDailyRecommendationForm={updateStockDailyRecommendationForm}
          />
        </div>
        <div>
          <BatchUpdateStockDailyRecommendationComponent
            isBatchUpdateStockDailyRecommendationsModalVisible={isBatchUpdateStockDailyRecommendationsModalVisible}
            onBatchUpdateStockDailyRecommendationsCancel={handleBatchUpdateStockDailyRecommendationsCancel}
            onBatchUpdateStockDailyRecommendationsFinish={handleBatchUpdateStockDailyRecommendationsFinish}
            isBatchUpdateStockDailyRecommendationsLoading={isBatchUpdateStockDailyRecommendationsLoading}
            batchUpdateStockDailyRecommendationsForm={ batchUpdateStockDailyRecommendationsForm}
          />
        </div>

        <div>
          <ImportStockDailyRecommendationComponent
            isImportStockDailyRecommendationModalVisible={isImportStockDailyRecommendationModalVisible}
            isImportStockDailyRecommendationLoading={isImportStockDailyRecommendationLoading}
            onImportStockDailyRecommendationFinish={onImportStockDailyRecommendationFinish}
            onImportStockDailyRecommendationCancel={handleImportStockDailyRecommendationCancel}
            handleImportStockDailyRecommendation={handleImportStockDailyRecommendation }
          />
        </div>
      </div>
    </div>
  );
};

export default StockDailyRecommendationPage;