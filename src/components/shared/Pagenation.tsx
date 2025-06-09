import React, { useEffect } from 'react'
import { Pagination as AntPagination } from 'antd'
import QueryHook from '../../hooks/query'

export default function Pagination ({ total = 10 , notification = false }) {
  const {
    MergeQueryParams, QueryParams
  } = QueryHook()
  
  const {
    page, page_size , pageNotification
  } = QueryParams
  
  const onShowSizeChange = (current, pageSize) => {
    MergeQueryParams({
      page: current, page_size: pageSize
    })
  }
  
  const onChange = (current, pageSize) => {
    MergeQueryParams({
      page: current, page_size: pageSize,
    })
  }
  const onChangeNotification = (current, pageSize) => {
    MergeQueryParams({
      pageNotification: current,
      page_size: pageSize,
    })
  }
  
  
  return (
    <AntPagination
      showSizeChanger={!notification}
      onShowSizeChange={onShowSizeChange}
      onChange={(current)=> {
        notification ? onChangeNotification (current) : onChange (current)
      } }
      total={total}
      current={Number(page || pageNotification ) || 1}
      pageSize={Number(page_size) || 10}
      locale={{
        items_per_page: ' / sahifa',
      }}
    />
  )
}
