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
    <div className='h-10 bg-gray-400 flex justify-between '>
        <Link to="/">
            <img src='https://img.freepik.com/premium-vector/tv-logo-with-tv-logo-black-background_853558-651.jpg' width={53}/>
        </Link>

        <div className='flex gap-20'>
            <Link to="/">Home</Link>
            <Link to="/saved">Saved</Link>
            <Link to="/interests">Interests</Link>
        </div>

        <div className='flex gap-5'>

            {
                user ? ( 
                          <button onClick={handleLogOut} className='bg-yellow-400 px-4 rounded-lg py-1'>Log Out</button>
                       )
                     :
                      ( <Link to="/login">
                           <button className='bg-yellow-400 px-4 rounded-lg py-1'>Login</button>
                       </Link>) 
            }
            {
                !user &&  (<Link to="/signUp">
                           <button  className='bg-yellow-400 px-4 rounded-lg py-1'>SignUp</button>
                       </Link>)
            }
           

           

            
           
        </div>
    </div>
  )
}

export default Navbar