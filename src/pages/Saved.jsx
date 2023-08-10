import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { deleteNews, getSavedNews } from '../services/InvokingAPIs';
import Spinner from "../components/Spinner"
import { Link } from 'react-router-dom';
import {MdDelete} from "react-icons/md"


const Saved = () => {
  const {token} = useSelector((state) => (state.auth));
  const {user} = useSelector((state)=> (state.profile));
  const urlRef = useRef();
 

  const[savedData, setSavedData] = useState([]);
  const[loading, setLoading] = useState(false);

  
  const handleDelete = async(_id) => {
    const updatedData = await deleteNews(_id,token);
    setSavedData([]);
    setSavedData(updatedData.savedPosts);
    // console.log("updatedData", updatedData);
  }

  const fetchedData = async () => {
    setLoading(true);
    const result = await getSavedNews(token);
    if (result) {
      setSavedData(result.data.savedPosts);
    }
    setLoading(false);
  };

useEffect(() => {
  fetchedData();
},[]);




  return (
   <div className='bg-gradient-to-r from-blue-600 to-violet-600 bg-fixed bg-contain min-h-screen p-5'>
       {
        user ? (
          <div>
      {
        loading ? (<Spinner/>) : (<div>
          <div className='w-10/12 mx-auto'>
        
        {
          savedData?.map((news) => (
            <div className='flex flex-col sm:flex-row gap-8 items-center justify-center border-2 border-gray-300 shadow-sm p-5'>
                       <div  className=''>
                           <img src={`${news.image}`} alt='Image not found' loading='lazy' width={400} className='rounded-md h-56 hover:shadow-2xl hover:transition-all' />
                       </div>
                        <div className='w-7/12 max-sm:w-full flex flex-col font-serif text-white text-lg'>
                        
                            <h3 className='font-bold text-lg sm:my-3'>{(news.title).slice(0,50)}....</h3>
                            <p className='font-medium my-2 hidden sm:block'>{(news.description).slice(0,200)}...</p>  
                            <p className='font-medium my-1 hidden sm:block'>{(news.published.slice(0,16))}</p>
                            <p className='font-semibold my-1 truncate'> Full article:  
                                <Link ref={urlRef} to={news.url} target='_blank' className='text-yellow-300'> {(news.url)}.....</Link>
                            </p>
                            <div onClick={() => handleDelete(news._id)} className='text-4xl sm:ml-[32.5rem] translate-y-2 text-white hover:text-red-600 hover:transition-all hover:scale-110 hover:cursor-pointer'><MdDelete/></div>
                        </div>   
        </div>
          ))}

    </div>
   </div>)}
    </div>
        ) : (
          <div className='my-48 mx-[33rem] font-bold text-2xl text-yellow-500'> Please Login</div>
        )
       }
   </div>
  )
}

export default Saved