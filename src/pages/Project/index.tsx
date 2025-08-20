import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Switch, message } from 'antd';

const { Option } = Select;

interface Project {
  id: number;
  name: string;
  locationType: string;
  serverType: string;
  manager: string;
  pddOwner: string;
  isSupport: boolean;
}

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form] = Form.useForm();

  const fetchProjects = async () => {
    setLoading(true);
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (editing) {
      await fetch(`/api/projects/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      message.success('项目信息已更新');
    } else {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      message.success('项目已新增');
    }
    setVisible(false);
    setEditing(null);
    form.resetFields();
    fetchProjects();
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    message.success('项目已删除');
    fetchProjects();
  };

  const columns = [
    { title: '项目名称', dataIndex: 'name' },
    { title: '场地类型', dataIndex: 'locationType' },
    { title: '服务器类型', dataIndex: 'serverType' },
    { title: '项目经理', dataIndex: 'manager' },
    { title: 'PDD对接人', dataIndex: 'pddOwner' },
    {
      title: '是否在保',
      dataIndex: 'isSupport',
      render: (val: boolean) => (val ? '是' : '否'),
    },
    {
      title: '操作',
      render: (_: any, record: Project) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setEditing(record);
              form.setFieldsValue(record);
              setVisible(true);
            }}
          >
            编辑
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)} style={{ marginBottom: 16 }}>
        新增项目
      </Button>
      <Table rowKey="id" columns={columns} dataSource={projects} loading={loading} />

      <Modal
        title={editing ? '编辑项目' : '新增项目'}
        open={visible}
        onCancel={() => {
          setVisible(false);
          setEditing(null);
          form.resetFields();
        }}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="项目名称" rules={[{ required: true, message: '请输入项目名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="locationType" label="场地类型" rules={[{ required: true }]}>
            <Select>
              <Option value="upacs">UPACS</Option>
              <Option value="全家桶">全家桶</Option>
            </Select>
          </Form.Item>
          <Form.Item name="serverType" label="服务器类型" rules={[{ required: true }]}>
            <Select>
              <Option value="MySQL">MySQL</Option>
              <Option value="Master">Master</Option>
            </Select>
          </Form.Item>
          <Form.Item name="manager" label="项目经理" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="pddOwner" label="PDD对接人" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="isSupport" label="是否在保" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectPage;
