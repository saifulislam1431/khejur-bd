import React from 'react';
import "./Nav.css"
import { Link, NavLink } from 'react-router-dom';
import logo from "../../../assets/brand/logo-01.png"
import useAuth from '../../../hooks/useAuth';
import { IoMdCart, IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { HiOutlineClipboardDocumentList, HiOutlineHome, HiOutlineInformationCircle, HiOutlineShoppingBag } from 'react-icons/hi2';
import { IoSearch } from "react-icons/io5";
import Swal from 'sweetalert2';
import useCarts from '../../../hooks/useCarts';
import useAdmin from '../../../hooks/useAdmin';

const Navbar = () => {
    const {user, logOut} = useAuth();
    const [carts , refetch] = useCarts();
    const [isAdmin] = useAdmin();
    // console.log(carts);
    // const user = true;
    const handleOut =()=>{
        logOut()
        .then(()=>{
            Swal.fire({
                title: 'Success!',
                text: 'logout successful!',
                icon: 'success',
                confirmButtonText: 'Ok'
            })  
        })
    }
    const navItems = <>
    
<li>
    <NavLink to="/" className={({isActive})=>(isActive ? "navActive" : "navDefault")}>Home</NavLink>
</li>

<li>
    <NavLink to="/shop" className={({isActive})=>(isActive ? "navActive" : "navDefault")}>Shop</NavLink>
</li>

<li>
    <NavLink to={`${isAdmin ? "/dashboard/manageProducts" : "/dashboard/my-orders"}`} className={({isActive})=>(isActive ? "navActive" : "navDefault")}>Dashboard</NavLink>
</li>

<li>
    <NavLink to="/about" className={({isActive})=>(isActive ? "navActive" : "navDefault")}>About</NavLink>
</li>

{
    user ? 
    
    <div className="dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img src={user.photoURL} alt='User' />
        
      </div>
      <p className='bg-primary text-base w-7 h-7 px-1 py-1 rounded-full text-info absolute -top-2 -right-2'>{carts?.length ? carts?.length : 0}</p>
    </label>
    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-2">

    <li>
    <NavLink to="/cart" className={({isActive})=>(isActive ? "navActive" : "navDefault")}><IoMdCart className='h-6 w-6'/>
          <span className="badge badge-primary text-white font-medium">{carts?.length ? carts?.length : 0}</span></NavLink>
</li>


<li>
    <NavLink to="/profile" className={({isActive})=>(isActive ? "navActive" : "navDefault")}>Profile</NavLink>
</li>


      <button onClick={handleOut} className='myBtn'>
        Logout
        <IoMdLogOut className='w-6 h-6'/>
      </button>
    </ul>
  </div>

    : <Link to="/signIn">

    <button className='myBtn'>LogIn <IoMdLogIn className='w-7 h-7'/></button>
    
    </Link>
}

    </>

    const logoContainer = <Link className='/'>
    <img src={logo} alt="Logo" className='w-28'/>
    </Link>

    return (

        <section className='sticky z-50 top-0'>
<nav className="navbar BgNav">
            <div className="navbar-start">
                {
                    logoContainer
                }
            </div>

            <form className="navbar-center hidden lg:flex relative">
                <div>
                <input type="text" className='px-2 py-2 bg-primary bg-opacity-20 focus:border focus:border-primary outline-none rounded-l-xl rounded-r-full w-80' placeholder='Search More....'/>
                <button className='absolute bg-primary right-0 px-2 py-2 rounded-r-full text-white'>
                <IoSearch className='h-6 w-6'/>
                </button>
                </div>
                
            </form>

            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>

            


            <form className="navbar-end lg:hidden relative">
                <input type="text" className='px-2 py-2 bg-primary bg-opacity-20 focus:border focus:border-primary outline-none rounded-l-lg rounded-r-full' placeholder='Search More....'/>
                <button className='absolute bg-primary px-2 py-2 rounded-r-full text-white'>
                <IoSearch className='h-6 w-6'/>
                </button>
                
            </form>


        </nav>


        <div className="btm-nav z-50 rounded-full bg-base bg-opacity-90 lg:hidden mb-3 shadow-2xl border-b-4 border-secondary">
                <NavLink to="/" className={({ isActive }) => (isActive ? "text-secondary" : "default")}>
                <HiOutlineHome className='h-7 w-7' />
                </NavLink>


                <NavLink to="/shop" className={({ isActive }) => (isActive ? "text-secondary" : "default")}>
                    <HiOutlineShoppingBag className='h-7 w-7'/>
                </NavLink>


                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "text-secondary" : "default")}>
                    <HiOutlineClipboardDocumentList className='h-7 w-7'/>
                </NavLink>


                <NavLink to="/about" className={({ isActive }) => (isActive ? "text-secondary" : "default")}>
                    <HiOutlineInformationCircle className="w-7 h-7"/>
                </NavLink>

                {
                    user ?
                    
                    <div className="dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-9 rounded-full">
      <img src={user?.photoURL} alt='User' />
      </div>
      <p className='bg-primary text-base w-7 h-7 px-1 py-1 rounded-full text-info absolute -top-2 -right-2'>90</p>
    </label>
    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-2 bottom-20">

    <li>
    <NavLink to="/cart" className={({isActive})=>(isActive ? "navActive" : "navDefault")}><IoMdCart className='h-6 w-6'/>
          <span className="badge">New</span></NavLink>
</li>


<li>
    <NavLink to="/profile" className={({isActive})=>(isActive ? "navActive" : "navDefault")}>Profile</NavLink>
</li>


      <button className='myBtn'>
        Logout
        <IoMdLogOut className='w-6 h-6'/>
      </button>
    </ul>
  </div>
                    
                     : <NavLink to="/signIn" className={({ isActive }) => (isActive ? "text-secondary" : "default")}>
                     <IoMdLogIn className="w-7 h-7"/>
                 </NavLink>
                }


            </div>

        
        </section>
        
    );
};

export default Navbar;