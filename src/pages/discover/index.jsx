import Discover from '@/components/discover/Discover'
import React from 'react'
import Wrapper from '@/components/shared/Wrapper';
import Layout from '@/components/shared/Layout';
import Link from 'next/link';

import { Manrope } from "next/font/google";
const font = Manrope({ subsets: ["latin"] });
const index = () => {
    return (
        <div className={`dark:bg-primary-dark ${font.className}`}>
            <Wrapper>
                <div className=''>
                    <Layout>
                        <div className='border dark:border-primary-blue/20 py-2 px-8 rounded-md mt-10'>
                            <p className='text-[18px] font-[500]  dark:text-primary-blue/20'><Link href="/" className="hover:underline">Home</Link><span className='dark:text-white text-black'> {'>'} Categories </span>
                            </p>
                        </div>
                    </Layout>
                    <div>
                        <Discover />
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default index