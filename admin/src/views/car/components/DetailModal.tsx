import React, { useState } from 'react'
import { Button, Descriptions, Image, Modal, Tag } from 'antd'
import { CarVO } from '@/api/modules/car'
import moment from 'moment'
import './DetailModal.less'

// 将后端返回的相对路径转换为完整的 API URL
const getFullImageUrl = (url: string | undefined) => {
  if (!url) return ''
  if (url.startsWith('http') || url.startsWith('/api')) return url
  return '/api' + url
}

interface Props {
  visible: boolean
  onClose: () => void
  carData: CarVO | null
}

const DetailModal = ({ visible, onClose, carData }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!carData) return null

  const statusTag = (
    <Tag color={carData.status === 1 ? 'green' : 'red'}>
      {carData.status === 1 ? '已上线' : '已下线'}
    </Tag>
  )

  const handlePrevImage = () => {
    if (carData.imageList && carData.imageList.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + carData.imageList.length) % carData.imageList.length)
    }
  }

  const handleNextImage = () => {
    if (carData.imageList && carData.imageList.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % carData.imageList.length)
    }
  }

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          关闭
        </Button>,
      ]}
      width={900}
      className="car-detail-modal">
      <div className="car-detail-content">
        {/* 图片展示区 */}
        <div className="image-section">
          {carData.imageList && carData.imageList.length > 0 ? (
            <div className="image-gallery">
              <div className="main-image">
                <Image
                  src={getFullImageUrl(carData.imageList[currentImageIndex])}
                  alt={carData.model}
                  style={{ width: '100%', height: '400px', objectFit: 'contain' }}
                  preview
                />
                <div className="image-navigation">
                  <Button
                    type="text"
                    icon={<span className="nav-icon">‹</span>}
                    onClick={handlePrevImage}
                    className="nav-btn"
                  />
                  <span className="image-counter">
                    {currentImageIndex + 1} / {carData.imageList.length}
                  </span>
                  <Button
                    type="text"
                    icon={<span className="nav-icon">›</span>}
                    onClick={handleNextImage}
                    className="nav-btn"
                  />
                </div>
              </div>
              <div className="thumbnail-list">
                {carData.imageList.map((url, index) => (
                  <div
                    key={index}
                    className={`thumbnail-item ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}>
                    <img src={getFullImageUrl(url)} alt={`thumb-${index}`} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-image">
              <span>暂无图片</span>
            </div>
          )}
        </div>

        {/* 信息展示区 */}
        <div className="info-section">
          <div className="info-header">
            <h2 className="car-title">
              {carData.brand} {carData.model}
            </h2>
            <div className="car-price">¥{carData.price?.toLocaleString()}</div>
          </div>

          <Descriptions bordered column={2} className="car-descriptions">
            <Descriptions.Item label="品牌">{carData.brand}</Descriptions.Item>
            <Descriptions.Item label="车型">{carData.model}</Descriptions.Item>
            <Descriptions.Item label="年份">{carData.year}年</Descriptions.Item>
            <Descriptions.Item label="颜色">{carData.color || '-'}</Descriptions.Item>
            <Descriptions.Item label="里程数">{carData.mileage?.toLocaleString()}公里</Descriptions.Item>
            <Descriptions.Item label="燃料类型">{carData.fuelType || '-'}</Descriptions.Item>
            <Descriptions.Item label="变速箱">{carData.transmission || '-'}</Descriptions.Item>
            <Descriptions.Item label="状态">{statusTag}</Descriptions.Item>
            <Descriptions.Item label="车辆地址" span={2}>{carData.location}</Descriptions.Item>
            <Descriptions.Item label="发布者">{carData.username}</Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {carData.createTime ? moment(carData.createTime).format('YYYY-MM-DD HH:mm:ss') : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间" span={2}>
              {carData.updateTime ? moment(carData.updateTime).format('YYYY-MM-DD HH:mm:ss') : '-'}
            </Descriptions.Item>
          </Descriptions>

          {carData.description && (
            <div className="description-section">
              <h3 className="section-title">车辆描述</h3>
              <p className="description-text">{carData.description}</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default DetailModal
