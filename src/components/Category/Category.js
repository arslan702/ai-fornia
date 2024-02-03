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
import {
    BsBookmarkStar,
    BsFillCalendarFill,
    BsFillShareFill,
} from "react-icons/bs";
const Category = () => {
    const router = useRouter();
    const userCookie = Cookie.get("user")

    const [loading, setLoading] = useState(true)
    const [userObject, setUserObject] = useState(null)

    useEffect(() => {
        if (userCookie) {
            setUserObject(JSON.parse(userCookie))

        }
    }, [userCookie]);

    const [savesArray, setSavesArray] = useState([]);

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

    const getRandomTools = (toolList, numberOfTools) => {
        const shuffledTools = [...toolList].sort(() => 0.5 - Math.random());
        return shuffledTools.slice(0, numberOfTools);
    };

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

                const randomTools = getRandomTools(toolList, 8);
                setTools(randomTools);
            } catch (error) {
                console.error('Error fetching tools:', error);
                setLoading(false)
            }
        };
        fetchTools();
    }, []);

    console.log("filtered tools:", tools);
    const dateCorrector = (seconds) => {
        let sec = seconds * 1000; // Convert to milliseconds
        let normalDate = new Date(sec).toLocaleDateString('en-GB', { timeZone: 'UTC' });
        return normalDate
    }

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
                            <h1 className="text-[32px] mb-4 md:text-[40px] font-[800] bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                                Discover Amazing Tools
                            </h1>

                            {/* <p className='text-[18px] font-[500] text-black dark:text-[#FFF] md:px-[15rem] pt-5'>
                                The number of tools and posts are added <span className='font-bold text-xl'>Today</span> is : {tools && tools.length}
                            </p> */}
                            <div className='mb-20'>
                                <div className='absolute left-0 bg-[#2CD7834F]/10 w-[338px] h-[338px] rounded-full blur-3xl'>
                                </div>
                                <div className='absolute r bg-[#2CD7834F]/10 w-[338px] h-[338px] right-0 rounded-full blur-3xl'>
                                </div>
                                <div
                                    onClick={() => { cookie.set("tool", JSON.stringify(tools && tools[0])); router.push({ pathname: `discover-dynamic`, query: { subject: JSON.stringify(tools && tools[0]) } }) }}

                                    className="flex shadow-xl cursor-pointer border p-2 rounded-lg   md:flex-row flex-col items-center justify-center  gap-0">
                                    <div className="flex  basis-[100%] md:basis-[50%]">
                                        <Image
                                            src={tools && tools[0]?.imageUrl}
                                            alt=""
                                            width={1080}
                                            height={1080}
                                            className="w-[330px] transition-transform duration-200 hover:scale-[102%] md:w-[509px] md:h-[260px] mx-auto md:mx-0 object-cover rounded-[10px]"
                                        />
                                    </div>
                                    <div className="flex w-28 flex-col mx-2 gap-3 basis-[100%] md:basis-[50%]">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h1 className="text-[24px] md:text-[40px] font-[700] tracking-wide">
                                                    {tools && tools[0]?.title}
                                                </h1>
                                            </div>
                                            {/* <div className="flex gap-5 md:gap-10 items-center relative">
                                                <div className="w-[92px]  bg-gradient-to-br from-[#27B6D7] via-[#07174F54] to-[#27B6D7] bg-opacity-50 rounded-md p-[1px] ">
                                                    <button className="dark:bg-primary-dark text-[16px] font-[500] bg-white flex justify-center items-center gap-3 h-[40px]  py-1 w-full rounded-md">
                                                        {SaveLength && SaveLength}
                                                        <BsBookmarkStar size={20} />
                                                    </button>
                                                </div>
                                                <button>
                                                    <BsFillShareFill size={25} />
                                                </button>

                                            </div> */}
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <BsFillCalendarFill size={20} className="text-slate-400" />
                                            <p className="text-[16px] font-[400]">{dateCorrector(tools[0]?.joiningDate?.seconds)}</p>
                                        </div>
                                        {/* <div className="flex gap-3">
                                            <div className='flex  py-2 gap-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="110" height="17" viewBox="0 0 110 17" fill="none">
                                                    <path d="M8.55696 13.6975L12.707 16.2075C13.467 16.6675 14.397 15.9875 14.197 15.1275L13.097 10.4075L16.767 7.2275C17.437 6.6475 17.077 5.5475 16.197 5.4775L11.367 5.0675L9.47696 0.6075C9.13696 -0.2025 7.97696 -0.2025 7.63696 0.6075L5.74696 5.0575L0.916957 5.4675C0.0369575 5.5375 -0.323043 6.6375 0.346957 7.2175L4.01696 10.3975L2.91696 15.1175C2.71696 15.9775 3.64696 16.6575 4.40696 16.1975L8.55696 13.6975Z" fill="#E5A206" />
                                                    <path d="M31.557 13.6975L35.707 16.2075C36.467 16.6675 37.397 15.9875 37.197 15.1275L36.097 10.4075L39.767 7.2275C40.437 6.6475 40.077 5.5475 39.197 5.4775L34.367 5.0675L32.477 0.6075C32.137 -0.2025 30.977 -0.2025 30.637 0.6075L28.747 5.0575L23.917 5.4675C23.037 5.5375 22.677 6.6375 23.347 7.2175L27.017 10.3975L25.917 15.1175C25.717 15.9775 26.647 16.6575 27.407 16.1975L31.557 13.6975Z" fill="#E5A206" />
                                                    <path d="M54.557 13.6975L58.707 16.2075C59.467 16.6675 60.397 15.9875 60.197 15.1275L59.097 10.4075L62.767 7.2275C63.437 6.6475 63.077 5.5475 62.197 5.4775L57.367 5.0675L55.477 0.6075C55.137 -0.2025 53.977 -0.2025 53.637 0.6075L51.747 5.0575L46.917 5.4675C46.037 5.5375 45.677 6.6375 46.347 7.2175L50.017 10.3975L48.917 15.1175C48.717 15.9775 49.647 16.6575 50.407 16.1975L54.557 13.6975Z" fill="#E5A206" />
                                                    <path d="M77.557 13.6975L81.707 16.2075C82.467 16.6675 83.397 15.9875 83.197 15.1275L82.097 10.4075L85.767 7.2275C86.437 6.6475 86.077 5.5475 85.197 5.4775L80.367 5.0675L78.477 0.6075C78.137 -0.2025 76.977 -0.2025 76.637 0.6075L74.747 5.0575L69.917 5.4675C69.037 5.5375 68.677 6.6375 69.347 7.2175L73.017 10.3975L71.917 15.1175C71.717 15.9775 72.647 16.6575 73.407 16.1975L77.557 13.6975Z" fill="#E5A206" />
                                                    <path d="M100.557 13.6975L104.707 16.2075C105.467 16.6675 106.397 15.9875 106.197 15.1275L105.097 10.4075L108.767 7.2275C109.437 6.6475 109.077 5.5475 108.197 5.4775L103.367 5.0675L101.477 0.6075C101.137 -0.2025 99.977 -0.2025 99.637 0.6075L97.747 5.0575L92.917 5.4675C92.037 5.5375 91.677 6.6375 92.347 7.2175L96.017 10.3975L94.917 15.1175C94.717 15.9775 95.647 16.6575 96.407 16.1975L100.557 13.6975Z" fill="#E5A206" />
                                                </svg>
                                                <p className='text-gray-500 text-[16px] fot-[400]'>
                                                    (120 Reviews)
                                                </p>
                                            </div>

                                        </div> */}
                                        <div className="py-5">
                                            <p className="text-[18px] text-start font-[500]">
                                                {tools && tools[0]?.detail}
                                            </p>
                                        </div>
                                        {/* <div className=" md:max-w-[120px] bg-gradient-to-br from-[#27B6D7] via-[#07174F54] to-[#27B6D7] bg-opacity-50 rounded-md p-[1px] ">
                                            <button className="dark:bg-primary-dark bg-white flex justify-center items-center gap-3  py-1 w-full rounded-md">
                                                <BiSolidLock size={20} />
                                                Premium
                                            </button>
                                        </div> */}
                                        {/* <div className="flex gap-10 md:gap-4  items-center mt-3 mb-3 ">
                                            <a href={tools&&tools[0]?.link} target="_blank">
                                                <button className="md:w-[400px] flex items-center px-8 md:px-10 py-[9px] justify-center gap-3 text-white dark:text-white rounded-md  bg-gradient-to-r from-blue-400 via-green-500 to-blue-500">
                                                    Visit Website
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15"
                                                        height="13"
                                                        viewBox="0 0 15 13"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M15 6.25L8.75 -2.73196e-07L7.86875 0.88125L12.6062 5.625L-2.45877e-07 5.625L-3.00516e-07 6.875L12.6062 6.875L7.86875 11.6187L8.75 12.5L15 6.25Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </button>
                                            </a>
                                            <div>
                                                {loading ? <><Loader /></> : <> </>}

                                                <div
                                                    onClick={() => handleSaveTool()}
                                                    className=" bg-gradient-to-br from-[#27B6D7] via-[#07174F54] to-[#27B6D7] bg-opacity-50 rounded-md p-[1.5px]">
                                                    <button
                                                        className={` md:w-[200px] px-7 py-[11px] text-white dark:text-white bg-white dark:bg-primary-dark flex justify-center items-center rounded-md  "border-none bg-gradient-to-r from-blue-400 via-green-500 to-blue-500" `}
                                                    >
                                                        <BsBookmarkHeart size={18} className="text-black  dark:text-white" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-[#27B6D7] via-[#07174F54] to-[#27B6D7] bg-opacity-50 rounded-md p-[1.5px]">
                                            <Link href={'/review'}>
                                                <button className="w-full py-[10px] text-black dark:text-white bg-white dark:bg-primary-dark flex justify-center items-center rounded-md">
                                                    Review List
                                                </button>
                                            </Link>

                                        </div> */}
                                    </div>
                                </div>
                                <div>
                                   <h1 className=' my-10 font-bold mb-20'>
                                     You can check other Amazing AI tools. Discover new AI tools. These are amazing tools.
                                   </h1>
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-10'>
                                    {tools && tools.map((item, index) => (
                                        <div
                                            onClick={() => { cookie.set("tool", JSON.stringify(item && item)); router.push({ pathname: `discover-dynamic`, query: { subject: JSON.stringify(item && item) } }) }}
                                            key={index} className='cursor-pointer w-[330px] md:w-[350px] bg-gradient-to-br from-[#27B6D7] via-[#07174F54] to-[#27B6D7] bg-opacity-50 rounded-md mx-auto p-[1px]  '>
                                            <div className='w-full p-1 backdrop-blur-2xl bg-white dark:bg-primary-dark/90 h-full rounded-md'>
                                                <Image src={item.imageUrl} width={347} height={263} alt='' className='w-[300px] transition duration-250 hover:scale-[102%] h-[220px] md:w-[320px] md:h-[220px] rounded-[10px] mx-auto  my-3 object-cover' />
                                                <div className='px-5 flex items-center gap-3'>
                                                    <p className='text-[24px] font-[700]'>{item.title}</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path d="M18.0348 7.46109C17.7109 7.1225 17.3757 6.77359 17.2494 6.4668C17.1325 6.18578 17.1256 5.72 17.1187 5.26883C17.1059 4.43008 17.0921 3.47961 16.4312 2.81875C15.7704 2.15789 14.8199 2.14414 13.9812 2.13125C13.53 2.12437 13.0642 2.1175 12.7832 2.00062C12.4773 1.8743 12.1275 1.53914 11.7889 1.21516C11.1959 0.645391 10.5222 0 9.625 0C8.72781 0 8.05492 0.645391 7.46109 1.21516C7.1225 1.53914 6.77359 1.8743 6.4668 2.00062C6.1875 2.1175 5.72 2.12437 5.26883 2.13125C4.43008 2.14414 3.47961 2.15789 2.81875 2.81875C2.15789 3.47961 2.14844 4.43008 2.13125 5.26883C2.12437 5.72 2.1175 6.18578 2.00062 6.4668C1.8743 6.77273 1.53914 7.1225 1.21516 7.46109C0.645391 8.05406 0 8.72781 0 9.625C0 10.5222 0.645391 11.1951 1.21516 11.7889C1.53914 12.1275 1.8743 12.4764 2.00062 12.7832C2.1175 13.0642 2.12437 13.53 2.13125 13.9812C2.14414 14.8199 2.15789 15.7704 2.81875 16.4312C3.47961 17.0921 4.43008 17.1059 5.26883 17.1187C5.72 17.1256 6.18578 17.1325 6.4668 17.2494C6.77273 17.3757 7.1225 17.7109 7.46109 18.0348C8.05406 18.6046 8.72781 19.25 9.625 19.25C10.5222 19.25 11.1951 18.6046 11.7889 18.0348C12.1275 17.7109 12.4764 17.3757 12.7832 17.2494C13.0642 17.1325 13.53 17.1256 13.9812 17.1187C14.8199 17.1059 15.7704 17.0921 16.4312 16.4312C17.0921 15.7704 17.1059 14.8199 17.1187 13.9812C17.1256 13.53 17.1325 13.0642 17.2494 12.7832C17.3757 12.4773 17.7109 12.1275 18.0348 11.7889C18.6046 11.1959 19.25 10.5222 19.25 9.625C19.25 8.72781 18.6046 8.05492 18.0348 7.46109ZM13.5489 8.04891L8.73641 12.8614C8.67256 12.9253 8.59673 12.976 8.51327 13.0106C8.42981 13.0452 8.34035 13.063 8.25 13.063C8.15965 13.063 8.07019 13.0452 7.98673 13.0106C7.90327 12.976 7.82744 12.9253 7.76359 12.8614L5.70109 10.7989C5.57209 10.6699 5.49962 10.4949 5.49962 10.3125C5.49962 10.1301 5.57209 9.9551 5.70109 9.82609C5.8301 9.69709 6.00506 9.62462 6.1875 9.62462C6.36994 9.62462 6.5449 9.69709 6.67391 9.82609L8.25 11.403L12.5761 7.07609C12.64 7.01222 12.7158 6.96155 12.7993 6.92698C12.8827 6.89241 12.9722 6.87462 13.0625 6.87462C13.1528 6.87462 13.2423 6.89241 13.3257 6.92698C13.4092 6.96155 13.485 7.01222 13.5489 7.07609C13.6128 7.13997 13.6635 7.2158 13.698 7.29926C13.7326 7.38272 13.7504 7.47217 13.7504 7.5625C13.7504 7.65283 13.7326 7.74228 13.698 7.82574C13.6635 7.9092 13.6128 7.98503 13.5489 8.04891Z" fill="#11CFD9" />
                                                    </svg>
                                                </div>
                                                <div className='flex px-5 py-2 gap-2'>
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <span
                                                            key={star}
                                                            className={`star ${item.rating >= star ? 'filled' : ''}`}
                                                        >
                                                            &#9733;
                                                        </span>
                                                    ))}
                                                    <p className='text-gray-500 text-[16px] fot-[400]'>
                                                        ( {item.reviews} )
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className='text-left pl-5  text-[14px] font-[400]'>
                                                        {item.detail}
                                                    </p>
                                                </div>
                                                <div className='ml-5 mt-3 max-w-[120px] bg-gradient-to-br from-[#27B6D7] via-[#07174F54] to-[#27B6D7] bg-opacity-50 rounded-md p-[1px] '>
                                                    <button className='dark:bg-primary-dark bg-white flex justify-center items-center gap-3  py-1 w-full rounded-md'>
                                                        <BiSolidLock size={20} />
                                                        {item.mode}
                                                    </button>
                                                </div>
                                                <div className='pl-5 flex gap-4 mt-3 text-[16px] font-[400]'>
                                                    <p>
                                                        #loremipsum
                                                    </p>
                                                    <p>
                                                        #aitool
                                                    </p>
                                                    <p>
                                                        #besttool
                                                    </p>
                                                </div>
                                                <div className='flex gap-4 mx-5  items-center mt-3 mb-3'>
                                                    <button className='w-full flex items-center px-10 py-2 justify-center gap-3 text-white dark:text-white rounded-md  bg-gradient-to-r from-blue-400 via-green-500 to-blue-500'>
                                                        Visit Website
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
                                                            <path d="M15 6.25L8.75 -2.73196e-07L7.86875 0.88125L12.6062 5.625L-2.45877e-07 5.625L-3.00516e-07 6.875L12.6062 6.875L7.86875 11.6187L8.75 12.5L15 6.25Z" fill="white" />
                                                        </svg>
                                                    </button>

                                                </div>
                                            </div>
                                        </div>

                                    ))}

                                </div>


                            </div>




                        </div>

                    </div>
                </div>)}</>
    )
}

export default Category