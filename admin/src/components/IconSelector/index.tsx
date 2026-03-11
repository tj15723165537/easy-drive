import React, { useState, useMemo, forwardRef, useImperativeHandle } from 'react'
import { Modal, Input, Empty } from 'antd'
import * as icons from '@ant-design/icons'
import './index.less'

const PAGE_SIZE = 120

export interface IconSelectorRef {
  open: () => void
}

export interface IconSelectorProps {
  value?: string
  onChange?: (iconName: string) => void
  title?: string
  /** 新增：是否禁用 */
  disabled?: boolean
}

const IconSelector = forwardRef<IconSelectorRef, IconSelectorProps>((props, ref) => {
  const { value, onChange, title = '选择图标', disabled = false } = props
  const [visible, setVisible] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  // 过滤图标
  const iconList = useMemo(() => {
    return Object.keys(icons)
      .filter(
        (name) =>
          /^[A-Z]/.test(name) &&
          !['default', 'createFromIconfontCN', 'getTwoToneColor', 'setTwoToneColor'].includes(name)
      )
      .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
      .sort()
  }, [search])

  const pageCount = Math.ceil(iconList.length / PAGE_SIZE)
  const pagedIcons = iconList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // 暴露 open 方法，但禁用时不生效
  useImperativeHandle(ref, () => ({
    open: () => {
      if (!disabled) {
        setVisible(true)
      }
    },
  }))

  const handleSelect = (name: string) => {
    onChange?.(name)
    setVisible(false)
  }

  const handleInputClick = () => {
    if (!disabled) {
      setVisible(true)
    }
  }

  return (
    <>
      {/* 输入框：禁用时不可点击、置灰 */}
      <Input
        readOnly
        placeholder={disabled ? '图标选择已禁用' : '点击选择图标'}
        value={value}
        suffix={value && React.createElement((icons as any)[value] || null)}
        onClick={handleInputClick}
        style={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          backgroundColor: disabled ? '#f5f5f5' : undefined,
          color: disabled ? '#00000040' : undefined,
        }}
        // Antd 自带 disabled 样式
        disabled={disabled}
      />

      {/* 弹窗：仅在非禁用时显示 */}
      <Modal
        className="icon-selector-modal"
        title={title}
        open={visible && !disabled}
        width={680}
        footer={null}
        onCancel={() => setVisible(false)}
        destroyOnHidden>
        <Input
          className="icon-selector-search"
          placeholder="搜索图标名称..."
          allowClear
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />

        {pagedIcons.length ? (
          <div className="icon-selector-list">
            {pagedIcons.map((name) => {
              const IconComp = (icons as any)[name]
              const selected = value === name
              return (
                <div
                  key={name}
                  className={`icon-selector-item ${selected ? 'selected' : ''}`}
                  title={name}
                  onClick={() => handleSelect(name)}>
                  <IconComp />
                </div>
              )
            })}
          </div>
        ) : (
          <Empty description="未找到匹配的图标" />
        )}

        {pageCount > 1 && (
          <div className="icon-selector-pagination">
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              上一页
            </button>
            <span>
              {page} / {pageCount}
            </span>
            <button disabled={page >= pageCount} onClick={() => setPage((p) => p + 1)}>
              下一页
            </button>
          </div>
        )}
      </Modal>
    </>
  )
})

IconSelector.displayName = 'IconSelector'

export default IconSelector
