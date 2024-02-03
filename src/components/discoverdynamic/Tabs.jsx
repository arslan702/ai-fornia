import React, { useState } from 'react'

const Tabs = ({ activeTab, handleTabClick }) => {

    return (
        <div className='bg-gradient-to-br from-[#27B6D7] via-[#526bc454] to-[#15CADF54] bg-opacity-50 rounded-md mx-auto p-[1px]'>
            <div className="flex gap-2 md:gap-10 justify-start items-center px-5 md:px-8 bg-white dark:bg-primary-dark/80 py-2 md:py-4 rounded-md backdrop-blur-md">
                <button
                    className={`tab-button text-[14px] md:text-[18px] py-3  px-2 md:px-6 rounded-md dark:text-white font-[500] ${activeTab === 'featured' ? 'bg-slate-400/20' : ''
                        }`}
                    onClick={() => handleTabClick('featured')}
                >
                    Featured on Logo
                </button>
                <button
                    className={`tab-button text-[14px] md:text-[18px] py-3  px-2 md:px-6 rounded-md dark:text-white font-[500] ${activeTab === 'embed' ? 'bg-slate-400/20' : ''
                        }`}
                    onClick={() => handleTabClick('embed')}
                >
                    Copy Embed Code
                </button>
                <button
                    className={`tab-button text-[14px] md:text-[18px] py-3  px-2 md:px-6 rounded-md dark:text-white font-[500] ${activeTab === 'review' ? 'bg-slate-400/20' : ''
                        }`}
                    onClick={() => handleTabClick('review')}
                >
                    Leave a Review
                </button>
            </div>
        </div>
    )
}

export default Tabs