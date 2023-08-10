import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NewsCard from '../components/NewsCard';
import Spinner from '../components/Spinner';


const Homepage = () => {


    const[apiData, setApiData] = useState([]);
    const[loading, setLoading] = useState(false);

    async function fetchData() {
      setLoading(true);
      const response = await axios('https://api.currentsapi.services/v1/latest-news?language=en&apiKey=q0vJ7nWllMgbalBcomg8ACNt6NU3ieeZCH_qUqbHoRplm3up');
      // console.log("printing data",response.data);
      setApiData(response.data);
      setLoading(false);
    }

    useEffect(() => {
        fetchData();
    },[]);


  return (
    <div className=''>
       
       {
        loading ? <Spinner/> : (
            <div className=''>
            {
                apiData?.news?.map((news,index) => (
                    <NewsCard news={news} key={index}/>
                ))
            }
        </div>
        )
       }
       

    </div>
  )
}

export default Homepage