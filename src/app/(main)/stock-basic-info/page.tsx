// SPDX-License-Identifier: MIT
'use client';

import ActionButtonComponent from '@/components/base/action-button';
import { PaginatedTable } from '@/components/base/paginated-table';
import TransitionWrapper from '@/components/base/transition-wrapper';
import {
  batchCreateStockBasicInfos,
  batchDeleteStockBasicInfo,
  batchUpdateStockBasicInfos,
  createStockBasicInfo,
  deleteStockBasicInfo,
  exportStockBasicInfo,
  importStockBasicInfo,
  updateStockBasicInfo,
  useStockBasicInfo,
  useStockBasicInfos,
} from '@/service/stock-basic-info';
import { createPaginationRequest } from '@/types';
import {
  BatchUpdateStockBasicInfo,
  CreateStockBasicInfo,
  ListStockBasicInfosRequest,
  StockBasicInfo,
  UpdateStockBasicInfo,
} from '@/types/stock-basic-info';
import { Form, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Eye, MoreHorizontal, PenLine, Trash2 } from 'lucide-react';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';
import BatchUpdateStockBasicInfoComponent from './components/batch-update-stock-basic-info';
import CreateStockBasicInfoComponent from './components/create-stock-basic-info';
import ImportStockBasicInfoComponent from './components/import-stock-basic-info';
import StockBasicInfoDetailComponent from './components/stock-basic-info-detail';
import QueryStockBasicInfoComponent from './components/query-stock-basic-info';
import UpdateStockBasicInfoComponent from './components/update-stock-basic-info';

