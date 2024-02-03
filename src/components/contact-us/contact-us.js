import React, { useState, useEffect, useContext } from 'react';
import { db } from '@/config/firebase';
import { message } from 'antd';
import { set } from 'firebase/database';
import { auth } from '@/config/firebase';
import cookie from "js-cookie"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, getDocs, query, where, setDoc, doc, collection } from 'firebase/firestore';
import AppContext from '../appContext';
import { storage } from '@/config/firebase';
import { getStorage } from "firebase/storage";
import { serverTimestamp } from 'firebase/firestore'; // Added this import
import { Select } from 'antd';
import { Menu, Dropdown, Button } from 'antd';
import { useRouter } from 'next/router';
import { DownOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Loader from '../Loader';
import { Router } from 'next/router';
const { Option, OptGroup } = Select;




// import { setDoc, doc , collection,set } from 'firebase/firestore';
const Contact = () => {
    const storage = getStorage();
    const [loading, setLoading] = useState(false);
    const [userObject, setUserObject] = useState(null)
    var userCookie = cookie.get('user');
    const router = useRouter()

    useEffect(() => {
        if (userCookie) {
            setUserObject(JSON.parse(userCookie))

        }
    }, [userCookie]);
    const context = useContext(AppContext)
    console.log(context.userObject.displayName, " and ", context.userObject.email)
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState(null); // Added state for preview
    const [user, setUser] = useState({})
    const [email, setEmail] = useState('')
    console.log("email:", userObject?.email,);

    const [toolData, setToolData] = useState({
        title: "",
        description: "",
        username: "",
        email: "",

    });
    console.log(toolData)
  


    const handleSubmitTool = async () => {
        setLoading(true)

        if ((toolData.title && toolData.description && toolData.username ) === "") {
            message.error("Error, Feiled or Feilds are empty")
            setLoading(false)
            return;
        }

        try {

            const Tool = await addDoc(collection(db, 'contact'), {
                description: toolData.description,
                email: userObject?.email,
                title: toolData.title,
                username: toolData.username,
                joiningDate: serverTimestamp(),
            })




            message.success('Contact Us form Submitted');
            setLoading(false)
            router.push("/")

        }
        catch (err) {
            console.log("error:", err)
            message.error("Failed to register Contact Us Form")
            setLoading(false)

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
                    <div className="absolute md:block hidden left-0 bg-[#2CD7834F]/10 w-[338px] h-[338px] rounded-full blur-3xl"></div>
                    <div className="absolute md:block hidden r bg-[#2CD7834F]/10 w-[338px] h-[338px] right-0 rounded-full blur-3xl"></div>
                    <div className=" flex flex-col text-center justify-center items-center">
                        <h1 className="text-[32px] md:text-[40px] font-[800] bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                            Contact Us
                        </h1>


                        {userObject ?
                            <>
                                <p className="text-[18px] font-[500] text-black dark:text-[#FFF] md:px-[15rem] pt-5">
                                    Here you can contact us and tell us your issues, problems you are facing or any suggestion or anything else whatever you want.
                                </p>
                                <div className='flex flex-col gap-5 px-3 py-5   md:p-10  my-10 w-full md:w-[80%] bg-custom-blue md:h-[105%] border border-primary-border rounded-md'>


                                    <input
                                        value={toolData.username}
                                        onChange={(e) => setToolData({ ...toolData, username: e.target.value })}
                                        placeholder='Enter Username' type="text" className='dark:placeholder-white focus:outline-none text-[13px] md:text-[16px] pl-3 md:pl-5 w-full pt-5 pb-[25px] bg-custom-blue border rounded-md dark:border-primary-border border-primary-dark' />
                                    <input
                                        value={toolData.title}
                                        onChange={(e) => setToolData({ ...toolData, title: e.target.value })}
                                        placeholder='Title' type="text" className='dark:placeholder-white focus:outline-none text-[13px] md:text-[16px] pl-3 md:pl-5 w-full pt-5 pb-[21px] bg-custom-blue border rounded-md dark:border-primary-border border-primary-dark' />

                                    <textarea
                                        value={toolData.description}
                                        onChange={(e) => setToolData({ ...toolData, description: e.target.value })}
                                        placeholder='Enter Description' type="text" className='dark:placeholder-white focus:outline-none text-[13px] md:text-[16px] pl-3 md:pl-5 w-full py-3 md:py-5  bg-custom-blue border rounded-md dark:border-primary-border border-primary-dark' />

                                    <input
                                        disabled
                                        value={userObject?.email}
                                        placeholder='Your Email Address' type="email" className='dark:placeholder-white  text-gray-600 focus:outline-none text-[13px] md:text-[16px] pl-3 md:pl-5 w-full md:py-5 py-3  bg-custom-blue border rounded-md dark:border-primary-border border-primary-dark' />
                                    {previewImage && <img src={previewImage} alt="Preview" className="my-4 max-w-[200px]" />}

                                    <div className='my-6 flex flex-col justify-center items-center'>
                      

                                        <button disabled={loading} onClick={handleSubmitTool} className={`mt-3 ${loading ? "bg-gray-300" : "bg-gradient-to-r from-blue-400 via-green-500 to-blue-500"} font-[500] md:text-[18px] w-[130px] h-[40px] md:h-[50px] text-white dark:text-white rounded-md `}>
                                            Submit
                                        </button>

                                    </div>
                                </div> </> : <>
                                <p className='text-[18px] font-[500] text-black dark:text-[#FFF] md:px-[15rem] pt-5'>
                                    you are not Logged in. Kindly Login in first.
                                </p>

                                <div className='my-4' style={{ marginBottom: "30px" }}>
                                    <Link href={'/login'}>
                                        <button
                                            className='font-[500] md:text-[18px] w-[130px] h-[40px] md:h-[50px] text-white dark:text-white 
                                                   rounded-md  bg-gradient-to-r from-blue-400 via-green-500 to-blue-500'>
                                            Login
                                        </button>

                                    </Link>
                                </div>


                            </>}

                    </div>
                </div>)}</>
    )
}

export default Contact