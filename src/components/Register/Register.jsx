import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { db } from '@/config/firebase';
import { auth } from '@/config/firebase/';
import { message } from "antd"
import { serverTimestamp } from 'firebase/firestore'; // Added this import
import { collection, addDoc } from 'firebase/firestore';
import { doc, setDoc, getDocs, query, where } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Loader from '../Loader';
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Register = () => {
    const router = useRouter()
    const [newUser, setNewUser] = useState({ email: '', password: '', username: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(false)
    const validateEmail = (email) => {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    function startTimer() {
        setTimeout(function () {
            console.log("Timer is done!");
            setLoading(false)
        }, 1000); // 3000 milliseconds = 3 seconds
    }
    startTimer()
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const containsEmail = (name) => {
        // Regular expression to check if the name contains an email address
        const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
        return emailRegex.test(name);
    }



    const registerUser = async () => {
        setLoading2(true)
        console.log(newUser)
        try {
            if (newUser.email === "" || newUser.password === "" || newUser.username === "") {
                setLoading2(false)

                message.error("Fields are empty");
                return;
            }

            const checkEmail = validateEmail(newUser.email);
            const checkName = containsEmail(newUser.username);

            if (!checkEmail || checkName) {
                message.error("Registration Failed Due to wrong email or name format");
                setLoading2(false)

                return;
            }

            const emailQuery = query(collection(db, 'users'), where('email', '==', newUser.email));
            const querySnapshot = await getDocs(emailQuery);

            if (!querySnapshot.empty) {
                message.error("Email already exists");
                setLoading2(false)

                return;
            }
            else {
                const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
                console.log(userCredential.user)
                await updateProfile(auth.currentUser, {
                    displayName: newUser.username

                })
                // db.collection('users').doc(userCredential.user.uid).set(userCredential.user);
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    UId: userCredential.user.uid,
                    name: newUser.username,
                    email: newUser.email,
                    password: newUser.password,
                    joiningDate: serverTimestamp(),
                    mode: "premium"

                });

                message.success('User Registered successfully');
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
                setLoading2(false)

            }
        } catch (error) {
            message.error("Registration Failed")
            setLoading2(false)
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
                            Register
                        </h1>
                        <p className="text-[18px] font-[500] text-black dark:text-[#FFF] md:px-[15rem] pt-5">
                            Please Register a new account to proceed further                </p>
                        <div className='flex flex-col gap-16 px-3 pb-10 md:pb-0 pt-32 md:pt-40 md:px-10  my-20 w-full md:w-[80%] bg-custom-blue  border border-primary-border rounded-md'>
                            {loading2 && <Loader />}
                            <input placeholder='Enter Username'
                                type="text"
                                value={newUser.username}
                                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                className='dark:placeholder-[#FFFFFF] text-[13px] md:text-[16px] pl-3 md:pl-5 focus:outline-none
                         w-full py-3 md:py-5  bg-custom-blue border rounded-md dark:border-primary-border
                         border-primary-dark' />
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
                                    onChange={(e) => {setNewUser({ ...newUser, password: e.target.value }) ; console.log(newUser.password)}}
                                    className="dark:placeholder-[#FFFFFF] text-[13px] md:text-[16px] pl-3 md:pl-5 focus:outline-none
                                         w-full py-3 md:py-5 bg-custom-blue border rounded-md dark:border-primary-border
                                       border-primary-dark"  />
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-4 top-[22px] cursor-pointer"
                                >
                                    {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                </span>
                            </div>
                            <div className='my-0'>
                                <Link href={'#'}>
                                    <button
                                        onClick={registerUser}
                                        className='font-[500] md:text-[18px] w-[130px] h-[40px] md:h-[50px] text-white dark:text-white 
                            rounded-md  bg-gradient-to-r from-blue-400 via-green-500 to-blue-500'>
                                        Register
                                    </button>

                                </Link>
                            </div>
                            <div className='my-0' style={{ marginBottom: "30px" }}>
                                <p className="mb-6 ">If already Registered?</p>
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
                </div>)}</>
    )
}

export default Register