const StockBasicInfoPage: React.FC = () => {
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
  const [isQueryStockBasicInfoShow, setIsQueryStockBasicInfoShow] = useState<boolean>(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [queryStockBasicInfoForm] = Form.useForm();
  const [stockBasicInfoQueryParams, setStockBasicInfoQueryParams] = useState<ListStockBasicInfosRequest>();

  // 用 useStockBasicInfos 获取菜单列表数据
  const {
    stockBasicInfos: stockBasicInfoListDataSource,
    total,
    isLoading: isStockBasicInfoListLoading,
    mutateStockBasicInfos,
  } = useStockBasicInfos({
    ...stockBasicInfoQueryParams,
    ...createPaginationRequest(current, pageSize),
  });

  const onQueryStockBasicInfoShow = () => {
    setIsQueryStockBasicInfoShow((prevState) => !prevState);
  };

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setCurrent(newPage);
    setPageSize(newPageSize);
  };

  const resetPagination = () => {
    setCurrent(1);
    setPageSize(10);
  };

  const handleQueryStockBasicInfoReset = () => {
    resetPagination();
    queryStockBasicInfoForm.resetFields();
    setStockBasicInfoQueryParams(undefined)
    mutateStockBasicInfos();
  };

  const onQueryStockBasicInfoFinish = async () => {
    const values = queryStockBasicInfoForm.getFieldsValue();
    const { create_time } = values;
    if (create_time) {
      const [startDate, endDate] = create_time;
      values.create_time = [
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD'),
      ];
    }
    const queryStockBasicInfo = values as ListStockBasicInfosRequest;
    const filteredQueryStockBasicInfo = Object.fromEntries(
      Object.entries(queryStockBasicInfo).filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      ),
    );
    resetPagination();
    setStockBasicInfoQueryParams(filteredQueryStockBasicInfo as ListStockBasicInfosRequest);
  };

  // 详情模块
  const [isStockBasicInfoDetailDrawerVisible, setIsStockBasicInfoDetailDrawerVisible] =
    useState(false);
  const [selectedStockBasicInfoId, setSelectedStockBasicInfoId] = useState<string | null>(null);

  const { stockBasicInfo: stockBasicInfoDetail, isLoading: isStockBasicInfoDetailLoading } = useStockBasicInfo(
    selectedStockBasicInfoId || '',
  );

  const onStockBasicInfoDetail = (stockBasicInfo: StockBasicInfo) => {
    setSelectedStockBasicInfoId(stockBasicInfo.id);
    setIsStockBasicInfoDetailDrawerVisible(true);
  };

  const onStockBasicInfoDetailClose = () => {
    setSelectedStockBasicInfoId(null);
    setIsStockBasicInfoDetailDrawerVisible(false);
  };

  // 表格列信息
  const stockBasicInfoColumns: ColumnsType<StockBasicInfo> = [
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
      render: (_: number, _record: StockBasicInfo, rowIndex: number) => rowIndex + 1,
      width: "8%",
    },
    {
      title: "股票编号",
      dataIndex: "symbol",
      key: "symbol",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "股票代码",
      dataIndex: "symbol_full",
      key: "symbol_full",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "股票名称",
      dataIndex: "name",
      key: "name",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "交易所",
      dataIndex: "exchange",
      key: "exchange",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "上市日期",
      dataIndex: "listing_date",
      key: "listing_date",
      render: (text: string) => (
        text ? <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>: "-"
      ),
      width: "14%",
      ellipsis: true,
    },
    {
      title: "行业",
      dataIndex: "industry",
      key: "industry",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "细分行业",
      dataIndex: "industry_gy",
      key: "industry_gy",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "省份",
      dataIndex: "province",
      key: "province",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "城市",
      dataIndex: "city",
      key: "city",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "官网",
      dataIndex: "website",
      key: "website",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "最小报价单位，1表示0.01元",
      dataIndex: "price_tick",
      key: "price_tick",
      width: "6%",
    },
    {
      title: "数据来源",
      dataIndex: "data_source",
      key: "data_source",
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
            onClick={ () => onStockBasicInfoDetail(record)}
          >
            <Eye className="w-3 h-3" />
            详情
          </button>
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs btn-operation"
            onClick={ () => onUpdateStockBasicInfo(record)}
          >
            <PenLine className="w-3 h-3" />
            编辑
          </button>
          <Popconfirm
            title="确认删除"
            description="确定删除吗? 删除后将无法找回"
            onConfirm={() => handleDeleteStockBasicInfo(record)}
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
    stockBasicInfoColumns.map((col) => col.key),
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
  const filteredStockBasicInfoColumns = stockBasicInfoColumns.filter((col) =>
    visibleColumns.includes(col.key),
  );

  // 新增模块
  const [isCreateStockBasicInfoModalVisible, setIsCreateStockBasicInfoModalVisible] =
    useState(false);
  const [isCreateStockBasicInfoLoading, setIsCreateStockBasicInfoLoading] = useState(false);
  const [createStockBasicInfoForm] = Form.useForm();

  const onCreateStockBasicInfo = () => {
    setIsCreateStockBasicInfoModalVisible(true);
  };
  const handleCreateStockBasicInfoCancel = () => {
    createStockBasicInfoForm.resetFields();
    setIsCreateStockBasicInfoModalVisible(false);
  };
  const handleCreateStockBasicInfoFinish = async (data: CreateStockBasicInfo) => {
    setIsCreateStockBasicInfoLoading(true);
    try {
      await createStockBasicInfo({ stockBasicInfo: data });
      message.success('新增成功');
      createStockBasicInfoForm.resetFields();
      setIsCreateStockBasicInfoModalVisible(false);
      mutateStockBasicInfos();
    } finally {
      setIsCreateStockBasicInfoLoading(false);
    }
  };

  // 单个删除模块
  const handleDeleteStockBasicInfo = async (stockBasicInfo: StockBasicInfo) => {
    await deleteStockBasicInfo(stockBasicInfo.id);
    message.success('删除成功');
    mutateStockBasicInfos();
  };

  // 批量删除模块
  const [isBatchRemoveLoading, setIsBatchRemoveLoading] =
    useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<StockBasicInfo[]>([]);

  const resetSelectedRows = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const handleSelectionChange = (
    selectedRowKeys: React.Key[],
    selectedRows: StockBasicInfo[],
  ) => {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleStockBasicInfoBatchRemove = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的项目');
      return;
    }
    try {
      setIsBatchRemoveLoading(true);
      await batchDeleteStockBasicInfo({ ids: selectedRows.map((row) => row.id) });
      message.success('删除成功');
      mutateStockBasicInfos();
      resetSelectedRows();
    } finally {
      setIsBatchRemoveLoading(false);
    }
  };

  const handleStockBasicInfoBatchRemoveCancel = async () => {
    resetSelectedRows();
    message.info('操作已取消');
  };

  // 单个更新模块
  const [isUpdateStockBasicInfoModalVisible, setIsUpdateStockBasicInfoModalVisible] =
    useState<boolean>(false);
  const [isUpdateStockBasicInfoLoading, setIsUpdateStockBasicInfoLoading] =
    useState<boolean>(false);
  const [updateStockBasicInfoForm] = Form.useForm();

  const onUpdateStockBasicInfo = (stockBasicInfo: StockBasicInfo) => {
    setIsUpdateStockBasicInfoModalVisible(true);
    setSelectedRowKeys([stockBasicInfo.id]);
    setSelectedRows([stockBasicInfo]);
    updateStockBasicInfoForm.setFieldsValue({ ...stockBasicInfo });
  };

  const handleUpdateStockBasicInfoCancel = () => {
    resetSelectedRows();
    updateStockBasicInfoForm.resetFields();
    setIsUpdateStockBasicInfoModalVisible(false);
  };

  const handleUpdateStockBasicInfoFinish = async () => {
    const updateStockBasicInfoData =
      (await updateStockBasicInfoForm.validateFields()) as UpdateStockBasicInfo;
    const req = { ...updateStockBasicInfoData, id: selectedRows[0].id };
    setIsUpdateStockBasicInfoLoading(true);
    try {
      await updateStockBasicInfo({ stockBasicInfo: req });
      updateStockBasicInfoForm.resetFields();
      message.success('更新成功');
      mutateStockBasicInfos();
      resetSelectedRows();
    } finally {
      setIsUpdateStockBasicInfoLoading(false);
      setIsUpdateStockBasicInfoModalVisible(false);
    }
  };

  // 批量更新模块
  const onStockBasicInfoBatchModify = () => {
    if (selectedRowKeys.length === 1) {
      setIsUpdateStockBasicInfoModalVisible(true);
      updateStockBasicInfoForm.setFieldsValue({ ...selectedRows[0] });
    } else {
      setIsBatchUpdateStockBasicInfosModalVisible(true);
      batchUpdateStockBasicInfosForm.resetFields();
    }
  };
  const [isBatchUpdateStockBasicInfosModalVisible, setIsBatchUpdateStockBasicInfosModalVisible] =
    useState<boolean>(false);
  const [isBatchUpdateStockBasicInfosLoading, setIsBatchUpdateStockBasicInfosLoading] =
    useState<boolean>(false);
  const [batchUpdateStockBasicInfosForm] = Form.useForm();

  const handleBatchUpdateStockBasicInfosCancel = async () => {
    batchUpdateStockBasicInfosForm.resetFields();
    setIsBatchUpdateStockBasicInfosModalVisible(false);
    resetSelectedRows();
    message.info('操作已取消');
  };

  const handleBatchUpdateStockBasicInfosFinish = async () => {
    const stockBasicInfoBatchModify =
      (await batchUpdateStockBasicInfosForm.validateFields()) as BatchUpdateStockBasicInfo;
    setIsBatchUpdateStockBasicInfosLoading(true);
    if (selectedRows === null || selectedRows.length === 0) {
      message.warning('请选择要更新的项目');
      return;
    }
    try {
      const ids = selectedRows.map((row) => row.id);
      await batchUpdateStockBasicInfos({ ids: ids, stockBasicInfo: stockBasicInfoBatchModify });
      batchUpdateStockBasicInfosForm.resetFields();
      message.success('更新成功');
      mutateStockBasicInfos();
      resetSelectedRows();
    } finally {
      setIsBatchUpdateStockBasicInfosLoading(false);
      setIsBatchUpdateStockBasicInfosModalVisible(false);
    }
  };

  // 导入模块
  const [isImportStockBasicInfoModalVisible, setIsImportStockBasicInfoModalVisible] =
    useState<boolean>(false);
  const [isImportStockBasicInfoLoading, setIsImportStockBasicInfoLoading] =
    useState<boolean>(false);
  const [createStockBasicInfoList, setCreateStockBasicInfoList] = useState<CreateStockBasicInfo[]>([]);

  const onImportStockBasicInfo = () => {
    setIsImportStockBasicInfoModalVisible(true);
  };

  const handleImportStockBasicInfoCancel = () => {
    setIsImportStockBasicInfoModalVisible(false);
  };

  const onImportStockBasicInfoFinish = async (fileList: RcFile[]) => {
    try {
      setIsImportStockBasicInfoLoading(true);
      const createStockBasicInfoList = await importStockBasicInfo({ file: fileList[0] });
      setCreateStockBasicInfoList(createStockBasicInfoList.stockBasicInfos);
      return createStockBasicInfoList;
    } finally {
      setIsImportStockBasicInfoLoading(false);
    }
  };

  const handleImportStockBasicInfo = async () => {
    setIsImportStockBasicInfoLoading(true);
    try {
      await batchCreateStockBasicInfos({ stockBasicInfos: createStockBasicInfoList });
      message.success('导入成功');
      setIsImportStockBasicInfoModalVisible(false);
      mutateStockBasicInfos();
    } finally {
      setIsImportStockBasicInfoLoading(false);
      setCreateStockBasicInfoList([]);
    }
  };

  // 导出模块
  const [isExportLoading, setIsExportLoading] = useState<boolean>(false);
  const onStockBasicInfoExport = async () => {
    if (selectedRowKeys === null || selectedRowKeys.length === 0) {
      message.warning('请先选择导出的项目');
      return;
    }
    try {
      setIsExportLoading(true);
      await exportStockBasicInfo({ ids: selectedRows.map((row) => row.id) });
      resetSelectedRows();
    } finally {
      setIsExportLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 bg-white">
      <TransitionWrapper show={isQueryStockBasicInfoShow}>
        <QueryStockBasicInfoComponent
          onQueryStockBasicInfoFinish={onQueryStockBasicInfoFinish}
          onQueryStockBasicInfoReset={handleQueryStockBasicInfoReset}
          onQueryStockBasicInfoForm={queryStockBasicInfoForm}
        />
      </TransitionWrapper>
      <div>
        <ActionButtonComponent
          onCreate={onCreateStockBasicInfo }
          onImport={onImportStockBasicInfo }
          onExport={onStockBasicInfoExport}
          onBatchModify={onStockBasicInfoBatchModify}
          onConfirmBatchRemove={handleStockBasicInfoBatchRemove}
          onConfirmBatchRemoveCancel={handleStockBasicInfoBatchRemoveCancel}
          isQueryShow={isQueryStockBasicInfoShow}
          onQueryShow={onQueryStockBasicInfoShow}
          isExportDisabled={selectedRowKeys.length === 0}
          isBatchModifyDisabled={selectedRowKeys.length === 0}
          isBatchRemoveDisabled={selectedRowKeys.length === 0}
          isBatchRemoveLoading={isBatchRemoveLoading}
          isExportLoading={isExportLoading}
          rawColumns={ stockBasicInfoColumns as any[]}
          visibleColumns={visibleColumns as any[]}
          onToggleColumnVisibility={onToggleColumnVisibility}
          actionConfig={actionConfig}
          className="mb-2 mt-4"
        />
      </div>
      <div>
        <PaginatedTable<StockBasicInfo>
          columns={filteredStockBasicInfoColumns}
          dataSource={ stockBasicInfoListDataSource || []}
          total={total || 0}
          current={current}
          page_size={pageSize}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleSelectionChange}
          selectedRowKeys={selectedRowKeys}
          rowKey="id"
          loading={isStockBasicInfoListLoading}
        />
      </div>
      <div>
        <div>
          <CreateStockBasicInfoComponent
            isCreateStockBasicInfoModalVisible={isCreateStockBasicInfoModalVisible}
            onCreateStockBasicInfoCancel={handleCreateStockBasicInfoCancel}
            onCreateStockBasicInfoFinish={handleCreateStockBasicInfoFinish}
            isCreateStockBasicInfoLoading={isCreateStockBasicInfoLoading}
            createStockBasicInfoForm={createStockBasicInfoForm}
          />
        </div>
        <div>
          <StockBasicInfoDetailComponent
            isStockBasicInfoDetailDrawerVisible={isStockBasicInfoDetailDrawerVisible}
            onStockBasicInfoDetailClose={onStockBasicInfoDetailClose}
            stockBasicInfoDetail={ stockBasicInfoDetail}
            loading={isStockBasicInfoDetailLoading}
          />
        </div>
        <div>
          <UpdateStockBasicInfoComponent
            isUpdateStockBasicInfoModalVisible={isUpdateStockBasicInfoModalVisible}
            onUpdateStockBasicInfoCancel={handleUpdateStockBasicInfoCancel}
            onUpdateStockBasicInfoFinish={handleUpdateStockBasicInfoFinish}
            isUpdateStockBasicInfoLoading={isUpdateStockBasicInfoLoading}
            updateStockBasicInfoForm={updateStockBasicInfoForm}
          />
        </div>
        <div>
          <BatchUpdateStockBasicInfoComponent
            isBatchUpdateStockBasicInfosModalVisible={isBatchUpdateStockBasicInfosModalVisible}
            onBatchUpdateStockBasicInfosCancel={handleBatchUpdateStockBasicInfosCancel}
            onBatchUpdateStockBasicInfosFinish={handleBatchUpdateStockBasicInfosFinish}
            isBatchUpdateStockBasicInfosLoading={isBatchUpdateStockBasicInfosLoading}
            batchUpdateStockBasicInfosForm={ batchUpdateStockBasicInfosForm}
          />
        </div>

        <div>
          <ImportStockBasicInfoComponent
            isImportStockBasicInfoModalVisible={isImportStockBasicInfoModalVisible}
            isImportStockBasicInfoLoading={isImportStockBasicInfoLoading}
            onImportStockBasicInfoFinish={onImportStockBasicInfoFinish}
            onImportStockBasicInfoCancel={handleImportStockBasicInfoCancel}
            handleImportStockBasicInfo={handleImportStockBasicInfo }
          />
        </div>
      </div>
    </div>
  );
};

export default StockBasicInfoPage;