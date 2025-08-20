import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '@/services/customer';
import { getSites } from '@/services/site';

const CustomerPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [sites, setSites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const [form] = Form.useForm();

  const loadData = async () => {
    setLoading(true);
    const res = await getCustomers();
    setData(res || []);
    const siteRes = await getSites();
    setSites(siteRes || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      if (editingRecord) {
        await updateCustomer(editingRecord.id, values);
        message.success('更新成功');
      } else {
        await createCustomer(values);
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
    await deleteCustomer(id);
    message.success('删除成功');
    loadData();
  };

  return (
    <>
      <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: 16 }}>
        新增客户
      </Button>
      <Table
        dataSource={data}
        loading={loading}
        rowKey="id"
        columns={[
          { title: '项目名称', dataIndex: 'projectName' },
          { title: '地址', dataIndex: 'address' },
          { title: '场地类型', dataIndex: 'siteName' },
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
        title={editingRecord ? '编辑客户' : '新增客户'}
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
          <Form.Item name="projectName" label="项目名称" rules={[{ required: true, message: '请输入项目名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="地址" rules={[{ required: true, message: '请输入地址' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="siteId" label="场地类型" rules={[{ required: true, message: '请选择场地类型' }]}>
            <Select>
              {sites.map(s => <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>)}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CustomerPage;
