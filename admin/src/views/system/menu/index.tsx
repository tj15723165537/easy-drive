import React, { useRef } from 'react'
import type { TableColumnsType } from 'antd'
import { Button, Card, message, Popconfirm, Space, Table } from 'antd'
import FormModal from './components/FormModal'
import { deleteMenu, getMenuList, MenuVO } from '@/api/modules/system'
import { useRequest } from 'ahooks'
import { cleanEmptyChildren } from '@/utils/util'

const MenuPage = () => {
  const formModalRef = useRef<any>(null)
  const showModal = (type: ActionType, id?: Key) => {
    formModalRef.current.showModal(type, id)
  }
  const handleDelete = async (record: MenuVO) => {
    await deleteMenu(record.id)
    message.success('操作成功')
    refresh()
  }

  const columns: TableColumnsType<MenuVO> = [
    { title: '标题', dataIndex: 'title', align: 'center' },
    { title: '图标', dataIndex: 'icon', align: 'center' },
    { title: '路径', dataIndex: 'path', align: 'center' },
    { title: '排序', dataIndex: 'sort', align: 'center' },
    {
      title: '操作',
      align: 'center',
      width: 150,
      key: 'action',
      render: (_, record: MenuVO) => (
        <Space size="middle">
          <a onClick={() => showModal('edit', record.id)}>编辑</a>
          <Popconfirm title="确定删除吗？" onConfirm={() => handleDelete(record)} okText="确定" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const { data, loading, refresh } = useRequest<MenuVO[], any[]>(async () => {
    const result = await getMenuList()
    return cleanEmptyChildren(result.data!)
  })

  return (
    <>
      <Card
        title={
          <Space>
            <Button type="primary" onClick={() => showModal('add')}>
              新增
            </Button>
          </Space>
        }>
        <Table
          loading={loading}
          columns={columns}
          rowKey="id"
          dataSource={data}
          pagination={false}
          expandable={{
            defaultExpandAllRows: true,
          }}
        />
        <FormModal myRef={formModalRef} onRefresh={refresh} treeData={data}/>
      </Card>
    </>
  )
}

export default MenuPage
