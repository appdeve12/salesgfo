import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import HomeCard from './HomeCard';
import HomeCharts from './HomeCharts';
import HomeTopProduct from './HomeTopProduct';
import Spinner from '../../components/Spinner';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <HomeCard />
      <HomeTopProduct />
      <HomeCharts />
    </>
  );
};

export default Home;
