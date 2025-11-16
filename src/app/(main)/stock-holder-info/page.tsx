// SPDX-License-Identifier: MIT
'use client';

import ActionButtonComponent from '@/components/base/action-button';
import { PaginatedTable } from '@/components/base/paginated-table';
import TransitionWrapper from '@/components/base/transition-wrapper';
import {
  batchCreateStockHolderInfos,
  batchDeleteStockHolderInfo,
  batchUpdateStockHolderInfos,
  createStockHolderInfo,
  deleteStockHolderInfo,
  exportStockHolderInfo,
  importStockHolderInfo,
  updateStockHolderInfo,
  useStockHolderInfo,
  useStockHolderInfos,
} from '@/service/stock-holder-info';
import { createPaginationRequest } from '@/types';
import {
  BatchUpdateStockHolderInfo,
  CreateStockHolderInfo,
  ListStockHolderInfosRequest,
  StockHolderInfo,
  UpdateStockHolderInfo,
} from '@/types/stock-holder-info';
import { Form, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Eye, MoreHorizontal, PenLine, Trash2 } from 'lucide-react';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';
import BatchUpdateStockHolderInfoComponent from './components/batch-update-stock-holder-info';
import CreateStockHolderInfoComponent from './components/create-stock-holder-info';
import ImportStockHolderInfoComponent from './components/import-stock-holder-info';
import StockHolderInfoDetailComponent from './components/stock-holder-info-detail';
import QueryStockHolderInfoComponent from './components/query-stock-holder-info';
import UpdateStockHolderInfoComponent from './components/update-stock-holder-info';

