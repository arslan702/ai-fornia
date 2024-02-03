import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { BsBookmarkHeart } from 'react-icons/bs'
import { BiSolidLock } from "react-icons/bi"
import { useRouter } from "next/navigation";
import cookie from "js-cookie"
import { BsBookmarkStar } from 'react-icons/bs'

import { db } from "@/config/firebase";
import Cookie from "js-cookie"
import Link from 'next/link';
import Loader from '../Loader';
import { addDoc, setDoc, onSnapshot, getDocs, query, where, deleteDoc, docs, collection } from 'firebase/firestore';

function truncateText(text, maxWords) {
    const words = text.split(' ');
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + ' ...';
    }
    return text;
}
const dateCorrector = (seconds) => {
    let sec = seconds * 1000; // Convert to milliseconds
    let normalDate = new Date(sec).toLocaleDateString('en-GB', { timeZone: 'UTC' });
    return normalDate
}

const NewsToday = () => {
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
                const querySnapshot = await getDocs(collection(db, "news"));
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


        <div>
            <div>
                <div className='flex flex-col text-center justify-center items-center'>
                    <h1 className="text-[32px] md:text-[40px] font-[800] bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                        News Added Today
                    </h1>

                    {tools && tools.length === 0 ? <div> No News Added today, You can check <Link href="/latest-news" className='underline font-bold'>Latest-News</Link></div> : <>


                        <p className='text-[18px] font-[500] text-black dark:text-[#FFF] md:px-[15rem] pt-5'>
                            These are the News which Published today. You can get Latest Information of todays AI World by this page.
                        </p>
                        <div className='mb-20'>
                            <div className='absolute left-0 bg-[#2CD7834F]/10 w-[338px] h-[338px] rounded-full blur-3xl'>
                            </div>
                            <div className='absolute r bg-[#2CD7834F]/10 w-[338px] h-[338px] right-0 rounded-full blur-3xl'>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-10'>
                                {tools && tools.map((item, index) => (
                                    <div
                                        key={index}
                                        className="w-[330px] md:w-[393px] rounded-md mx-auto border-[2px] border-primary-border"
                                    >
                                        <div className="w-full p-1 backdrop-blur-2xl bg-white dark:bg-custom-blue h-full rounded-md">
                                            <div className="flex flex-col mx-3 my-3">
                                                <div className="">
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt=""
                                                        width={1080}
                                                        height={1080}
                                                        className="h-[245px] w-[353px] object-cover rounded-[10px]"
                                                    />
                                                    <div className="flex flex-col gap-5 items-start justify-start">
                                                        <div className='flex mt-5  items-center '>
                                                            <div className=' bg-gradient-to-br from-[#27B6D7] via-[#07174F54] to-[#27B6D7] bg-opacity-50 rounded-md p-[0.9px] '>
                                                                <button className='dark:bg-primary-dark  w-[155px] bg-white flex justify-center items-center gap-3 h-[40px]   rounded-md'>
                                                                    {/* <Image src={item.catIcon} width={300} height={300} className='w-[18px]' /> */}
                                                                    {item.category}
                                                                </button>
                                                            </div>
                                                            <div className='ml-[5rem] md:ml-[9rem]'>
                                                                <button className="text-[16px] flex justify-center items-center gap-3 h-[40px]  py-1 w-full rounded-md">
                                                                    33
                                                                    <BsBookmarkStar size={20} />
                                                                </button>
                                                            </div>

                                                        </div>

                                                        <p className='text-[24px] font-[600] text-left'>{truncateText(item.discription, 13)}</p>
                                                        <Link href={`${item.toolLink}`}>

                                                            <button

                                                                className='font-[500] text-[18px] w-[180px]  h-[50px] text-white dark:text-white rounded-md  bg-gradient-to-r from-blue-400 via-green-500 to-blue-500'>
                                                                Visit Website
                                                            </button>
                                                        </Link>
                                                        <div className='border-t border-primary-border w-full'>
                                                            <p className='text-left text-slate-400 font-[400] text-[16px] pt-4 pb-3'>
                                                                Posted: {dateCorrector(item.joiningDate.seconds)}
                                                            </p>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>


                        </div>

                    </>}




                </div>

            </div>
        </div>
    )
}

export default NewsToday