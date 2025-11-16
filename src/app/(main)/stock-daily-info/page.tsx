// SPDX-License-Identifier: MIT
'use client';

import ActionButtonComponent from '@/components/base/action-button';
import { PaginatedTable } from '@/components/base/paginated-table';
import TransitionWrapper from '@/components/base/transition-wrapper';
import {
  batchCreateStockDailyInfos,
  batchDeleteStockDailyInfo,
  batchUpdateStockDailyInfos,
  createStockDailyInfo,
  deleteStockDailyInfo,
  exportStockDailyInfo,
  importStockDailyInfo,
  updateStockDailyInfo,
  useStockDailyInfo,
  useStockDailyInfos,
} from '@/service/stock-daily-info';
import { createPaginationRequest } from '@/types';
import {
  BatchUpdateStockDailyInfo,
  CreateStockDailyInfo,
  ListStockDailyInfosRequest,
  StockDailyInfo,
  UpdateStockDailyInfo,
} from '@/types/stock-daily-info';
import { Form, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Eye, MoreHorizontal, PenLine, Trash2 } from 'lucide-react';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';
import BatchUpdateStockDailyInfoComponent from './components/batch-update-stock-daily-info';
import CreateStockDailyInfoComponent from './components/create-stock-daily-info';
import ImportStockDailyInfoComponent from './components/import-stock-daily-info';
import StockDailyInfoDetailComponent from './components/stock-daily-info-detail';
import QueryStockDailyInfoComponent from './components/query-stock-daily-info';
import UpdateStockDailyInfoComponent from './components/update-stock-daily-info';

