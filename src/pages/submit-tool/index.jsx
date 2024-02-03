import React from 'react'
import Layout from '@/components/shared/Layout'
import Wrapper from '@/components/shared/Wrapper'
import Submit from '@/components/submit/Submit'
import { Manrope } from "next/font/google";
import SubmitTool from '@/components/submittool/SubmitTool';

const font = Manrope({ subsets: ["latin"] });
const index = () => {
  return (
    <div className={`dark:bg-primary-dark ${font.className}`}>
      <Wrapper>
        <div className=''>
          <SubmitTool />

        </div>
      </Wrapper>
    </div>
  )
}

export default index