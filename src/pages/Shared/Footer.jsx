import React from 'react';
import logo from "../../assets/brand/full logos.png" 
import logoSec from "../../assets/brand/logo-01.png" 
import { Link } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';
import { HiOutlineEnvelope, HiOutlinePhone } from 'react-icons/hi2';

const Footer = () => {
    return (
        <footer className='mt-20'>
            <footer className="footer p-10 bg-primary bg-opacity-10 text-base-content">
  <aside>
  <Link className='/'>
    <img src={logo} alt="Logo" className='w-20'/>
    </Link>
  </aside> 
  <nav>
    <header className="footer-title">Products</header> 
    <Link to="/dates" className="link link-hover">Khejur</Link> 
    <Link to="/peanuts" className="link link-hover">Peanuts</Link> 
    <Link to="/seeds" className="link link-hover">Seeds</Link> 
  </nav> 
  <nav>
    <header className="footer-title">Company</header> 
    <Link to="/about" className="link link-hover">About us</Link> 
    <Link to="/contact" className="link link-hover">Contact</Link> 
    <Link to="/shop" className="link link-hover">Shop</Link> 
    <Link to="/blog" className="link link-hover">Blog</Link>
  </nav> 
  <nav>
    <header className="footer-title">Legal</header> 
    <Link to="/" className="link link-hover">Terms of use</Link> 
    <Link to="/" className="link link-hover">Privacy policy</Link> 
    <Link to="/" className="link link-hover">Cookie policy</Link>
  </nav>
  <nav>
    <header className="footer-title">Find Us</header> 
    <a href="https://goo.gl/maps/XyPpcDWnUDgwBxtD9" target='_blank' className='inline-flex gap-2'>
        <IoLocationOutline className='w-6 h-6 text-primary'/> <span>Amin Model Town, <br /> Savar Cantonment, Savar , <br />Dhaka, Bangladesh</span>
    </a> 
    <a href="tel:+880 1701 131 464" className='inline-flex gap-2 items-center'>
        <HiOutlinePhone className='w-6 h-6 text-primary'/> <span>+880 1701 131 464</span>
    </a> 

    <a href="mailto:sales@khejurbd.com" className='inline-flex gap-2 items-center'>
        <HiOutlineEnvelope className='w-6 h-6 text-primary'/> <span>sales@khejurbd.com</span>
    </a> 
    
  </nav>
</footer>

<footer className="footer items-center p-4 bg-primary bg-opacity-10 text-base-content border-t border-primary">
  <aside className="items-center grid-flow-col">
  <Link className='/'>
    <img src={logoSec} alt="Logo" className='w-24'/>
    </Link>
    <p>Copyright © 2023 - All right reserved</p>
  </aside> 
</footer>
        </footer>
    );
};

export default Footer;