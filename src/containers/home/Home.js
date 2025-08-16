import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import HomeCard from './HomeCard';
import HomeCharts from './HomeCharts';
import HomeTopProduct from './HomeTopProduct';
import Spinner from '../../components/Spinner';
import { useDispatch } from 'react-redux';
import { allbrands } from '../../services/allService';
import { storeallapprovedbrand } from '../../redux/brandSlice';
const Home = () => {
  const dispatch=useDispatch()
  const [loading, setLoading] = useState(true);


    const fetchRequests = async () => {
      debugger
      try {
        const response=await allbrands()
        if(response.status==200){
          debugger;
         const approved= response.data.allbrandperseller.filter((item)=>(item.status=="approved"))
          dispatch(storeallapprovedbrand(approved))
     
        }
          setLoading(false)
      } catch (err) {
   
      }
    };
  
    useEffect(() => {
      fetchRequests();
    }, []);
  

  
  return (
    <>
      <HomeCard />
      <HomeTopProduct />
      <HomeCharts />
    </>
  );
};

export default Home;
