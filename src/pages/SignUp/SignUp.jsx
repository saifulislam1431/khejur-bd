import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import logo from "../../assets/brand/full logos.png"
import heroImg from "../../assets/hero/signUp.png"
import SocialLogin from '../../components/SocialLogin';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
const token = import.meta.env.VITE_IMAGE_TOKEN;
const SignUp = () => {


    const { updateUser, signUp, userVerify } = useAuth();
    const [type, setType] = useState("password");
    const [IsShow, setIsShow] = useState(false);
    const [error, setError] = useState("");
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"

    const hosting_url = `https://api.imgbb.com/1/upload?key=${token}`
    const { register, formState: { errors }, handleSubmit } = useForm();


    const onSubmit = (data) => {
        const image = data.photo;
        // console.log(image[0]);
        const formData = new FormData();
        formData.append("image", image[0])


        const password = data.password;
        const confirmPassword = data.confirmPassword;
        if (password.length < 6) {
            setError("Password must be six characters in length")
        }
        if (password !== confirmPassword) {
            return setError("Password doesn't match")
        }
        if (!/(?=.*?[A-Z])/.test(password)) {
            return setError("At least one upper case include in your password")
        }
        if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
            return setError("At least one special character include in your password")
        }



        fetch(hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(ResData => {

                if (ResData) {
                    const newUser = {
                        email: data.email,
                        name: data.name,
                        phone: data.phone,
                        gender: data.gender,
                        photoURL: ResData.data.display_url
                    }


                    signUp(data?.email, data?.password)
                        .then((res) => {
                            const loggedUser = res.user;

                            updateUser(loggedUser, data?.name, ResData.data.display_url)
                                        .then(async() => {
                                            const res = await axios.post("http://localhost:5000/users", newUser)
                                            if (res.data.insertedId) {
                                                userVerify()
                                                .then(() => {
                                                    navigate(from, { replace: true })
                                                    Swal.fire({
                                                        title: 'Success!',
                                                        text: 'Sign up successful and check your email to verify!',
                                                        icon: 'success',
                                                        confirmButtonText: 'Ok'
                                                    })  
                                                })
                                            }
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

                }

            })


    }


    const handleShow = () => {
        setType("text")
    }

    const handleHide = () => {
        setType("password")
    }



    return (
        <section className='flex items-center justify-center min-h-[calc(100vh-100px)]'>
            <Helmet>
                <title>Sign Up  | Khejur BD</title>
            </Helmet>
            <div>
                <div className='flex items-center justify-center text-center my-10'>
                    <Link className='/'>
                        <img src={logo} alt="Logo" className='w-28' />
                    </Link>

                </div>
                <div className='flex gap-14 flex-col lg:flex-row items-center justify-center'>
                    <div className='lg:w-2/4'>
                        <img src={heroImg} alt="Sign Up Image" />
                    </div>
                    <div>
                        <h1 className='text-center mb-10 brand text-primary text-3xl'>Sign Up</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>


                            <input type='text' placeholder='Enter Your Name'
                                {...register("name", { required: true })}
                                aria-invalid={errors.name ? "true" : "false"}
                                className='inputField' />
                            {errors.name?.type === 'required' && <p role="alert" className='text-error font-medium'>Name is required</p>}



                            <input type='email' placeholder='Enter Your Email'
                                {...register("email", { required: true })}
                                aria-invalid={errors.email ? "true" : "false"}
                                className='inputField' />
                            {errors.email?.type === 'required' && <p role="alert" className='text-error font-medium'>Email is required</p>}

                            <input type='tel' placeholder='Enter Your Number'
                                {...register("phone", { required: true })}
                                aria-invalid={errors.phone ? "true" : "false"}
                                className='inputField w-full lg:w-96' />
                            {errors.phone?.type === 'required' && <p role="alert" className='text-error font-medium'>Phone is required</p>}

                            <div className='inline-flex items-center'>
                                <input type={type} placeholder='Enter Your Password'
                                    {...register("password", { required: "Password is required" })}
                                    aria-invalid={errors.password ? "true" : "false"}
                                    className='inputField' />
                                <div className='relative right-8 cursor-pointer' onClick={() => setIsShow(!IsShow)}>
                                    {
                                        IsShow ? <FaEyeSlash className='h-5 w-5 text-primary' onClick={handleHide} /> : <FaEye className='h-5 w-5 text-primary' onClick={handleShow} />
                                    }
                                </div>
                            </div>
                            {errors.password && <p role="alert" className='text-error font-medium'>{errors.password?.message}</p>}

                            <div className='inline-flex items-center'>
                                <input type="password" placeholder='Confirm Password'
                                    {...register("confirmPassword", { required: "Confirm Password is required" })}
                                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                                    className='inputField' />
                            </div>
                            {errors.confirmPassword && <p role="alert" className='text-error font-medium'>{errors.confirmPassword?.message}</p>}



                            <input type='file' placeholder='Enter Your Photo Url'
                                {...register("photo", { required: true })}
                                aria-invalid={errors.photo ? "true" : "false"}
                                className='file-input file-input-bordered file-input-primary w-96' />
                            {errors.photo?.type === 'required' && <p role="alert" className='text-error font-medium'>Photo is required</p>}


                            <select {...register("gender")} className='inputField font-semibold'>
                                <option defaultValue="Gender">Gender</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>

                            <p className='my-3 font-semibold text-red-600'>{error}</p>




                            <input type="submit" value="Sign Up" className='myBtn' />
                        </form>

                        <div className='mt-5'>
                            <h1 className='font-medium'>Already have an account?? <Link className='font-semibold text-secondary underline' to="/signIn">Sign In</Link></h1>
                        </div>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;