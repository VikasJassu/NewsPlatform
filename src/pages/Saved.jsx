import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getSavedNews } from '../services/InvokingAPIs';
import Spinner from "../components/Spinner"
import { Link } from 'react-router-dom';
import {MdDelete} from "react-icons/md"

const Saved = () => {
  const {token} = useSelector((state) => (state.auth));
 

  const[savedData, setSavedData] = useState([]);
  const[loading, setLoading] = useState(false);


  useEffect(() => {
   ;(async () => {
    setLoading(true);
    const savedNewsDetails = await getSavedNews(token);
    setSavedData(savedNewsDetails.data.savedPosts);
    
    setLoading(false)
 })()
  },[]);

  console.log("printing data",savedData)


  return (
    <div>
      {
        loading ? (<Spinner/>) : (<div>
          <div className='w-10/12 mx-auto'>
        
        {
          savedData?.map((news) => (
            <div className='flex flex-col sm:flex-row gap-8 m-10 items-center justify-center border-2 border-gray-300 shadow-sm p-5'>
                       <div  className=''>
                           <img src={`${news.image}`} alt='Image not found' loading='lazy' width={400} className='rounded-md h-56' />
                       </div>
                        <div className='w-7/12 max-sm:w-full flex flex-col font-serif '>
                        
                            <h3 className='font-bold text-lg sm:my-3'>{(news.title).slice(0,50)}....</h3>
                            <p className='font-medium my-2 hidden sm:block'>{(news.description).slice(0,200)}...</p>  
                            <p className='font-medium my-1 hidden sm:block'>{news.published}</p>
                            <p className='font-semibold my-1 truncate'> Full article:  
                                <Link to={news.url} target='_blank' className='text-blue-800'> {(news.url)}....</Link>
                            </p>
                            <div className='text-4xl sm:ml-[32.5rem] translate-y-2 text-gray-700 hover:text-gray-900 hover:cursor-pointer'><MdDelete/></div>
                        </div>   
        </div>
          ))}

    </div>
   </div>)}
    </div>
  )
}

export default Saved