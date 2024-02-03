import Link from 'next/link'
import React, { useState, useContext } from 'react'
import { useRouter } from "next/navigation";
import { message } from 'antd';
import cookie from "js-cookie"
import { auth } from '@/config/firebase/';
import Loader from '../Loader';
import { signInWithEmailAndPassword } from "firebase/auth"
import AppContext from '../appContext';
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Login = () => {
    const context = useContext(AppContext)
    const router = useRouter()
    const [newUser, setNewUser] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true)
    function startTimer() {
        setTimeout(function () {
            console.log("Timer is done!");
            setLoading(false)
        }, 1000); // 3000 milliseconds = 3 seconds
    }

    // Start the timer
    startTimer();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const validateEmail = (email) => {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const containsEmail = (name) => {
        // Regular expression to check if the name contains an email address
        const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
        return emailRegex.test(name);
    }

    const handleForgotPassword = () => {
        console.log("handle forgot password")

    }
    const loginUser = async (e) => {

        const checkEmail = validateEmail(newUser.email)
        const checkName = containsEmail(newUser.username)
        e.preventDefault(); // Prevents the default form submission behavior
        try {

            if(newUser.email =="" || newUser.password ==""){
                message.error("Fields are empty")
            }
            else if (!checkEmail || checkName) {
                message.error("Login Failed Due to wrong email or name format")
                return
            }

            else {
                const userCredential = await signInWithEmailAndPassword(auth, newUser.email, newUser.password);
                const user = userCredential.user;
                console.log("usererer", user)
                context.setUserObject(user)

                cookie.set("user", JSON.stringify(user))

                message.success('User Logged in successfully');
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                // The email is already in use, display an error message to the user.
                message.error("Email is already in use. Please choose a different email.");
            } else {
                // Handle other registration errors
                message.error("Wrong Credientials .");
            }
        }
    };

    return (
        <>
            {loading ? (
                <div style={{ color: "black", width: "100%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", }}>

                    <Loader />
                </div>
            ) : (
                <div>
                    <div className="absolute top-[10rem] md:block hidden left-0 bg-[#2CD7834F]/10  w-[300] md:w-[400px]  h-[300] md:h-[400px] rounded-full blur-3xl"></div>
                    <div className="absolute top-[10rem] md:block hidden r bg-[#2CD7834F]/10  w-[300] md:w-[400px]  h-[300] md:h-[400px] right-0 rounded-full blur-3xl"></div>
                    <div className=" flex flex-col text-center justify-center items-center">
                        <h1 className="text-[32px] md:text-[40px] font-[800] bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                            Login
                        </h1>
                        <p className="text-[18px] font-[500] text-black dark:text-[#FFF] md:px-[15rem] pt-5">
                            Please login to your account to proceed further                </p>
                        <div className='flex flex-col gap-16 px-3 pb-10 md:pb-0 pt-32 md:pt-40 md:px-10  my-20 w-full md:w-[80%] bg-custom-blue  border border-primary-border rounded-md'>

                            <input placeholder='Enter Email'
                                type="email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                className='dark:placeholder-[#FFFFFF]  focus:outline-none text-[13px] md:text-[16px] pl-3 
                        md:pl-5 w-full py-3 md:py-5  bg-custom-blue border rounded-md dark:border-primary-border
                         border-primary-dark' />
                            <div className="relative">
                                <input
                                    placeholder="Enter Password"
                                    type={showPassword ? "text" : "password"}
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    className="dark:placeholder-[#FFFFFF] text-[13px] md:text-[16px] pl-3 md:pl-5 focus:outline-none
                                        w-full py-3 md:py-5 bg-custom-blue border rounded-md dark:border-primary-border
                                    border-primary-dark"
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-4 top-[22px] cursor-pointer"
                                >
                                    {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                </span>
                            </div>
                            <div className='my-0'>
                                <Link href={'/'}>
                                    <button
                                        onClick={loginUser}
                                        className='font-[500] md:text-[18px] w-[130px] h-[40px] md:h-[50px] text-white dark:text-white 
                            rounded-md  bg-gradient-to-r from-blue-400 via-green-500 to-blue-500'>
                                        Login
                                    </button>

                                </Link>
                                <div className='mt-4 hover:text-blue-700 transition duration-200'>
                                    <Link href={'/ForgotPassword'} onClick={handleForgotPassword}>

                                        <p>Forgot Password?</p>

                                    </Link>
                                </div>
                            </div>

                            <div className='my-1' style={{ marginBottom: "40px" }}>
                                <p className="mb-6 ">If not Registered?</p>

                                <Link href={'/Register'}>
                                    <button
                                        onClick={() => router.push("/Register")}
                                        className='font-[500] md:text-[18px] w-[130px] h-[40px] md:h-[50px] text-white dark:text-white 
                            rounded-md  bg-gradient-to-r from-blue-400 via-green-500 to-blue-500'>
                                        Register
                                    </button>

                                </Link>
                            </div>
                        </div>
                    </div>
                </div>)}</>
    )
}

export default Login