import React, { useEffect, useRef, useState } from 'react'
import {CiSaveDown2} from "react-icons/ci"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveNews } from '../services/InvokingAPIs';
import { add } from '../redux/slices/saveNewsSlice';
import { toast } from 'react-hot-toast';

const NewsCard = ({news}) => {
    const {user} = useSelector((state) => (state.profile));
    const token = useSelector((state) => (state.auth.token));
    console.log("token:::",token);
   
    const dispatch = useDispatch();

    const imageRef = useRef();
    const titleRef = useRef();
    const descRef = useRef();
    const publishedRef = useRef();
    const urlRef = useRef();


    const[savedData, setSavedData] = useState({
        title:"",
        description:"",
        published: "",
        url:"",
        image:"",
        token: ""
    });

    const{title, description, published, url, image} = savedData;

    function saveNewsHandler() {
        if(!user) {
            toast.error("Please login to Save")
        }
        user && setSavedData({
            title: titleRef.current.textContent,
            description: descRef.current.textContent,
            published: publishedRef.current.textContent,
            url: urlRef.current.textContent,
            image: imageRef.current.src,
            token: token,
        })
    
        user && dispatch(add(savedData));

        console.log("printing saved data:" , savedData);
        
        
        if(user) {
            dispatch(saveNews(title, description, published, url, image,token));
        }
    }

     

    

   

   

   
         

    if(news.image ==="None") {
       news.image = `https://img.freepik.com/premium-photo/creative-glowing-blue-breaking-news-pattern-background-with-globe-headline-communication-global-world-concept-3d-rendering_670147-21161.jpg`
    }
  return (
    <div className='w-10/12 mx-auto'>
        <div className='flex flex-col sm:flex-row gap-8 m-10 items-center justify-center border-2 border-gray-300 shadow-sm p-5'>
            
               
                       <div  className=''>
                           <img ref={imageRef} src={`${news.image}`} alt='Image not found' loading='lazy' width={400} className='rounded-md h-56' />
                       </div>
                        <div className='w-7/12 max-sm:w-full flex flex-col font-serif '>
                        
                            <h3 ref={titleRef} className='font-bold text-lg sm:my-3'>{(news.title).slice(0,50)}....</h3>
                            <p ref={descRef} className='font-medium my-2 hidden sm:block'>{(news.description).slice(0,200)}...</p>  
                            <p ref={publishedRef} className='font-medium my-1 hidden sm:block'>{news.published}</p>
                            <p className='font-semibold my-1 truncate'> Full article:  
                                <Link  ref={urlRef} to={news.url} target='_blank' className='text-blue-800'> {(news.url)}....</Link>
                            </p>
                            <div onClick={saveNewsHandler} className='text-4xl sm:ml-[32.5rem] translate-y-2 text-gray-700 hover:text-gray-900 hover:cursor-pointer'> <CiSaveDown2/></div>
                        </div>
             
            
        </div>

    </div>
  )
}

export default NewsCard