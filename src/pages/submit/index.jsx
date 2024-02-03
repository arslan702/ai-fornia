import React from 'react';
import Layout from '@/components/shared/Layout';
import Wrapper from '@/components/shared/Wrapper';
import Submit from '@/components/submit/Submit';
import Link from 'next/link';
import 'typeface-manrope'; // Import the font

const Index = () => {
  return (
    <div className="dark:bg-primary-dark font-manrope">
      <Wrapper>
        <div>
          <Layout>
            <div className="border dark:border-primary-blue/20 py-2 px-8 rounded-md mt-10">
              <p className="text-[18px] font-[500] dark:text-primary-blue/20">
               <Link href="/" className='hover:underline'>Home</Link> <span className="dark:text-white text-black"> {'>'} Submit </span>
              </p>
            </div>
          </Layout>
          <div>
            <Submit />
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

export default Index;