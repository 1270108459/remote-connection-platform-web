import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { getSites, createSite, updateSite, deleteSite } from '@/services/site';

const SitePage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const [form] = Form.useForm(); // ✅ 定义 form

  const loadData = async () => {
    setLoading(true);
    const res = await getSites();
    setData(res || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      if (editingRecord) {
        await updateSite(editingRecord.id, values);
        message.success('更新成功');
      } else {
        await createSite(values);
        message.success('新增成功');
      }
      setModalVisible(false);
      form.resetFields();
      setEditingRecord(null);
      loadData();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = async (id: string) => {
    await deleteSite(id);
    message.success('删除成功');
    loadData();
  };

  return (
    <>
      <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: 16 }}>
        新增场地
      </Button>
      <Table
        dataSource={data}
        loading={loading}
        rowKey="id"
        columns={[
          { title: '场地名称', dataIndex: 'name' },
          { title: '创建时间', dataIndex: 'createdAt' },
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
        title={editingRecord ? '编辑场地' : '新增场地'}
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
          <Form.Item name="name" label="场地名称" rules={[{ required: true, message: '请输入场地名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="createdAt" label="创建时间" rules={[{ required: true, message: '请输入创建时间' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SitePage;