const StockDailyInfoPage: React.FC = () => {
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
  const [isQueryStockDailyInfoShow, setIsQueryStockDailyInfoShow] = useState<boolean>(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [queryStockDailyInfoForm] = Form.useForm();
  const [stockDailyInfoQueryParams, setStockDailyInfoQueryParams] = useState<ListStockDailyInfosRequest>();

  // 用 useStockDailyInfos 获取菜单列表数据
  const {
    stockDailyInfos: stockDailyInfoListDataSource,
    total,
    isLoading: isStockDailyInfoListLoading,
    mutateStockDailyInfos,
  } = useStockDailyInfos({
    ...stockDailyInfoQueryParams,
    ...createPaginationRequest(current, pageSize),
  });

  const onQueryStockDailyInfoShow = () => {
    setIsQueryStockDailyInfoShow((prevState) => !prevState);
  };

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setCurrent(newPage);
    setPageSize(newPageSize);
  };

  const resetPagination = () => {
    setCurrent(1);
    setPageSize(10);
  };

  const handleQueryStockDailyInfoReset = () => {
    resetPagination();
    queryStockDailyInfoForm.resetFields();
    setStockDailyInfoQueryParams(undefined)
    mutateStockDailyInfos();
  };

  const onQueryStockDailyInfoFinish = async () => {
    const values = queryStockDailyInfoForm.getFieldsValue();
    const { create_time } = values;
    if (create_time) {
      const [startDate, endDate] = create_time;
      values.create_time = [
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD'),
      ];
    }
    const queryStockDailyInfo = values as ListStockDailyInfosRequest;
    const filteredQueryStockDailyInfo = Object.fromEntries(
      Object.entries(queryStockDailyInfo).filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      ),
    );
    resetPagination();
    setStockDailyInfoQueryParams(filteredQueryStockDailyInfo as ListStockDailyInfosRequest);
  };

  // 详情模块
  const [isStockDailyInfoDetailDrawerVisible, setIsStockDailyInfoDetailDrawerVisible] =
    useState(false);
  const [selectedStockDailyInfoId, setSelectedStockDailyInfoId] = useState<string | null>(null);

  const { stockDailyInfo: stockDailyInfoDetail, isLoading: isStockDailyInfoDetailLoading } = useStockDailyInfo(
    selectedStockDailyInfoId || '',
  );

  const onStockDailyInfoDetail = (stockDailyInfo: StockDailyInfo) => {
    setSelectedStockDailyInfoId(stockDailyInfo.id);
    setIsStockDailyInfoDetailDrawerVisible(true);
  };

  const onStockDailyInfoDetailClose = () => {
    setSelectedStockDailyInfoId(null);
    setIsStockDailyInfoDetailDrawerVisible(false);
  };

  // 表格列信息
  const stockDailyInfoColumns: ColumnsType<StockDailyInfo> = [
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
      render: (_: number, _record: StockDailyInfo, rowIndex: number) => rowIndex + 1,
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
      title: "交易日期",
      dataIndex: "trade_date",
      key: "trade_date",
      render: (text: string) => (
        text ? <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>: "-"
      ),
      width: "14%",
      ellipsis: true,
    },
    {
      title: "开盘价",
      dataIndex: "open_price",
      key: "open_price",
      width: "6%",
    },
    {
      title: "收盘价",
      dataIndex: "close_price",
      key: "close_price",
      width: "6%",
    },
    {
      title: "最高价",
      dataIndex: "high_price",
      key: "high_price",
      width: "6%",
    },
    {
      title: "最低价",
      dataIndex: "low_price",
      key: "low_price",
      width: "6%",
    },
    {
      title: "成交量",
      dataIndex: "volume",
      key: "volume",
      width: "6%",
    },
    {
      title: "成交额",
      dataIndex: "turnover",
      key: "turnover",
      width: "6%",
    },
    {
      title: "涨跌额",
      dataIndex: "change_amount",
      key: "change_amount",
      width: "6%",
    },
    {
      title: "涨跌幅",
      dataIndex: "change_rate",
      key: "change_rate",
      width: "6%",
    },
    {
      title: "市盈率",
      dataIndex: "pe_ratio",
      key: "pe_ratio",
      width: "6%",
    },
    {
      title: "市净率",
      dataIndex: "pb_ratio",
      key: "pb_ratio",
      width: "6%",
    },
    {
      title: "总市值",
      dataIndex: "market_cap",
      key: "market_cap",
      width: "6%",
    },
    {
      title: "流通市值",
      dataIndex: "circulating_market_cap",
      key: "circulating_market_cap",
      width: "6%",
    },
    {
      title: "换手率",
      dataIndex: "turnover_rate",
      key: "turnover_rate",
      width: "6%",
    },
    {
      title: "买一价",
      dataIndex: "bid_price1",
      key: "bid_price1",
      width: "6%",
    },
    {
      title: "买二价",
      dataIndex: "bid_price2",
      key: "bid_price2",
      width: "6%",
    },
    {
      title: "买三价",
      dataIndex: "bid_price3",
      key: "bid_price3",
      width: "6%",
    },
    {
      title: "买四价",
      dataIndex: "bid_price4",
      key: "bid_price4",
      width: "6%",
    },
    {
      title: "买五价",
      dataIndex: "bid_price5",
      key: "bid_price5",
      width: "6%",
    },
    {
      title: "买一量",
      dataIndex: "bid_volume1",
      key: "bid_volume1",
      width: "6%",
    },
    {
      title: "买二量",
      dataIndex: "bid_volume2",
      key: "bid_volume2",
      width: "6%",
    },
    {
      title: "买三量",
      dataIndex: "bid_volume3",
      key: "bid_volume3",
      width: "6%",
    },
    {
      title: "买四量",
      dataIndex: "bid_volume4",
      key: "bid_volume4",
      width: "6%",
    },
    {
      title: "买五量",
      dataIndex: "bid_volume5",
      key: "bid_volume5",
      width: "6%",
    },
    {
      title: "卖一价",
      dataIndex: "ask_price1",
      key: "ask_price1",
      width: "6%",
    },
    {
      title: "卖二价",
      dataIndex: "ask_price2",
      key: "ask_price2",
      width: "6%",
    },
    {
      title: "卖三价",
      dataIndex: "ask_price3",
      key: "ask_price3",
      width: "6%",
    },
    {
      title: "卖四价",
      dataIndex: "ask_price4",
      key: "ask_price4",
      width: "6%",
    },
    {
      title: "卖五价",
      dataIndex: "ask_price5",
      key: "ask_price5",
      width: "6%",
    },
    {
      title: "卖一量",
      dataIndex: "ask_volume1",
      key: "ask_volume1",
      width: "6%",
    },
    {
      title: "卖二量",
      dataIndex: "ask_volume2",
      key: "ask_volume2",
      width: "6%",
    },
    {
      title: "卖三量",
      dataIndex: "ask_volume3",
      key: "ask_volume3",
      width: "6%",
    },
    {
      title: "卖四量",
      dataIndex: "ask_volume4",
      key: "ask_volume4",
      width: "6%",
    },
    {
      title: "卖五量",
      dataIndex: "ask_volume5",
      key: "ask_volume5",
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
            onClick={ () => onStockDailyInfoDetail(record)}
          >
            <Eye className="w-3 h-3" />
            详情
          </button>
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs btn-operation"
            onClick={ () => onUpdateStockDailyInfo(record)}
          >
            <PenLine className="w-3 h-3" />
            编辑
          </button>
          <Popconfirm
            title="确认删除"
            description="确定删除吗? 删除后将无法找回"
            onConfirm={() => handleDeleteStockDailyInfo(record)}
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
    stockDailyInfoColumns.map((col) => col.key),
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
  const filteredStockDailyInfoColumns = stockDailyInfoColumns.filter((col) =>
    visibleColumns.includes(col.key),
  );

  // 新增模块
  const [isCreateStockDailyInfoModalVisible, setIsCreateStockDailyInfoModalVisible] =
    useState(false);
  const [isCreateStockDailyInfoLoading, setIsCreateStockDailyInfoLoading] = useState(false);
  const [createStockDailyInfoForm] = Form.useForm();

  const onCreateStockDailyInfo = () => {
    setIsCreateStockDailyInfoModalVisible(true);
  };
  const handleCreateStockDailyInfoCancel = () => {
    createStockDailyInfoForm.resetFields();
    setIsCreateStockDailyInfoModalVisible(false);
  };
  const handleCreateStockDailyInfoFinish = async (data: CreateStockDailyInfo) => {
    setIsCreateStockDailyInfoLoading(true);
    try {
      await createStockDailyInfo({ stockDailyInfo: data });
      message.success('新增成功');
      createStockDailyInfoForm.resetFields();
      setIsCreateStockDailyInfoModalVisible(false);
      mutateStockDailyInfos();
    } finally {
      setIsCreateStockDailyInfoLoading(false);
    }
  };

  // 单个删除模块
  const handleDeleteStockDailyInfo = async (stockDailyInfo: StockDailyInfo) => {
    await deleteStockDailyInfo(stockDailyInfo.id);
    message.success('删除成功');
    mutateStockDailyInfos();
  };

  // 批量删除模块
  const [isBatchRemoveLoading, setIsBatchRemoveLoading] =
    useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<StockDailyInfo[]>([]);

  const resetSelectedRows = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const handleSelectionChange = (
    selectedRowKeys: React.Key[],
    selectedRows: StockDailyInfo[],
  ) => {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleStockDailyInfoBatchRemove = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的项目');
      return;
    }
    try {
      setIsBatchRemoveLoading(true);
      await batchDeleteStockDailyInfo({ ids: selectedRows.map((row) => row.id) });
      message.success('删除成功');
      mutateStockDailyInfos();
      resetSelectedRows();
    } finally {
      setIsBatchRemoveLoading(false);
    }
  };

  const handleStockDailyInfoBatchRemoveCancel = async () => {
    resetSelectedRows();
    message.info('操作已取消');
  };

  // 单个更新模块
  const [isUpdateStockDailyInfoModalVisible, setIsUpdateStockDailyInfoModalVisible] =
    useState<boolean>(false);
  const [isUpdateStockDailyInfoLoading, setIsUpdateStockDailyInfoLoading] =
    useState<boolean>(false);
  const [updateStockDailyInfoForm] = Form.useForm();

  const onUpdateStockDailyInfo = (stockDailyInfo: StockDailyInfo) => {
    setIsUpdateStockDailyInfoModalVisible(true);
    setSelectedRowKeys([stockDailyInfo.id]);
    setSelectedRows([stockDailyInfo]);
    updateStockDailyInfoForm.setFieldsValue({ ...stockDailyInfo });
  };

  const handleUpdateStockDailyInfoCancel = () => {
    resetSelectedRows();
    updateStockDailyInfoForm.resetFields();
    setIsUpdateStockDailyInfoModalVisible(false);
  };

  const handleUpdateStockDailyInfoFinish = async () => {
    const updateStockDailyInfoData =
      (await updateStockDailyInfoForm.validateFields()) as UpdateStockDailyInfo;
    const req = { ...updateStockDailyInfoData, id: selectedRows[0].id };
    setIsUpdateStockDailyInfoLoading(true);
    try {
      await updateStockDailyInfo({ stockDailyInfo: req });
      updateStockDailyInfoForm.resetFields();
      message.success('更新成功');
      mutateStockDailyInfos();
      resetSelectedRows();
    } finally {
      setIsUpdateStockDailyInfoLoading(false);
      setIsUpdateStockDailyInfoModalVisible(false);
    }
  };

  // 批量更新模块
  const onStockDailyInfoBatchModify = () => {
    if (selectedRowKeys.length === 1) {
      setIsUpdateStockDailyInfoModalVisible(true);
      updateStockDailyInfoForm.setFieldsValue({ ...selectedRows[0] });
    } else {
      setIsBatchUpdateStockDailyInfosModalVisible(true);
      batchUpdateStockDailyInfosForm.resetFields();
    }
  };
  const [isBatchUpdateStockDailyInfosModalVisible, setIsBatchUpdateStockDailyInfosModalVisible] =
    useState<boolean>(false);
  const [isBatchUpdateStockDailyInfosLoading, setIsBatchUpdateStockDailyInfosLoading] =
    useState<boolean>(false);
  const [batchUpdateStockDailyInfosForm] = Form.useForm();

  const handleBatchUpdateStockDailyInfosCancel = async () => {
    batchUpdateStockDailyInfosForm.resetFields();
    setIsBatchUpdateStockDailyInfosModalVisible(false);
    resetSelectedRows();
    message.info('操作已取消');
  };

  const handleBatchUpdateStockDailyInfosFinish = async () => {
    const stockDailyInfoBatchModify =
      (await batchUpdateStockDailyInfosForm.validateFields()) as BatchUpdateStockDailyInfo;
    setIsBatchUpdateStockDailyInfosLoading(true);
    if (selectedRows === null || selectedRows.length === 0) {
      message.warning('请选择要更新的项目');
      return;
    }
    try {
      const ids = selectedRows.map((row) => row.id);
      await batchUpdateStockDailyInfos({ ids: ids, stockDailyInfo: stockDailyInfoBatchModify });
      batchUpdateStockDailyInfosForm.resetFields();
      message.success('更新成功');
      mutateStockDailyInfos();
      resetSelectedRows();
    } finally {
      setIsBatchUpdateStockDailyInfosLoading(false);
      setIsBatchUpdateStockDailyInfosModalVisible(false);
    }
  };

  // 导入模块
  const [isImportStockDailyInfoModalVisible, setIsImportStockDailyInfoModalVisible] =
    useState<boolean>(false);
  const [isImportStockDailyInfoLoading, setIsImportStockDailyInfoLoading] =
    useState<boolean>(false);
  const [createStockDailyInfoList, setCreateStockDailyInfoList] = useState<CreateStockDailyInfo[]>([]);

  const onImportStockDailyInfo = () => {
    setIsImportStockDailyInfoModalVisible(true);
  };

  const handleImportStockDailyInfoCancel = () => {
    setIsImportStockDailyInfoModalVisible(false);
  };

  const onImportStockDailyInfoFinish = async (fileList: RcFile[]) => {
    try {
      setIsImportStockDailyInfoLoading(true);
      const createStockDailyInfoList = await importStockDailyInfo({ file: fileList[0] });
      setCreateStockDailyInfoList(createStockDailyInfoList.stockDailyInfos);
      return createStockDailyInfoList;
    } finally {
      setIsImportStockDailyInfoLoading(false);
    }
  };

  const handleImportStockDailyInfo = async () => {
    setIsImportStockDailyInfoLoading(true);
    try {
      await batchCreateStockDailyInfos({ stockDailyInfos: createStockDailyInfoList });
      message.success('导入成功');
      setIsImportStockDailyInfoModalVisible(false);
      mutateStockDailyInfos();
    } finally {
      setIsImportStockDailyInfoLoading(false);
      setCreateStockDailyInfoList([]);
    }
  };

  // 导出模块
  const [isExportLoading, setIsExportLoading] = useState<boolean>(false);
  const onStockDailyInfoExport = async () => {
    if (selectedRowKeys === null || selectedRowKeys.length === 0) {
      message.warning('请先选择导出的项目');
      return;
    }
    try {
      setIsExportLoading(true);
      await exportStockDailyInfo({ ids: selectedRows.map((row) => row.id) });
      resetSelectedRows();
    } finally {
      setIsExportLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 bg-white">
      <TransitionWrapper show={isQueryStockDailyInfoShow}>
        <QueryStockDailyInfoComponent
          onQueryStockDailyInfoFinish={onQueryStockDailyInfoFinish}
          onQueryStockDailyInfoReset={handleQueryStockDailyInfoReset}
          onQueryStockDailyInfoForm={queryStockDailyInfoForm}
        />
      </TransitionWrapper>
      <div>
        <ActionButtonComponent
          onCreate={onCreateStockDailyInfo }
          onImport={onImportStockDailyInfo }
          onExport={onStockDailyInfoExport}
          onBatchModify={onStockDailyInfoBatchModify}
          onConfirmBatchRemove={handleStockDailyInfoBatchRemove}
          onConfirmBatchRemoveCancel={handleStockDailyInfoBatchRemoveCancel}
          isQueryShow={isQueryStockDailyInfoShow}
          onQueryShow={onQueryStockDailyInfoShow}
          isExportDisabled={selectedRowKeys.length === 0}
          isBatchModifyDisabled={selectedRowKeys.length === 0}
          isBatchRemoveDisabled={selectedRowKeys.length === 0}
          isBatchRemoveLoading={isBatchRemoveLoading}
          isExportLoading={isExportLoading}
          rawColumns={ stockDailyInfoColumns as any[]}
          visibleColumns={visibleColumns as any[]}
          onToggleColumnVisibility={onToggleColumnVisibility}
          actionConfig={actionConfig}
          className="mb-2 mt-4"
        />
      </div>
      <div>
        <PaginatedTable<StockDailyInfo>
          columns={filteredStockDailyInfoColumns}
          dataSource={ stockDailyInfoListDataSource || []}
          total={total || 0}
          current={current}
          page_size={pageSize}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleSelectionChange}
          selectedRowKeys={selectedRowKeys}
          rowKey="id"
          loading={isStockDailyInfoListLoading}
        />
      </div>
      <div>
        <div>
          <CreateStockDailyInfoComponent
            isCreateStockDailyInfoModalVisible={isCreateStockDailyInfoModalVisible}
            onCreateStockDailyInfoCancel={handleCreateStockDailyInfoCancel}
            onCreateStockDailyInfoFinish={handleCreateStockDailyInfoFinish}
            isCreateStockDailyInfoLoading={isCreateStockDailyInfoLoading}
            createStockDailyInfoForm={createStockDailyInfoForm}
          />
        </div>
        <div>
          <StockDailyInfoDetailComponent
            isStockDailyInfoDetailDrawerVisible={isStockDailyInfoDetailDrawerVisible}
            onStockDailyInfoDetailClose={onStockDailyInfoDetailClose}
            stockDailyInfoDetail={ stockDailyInfoDetail}
            loading={isStockDailyInfoDetailLoading}
          />
        </div>
        <div>
          <UpdateStockDailyInfoComponent
            isUpdateStockDailyInfoModalVisible={isUpdateStockDailyInfoModalVisible}
            onUpdateStockDailyInfoCancel={handleUpdateStockDailyInfoCancel}
            onUpdateStockDailyInfoFinish={handleUpdateStockDailyInfoFinish}
            isUpdateStockDailyInfoLoading={isUpdateStockDailyInfoLoading}
            updateStockDailyInfoForm={updateStockDailyInfoForm}
          />
        </div>
        <div>
          <BatchUpdateStockDailyInfoComponent
            isBatchUpdateStockDailyInfosModalVisible={isBatchUpdateStockDailyInfosModalVisible}
            onBatchUpdateStockDailyInfosCancel={handleBatchUpdateStockDailyInfosCancel}
            onBatchUpdateStockDailyInfosFinish={handleBatchUpdateStockDailyInfosFinish}
            isBatchUpdateStockDailyInfosLoading={isBatchUpdateStockDailyInfosLoading}
            batchUpdateStockDailyInfosForm={ batchUpdateStockDailyInfosForm}
          />
        </div>

        <div>
          <ImportStockDailyInfoComponent
            isImportStockDailyInfoModalVisible={isImportStockDailyInfoModalVisible}
            isImportStockDailyInfoLoading={isImportStockDailyInfoLoading}
            onImportStockDailyInfoFinish={onImportStockDailyInfoFinish}
            onImportStockDailyInfoCancel={handleImportStockDailyInfoCancel}
            handleImportStockDailyInfo={handleImportStockDailyInfo }
          />
        </div>
      </div>
    </div>
  );
};

export default StockDailyInfoPage;