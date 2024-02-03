import Link from 'next/link'
import React, { useState, useContext } from 'react'
import { useRouter } from "next/navigation";
import { message } from 'antd';
import cookie from "js-cookie"
import { auth } from '@/config/firebase/';
import AppContext from '../appContext';
import { db } from "@/config/firebase"
import { sendPasswordResetEmail } from 'firebase/auth';

const Login = () => {
    const context = useContext(AppContext)
    const router = useRouter()
    const [newUser, setNewUser] = useState({ email: '', password: '' });



    const validateEmail = (email) => {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(newUser.email)
        try {


            await sendPasswordResetEmail(auth, newUser.email)
            message.success("Check your Gmail")

            // setTimeout(() => {
            //     router.push("/login");
            // }, 3000); // 3000 milliseconds = 3 seconds
        }
        catch (err) {
            message.error("Error")
            console.log(err)
        }

    }




    return (
        <div>
            <div className="absolute top-[10rem] md:block hidden left-0 bg-[#2CD7834F]/10  w-[300] md:w-[400px]  h-[300] md:h-[400px] rounded-full blur-3xl"></div>
            <div className="absolute top-[10rem] md:block hidden r bg-[#2CD7834F]/10  w-[300] md:w-[400px]  h-[300] md:h-[400px] right-0 rounded-full blur-3xl"></div>
            <div className=" flex flex-col text-center justify-center items-center">
                <h1 className="text-[32px] md:text-[40px] font-[800] bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                    Forgot Password
                </h1>
                <p className="text-[18px] font-[500] text-black dark:text-[#FFF] md:px-[15rem] pt-5">
                    Please Enter your Email and Reset password through your email       </p>
                <div className='flex flex-col gap-16 px-3 pb-10 md:pb-6 pt-6 md:pt-20 md:px-10  my-20 w-full md:w-[80%] bg-custom-blue  border border-primary-border rounded-md'>

                    <input placeholder='Enter Email'
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className='dark:placeholder-[#FFFFFF]  focus:outline-none text-[13px] md:text-[16px] pl-3 
                        md:pl-5 w-full py-3 md:py-5  bg-custom-blue border rounded-md dark:border-primary-border
                         border-primary-dark' />


                    <div className='my-0'>
                       <p className='py-2'>After Submitting Email, check your gmail account and reset password</p> 

                        <Link href={'#'}>
                            <button
                                onClick={handleSubmit}
                                className='font-[500] md:text-[18px] w-[130px] h-[40px] md:h-[50px] text-white dark:text-white 
                            rounded-md  bg-gradient-to-r from-blue-400 via-green-500 to-blue-500'>
                                Submit
                            </button>

                        </Link>
                    </div>

                    <div className='my-0'>
                       <p className='py-2'>if Password reset successfully, you can login now with new password</p> 
                        <Link href={'/login'}>
                            <button
                               
                                className='font-[500] md:text-[18px] w-[130px] h-[40px] md:h-[50px] text-white dark:text-white 
                            rounded-md  bg-gradient-to-r from-blue-400 via-green-500 to-blue-500'>
                                Login
                            </button>

                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login