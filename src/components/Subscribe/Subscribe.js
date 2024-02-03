import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { BsBookmarkHeart } from 'react-icons/bs'
import { BiSolidLock } from "react-icons/bi"
import { useRouter } from "next/navigation";
import cookie from "js-cookie"
import { db } from "@/config/firebase";
import Cookie from "js-cookie"
import { message } from "antd";

import Link from 'next/link';
import Loader from '../Loader';
import { addDoc, setDoc, onSnapshot, getDocs, query, where, deleteDoc, docs, collection } from 'firebase/firestore';


const Subscribe = () => {
    const router = useRouter();
    const userCookie = Cookie.get("user")
    
    const [loading, setLoading] = useState(true)
    const [userObject, setUserObject] = useState(null)
    
    const [formData, setFormData] = useState({ email: "" })
    useEffect(() => {
        if (userCookie) {
            setUserObject(JSON.parse(userCookie))

        }
    }, [userCookie]);
    console.log(userObject, "userObject?")
    const [savesArray, setSavesArray] = useState([]); // Use state to store savesArray

    useEffect(() => {
        const getToolSaves = async () => {
            try {
                const querySnapshot = await getDocs(query(
                    collection(db, 'save'),
                ));

                const newArray = [];

                querySnapshot.forEach((doc) => {
                    newArray.push({ id: doc.id, ...doc.data() });
                });

                setSavesArray(newArray);
            } catch (error) {
                console.error("Error fetching tool saves:", error);
            }
        }

        if (userObject?.uid) {
            getToolSaves();
        }
    }, [userObject?.uid]);

    console.log("this array is best array:", savesArray);
    // Now, you can access savesArray here or within other useEffects that depend on it
    console.log("this array is best array:", savesArray[0]?.toolId);


    const handleSubscribe = async () => {
        try {
            // Check if email is empty
            if (!formData.email) {
                message.error("Email cannot be empty");
                return;
            }

            // Regular expression to validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                message.error("Invalid email format");
                return;
            }

            // Check if email already exists in the database
            const emailQuery = query(collection(db, 'subscribe'), where('email', '==', formData.email));
            const querySnapshot = await getDocs(emailQuery);

            if (!querySnapshot.empty) {
                message.error("Email already subscribed");
                return;
            }

            // If all checks pass, add the email to the database
            const Tool = await addDoc(collection(db, 'subscribe'), {
                email: formData.email,
            });

            message.success("Subscribed");
        } catch (err) {
            message.error("Failed to subscribe");
            console.log(err)
        }
    }
    const [tools, setTools] = useState(null);

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "tools"));
                const toolList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setLoading(false)


                const today = new Date();
                const formattedToday = today.toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
                console.log("formateed", formattedToday)

                const filteredTools = toolList.filter(tool => {
                    console.log("seconds:", "and", tool.joiningDate.seconds)
                    const timestampInSeconds = tool.joiningDate.seconds;
                    const date = new Date(timestampInSeconds * 1000);

                    const formattedDate = date.toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format

                    return savesArray.some(save => formattedDate === formattedToday);
                });
                setTools(filteredTools);
                setLoading(false)


            } catch (error) {
                console.error('Error fetching tools:', error);
                setLoading(false)
            }
        };
        fetchTools();
    }, [tools]);

    console.log("filtered tools:", tools);

    return (

        <>
            {loading ? (
                <div style={{ color: "black", width: "100%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", }}>

                    <Loader />
                </div>
            ) : (
                <div>
                    <div>
                        <div className='flex flex-col text-center justify-center items-center'>
                            <h1 className="text-[32px] md:text-[40px] font-[800] bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                                Subscribe for future insights, knowledge.
                            </h1>
                            <p className='text-[18px] font-[500] text-black dark:text-[#FFF] md:px-[15rem] pt-5'>
                                Join 175,000 professionals getting weekly updates on new and exciting AI tools.                                                   </p>
                            <div className='mb-20'>
                                <div className='absolute left-0 bg-[#2CD7834F]/10 w-[338px] h-[338px] rounded-full blur-3xl'>
                                </div>
                                <div className='absolute r bg-[#2CD7834F]/10 w-[338px] h-[338px] right-0 rounded-full blur-3xl'>
                                </div>
                                <div className='flex flex-col gap-4 w-[800px]   '>

                                    <div className='   mt-16 flex justify-center items-start  '>

                                        <input placeholder='Enter Your Email'
                                        type="text"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className='p-4 border border-blue-500 rounded-3xl  w-[80%] text-start' />
                                        <button
                                        onClick={handleSubscribe}
                                         className='rounded-3xl ml-6 border font-bold border-blue-500 p-4 px-5'>
                                            Subscribe
                                        </button>
                                             </div>

                                    <p className='text-start pl-6'>Read by Leaders at</p>
                                    <div className='flex '>
                                        <div className='w-32 h-28'>

                                            <img className='small-image' src='https://www.futurepedia.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmeta%20dark%20logo.50e6b9a4.png&w=3840&q=75' />
                                        </div>
                                        <div className='w-32 h28'>

                                            <img className='small-image' src='https://www.futurepedia.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FGoogle%20logo.8e5ed2c6.png&w=3840&q=75' />
                                        </div>
                                     
                                        <div className='w-32 h28'>

                                            <img className='small-image' src='https://www.futurepedia.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FNetflix%20logo.42c69167.png&w=3840&q=75' />
                                        </div>
                                        <div className='w-32 h28'>

                                            <img className='small-image' src='https://www.futurepedia.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnvidia%20logo.7bddf039.png&w=3840&q=75' />
                                        </div>
                                        <div className='w-32 h28'>

                                            <img className='small-image' src='https://www.futurepedia.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsalesforce%20logo.ca63e42f.png&w=3840&q=75' />
                                        </div>
                                    </div>
                                </div>


                            </div>




                        </div>

                    </div>
                </div>)}</>
    )
}

export default Subscribe