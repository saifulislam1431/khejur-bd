import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import logo from "../../assets/brand/logo-01.png"
import { HiBars3BottomLeft, HiHome, HiMiniAdjustmentsHorizontal, HiMiniListBullet, HiMiniPlus, HiMiniUserGroup, HiOutlineCheckBadge, HiOutlinePencilSquare, HiOutlinePlus, HiOutlineRss, HiOutlineUserGroup, HiShoppingBag } from 'react-icons/hi2';

const DashBoard = () => {
    const [isAdmin] = useAdmin();

    return (
<div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
   <Outlet />
    <label htmlFor="my-drawer-2" className="drawer-button lg:hidden absolute left-2 top-2"><HiBars3BottomLeft className='w-10 h-10 text-primary' /></label>
  
  </div> 
  <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu py-4 pl-4 pr-0 w-64 h-full bg-base-200 text-base-content">
                    <Link to="/" className="inline-flex items-center justify-center gap-2 mt-2 mb-10">
                        <img src={logo} alt="Logo" className='w-28' />
                    </Link>
                    {/* Sidebar content here */}



                    {
                        isAdmin ?
                            <>
                                <NavLink to="/dashboard/manageProducts" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiMiniAdjustmentsHorizontal className='inline-flex items-center h-6 w-6' /> Manage Products</NavLink>

                                <NavLink to="/dashboard/add-product" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiMiniPlus className='inline-flex items-center h-6 w-6' /> Add Product</NavLink>                                

                                <NavLink to="/dashboard/manageUsers" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiMiniUserGroup className='inline-flex items-center h-6 w-6' /> Manage Users</NavLink>

                                <NavLink to="/dashboard/manageOrders" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiMiniListBullet className='inline-flex items-center h-6 w-6' /> Manage Orders</NavLink>

                                <NavLink to="/dashboard/updateProduct" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiOutlinePencilSquare className='inline-flex items-center h-6 w-6' /> Update Product</NavLink>
                            </>

                                :
                                <>
                                    
                                    <NavLink to="/dashboard/my-orders" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiOutlineCheckBadge className='inline-flex items-center h-6 w-6' /> My Orders</NavLink>
                                    
                                    <NavLink to="/dashboard/track-orders" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiOutlineRss className='inline-flex items-center h-6 w-6' /> Track Orders</NavLink>
                                </>
                    }

                    <li className='my-8 divide-x-4'>

                    </li>

                    <NavLink to="/" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiHome className='inline-flex items-center gap-2 h-5 w-5'/> Home</NavLink>
                    <NavLink to="/shop" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiShoppingBag className='inline-flex items-center gap-2 h-5 w-5'/> Shop</NavLink>
                </ul>

            </div>
</div>
    );
};

export default DashBoard;