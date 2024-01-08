import React from 'react'
import { Input, QRCode, Space } from 'antd';

function Home() {
    const [text, setText] = React.useState('http://localhost:5173/login');
  return (
    <div className="container bg-[#9cff24] ms-auto mx-auto flex flex-col text-center items-center  w-full mt-20">
      <Space direction="vertical" align="center" className='bg-white'>
      <QRCode value={text || '-'}  />
      
    </Space>
    </div>
  )
}

export default Home
