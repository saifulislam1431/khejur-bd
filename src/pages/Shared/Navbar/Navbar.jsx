import React, { useEffect, useRef, useState } from 'react';
import "./Nav.css"
import { Link, NavLink } from 'react-router-dom';
import logo from "../../../assets/brand/logo-01.png"
import useAuth from '../../../hooks/useAuth';
import { IoMdCart, IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { HiOutlineClipboardDocumentList, HiOutlineHome, HiOutlineInformationCircle, HiOutlineShoppingBag } from 'react-icons/hi2';
import { IoSearch } from "react-icons/io5";
import { HiEmojiSad, HiOutlineSearch } from "react-icons/hi";
import Swal from 'sweetalert2';
import useCarts from '../../../hooks/useCarts';
import useAdmin from '../../../hooks/useAdmin';
import SingleProduct from '../../Home/AllProducts/SingleProduct';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [carts, refetch] = useCarts();
    const [isAdmin] = useAdmin();
    const [searchPage , setSearchPage] = useState(false)
    const [searchProd, setSearchProd] = useState([]);
    const [searchText, setSearchText] = useState("");
    const inputRef = useRef(null);
    

    // console.log(carts);
    
    // const user = true;

    useEffect(() => {
        // Add event listener to handle clicks outside of the input field
        const handleClickOutside = (e) => {
          if (inputRef.current && !inputRef.current.contains(e.target)) {
            setTimeout(() => {
                setSearchPage(false);
            }, 300);
            
          }
        };
    
        // Attach the event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);
    
        // Remove the event listener when the component unmounts
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);


    const handleInputClick = () => {
        setSearchPage(true);
      };

    const handleOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'logout successful!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            })
    }

    const handleSearch = () =>{
        fetch(`http://localhost:5000/search-product/name/${searchText}`)
        .then(res => res.json())
        .then(data => {
            setSearchProd(data)
        })
    }

      // Prevent modal from closing when clicking inside it
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

    // console.log(searchProd);

    const navItems = <>

        <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Home</NavLink>
        </li>

        <li>
            <NavLink to="/shop" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Shop</NavLink>
        </li>

        <li>
            {
                isAdmin ? <NavLink to="/dashboard/manageProducts" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Dashboard</NavLink> : <NavLink to="/dashboard/my-orders" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Profile</NavLink>
            }
        </li>

        <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>About</NavLink>
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
                            <NavLink to="/cart" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}><IoMdCart className='h-6 w-6' />
                                <span className="badge badge-primary text-white font-medium">{carts?.length ? carts?.length : 0}</span></NavLink>
                        </li>


                        <button onClick={handleOut} className='myBtn'>
                            Logout
                            <IoMdLogOut className='w-6 h-6' />
                        </button>
                    </ul>
                </div>

                : <Link to="/signIn">

                    <button className='myBtn'>LogIn <IoMdLogIn className='w-7 h-7' /></button>

                </Link>
        }

    </>

    const logoContainer = <Link className='/'>
        <img src={logo} alt="Logo" className='w-28' />
    </Link>

    return (

        <section className='sticky z-50 top-0'>
            <nav className='BgNav'>

            <nav className="navbar max-w-7xl mx-auto">
                <div className="navbar-start">
                    {
                        logoContainer
                    }
                </div>

                <form className="navbar-center hidden lg:flex relative">
                    <div>
                        <input onClick={handleInputClick} onChange={(e) => setSearchText(e.target.value)}
                        onKeyUp={handleSearch} ref={inputRef} type="text" className='px-2 py-2 bg-primary bg-opacity-20 focus:border focus:border-primary outline-none rounded-l-xl rounded-r-full w-80' placeholder='Search More....' />
                        <span className='absolute bg-primary right-0 px-2 py-2 rounded-r-full text-white'>
                            <IoSearch className='h-6 w-6' />
                        </span>
                    </div>

                </form>

                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>




                <form className="navbar-end lg:hidden relative">
                    <input type="text" className='px-2 py-2 bg-primary bg-opacity-20 focus:border focus:border-primary outline-none rounded-l-lg rounded-r-full' placeholder='Search More....' />
                    <button className='absolute bg-primary px-2 py-2 rounded-r-full text-white'>
                        <IoSearch className='h-6 w-6' />
                    </button>

                </form>


            </nav>

            </nav>


{
    searchPage && (
        <div className="min-h-screen bg-white transition-all duration-500 " onClick={handleModalContentClick}>
        <h1 className='text-2xl lg:text-3xl font-bold my-16 text-secondary inline-flex items-center justify-center w-full gap-3'>Discover Your Products <HiOutlineSearch className='h-10 w-10' /></h1>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-20'>
                            {
                                searchProd.map(product => <div key={product?._id} className="card card-compact w-90 bg-base-100 shadow-xl" >
                                <figure><img src={product?.imageUrl} alt="Product" /></figure>
                                <div className="card-body">
                                <h1 className='font-bold text-primary secTitle'>{product?.name}</h1>
                                <div className='flex items-center justify-between font-semibold text-primary'>
                               
                                    <p>Size: {product?.size}</p>
                                    <p>Price: ৳  {product?.price}</p>
                                </div>
        
                                <p className='font-semibold text-primary'>Brand: {product?.brand}</p>
        <p className='font-semibold text-primary'>Stock: <span className={product?.stock === "Out Of Stock" ? "text-error" : "text-secondary"}>{product?.stock}</span></p>
                                  <div className="card-actions justify-end">
                                  <Link to={`/details/${product?._id}`}>
                                    <button disabled={product?.stock === "Out Of Stock" ? true : false} className='myBtnSec'>View Details</button>
                                    </Link>
                                  </div>
                                </div>
                              </div>)
                            }
                        </div>
        
                      
                            <h1 className={`${searchProd.length === 0 ? "my-20 text-2xl lg:text-3xl font-bold text-error inline-flex items-center justify-center w-full gap-2" : "hidden"}`}>Sorry, No Products Found! <HiEmojiSad className='h-10 w-10'/></h1>
                       
        
        </div>
    )
}

            <div className="btm-nav z-50 rounded-full bg-base bg-opacity-90 lg:hidden mb-3 shadow-2xl border-b-4 border-secondary">
                <NavLink to="/" className={({ isActive }) => (isActive ? "text-secondary" : "default")}>
                    <HiOutlineHome className='h-7 w-7' />
                </NavLink>


                <NavLink to="/shop" className={({ isActive }) => (isActive ? "text-secondary" : "default")}>
                    <HiOutlineShoppingBag className='h-7 w-7' />
                </NavLink>


                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "text-secondary" : "default")}>
                    <HiOutlineClipboardDocumentList className='h-7 w-7' />
                </NavLink>


                <NavLink to="/about" className={({ isActive }) => (isActive ? "text-secondary" : "default")}>
                    <HiOutlineInformationCircle className="w-7 h-7" />
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
                                    <NavLink to="/cart" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}><IoMdCart className='h-6 w-6' />
                                        <span className="badge">New</span></NavLink>
                                </li>


                                <li>
                                    <NavLink to="/profile" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Profile</NavLink>
                                </li>


                                <button className='myBtn'>
                                    Logout
                                    <IoMdLogOut className='w-6 h-6' />
                                </button>
                            </ul>
                        </div>

                        : <NavLink to="/signIn" className={({ isActive }) => (isActive ? "text-secondary" : "default")}>
                            <IoMdLogIn className="w-7 h-7" />
                        </NavLink>
                }


            </div>


        </section>

    );
};

export default Navbar;