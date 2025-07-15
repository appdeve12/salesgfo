
import React from 'react'
import {
  Spin
} from 'antd';
const Spinner = () => {
  return (
    <div>
      <div>
        <Spin fullscreen tip="Loading product..." size="large" />
      </div>
    </div>
  )
}

export default Spinner