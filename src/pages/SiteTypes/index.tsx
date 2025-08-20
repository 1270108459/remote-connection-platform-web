import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { getSites, createSite, updateSite, deleteSite } from '@/services/site';

// 工具函数：生成当前日期（YYYY-MM-DD）
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

const SitePage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [form] = Form.useForm();

  // SiteTypes/index.tsx 中的 loadData 函数
    const loadData = async () => {
    setLoading(true);
    try {
      const res = await getSites();
      console.log('加载场地数据成功:', res);
      // 提取 { code: 0, data: [...] } 中的 data 数组
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('加载场地数据失败:', error);
      message.error('加载失败，请重试');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(); // 初始化加载数据
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      if (editingRecord) {
        // 编辑时不修改创建时间
        await updateSite(editingRecord.id, values);
        message.success('更新成功');
      } else {
        // 新增时自动添加当前时间
        await createSite({ ...values, createdAt: getCurrentDate() });
        message.success('新增成功');
      }
      setModalVisible(false);
      form.resetFields();
      setEditingRecord(null);
      loadData(); // 新增/编辑后强制刷新列表
    } catch (error) {
      console.error('操作失败:', error);
      message.error('操作失败，请重试');
    }
  };

  // 其他函数（handleEdit/handleDelete）保持不变

  return (
    <>
      <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: 16 }}>
        新增场地
      </Button>
      <Table
        dataSource={data}
        loading={loading}
        rowKey="id" // 确保与 mock 中的 key 一致（site.ts 中用 id 作为主键）
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
        onOk={() => form.validateFields().then(handleSubmit).catch(() => {})}
      >
        <Form form={form} layout="vertical">
          {/* 移除创建时间输入框，由系统自动生成 */}
          <Form.Item name="name" label="场地名称" rules={[{ required: true, message: '请输入场地名称' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SitePage;