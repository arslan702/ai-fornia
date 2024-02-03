import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { BsBookmarkHeart } from 'react-icons/bs'
import { BiSolidLock } from "react-icons/bi"
import { useRouter } from "next/navigation";
import cookie from "js-cookie"
import { db } from "@/config/firebase";
import Cookie from "js-cookie"
import Link from 'next/link';
import Loader from '../Loader';
import { addDoc, setDoc, onSnapshot, getDocs, query, where, deleteDoc, docs, collection } from 'firebase/firestore';

const SponsorOption = () => {
    const router = useRouter();
    const userCookie = Cookie.get("user")

    const [loading, setLoading] = useState(true)
    const [userObject, setUserObject] = useState(null)

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
                                Sponsorship Options
                            </h1>
                            <p className='text-[18px] font-[500] text-black dark:text-[#FFF] md:px-[15rem] pt-5'>
                                AiFornia is the largest and fastest-growing AI tools directory with over 4,500 tools and 2M page views per month. Our newsletter has over 180K subscribers and is growing at an impressive rate of 500+ organic subscribers/day.                                </p>
                            <div className='mb-20'>
                                <div className='absolute left-0 bg-[#2CD7834F]/10 w-[338px] h-[338px] rounded-full blur-3xl'>
                                </div>
                                <div className='absolute r bg-[#2CD7834F]/10 w-[338px] h-[338px] right-0 rounded-full blur-3xl'>
                                </div>
                                <div className='flex flex-col w-[800px] items-center  '>

                                    <div className='w-full mt-16 flex justify-between items-start h-[600px]  w-[800px]'>
                                        <div className=' border w-[300px] border-blue-500 h-[500px] rounded-md'>

                                            Sponsor 1
                                        </div>
                                        <div className=' border w-[300px] border-blue-500 h-[500px] rounded-md'>
                                            Sponsor 2
                                        </div>
                                    </div>
                                    <div className='w-full mt-10 flex flex-col gap-5 items-center justify-center h-[300px]  w-[350px]'>
                                        <div className='border border-blue-500 w-[800px] h-[100px] rounded-md'>
                                            sponsor 3
                                        </div>
                                        <div className='border border-blue-500 w-[800px] h-[100px] rounded-md'>
                                            sponsor 4
                                        </div>

                                    </div>
                                    <div className='w-full mt-16 flex justify-between items-start h-[600px]  w-[800px]'>
                                        <div className=' border w-[300px] border-blue-500 h-[500px] rounded-md'>

                                            Sponsor 3
                                        </div>
                                        <div className=' border w-[300px] border-blue-500 h-[500px] rounded-md'>
                                            Sponsor 4
                                        </div>
                                    </div>
                                </div>


                            </div>




                        </div>

                    </div>
                </div>)}</>
    )
}

export default SponsorOption