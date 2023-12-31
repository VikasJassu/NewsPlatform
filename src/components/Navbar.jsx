import React from 'react'
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/InvokingAPIs';

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => (state.profile));

    function handleLogOut() {
        dispatch(logout(navigate));
    }
  return (
    <div className='h-12 bg-gradient-to-r from-blue-800 to-indigo-900 border-b-2 border-blue-500 flex justify-around items-center'>
        <div className='text-2xl font-serif max-sm:hidden max-sm:font-normal font-medium text-white hover:text-yellow-500 hover:scale-110 hover:transition-all'>
        <Link to="/">
            Home
        </Link>
        </div>

        <div className='text-2xl font-serif font-medium text-white  hover:text-yellow-500 hover:scale-110 hover:transition-all'>
            <Link to="/saved">Saved</Link>
        </div>

        <div className='flex gap-5'>

            {
                user ? ( 
                          <button onClick={handleLogOut} className='bg-yellow-400 px-4 pb-1 text-lg font-medium font-serif rounded-lg hover:bg-white hover:transition-all'>Log Out</button>
                       )
                     :
                      ( <Link to="/login">
                           <button className='bg-yellow-400 px-4 pb-1 text-lg font-medium font-serif rounded-lg hover:bg-white hover:transition-all'>Login</button>
                       </Link>) 
            }
            {
                !user &&  (<Link to="/signUp">
                           <button  className='bg-yellow-400  px-4 pb-1 text-lg font-medium font-serif rounded-lg hover:bg-white hover:transition-all'>SignUp</button>
                       </Link>)
            }
           
        </div>
    </div>
  )
}

export default Navbar