const StockHolderInfoPage: React.FC = () => {
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
  const [isQueryStockHolderInfoShow, setIsQueryStockHolderInfoShow] = useState<boolean>(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [queryStockHolderInfoForm] = Form.useForm();
  const [stockHolderInfoQueryParams, setStockHolderInfoQueryParams] = useState<ListStockHolderInfosRequest>();

  // 用 useStockHolderInfos 获取菜单列表数据
  const {
    stockHolderInfos: stockHolderInfoListDataSource,
    total,
    isLoading: isStockHolderInfoListLoading,
    mutateStockHolderInfos,
  } = useStockHolderInfos({
    ...stockHolderInfoQueryParams,
    ...createPaginationRequest(current, pageSize),
  });

  const onQueryStockHolderInfoShow = () => {
    setIsQueryStockHolderInfoShow((prevState) => !prevState);
  };

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setCurrent(newPage);
    setPageSize(newPageSize);
  };

  const resetPagination = () => {
    setCurrent(1);
    setPageSize(10);
  };

  const handleQueryStockHolderInfoReset = () => {
    resetPagination();
    queryStockHolderInfoForm.resetFields();
    setStockHolderInfoQueryParams(undefined)
    mutateStockHolderInfos();
  };

  const onQueryStockHolderInfoFinish = async () => {
    const values = queryStockHolderInfoForm.getFieldsValue();
    const { create_time } = values;
    if (create_time) {
      const [startDate, endDate] = create_time;
      values.create_time = [
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD'),
      ];
    }
    const queryStockHolderInfo = values as ListStockHolderInfosRequest;
    const filteredQueryStockHolderInfo = Object.fromEntries(
      Object.entries(queryStockHolderInfo).filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      ),
    );
    resetPagination();
    setStockHolderInfoQueryParams(filteredQueryStockHolderInfo as ListStockHolderInfosRequest);
  };

  // 详情模块
  const [isStockHolderInfoDetailDrawerVisible, setIsStockHolderInfoDetailDrawerVisible] =
    useState(false);
  const [selectedStockHolderInfoId, setSelectedStockHolderInfoId] = useState<string | null>(null);

  const { stockHolderInfo: stockHolderInfoDetail, isLoading: isStockHolderInfoDetailLoading } = useStockHolderInfo(
    selectedStockHolderInfoId || '',
  );

  const onStockHolderInfoDetail = (stockHolderInfo: StockHolderInfo) => {
    setSelectedStockHolderInfoId(stockHolderInfo.id);
    setIsStockHolderInfoDetailDrawerVisible(true);
  };

  const onStockHolderInfoDetailClose = () => {
    setSelectedStockHolderInfoId(null);
    setIsStockHolderInfoDetailDrawerVisible(false);
  };

  // 表格列信息
  const stockHolderInfoColumns: ColumnsType<StockHolderInfo> = [
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
      render: (_: number, _record: StockHolderInfo, rowIndex: number) => rowIndex + 1,
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
      title: "股东名称",
      dataIndex: "holder_name",
      key: "holder_name",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "股东信息",
      dataIndex: "holder_info",
      key: "holder_info",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "股东类型",
      dataIndex: "holder_type",
      key: "holder_type",
      width: "6%",
    },
    {
      title: "持股数量",
      dataIndex: "share_amount",
      key: "share_amount",
      width: "6%",
    },
    {
      title: "持股比例",
      dataIndex: "share_ratio",
      key: "share_ratio",
      width: "6%",
    },
    {
      title: "持股变动数量",
      dataIndex: "change_amount",
      key: "change_amount",
      width: "6%",
    },
    {
      title: "变动类型",
      dataIndex: "change_type",
      key: "change_type",
      width: "6%",
    },
    {
      title: "报告日期",
      dataIndex: "report_date",
      key: "report_date",
      render: (text: string) => (
        text ? <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>: "-"
      ),
      width: "14%",
      ellipsis: true,
    },
    {
      title: "是否十大股东",
      dataIndex: "is_top_ten",
      key: "is_top_ten",
      width: "6%",
    },
    {
      title: "股东排名",
      dataIndex: "ranking",
      key: "ranking",
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
            onClick={ () => onStockHolderInfoDetail(record)}
          >
            <Eye className="w-3 h-3" />
            详情
          </button>
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs btn-operation"
            onClick={ () => onUpdateStockHolderInfo(record)}
          >
            <PenLine className="w-3 h-3" />
            编辑
          </button>
          <Popconfirm
            title="确认删除"
            description="确定删除吗? 删除后将无法找回"
            onConfirm={() => handleDeleteStockHolderInfo(record)}
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
    stockHolderInfoColumns.map((col) => col.key),
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
  const filteredStockHolderInfoColumns = stockHolderInfoColumns.filter((col) =>
    visibleColumns.includes(col.key),
  );

  // 新增模块
  const [isCreateStockHolderInfoModalVisible, setIsCreateStockHolderInfoModalVisible] =
    useState(false);
  const [isCreateStockHolderInfoLoading, setIsCreateStockHolderInfoLoading] = useState(false);
  const [createStockHolderInfoForm] = Form.useForm();

  const onCreateStockHolderInfo = () => {
    setIsCreateStockHolderInfoModalVisible(true);
  };
  const handleCreateStockHolderInfoCancel = () => {
    createStockHolderInfoForm.resetFields();
    setIsCreateStockHolderInfoModalVisible(false);
  };
  const handleCreateStockHolderInfoFinish = async (data: CreateStockHolderInfo) => {
    setIsCreateStockHolderInfoLoading(true);
    try {
      await createStockHolderInfo({ stockHolderInfo: data });
      message.success('新增成功');
      createStockHolderInfoForm.resetFields();
      setIsCreateStockHolderInfoModalVisible(false);
      mutateStockHolderInfos();
    } finally {
      setIsCreateStockHolderInfoLoading(false);
    }
  };

  // 单个删除模块
  const handleDeleteStockHolderInfo = async (stockHolderInfo: StockHolderInfo) => {
    await deleteStockHolderInfo(stockHolderInfo.id);
    message.success('删除成功');
    mutateStockHolderInfos();
  };

  // 批量删除模块
  const [isBatchRemoveLoading, setIsBatchRemoveLoading] =
    useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<StockHolderInfo[]>([]);

  const resetSelectedRows = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const handleSelectionChange = (
    selectedRowKeys: React.Key[],
    selectedRows: StockHolderInfo[],
  ) => {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleStockHolderInfoBatchRemove = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的项目');
      return;
    }
    try {
      setIsBatchRemoveLoading(true);
      await batchDeleteStockHolderInfo({ ids: selectedRows.map((row) => row.id) });
      message.success('删除成功');
      mutateStockHolderInfos();
      resetSelectedRows();
    } finally {
      setIsBatchRemoveLoading(false);
    }
  };

  const handleStockHolderInfoBatchRemoveCancel = async () => {
    resetSelectedRows();
    message.info('操作已取消');
  };

  // 单个更新模块
  const [isUpdateStockHolderInfoModalVisible, setIsUpdateStockHolderInfoModalVisible] =
    useState<boolean>(false);
  const [isUpdateStockHolderInfoLoading, setIsUpdateStockHolderInfoLoading] =
    useState<boolean>(false);
  const [updateStockHolderInfoForm] = Form.useForm();

  const onUpdateStockHolderInfo = (stockHolderInfo: StockHolderInfo) => {
    setIsUpdateStockHolderInfoModalVisible(true);
    setSelectedRowKeys([stockHolderInfo.id]);
    setSelectedRows([stockHolderInfo]);
    updateStockHolderInfoForm.setFieldsValue({ ...stockHolderInfo });
  };

  const handleUpdateStockHolderInfoCancel = () => {
    resetSelectedRows();
    updateStockHolderInfoForm.resetFields();
    setIsUpdateStockHolderInfoModalVisible(false);
  };

  const handleUpdateStockHolderInfoFinish = async () => {
    const updateStockHolderInfoData =
      (await updateStockHolderInfoForm.validateFields()) as UpdateStockHolderInfo;
    const req = { ...updateStockHolderInfoData, id: selectedRows[0].id };
    setIsUpdateStockHolderInfoLoading(true);
    try {
      await updateStockHolderInfo({ stockHolderInfo: req });
      updateStockHolderInfoForm.resetFields();
      message.success('更新成功');
      mutateStockHolderInfos();
      resetSelectedRows();
    } finally {
      setIsUpdateStockHolderInfoLoading(false);
      setIsUpdateStockHolderInfoModalVisible(false);
    }
  };

  // 批量更新模块
  const onStockHolderInfoBatchModify = () => {
    if (selectedRowKeys.length === 1) {
      setIsUpdateStockHolderInfoModalVisible(true);
      updateStockHolderInfoForm.setFieldsValue({ ...selectedRows[0] });
    } else {
      setIsBatchUpdateStockHolderInfosModalVisible(true);
      batchUpdateStockHolderInfosForm.resetFields();
    }
  };
  const [isBatchUpdateStockHolderInfosModalVisible, setIsBatchUpdateStockHolderInfosModalVisible] =
    useState<boolean>(false);
  const [isBatchUpdateStockHolderInfosLoading, setIsBatchUpdateStockHolderInfosLoading] =
    useState<boolean>(false);
  const [batchUpdateStockHolderInfosForm] = Form.useForm();

  const handleBatchUpdateStockHolderInfosCancel = async () => {
    batchUpdateStockHolderInfosForm.resetFields();
    setIsBatchUpdateStockHolderInfosModalVisible(false);
    resetSelectedRows();
    message.info('操作已取消');
  };

  const handleBatchUpdateStockHolderInfosFinish = async () => {
    const stockHolderInfoBatchModify =
      (await batchUpdateStockHolderInfosForm.validateFields()) as BatchUpdateStockHolderInfo;
    setIsBatchUpdateStockHolderInfosLoading(true);
    if (selectedRows === null || selectedRows.length === 0) {
      message.warning('请选择要更新的项目');
      return;
    }
    try {
      const ids = selectedRows.map((row) => row.id);
      await batchUpdateStockHolderInfos({ ids: ids, stockHolderInfo: stockHolderInfoBatchModify });
      batchUpdateStockHolderInfosForm.resetFields();
      message.success('更新成功');
      mutateStockHolderInfos();
      resetSelectedRows();
    } finally {
      setIsBatchUpdateStockHolderInfosLoading(false);
      setIsBatchUpdateStockHolderInfosModalVisible(false);
    }
  };

  // 导入模块
  const [isImportStockHolderInfoModalVisible, setIsImportStockHolderInfoModalVisible] =
    useState<boolean>(false);
  const [isImportStockHolderInfoLoading, setIsImportStockHolderInfoLoading] =
    useState<boolean>(false);
  const [createStockHolderInfoList, setCreateStockHolderInfoList] = useState<CreateStockHolderInfo[]>([]);

  const onImportStockHolderInfo = () => {
    setIsImportStockHolderInfoModalVisible(true);
  };

  const handleImportStockHolderInfoCancel = () => {
    setIsImportStockHolderInfoModalVisible(false);
  };

  const onImportStockHolderInfoFinish = async (fileList: RcFile[]) => {
    try {
      setIsImportStockHolderInfoLoading(true);
      const createStockHolderInfoList = await importStockHolderInfo({ file: fileList[0] });
      setCreateStockHolderInfoList(createStockHolderInfoList.stockHolderInfos);
      return createStockHolderInfoList;
    } finally {
      setIsImportStockHolderInfoLoading(false);
    }
  };

  const handleImportStockHolderInfo = async () => {
    setIsImportStockHolderInfoLoading(true);
    try {
      await batchCreateStockHolderInfos({ stockHolderInfos: createStockHolderInfoList });
      message.success('导入成功');
      setIsImportStockHolderInfoModalVisible(false);
      mutateStockHolderInfos();
    } finally {
      setIsImportStockHolderInfoLoading(false);
      setCreateStockHolderInfoList([]);
    }
  };

  // 导出模块
  const [isExportLoading, setIsExportLoading] = useState<boolean>(false);
  const onStockHolderInfoExport = async () => {
    if (selectedRowKeys === null || selectedRowKeys.length === 0) {
      message.warning('请先选择导出的项目');
      return;
    }
    try {
      setIsExportLoading(true);
      await exportStockHolderInfo({ ids: selectedRows.map((row) => row.id) });
      resetSelectedRows();
    } finally {
      setIsExportLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 bg-white">
      <TransitionWrapper show={isQueryStockHolderInfoShow}>
        <QueryStockHolderInfoComponent
          onQueryStockHolderInfoFinish={onQueryStockHolderInfoFinish}
          onQueryStockHolderInfoReset={handleQueryStockHolderInfoReset}
          onQueryStockHolderInfoForm={queryStockHolderInfoForm}
        />
      </TransitionWrapper>
      <div>
        <ActionButtonComponent
          onCreate={onCreateStockHolderInfo }
          onImport={onImportStockHolderInfo }
          onExport={onStockHolderInfoExport}
          onBatchModify={onStockHolderInfoBatchModify}
          onConfirmBatchRemove={handleStockHolderInfoBatchRemove}
          onConfirmBatchRemoveCancel={handleStockHolderInfoBatchRemoveCancel}
          isQueryShow={isQueryStockHolderInfoShow}
          onQueryShow={onQueryStockHolderInfoShow}
          isExportDisabled={selectedRowKeys.length === 0}
          isBatchModifyDisabled={selectedRowKeys.length === 0}
          isBatchRemoveDisabled={selectedRowKeys.length === 0}
          isBatchRemoveLoading={isBatchRemoveLoading}
          isExportLoading={isExportLoading}
          rawColumns={ stockHolderInfoColumns as any[]}
          visibleColumns={visibleColumns as any[]}
          onToggleColumnVisibility={onToggleColumnVisibility}
          actionConfig={actionConfig}
          className="mb-2 mt-4"
        />
      </div>
      <div>
        <PaginatedTable<StockHolderInfo>
          columns={filteredStockHolderInfoColumns}
          dataSource={ stockHolderInfoListDataSource || []}
          total={total || 0}
          current={current}
          page_size={pageSize}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleSelectionChange}
          selectedRowKeys={selectedRowKeys}
          rowKey="id"
          loading={isStockHolderInfoListLoading}
        />
      </div>
      <div>
        <div>
          <CreateStockHolderInfoComponent
            isCreateStockHolderInfoModalVisible={isCreateStockHolderInfoModalVisible}
            onCreateStockHolderInfoCancel={handleCreateStockHolderInfoCancel}
            onCreateStockHolderInfoFinish={handleCreateStockHolderInfoFinish}
            isCreateStockHolderInfoLoading={isCreateStockHolderInfoLoading}
            createStockHolderInfoForm={createStockHolderInfoForm}
          />
        </div>
        <div>
          <StockHolderInfoDetailComponent
            isStockHolderInfoDetailDrawerVisible={isStockHolderInfoDetailDrawerVisible}
            onStockHolderInfoDetailClose={onStockHolderInfoDetailClose}
            stockHolderInfoDetail={ stockHolderInfoDetail}
            loading={isStockHolderInfoDetailLoading}
          />
        </div>
        <div>
          <UpdateStockHolderInfoComponent
            isUpdateStockHolderInfoModalVisible={isUpdateStockHolderInfoModalVisible}
            onUpdateStockHolderInfoCancel={handleUpdateStockHolderInfoCancel}
            onUpdateStockHolderInfoFinish={handleUpdateStockHolderInfoFinish}
            isUpdateStockHolderInfoLoading={isUpdateStockHolderInfoLoading}
            updateStockHolderInfoForm={updateStockHolderInfoForm}
          />
        </div>
        <div>
          <BatchUpdateStockHolderInfoComponent
            isBatchUpdateStockHolderInfosModalVisible={isBatchUpdateStockHolderInfosModalVisible}
            onBatchUpdateStockHolderInfosCancel={handleBatchUpdateStockHolderInfosCancel}
            onBatchUpdateStockHolderInfosFinish={handleBatchUpdateStockHolderInfosFinish}
            isBatchUpdateStockHolderInfosLoading={isBatchUpdateStockHolderInfosLoading}
            batchUpdateStockHolderInfosForm={ batchUpdateStockHolderInfosForm}
          />
        </div>

        <div>
          <ImportStockHolderInfoComponent
            isImportStockHolderInfoModalVisible={isImportStockHolderInfoModalVisible}
            isImportStockHolderInfoLoading={isImportStockHolderInfoLoading}
            onImportStockHolderInfoFinish={onImportStockHolderInfoFinish}
            onImportStockHolderInfoCancel={handleImportStockHolderInfoCancel}
            handleImportStockHolderInfo={handleImportStockHolderInfo }
          />
        </div>
      </div>
    </div>
  );
};

export default StockHolderInfoPage;