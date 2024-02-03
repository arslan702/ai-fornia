import React from 'react';
import 'typeface-manrope'; // Import the font
import Privacy from '@/components/privacypolicy/Privacy';
import Wrapper from '@/components/shared/Wrapper';
import Layout from '@/components/shared/Layout';

export default function Index() {
  return (
    <div className="font-manrope dark:bg-primary-dark">
      <Wrapper>
        <div>
          <Layout>
            <div className="border dark:border-primary-blue/20 py-2 px-8 rounded-md mt-10">
              <p className="text-[18px] font-[500] dark:text-primary-blue/20">
                Home <span className="dark:text-white text-black"> {'>'} Privacy Policy </span>
              </p>
            </div>
          </Layout>
          <div className="pb-20">
            <Privacy />
          </div>
        </div>
      </Wrapper>
    </div>
  );
}