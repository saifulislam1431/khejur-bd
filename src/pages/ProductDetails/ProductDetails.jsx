import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import { HiChevronLeft, HiMinus, HiPlus, HiShoppingBag } from 'react-icons/hi2';
import { FaReply } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCarts from '../../hooks/useCarts';
import { Helmet } from 'react-helmet-async';

const ProductDetails = () => {
    const navigate = useNavigate()
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [info, setInfo] = useState('description');

    const [selectedProduct, setSelectedProduct] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const { id } = useParams();
    const [allProducts] = useProducts();
    const [, refetch] = useCarts();

    useEffect(() => {
        const selectedProduct = allProducts.find(products => products._id === id);
        setSelectedProduct(selectedProduct)
    }, [allProducts, id])




    const handleIncrease = () => {
        setQuantity(pre => pre === 0 ? 1 : pre + 1)
    }
    const handleDecrease = () => {
        setQuantity(pre => pre === 0 ? 1 : pre - 1)
    }

    const handleCart = async (product) => {

        if (!user) {
            Swal.fire({
                title: 'Please Sign In',
                text: "For purchase you have to sign in first",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sign In'
            }).then((result) => {
                if (result.isConfirmed) {
                    //   return <Navigate to="/signIn" state={{from : location}} replace/>
                    navigate("/signIn")
                }
            })
        }
        if (user && user?.email) {
            const cartInfo = {
                productId: product._id,
                productCategory: product.category,
                name: product.name,
                baseSize: product.size,
                basePrice: product.price,
                imageUrl: product.imageUrl,
                quantity: quantity === 0 ? 1 : quantity,
                newPrice: parseFloat(quantity === 0 ? 1 : quantity) * parseFloat(product.price),
                email: user?.email

            }

            const res = await axiosSecure.post("/product-cart", cartInfo);
            if (res.data.insertedId) {
                refetch();

                Swal.fire({
                    title: 'Success!',
                    text: "Selected Successfully",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Go To Your Cart To Further Process'
                }).then((result) => {
                    if (result.isConfirmed) {
                        //   return <Navigate to="/signIn" state={{from : location}} replace/>
                        navigate("/cart")
                    }
                })
            }

        }
    }

    const handleShareClick = async (product) => {
        try {
            await navigator.share({
                title: product?.name,
                text: "Check out this amazing product!",
                // replace "http://localhost:5173" with our hosting url
                url: `http://localhost:5173/details/${product?._id}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <section className='my-10 px-2'>
            <div className='w-fit'>
                <Link to="/shop" className='inline-flex gap-1 items-center px-2 py-2 font-semibold text-primary'><HiChevronLeft className='h-6 w-6' />Back To Shop</Link>
            </div>

            <div className='flex flex-col lg:flex-row gap-5 items-center justify-around my-5'>

                <Helmet>
                    <title>Product Details | Khejur BD</title>
                </Helmet>

                <div className='w-full'>
                    <img src={selectedProduct?.imageUrl} alt={selectedProduct?.name} className='w-96 rounded-2xl shadow-xl' />
                </div>

                <div className='w-full'>
                    <div className='space-y-1'>
                        <h1 className='text-2xl text-primary font-bold'>{selectedProduct?.name}</h1>
                        <h1 className='font-bold'>৳ {selectedProduct?.price}</h1>
                        <p className='font-semibold'>Size: {selectedProduct?.size}</p>
                        <p className='font-medium'>Stock: <span className={`${selectedProduct?.stock === "In Stock" ? "text-secondary " : "text-error"}`}>{selectedProduct?.stock}</span></p>
                    </div>

                    <div className='flex gap-2 md:gap-4 lg:gap-6 items-center text-center my-6'>
                        <button className={`tabs brand tab tab-bordered ${info === "description" ? "activeTab" : ""}`} onClick={() => setInfo("description")}>Description</button>
                        <button className={`tabs brand tab tab-bordered ${info === "details" ? "activeTab" : ""}`} onClick={() => setInfo("details")}>Details</button>
                        <button className={`tabs brand tab tab-bordered ${info === "reviews" ? "activeTab" : ""}`} onClick={() => setInfo("reviews")}>Reviews</button>
                    </div>

                    {
                        info === "description" ? <div className='h-96 lg:h-80 mb-10 lg:mb-0'>
                            <p>{selectedProduct?.description}</p>

                        </div> : info === "details" ? <div className='h-96 lg:h-80 mb-10 lg:mb-0 space-y-3 text-lg font-medium'>
                            <p>Brand: {selectedProduct?.brand}</p>
                            <p>Category: {selectedProduct?.category}</p>
                            <p>Color: {selectedProduct?.color}</p>
                            <p>Country Of Origin: {selectedProduct?.countryOfOrigin}</p>
                        </div> : <div className='h-96 lg:h-80 mb-10 lg:mb-0'>
                            <p>{selectedProduct?.reviews}</p>

                        </div>
                    }

                    {
                        selectedProduct?.stock === "Out Of Stock"
                            ? <h1 className='text-xl font-semibold text-error'>The product is out of stock that's why it is unable to purchase.</h1>
                            :
                            <div className='flex flex-col items-center justify-center'>

                                <div className='inline-flex items-center gap-10 '>
                                    <div className='inline-flex items-center'>
                                        <button onClick={handleIncrease} className='bg-primary px-2 py-2 rounded-l-lg text-white'><HiPlus className='w-6 h-6' /></button>

                                        <input type="text" min={1} value={`${quantity === 0 ? 1 : quantity}`} className='w-24 pl-7 pr-2 py-2 bg-primary bg-opacity-30  font-semibold outline-none' />

                                        <button onClick={handleDecrease} className={`${quantity < 1 && quantity === 1 ? "disabled:cursor-not-allowed" : "bg-primary px-2 py-2 rounded-r-lg text-white"}`}><HiMinus className='w-6 h-6' /></button>
                                    </div>

                                    <div className='px-5 lg:w-56 text-center py-3 lg:px-9 border bg-primary font-bold border-primary rounded-lg text-white'>
                                        <p>Price: <span>{parseFloat(quantity === 0 ? 1 : quantity) * parseFloat(selectedProduct?.price)}৳</span></p>
                                    </div>
                                </div>

                                <div className='my-5 inline-flex gap-5'>
                                    <button onClick={() => handleCart(selectedProduct)} className='inline-flex items-center justify-center gap-2 w-48 lg:w-64 border py-3 rounded-lg font-semibold border-primary text-primary hover:bg-primary hover:text-white transition-all duration-500'>Buy Now <HiShoppingBag className='w-5 h-5' /></button>
                                    <button onClick={() => handleCart(selectedProduct)} className='inline-flex items-center justify-center gap-2 w-36 lg:w-44 border py-3 rounded-lg font-semibold bg-primary border-primary text-white hover:bg-transparent hover:text-primary transition-all duration-500'>Add To Cart <IoIosCart className='w-5 h-5' /></button>
                                </div>
                                <div className='w-4/5'>
                                    <button className='text-lg border rounded-xl py-2 flex flex-row items-center gap-2 justify-center bg-primary border-primary text-white w-full' onClick={() => handleShareClick(selectedProduct)}>
            <FaReply className='w-7 h-7'/> Share now!                            
                                    </button>
                                    
                                </div>

                            </div>
                    }

                </div>

            </div>
        </section>
    );
};

export default ProductDetails;