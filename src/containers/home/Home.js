import React from 'react'
import { Card } from 'antd';
import HomeCard from './HomeCard';
import HomeCharts from './HomeCharts';
import HomeTopProduct from './HomeTopProduct';
const Home = () => {
  return (
    <>       
    <HomeCard/>
      
        <HomeTopProduct/>
<HomeCharts/>

    </>
  )
}

export default Home