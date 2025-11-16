// SPDX-License-Identifier: MIT
'use client';

import ActionButtonComponent from '@/components/base/action-button';
import { PaginatedTable } from '@/components/base/paginated-table';
import TransitionWrapper from '@/components/base/transition-wrapper';
import {
  batchCreateIntelligenceInformation,
  batchDeleteIntelligenceInformation,
  batchUpdateIntelligenceInformation,
  createIntelligenceInformation,
  deleteIntelligenceInformation,
  exportIntelligenceInformation,
  importIntelligenceInformation,
  updateIntelligenceInformation,
  useIntelligenceInformation,
  useIntelligenceInformation,
} from '@/service/intelligence-information';
import { createPaginationRequest } from '@/types';
import {
  BatchUpdateIntelligenceInformation,
  CreateIntelligenceInformation,
  ListIntelligenceInformationRequest,
  IntelligenceInformation,
  UpdateIntelligenceInformation,
} from '@/types/intelligence-information';
import { Form, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Eye, MoreHorizontal, PenLine, Trash2 } from 'lucide-react';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';
import BatchUpdateIntelligenceInformationComponent from './components/batch-update-intelligence-information';
import CreateIntelligenceInformationComponent from './components/create-intelligence-information';
import ImportIntelligenceInformationComponent from './components/import-intelligence-information';
import IntelligenceInformationDetailComponent from './components/intelligence-information-detail';
import QueryIntelligenceInformationComponent from './components/query-intelligence-information';
import UpdateIntelligenceInformationComponent from './components/update-intelligence-information';

const IntelligenceInformationPage: React.FC = () => {
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
  const [isQueryIntelligenceInformationShow, setIsQueryIntelligenceInformationShow] = useState<boolean>(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [queryIntelligenceInformationForm] = Form.useForm();
  const [intelligenceInformationQueryParams, setIntelligenceInformationQueryParams] = useState<ListIntelligenceInformationRequest>();

  // 用 useIntelligenceInformation 获取菜单列表数据
  const {
    intelligenceInformation: intelligenceInformationListDataSource,
    total,
    isLoading: isIntelligenceInformationListLoading,
    mutateIntelligenceInformation,
  } = useIntelligenceInformation({
    ...intelligenceInformationQueryParams,
    ...createPaginationRequest(current, pageSize),
  });

  const onQueryIntelligenceInformationShow = () => {
    setIsQueryIntelligenceInformationShow((prevState) => !prevState);
  };

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setCurrent(newPage);
    setPageSize(newPageSize);
  };

  const resetPagination = () => {
    setCurrent(1);
    setPageSize(10);
  };

  const handleQueryIntelligenceInformationReset = () => {
    resetPagination();
    queryIntelligenceInformationForm.resetFields();
    setIntelligenceInformationQueryParams(undefined)
    mutateIntelligenceInformation();
  };

  const onQueryIntelligenceInformationFinish = async () => {
    const values = queryIntelligenceInformationForm.getFieldsValue();
    const { create_time } = values;
    if (create_time) {
      const [startDate, endDate] = create_time;
      values.create_time = [
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD'),
      ];
    }
    const queryIntelligenceInformation = values as ListIntelligenceInformationRequest;
    const filteredQueryIntelligenceInformation = Object.fromEntries(
      Object.entries(queryIntelligenceInformation).filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      ),
    );
    resetPagination();
    setIntelligenceInformationQueryParams(filteredQueryIntelligenceInformation as ListIntelligenceInformationRequest);
  };

  // 详情模块
  const [isIntelligenceInformationDetailDrawerVisible, setIsIntelligenceInformationDetailDrawerVisible] =
    useState(false);
  const [selectedIntelligenceInformationId, setSelectedIntelligenceInformationId] = useState<string | null>(null);

  const { intelligenceInformation: intelligenceInformationDetail, isLoading: isIntelligenceInformationDetailLoading } = useIntelligenceInformation(
    selectedIntelligenceInformationId || '',
  );

  const onIntelligenceInformationDetail = (intelligenceInformation: IntelligenceInformation) => {
    setSelectedIntelligenceInformationId(intelligenceInformation.id);
    setIsIntelligenceInformationDetailDrawerVisible(true);
  };

  const onIntelligenceInformationDetailClose = () => {
    setSelectedIntelligenceInformationId(null);
    setIsIntelligenceInformationDetailDrawerVisible(false);
  };

  // 表格列信息
  const intelligenceInformationColumns: ColumnsType<IntelligenceInformation> = [
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
      render: (_: number, _record: IntelligenceInformation, rowIndex: number) => rowIndex + 1,
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
      title: "标题",
      dataIndex: "news_title",
      key: "news_title",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "内容",
      dataIndex: "news_content",
      key: "news_content",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "来源",
      dataIndex: "news_source",
      key: "news_source",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "发布时间",
      dataIndex: "publish_time",
      key: "publish_time",
      render: (text: string) => (
        text ? <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>: "-"
      ),
      width: "14%",
      ellipsis: true,
    },
    {
      title: "新闻链接",
      dataIndex: "news_url",
      key: "news_url",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "影响面",
      dataIndex: "impact_direction",
      key: "impact_direction",
      width: "6%",
    },
    {
      title: "影响程度",
      dataIndex: "impact_level",
      key: "impact_level",
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
            onClick={ () => onIntelligenceInformationDetail(record)}
          >
            <Eye className="w-3 h-3" />
            详情
          </button>
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs btn-operation"
            onClick={ () => onUpdateIntelligenceInformation(record)}
          >
            <PenLine className="w-3 h-3" />
            编辑
          </button>
          <Popconfirm
            title="确认删除"
            description="确定删除吗? 删除后将无法找回"
            onConfirm={() => handleDeleteIntelligenceInformation(record)}
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
    intelligenceInformationColumns.map((col) => col.key),
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
  const filteredIntelligenceInformationColumns = intelligenceInformationColumns.filter((col) =>
    visibleColumns.includes(col.key),
  );

  // 新增模块
  const [isCreateIntelligenceInformationModalVisible, setIsCreateIntelligenceInformationModalVisible] =
    useState(false);
  const [isCreateIntelligenceInformationLoading, setIsCreateIntelligenceInformationLoading] = useState(false);
  const [createIntelligenceInformationForm] = Form.useForm();

  const onCreateIntelligenceInformation = () => {
    setIsCreateIntelligenceInformationModalVisible(true);
  };
  const handleCreateIntelligenceInformationCancel = () => {
    createIntelligenceInformationForm.resetFields();
    setIsCreateIntelligenceInformationModalVisible(false);
  };
  const handleCreateIntelligenceInformationFinish = async (data: CreateIntelligenceInformation) => {
    setIsCreateIntelligenceInformationLoading(true);
    try {
      await createIntelligenceInformation({ intelligenceInformation: data });
      message.success('新增成功');
      createIntelligenceInformationForm.resetFields();
      setIsCreateIntelligenceInformationModalVisible(false);
      mutateIntelligenceInformation();
    } finally {
      setIsCreateIntelligenceInformationLoading(false);
    }
  };

  // 单个删除模块
  const handleDeleteIntelligenceInformation = async (intelligenceInformation: IntelligenceInformation) => {
    await deleteIntelligenceInformation(intelligenceInformation.id);
    message.success('删除成功');
    mutateIntelligenceInformation();
  };

  // 批量删除模块
  const [isBatchRemoveLoading, setIsBatchRemoveLoading] =
    useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<IntelligenceInformation[]>([]);

  const resetSelectedRows = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const handleSelectionChange = (
    selectedRowKeys: React.Key[],
    selectedRows: IntelligenceInformation[],
  ) => {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleIntelligenceInformationBatchRemove = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的项目');
      return;
    }
    try {
      setIsBatchRemoveLoading(true);
      await batchDeleteIntelligenceInformation({ ids: selectedRows.map((row) => row.id) });
      message.success('删除成功');
      mutateIntelligenceInformation();
      resetSelectedRows();
    } finally {
      setIsBatchRemoveLoading(false);
    }
  };

  const handleIntelligenceInformationBatchRemoveCancel = async () => {
    resetSelectedRows();
    message.info('操作已取消');
  };

  // 单个更新模块
  const [isUpdateIntelligenceInformationModalVisible, setIsUpdateIntelligenceInformationModalVisible] =
    useState<boolean>(false);
  const [isUpdateIntelligenceInformationLoading, setIsUpdateIntelligenceInformationLoading] =
    useState<boolean>(false);
  const [updateIntelligenceInformationForm] = Form.useForm();

  const onUpdateIntelligenceInformation = (intelligenceInformation: IntelligenceInformation) => {
    setIsUpdateIntelligenceInformationModalVisible(true);
    setSelectedRowKeys([intelligenceInformation.id]);
    setSelectedRows([intelligenceInformation]);
    updateIntelligenceInformationForm.setFieldsValue({ ...intelligenceInformation });
  };

  const handleUpdateIntelligenceInformationCancel = () => {
    resetSelectedRows();
    updateIntelligenceInformationForm.resetFields();
    setIsUpdateIntelligenceInformationModalVisible(false);
  };

  const handleUpdateIntelligenceInformationFinish = async () => {
    const updateIntelligenceInformationData =
      (await updateIntelligenceInformationForm.validateFields()) as UpdateIntelligenceInformation;
    const req = { ...updateIntelligenceInformationData, id: selectedRows[0].id };
    setIsUpdateIntelligenceInformationLoading(true);
    try {
      await updateIntelligenceInformation({ intelligenceInformation: req });
      updateIntelligenceInformationForm.resetFields();
      message.success('更新成功');
      mutateIntelligenceInformation();
      resetSelectedRows();
    } finally {
      setIsUpdateIntelligenceInformationLoading(false);
      setIsUpdateIntelligenceInformationModalVisible(false);
    }
  };

  // 批量更新模块
  const onIntelligenceInformationBatchModify = () => {
    if (selectedRowKeys.length === 1) {
      setIsUpdateIntelligenceInformationModalVisible(true);
      updateIntelligenceInformationForm.setFieldsValue({ ...selectedRows[0] });
    } else {
      setIsBatchUpdateIntelligenceInformationModalVisible(true);
      batchUpdateIntelligenceInformationForm.resetFields();
    }
  };
  const [isBatchUpdateIntelligenceInformationModalVisible, setIsBatchUpdateIntelligenceInformationModalVisible] =
    useState<boolean>(false);
  const [isBatchUpdateIntelligenceInformationLoading, setIsBatchUpdateIntelligenceInformationLoading] =
    useState<boolean>(false);
  const [batchUpdateIntelligenceInformationForm] = Form.useForm();

  const handleBatchUpdateIntelligenceInformationCancel = async () => {
    batchUpdateIntelligenceInformationForm.resetFields();
    setIsBatchUpdateIntelligenceInformationModalVisible(false);
    resetSelectedRows();
    message.info('操作已取消');
  };

  const handleBatchUpdateIntelligenceInformationFinish = async () => {
    const intelligenceInformationBatchModify =
      (await batchUpdateIntelligenceInformationForm.validateFields()) as BatchUpdateIntelligenceInformation;
    setIsBatchUpdateIntelligenceInformationLoading(true);
    if (selectedRows === null || selectedRows.length === 0) {
      message.warning('请选择要更新的项目');
      return;
    }
    try {
      const ids = selectedRows.map((row) => row.id);
      await batchUpdateIntelligenceInformation({ ids: ids, intelligenceInformation: intelligenceInformationBatchModify });
      batchUpdateIntelligenceInformationForm.resetFields();
      message.success('更新成功');
      mutateIntelligenceInformation();
      resetSelectedRows();
    } finally {
      setIsBatchUpdateIntelligenceInformationLoading(false);
      setIsBatchUpdateIntelligenceInformationModalVisible(false);
    }
  };

  // 导入模块
  const [isImportIntelligenceInformationModalVisible, setIsImportIntelligenceInformationModalVisible] =
    useState<boolean>(false);
  const [isImportIntelligenceInformationLoading, setIsImportIntelligenceInformationLoading] =
    useState<boolean>(false);
  const [createIntelligenceInformationList, setCreateIntelligenceInformationList] = useState<CreateIntelligenceInformation[]>([]);

  const onImportIntelligenceInformation = () => {
    setIsImportIntelligenceInformationModalVisible(true);
  };

  const handleImportIntelligenceInformationCancel = () => {
    setIsImportIntelligenceInformationModalVisible(false);
  };

  const onImportIntelligenceInformationFinish = async (fileList: RcFile[]) => {
    try {
      setIsImportIntelligenceInformationLoading(true);
      const createIntelligenceInformationList = await importIntelligenceInformation({ file: fileList[0] });
      setCreateIntelligenceInformationList(createIntelligenceInformationList.intelligenceInformation);
      return createIntelligenceInformationList;
    } finally {
      setIsImportIntelligenceInformationLoading(false);
    }
  };

  const handleImportIntelligenceInformation = async () => {
    setIsImportIntelligenceInformationLoading(true);
    try {
      await batchCreateIntelligenceInformation({ intelligenceInformation: createIntelligenceInformationList });
      message.success('导入成功');
      setIsImportIntelligenceInformationModalVisible(false);
      mutateIntelligenceInformation();
    } finally {
      setIsImportIntelligenceInformationLoading(false);
      setCreateIntelligenceInformationList([]);
    }
  };

  // 导出模块
  const [isExportLoading, setIsExportLoading] = useState<boolean>(false);
  const onIntelligenceInformationExport = async () => {
    if (selectedRowKeys === null || selectedRowKeys.length === 0) {
      message.warning('请先选择导出的项目');
      return;
    }
    try {
      setIsExportLoading(true);
      await exportIntelligenceInformation({ ids: selectedRows.map((row) => row.id) });
      resetSelectedRows();
    } finally {
      setIsExportLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 bg-white">
      <TransitionWrapper show={isQueryIntelligenceInformationShow}>
        <QueryIntelligenceInformationComponent
          onQueryIntelligenceInformationFinish={onQueryIntelligenceInformationFinish}
          onQueryIntelligenceInformationReset={handleQueryIntelligenceInformationReset}
          onQueryIntelligenceInformationForm={queryIntelligenceInformationForm}
        />
      </TransitionWrapper>
      <div>
        <ActionButtonComponent
          onCreate={onCreateIntelligenceInformation }
          onImport={onImportIntelligenceInformation }
          onExport={onIntelligenceInformationExport}
          onBatchModify={onIntelligenceInformationBatchModify}
          onConfirmBatchRemove={handleIntelligenceInformationBatchRemove}
          onConfirmBatchRemoveCancel={handleIntelligenceInformationBatchRemoveCancel}
          isQueryShow={isQueryIntelligenceInformationShow}
          onQueryShow={onQueryIntelligenceInformationShow}
          isExportDisabled={selectedRowKeys.length === 0}
          isBatchModifyDisabled={selectedRowKeys.length === 0}
          isBatchRemoveDisabled={selectedRowKeys.length === 0}
          isBatchRemoveLoading={isBatchRemoveLoading}
          isExportLoading={isExportLoading}
          rawColumns={ intelligenceInformationColumns as any[]}
          visibleColumns={visibleColumns as any[]}
          onToggleColumnVisibility={onToggleColumnVisibility}
          actionConfig={actionConfig}
          className="mb-2 mt-4"
        />
      </div>
      <div>
        <PaginatedTable<IntelligenceInformation>
          columns={filteredIntelligenceInformationColumns}
          dataSource={ intelligenceInformationListDataSource || []}
          total={total || 0}
          current={current}
          page_size={pageSize}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleSelectionChange}
          selectedRowKeys={selectedRowKeys}
          rowKey="id"
          loading={isIntelligenceInformationListLoading}
        />
      </div>
      <div>
        <div>
          <CreateIntelligenceInformationComponent
            isCreateIntelligenceInformationModalVisible={isCreateIntelligenceInformationModalVisible}
            onCreateIntelligenceInformationCancel={handleCreateIntelligenceInformationCancel}
            onCreateIntelligenceInformationFinish={handleCreateIntelligenceInformationFinish}
            isCreateIntelligenceInformationLoading={isCreateIntelligenceInformationLoading}
            createIntelligenceInformationForm={createIntelligenceInformationForm}
          />
        </div>
        <div>
          <IntelligenceInformationDetailComponent
            isIntelligenceInformationDetailDrawerVisible={isIntelligenceInformationDetailDrawerVisible}
            onIntelligenceInformationDetailClose={onIntelligenceInformationDetailClose}
            intelligenceInformationDetail={ intelligenceInformationDetail}
            loading={isIntelligenceInformationDetailLoading}
          />
        </div>
        <div>
          <UpdateIntelligenceInformationComponent
            isUpdateIntelligenceInformationModalVisible={isUpdateIntelligenceInformationModalVisible}
            onUpdateIntelligenceInformationCancel={handleUpdateIntelligenceInformationCancel}
            onUpdateIntelligenceInformationFinish={handleUpdateIntelligenceInformationFinish}
            isUpdateIntelligenceInformationLoading={isUpdateIntelligenceInformationLoading}
            updateIntelligenceInformationForm={updateIntelligenceInformationForm}
          />
        </div>
        <div>
          <BatchUpdateIntelligenceInformationComponent
            isBatchUpdateIntelligenceInformationModalVisible={isBatchUpdateIntelligenceInformationModalVisible}
            onBatchUpdateIntelligenceInformationCancel={handleBatchUpdateIntelligenceInformationCancel}
            onBatchUpdateIntelligenceInformationFinish={handleBatchUpdateIntelligenceInformationFinish}
            isBatchUpdateIntelligenceInformationLoading={isBatchUpdateIntelligenceInformationLoading}
            batchUpdateIntelligenceInformationForm={ batchUpdateIntelligenceInformationForm}
          />
        </div>

        <div>
          <ImportIntelligenceInformationComponent
            isImportIntelligenceInformationModalVisible={isImportIntelligenceInformationModalVisible}
            isImportIntelligenceInformationLoading={isImportIntelligenceInformationLoading}
            onImportIntelligenceInformationFinish={onImportIntelligenceInformationFinish}
            onImportIntelligenceInformationCancel={handleImportIntelligenceInformationCancel}
            handleImportIntelligenceInformation={handleImportIntelligenceInformation }
          />
        </div>
      </div>
    </div>
  );
};

export default IntelligenceInformationPage;