import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import logo from "../../assets/brand/full logos.png"
import heroImg from "../../assets/hero/signIn.png"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from '../../components/SocialLogin';

const SignIn = () => {
    const { signIn } = useAuth();
    const [type, setType] = useState("password");
    const [IsShow, setIsShow] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => {




        signIn(data?.email, data?.password)
            .then(res => {
                const loggedUser = res.user;
                navigate(from, { replace: true })
                Swal.fire({
                    title: 'Success!',
                    text: 'Sign In Successful',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })

            })
    };


    const handleShow = () => {
        setType("text")
    }

    const handleHide = () => {
        setType("password")
    }
    return (
        <section className='flex items-center justify-center min-h-[calc(100vh-100px)]'>
            <Helmet>
                <title>Sign In  | Khejur BD</title>
            </Helmet>
            <div>
                <div className='flex items-center justify-center text-center my-10'>
                    <Link className='/'>
                        <img src={logo} alt="Logo" className='w-28' />
                    </Link>

                </div>
                <div className='flex gap-14 flex-col lg:flex-row items-center justify-center'>
                    <div className='lg:w-2/4'>
                        <img src={heroImg} alt="Sign In Image" />
                    </div>
                    <div>
                        <h1 className='text-center mb-10 brand text-primary text-3xl'>Sign In</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
                            <input type='email' placeholder='Enter Your Email'
                                {...register("email", { required: true })}
                                aria-invalid={errors.email ? "true" : "false"}
                                className='inputField' />
                            {errors.email?.type === 'required' && <p role="alert" className='text-error font-medium'>Email is required</p>}

                            <div className='inline-flex items-center relative'>
                                <input type={type} placeholder='Enter Your Password'
                                    {...register("password", { required: "Password is required" })}
                                    aria-invalid={errors.password ? "true" : "false"}
                                    className='inputField' />
                                <div className='absolute right-3 cursor-pointer' onClick={() => setIsShow(!IsShow)}>
                                    {
                                        IsShow ? <FaEyeSlash className='h-5 w-5 text-primary' onClick={handleHide} /> : <FaEye className='h-5 w-5 text-primary' onClick={handleShow} />
                                    }
                                </div>
                            </div>
                            {errors.password && <p role="alert" className='text-error font-medium'>{errors.password?.message}</p>}

                            <input type="submit" value="Sign In" className='myBtn' />
                        </form>

                        <div className='mt-5'>
                            <h1 className='font-medium'>New To Khejur BD? <Link className='font-semibold text-secondary underline' to="/signUp">Sign Up</Link></h1>
                        </div>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;