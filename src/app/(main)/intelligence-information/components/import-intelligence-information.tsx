// SPDX-License-Identifier: MIT
import { exportIntelligenceInformationTemplate } from '@/service/intelligence-information';
import { CreateIntelligenceInformation, ImportIntelligenceInformationResponse} from '@/types/intelligence-information';
import { Inbox } from 'lucide-react';
import { Button, Modal, Table, Upload, UploadFile, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { UploadRequestOption } from 'rc-upload/es/interface';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';

interface ImportIntelligenceInformationProps {
  isImportIntelligenceInformationModalVisible: boolean;
  isImportIntelligenceInformationLoading: boolean;
  onImportIntelligenceInformationCancel: () => void;
  onImportIntelligenceInformationFinish: (fileList: RcFile[]) => Promise<ImportIntelligenceInformationResponse>;
  handleImportIntelligenceInformation: () => void;
}

const ImportIntelligenceInformationComponent: React.FC<ImportIntelligenceInformationProps> = ({
  isImportIntelligenceInformationModalVisible,
  onImportIntelligenceInformationCancel,
  onImportIntelligenceInformationFinish,
  isImportIntelligenceInformationLoading,
  handleImportIntelligenceInformation,
}) => {
  const [intelligenceInformationImportFileList, setImportIntelligenceInformationFileList] = useState<RcFile[]>([]);
  const [CreateIntelligenceInformationList, setCreateIntelligenceInformationList] = useState<CreateIntelligenceInformation[]>([]);
  const [isUploadShow, setIsUploadShow] = useState<boolean>(true);

  const footerButtons = () => [
    <Button key="back" onClick={handleImportIntelligenceInformationCancel}>
      取消
    </Button>,
    <Button key="submit" type="primary" loading={isImportIntelligenceInformationLoading} onClick={handleImportIntelligenceInformationConfirm}>
      确定
    </Button>,
  ];

  const handleImportIntelligenceInformationConfirm = async () => {
    if (isUploadShow) {
      if (intelligenceInformationImportFileList.length === 0) {
        message.warning('请先选择文件');
        return;
      }
      try {
        const importIntelligenceInformationResponse = await onImportIntelligenceInformationFinish(intelligenceInformationImportFileList);
        setIsUploadShow(false);
        setCreateIntelligenceInformationList(importIntelligenceInformationResponse.intelligenceInformation);
      } finally {
        setImportIntelligenceInformationFileList([]);
      }
    } else {
      handleImportIntelligenceInformation();
      setIsUploadShow(true);
    }
  };
  // 表格列信息
  const IntelligenceInformationColumns: ColumnsType<CreateIntelligenceInformation> = [
    {
      title: "序号",
      dataIndex: "No",
      key: "No",
      render: (_: number, _record: CreateIntelligenceInformation, rowIndex: number) => rowIndex + 1,
      width: "8%",
    },
    {
      title: "股票代码",
      dataIndex: "stock_symbol_full",
      key: "stock_symbol_full",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "标题",
      dataIndex: "news_title",
      key: "news_title",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "内容",
      dataIndex: "news_content",
      key: "news_content",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "来源",
      dataIndex: "news_source",
      key: "news_source",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "发布时间",
      dataIndex: "publish_time",
      key: "publish_time",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "新闻链接",
      dataIndex: "news_url",
      key: "news_url",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "影响面",
      dataIndex: "impact_direction",
      key: "impact_direction",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "影响程度",
      dataIndex: "impact_level",
      key: "impact_level",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "错误信息",
      dataIndex: "errMsg",
      key: "errMsg",
      render: (text) => (text ? text : "-"),
    },
  ];

  const handleIntelligenceInformationExportTemplate = async () => {
    await exportIntelligenceInformationTemplate();
  };

  const customUploadRequest = async (options: UploadRequestOption): Promise<void | undefined> => {
    const { onSuccess, onError, file } = options;
    const rcFile = file as RcFile;
    if (!rcFile.name.endsWith('.xls') && !rcFile.name.endsWith('.xlsx')) {
      message.error('仅支持xls、xlsx格式文件');
      onError?.(new Error('仅支持xls、xlsx格式文件'));
      return;
    }
    setImportIntelligenceInformationFileList((prev) => [...prev, rcFile]);
    setTimeout(() => {
      onSuccess?.(rcFile);
    }, 200);
  };

  const handleRemove = (file: UploadFile) => {
    setImportIntelligenceInformationFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const handleImportIntelligenceInformationCancel = () => {
    onImportIntelligenceInformationCancel();
    setIsUploadShow(true);
  };

  return (
    <Modal
      title="情报信息导入"
      open={isImportIntelligenceInformationModalVisible}
      onCancel={handleImportIntelligenceInformationCancel}
      footer={footerButtons}
      width={'70%'}
    >
      {isUploadShow ? (
        <div>
          <div>
            <Upload.Dragger
              name="file"
              multiple
              accept=".xlsx,.xls"
              onRemove={handleRemove}
              fileList={ intelligenceInformationImportFileList}
              customRequest={customUploadRequest as any}
            >
              <p className="flex justify-center items-center text-primary">
                <Inbox />
              </p>
              <p>{'点击或拖拽到此上传'}</p>
              <p className="text-gray-500">仅支持上传xls、xlsx格式的文件</p>
            </Upload.Dragger>
          </div>
          <div onClick={handleIntelligenceInformationExportTemplate} className="cursor-pointer mt-4 text-blue-600">
            下载模板
          </div>
        </div>
      ) : (
        <div>
          <Table
            columns={ IntelligenceInformationColumns}
            dataSource={ CreateIntelligenceInformationList}
            pagination={false}
            bordered={false}
            rowKey={'id'}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImportIntelligenceInformationComponent;