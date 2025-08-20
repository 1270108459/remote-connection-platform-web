import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { getAssets, createAsset, updateAsset, deleteAsset } from '@/services/asset';
import { getCustomers } from '@/services/customer';

const AssetPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const [form] = Form.useForm();

  const loadData = async () => {
    setLoading(true);
    setData(await getAssets() || []);
    setCustomers(await getCustomers() || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      if (editingRecord) {
        await updateAsset(editingRecord.id, values);
        message.success('更新成功');
      } else {
        await createAsset(values);
        message.success('新增成功');
      }
      setModalVisible(false);
      form.resetFields();
      setEditingRecord(null);
      loadData();
    } catch {
      message.error('操作失败');
    }
  };

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = async (id: string) => {
    await deleteAsset(id);
    message.success('删除成功');
    loadData();
  };

  return (
    <>
      <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: 16 }}>
        新增资产
      </Button>
      <Table
        dataSource={data}
        loading={loading}
        rowKey="id"
        columns={[
          { title: '客户', dataIndex: 'customerName' },
          { title: '项目', dataIndex: 'projectName' },
          { title: '服务器资源', dataIndex: 'server' },
          { title: '网络拓扑', dataIndex: 'network' },
          { title: '平台信息', dataIndex: 'platform' },
          {
            title: '操作',
            render: (_, record) => (
              <>
                <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
                <Button type="link" danger onClick={() => handleDelete(record.id)}>删除</Button>
              </>
            ),
          },
        ]}
      />

      <Modal
        title={editingRecord ? '编辑资产' : '新增资产'}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingRecord(null);
        }}
        onOk={() => {
          form.validateFields().then(handleSubmit).catch(() => {});
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="customerId" label="客户" rules={[{ required: true, message: '请选择客户' }]}>
            <Select>
              {customers.map(c => <Select.Option key={c.id} value={c.id}>{c.projectName}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="server" label="服务器资源">
            <Input />
          </Form.Item>
          <Form.Item name="network" label="网络拓扑">
            <Input />
          </Form.Item>
          <Form.Item name="platform" label="平台信息">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AssetPage;
