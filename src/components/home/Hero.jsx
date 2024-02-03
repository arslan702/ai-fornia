import React, { useState } from 'react'
import Wrapper from '../shared/Wrapper'
import { IoFilter } from "react-icons/io5"
import Image from 'next/image'
import { AiOutlineSearch } from 'react-icons/ai'
import { RiToolsFill } from 'react-icons/ri'
import Link from 'next/link'
import { useRouter } from 'next/router'
const Hero = ({ onSearch, CategoryFilter }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const router=useRouter()

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };
    const handleCategoryFilter = (value) => {

        CategoryFilter(value)

    }
    const handleButtonClick = (index) => {
      


      
    };

    const toggleDropdown = () => {

        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className=''>
            <div className='md:pb-0 pb-5 pt-5 md:pt-10'>
                <div className=" dark:flex hidden sm:hidden z-[1] absolute top-0 left-0 w-1/2 h-full bg-left bg-no-repeat bg-cover"></div>
                <div className="dark:flex hidden sm:hidden z-[1] absolute top-0 right-0 w-1/2 h-full bg-right bg-no-repeat bg-cover"></div>
                <Wrapper>
                    <div className='relative flex flex-col justify-center items-center z-20'>
                        <div className='text-center'>
                            <h1 className='text-[32px] md:text-[48px] font-[800] text-black dark:text-white'>
                                The World's Best & Largest

                                <span className='bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent'>
                                    {''} Directory of AI Tools
                                </span>
                            </h1>
                            <p className='text-black dark:text-white font-[500] text-[18px] pt-3'>
                                Browse 1000+ AI  in 5+ Categories & Find The Petfect Tools That Your Needs To Work Smarter
                            </p>
                        </div>
                        <div className='mt-10 flex flex-col justify-center items-center'>
                            <div className='flex gap-3 md:gap-14 justify-center items-center'>
                                <Link href={'/todayTools'} className='flex items-center gap-3'>
                                    <RiToolsFill size={22} className="dark:text-white text-black" />
                                    <p 
                                    
                                    className='text-sm md:text-base'>
                                        Tools added today
                                    </p>
                                </Link>
                                {/* <p className='h-[23px] w-[23px] rounded-full border-2 absolute md:top-[125px] top-[250px] mr-10 border-white flex items-center justify-center text-xs bg-primary-blue'>5</p> */}
                                <Link href={'/newsToday'} className='flex items-center gap-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                                        <path d="M5 14C5.28334 14 5.521 13.904 5.713 13.712C5.905 13.52 6.00067 13.2827 6 13C6 12.7167 5.904 12.479 5.712 12.287C5.52 12.095 5.28267 11.9993 5 12C4.71667 12 4.479 12.096 4.287 12.288C4.095 12.48 3.99934 12.7173 4 13C4 13.2833 4.096 13.521 4.288 13.713C4.48 13.905 4.71734 14.0007 5 14ZM4 10H6V4H4V10ZM9 14H16V12H9V14ZM9 10H16V8H9V10ZM9 6H16V4H9V6ZM2 18C1.45 18 0.979002 17.804 0.587002 17.412C0.195002 17.02 -0.000664969 16.5493 1.69779e-06 16V2C1.69779e-06 1.45 0.196002 0.979002 0.588002 0.587002C0.980002 0.195002 1.45067 -0.000664969 2 1.69779e-06H18C18.55 1.69779e-06 19.021 0.196002 19.413 0.588002C19.805 0.980002 20.0007 1.45067 20 2V16C20 16.55 19.804 17.021 19.412 17.413C19.02 17.805 18.5493 18.0007 18 18H2Z" fill="#2CD880" />
                                    </svg>
                                    <p className='text-sm md:text-base'>
                                        News added today
                                    </p>
                                </Link>
                                {/* <p className='h-[23px] w-[23px] rounded-full border-2 absolute md:top-[125px] top-[250px] ml-72 md:ml-96 border-white flex items-center justify-center text-xs bg-primary-blue'>7</p> */}


                            </div>
                            <div className='mt-10 flex items-center gap-2 md:gap-5'>
                                <div className="relative w-[230px] md:w-[509px]  bg-gradient-to-br from-[#27B6D7] via-[#07174F54] to-[#27B6D7] bg-opacity-50 rounded-md mx-auto p-[1px]">
                                    <div className='bg-white dark:bg-primary-dark rounded-md'>
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <AiOutlineSearch size={25} />
                                        </div>
                                        <input
                                            className="block focus:outline-none md:text-[16px] text-[12px] w-full pl-14 pr-3 h-[50px] rounded-md border-none  bg-opacity-5 bg-transparent focus:ring-0 focus:border-indigo-500  focus:ring-opacity-0"
                                            type="text"
                                            placeholder="Search by category, topics"
                                            value={searchTerm}
                                            onChange={handleSearchChange} // Added this line
                                        />
                                    </div>
                                </div>
                                <button
                                    className='font-[500] text-[18px] w-[94px]  h-[50px] text-white dark:text-white rounded-md  bg-gradient-to-r from-blue-400 via-green-500 to-blue-500'
                                    onClick={handleSearch} // Added this line
                                >
                                    Search
                                </button>
                            </div>
                            <div className=' flex flex-wrap gap-2 md:gap-5 justify-center items-center mt-5'>
                                <div className="relative inline-block">
                                    <div className=" z-[999] bg-gradient-to-br from-[#27B6D7] via-[#526bc454] to-[#15CADF54] bg-opacity-50 rounded-md mx-auto p-[1px]">
                                        <button
                                            className="dark:bg-primary-dark bg-white flex  justify-center items-center gap-3 w-[100px] h-[50px] rounded-md"
                                            onClick={toggleDropdown}


                                        >
                                            Filter
                                            <IoFilter size={20} className="text-[#2CD880]" />
                                        </button>
                                        {isDropdownOpen && (
                                            <div
                                                className="absolute  top-[100%] w-full py-5 left-0  px-2 backdrop-blur-lg   rounded-[6px] shadow z-[999]"
                                                style={{ background: "rgba(181, 212, 255, 0.14)" }}
                                            >
                                                <div className="flex flex-col justify-start items-start px-3 gap-3 ">
                                                    <button onClick={() => { toggleDropdown(); handleCategoryFilter('') }} className="dark:text-white text-[14px] font-[500] hover:dark:text-[#2CD880] hover:text-[#2CD880] transition-all duration-200 ease-in">
                                                        All
                                                    </button>
                                                    <button onClick={() => { toggleDropdown(); handleCategoryFilter("Text") }} className="dark:text-white text-[14px] font-[500] hover:dark:text-[#2CD880] hover:text-[#2CD880] transition-all duration-200 ease-in">
                                                        Text
                                                    </button>
                                                    <button onClick={() => { toggleDropdown(); handleCategoryFilter("Image") }} className="dark:text-white text-[14px] font-[500] hover:dark:text-[#2CD880]  hover:text-[#2CD880] transition-all duration-200 ease-in">
                                                        Image
                                                    </button>
                                                    <button onClick={() => { toggleDropdown(); handleCategoryFilter("Code") }} className="dark:text-white text-[14px] font-[500] hover:dark:text-[#2CD880] hover:text-[#2CD880] transition-all duration-200 ease-in">
                                                        Code
                                                    </button>
                                                    <button onClick={() => { toggleDropdown(); handleCategoryFilter("Video") }} className="dark:text-white text-[14px] font-[500] hover:dark:text-[#2CD880] hover:text-[#2CD880] transition-all duration-200 ease-in">
                                                        Video
                                                    </button>
                                                    <button onClick={() => { toggleDropdown(); handleCategoryFilter("Audio") }} className="dark:text-white text-[14px] font-[500] hover:dark:text-[#2CD880] hover:text-[#2CD880] transition-all duration-200 ease-in">
                                                        Audio
                                                    </button>
                                                    <button onClick={() => { toggleDropdown(); handleCategoryFilter("Business") }} className="dark:text-white text-[14px] font-[500] hover:dark:text-[#2CD880] hover:text-[#2CD880] transition-all duration-200 ease-in">
                                                        Business
                                                    </button>
                                                    <button onClick={() => { toggleDropdown(); handleCategoryFilter("Others") }} className="dark:text-white text-[14px] font-[500] hover:dark:text-[#2CD880] hover:text-[#2CD880] transition-all duration-200 ease-in">
                                                        Others
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className=' bg-gradient-to-br from-[#27B6D7] via-[#526bc454] to-[#15CADF54] bg-opacity-50 rounded-md mx-auto p-[1px]'>
                                    <button
                                        className={`dark:bg-primary-dark bg-white flex justify-center items-center gap-3 px-4 h-[50px] rounded-md ${selected === 0 ? "border-none bg-gradient-to-r from-blue-400 via-green-500 to-blue-500" : ""}`}
                                        onClick={() => { handleCategoryFilter("COPYWRITING")}}
                                    >
                                        COPYWRITING
                                    </button>
                                </div>
                                <div className=' bg-gradient-to-br from-[#27B6D7] via-[#526bc454] to-[#15CADF54] bg-opacity-50 rounded-md mx-auto p-[1px]'>
                                    <button className={`dark:bg-primary-dark bg-white flex justify-center items-center gap-3 px-4 h-[50px] rounded-md ${selected === 1 ? "border-none bg-gradient-to-r from-blue-400 via-green-500 to-blue-500" : ""
                                        }`}
                                        onClick={() => { handleCategoryFilter("AVATARS")}}>
                                        AVATARS
                                    </button>
                                </div>
                                <div className=' bg-gradient-to-br from-[#27B6D7] via-[#526bc454] to-[#15CADF54] bg-opacity-50 rounded-md mx-auto p-[1px]'>
                                    <button className={`dark:bg-primary-dark bg-white flex justify-center items-center gap-3 px-4 h-[50px] rounded-md ${selected === 2 ? "border-none bg-gradient-to-r from-blue-400 via-green-500 to-blue-500" : ""
                                        }`}
                                        onClick={() => { handleCategoryFilter("CODE ASSISTANT")}}>
                                        CODE ASSISTANT
                                    </button>
                                </div>
                                <div className=' bg-gradient-to-br from-[#27B6D7] via-[#526bc454] to-[#15CADF54] bg-opacity-50 rounded-md mx-auto p-[1px]'>
                                    <button className={`dark:bg-primary-dark bg-white flex justify-center items-center gap-3 px-4 h-[50px] rounded-md ${selected === 3 ? "border-none bg-gradient-to-r from-blue-400 via-green-500 to-blue-500" : ""
                                        }`}
                                        onClick={() => {handleCategoryFilter("3D")}}>
                                        3D
                                    </button>
                                </div>
                            </div>
                            <div className='mt-5 flex justify-around items-center gap-4 md:gap-16'>

                                <Link href={'/discover'} className='flex justify-center items-center gap-3'>
                                    <p>
                                        View All Categories
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                        <path d="M4.15954 7.93159C4.03577 7.93159 3.91707 7.88249 3.82955 7.7951C3.74204 7.7077 3.69287 7.58917 3.69287 7.46557L3.69287 6.53354C3.69287 6.40994 3.74204 6.29141 3.82955 6.20401C3.91707 6.11662 4.03577 6.06752 4.15954 6.06752L8.70954 6.06752C8.77394 6.06752 8.8262 6.01532 8.8262 5.95101L8.8262 4.5236C8.8262 4.10418 9.33767 3.8982 9.62887 4.20065L12.0149 6.6766C12.0985 6.76341 12.1452 6.87915 12.1452 6.99955C12.1452 7.11996 12.0985 7.2357 12.0149 7.3225L9.62887 9.79846C9.3372 10.1009 8.82574 9.89493 8.82574 9.47551L8.82574 8.0481C8.82574 8.0172 8.81345 7.98756 8.79157 7.96571C8.76969 7.94387 8.74001 7.93159 8.70907 7.93159L4.15954 7.93159Z" fill="#15CADF" />
                                        <path d="M0.893066 11.6601C0.893066 11.9661 0.95342 12.2691 1.07068 12.5518C1.18794 12.8345 1.35981 13.0914 1.57648 13.3078C2.01407 13.7447 2.60756 13.9902 3.2264 13.9902L12.5597 13.9902C13.1786 13.9902 13.7721 13.7447 14.2096 13.3078C14.4263 13.0914 14.5982 12.8345 14.7155 12.5518C14.8327 12.2691 14.8931 11.9661 14.8931 11.6601L14.8931 2.33977C14.8931 1.72179 14.6472 1.12912 14.2096 0.692147C13.7721 0.255169 13.1786 0.0096783 12.5597 0.00967833L3.2264 0.00967874C2.91998 0.00967875 2.61656 0.0699481 2.33347 0.187046C2.05038 0.304144 1.79315 0.475778 1.57648 0.692147C1.35981 0.908516 1.18794 1.16538 1.07068 1.44808C0.953419 1.73078 0.893066 2.03378 0.893066 2.33977L0.893066 11.6601ZM3.2264 13.0582C2.8551 13.0582 2.499 12.9109 2.23645 12.6487C1.9739 12.3865 1.8264 12.0309 1.8264 11.6601L1.8264 2.33977C1.8264 1.96898 1.9739 1.61338 2.23645 1.3512C2.499 1.08901 2.8551 0.941715 3.2264 0.941715L12.5597 0.941715C12.931 0.941715 13.2871 1.08901 13.5497 1.3512C13.8122 1.61338 13.9597 1.96898 13.9597 2.33977L13.9597 11.6601C13.9597 12.0309 13.8122 12.3865 13.5497 12.6487C13.2871 12.9109 12.931 13.0582 12.5597 13.0582L3.2264 13.0582Z" fill="#15CADF" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        <div className='md:mb-5'>
                            <div className='flex justify-center  gap-6 w-[200px] md:w-[1023px]  md:h-[129px] bg-opacity-50 rounded-md mx-auto p-[1px] '>
                                <div className=' text-white  w-full rounded-md md:pt-5  md:py-0'>
                                    <div className='flex justify-center items-center mt-8'>
                                        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                                            <div className='flex md:flex-row flex-col items-center gap-4'>
                                                <Image src={'/images/svg1.svg'} alt='' width={600} height={600} className='w-[30px]' />
                                                <p className='dark:text-white text-black text-[24px] font-[600]'>
                                                    150K+
                                                </p>
                                            </div>
                                            <div className='flex md:flex-row flex-col items-center gap-4'>
                                                <Image src={'/images/svg2.svg'} alt='' width={600} height={600} className='w-[30px]' />
                                                <p className='dark:text-white text-black text-[24px] font-[600]'>
                                                    570+
                                                </p>
                                            </div>
                                            <div className='flex md:flex-row flex-col items-center gap-4'>
                                                <Image src={'/images/svg3.svg'} alt='' width={600} height={600} className='w-[30px]' />
                                                <p className='dark:text-white text-black text-[24px] font-[600]'>
                                                    Deals
                                                </p>
                                            </div>

                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </Wrapper>
            </div>
        </div>
    )
}

export default Hero