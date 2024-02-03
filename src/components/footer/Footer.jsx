import React, { useState } from "react";
import Wrapper from "../shared/Wrapper";
import Link from "next/link";
import Image from "next/image";
import { addDoc, collection,where,query,getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { message } from "antd";
const Footer = () => {

    const [formData, setFormData] = useState({ email: "" })
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

    return (
        <div className=" dark:bg-gradient-to-r from-[#112B59] to-[#07174F]">
            <Wrapper>
                <div className=" flex-col md:justify-center items-center pl-5 md:px-10 pt-14 pb-7 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
                        <div>
                            <Link href={'/'}>
                                <Image src={'/images/ai.png'} alt="" width={500} height={500} className="w-[180px]" />
                            </Link>
                            <p className="text-[16px] font-[400] md-[300px] xl:w-[300px] mt-4">
                                Said ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore veritatis et quasi architecto beatae
                                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                                voluptas sit aspernatur aut odit aut fugit.
                            </p>
                            <div className="flex items-center justify-start gap-3 mt-5 md:mb-10">
                                <div className="bg-custom-blue rounded-full w-[40px] h-[40px] flex items-center justify-center">
                                    <Link href={''}>
                                        <Image src={'/images/facebook.svg'} width={400} height={400} alt="" className="w-[12px]" />
                                    </Link>
                                </div>
                                <div className="bg-custom-blue rounded-full w-[40px] h-[40px] flex items-center justify-center">
                                    <Link href={''}>
                                        <Image src={'/images/instagram.svg'} width={400} height={400} alt="" className="w-[20px]" />
                                    </Link>
                                </div>
                                <div className="bg-custom-blue rounded-full w-[40px] h-[40px] flex items-center justify-center">
                                    <Link href={''}>
                                        <Image src={'/images/youtube.svg'} width={400} height={400} alt="" className="w-[20px]" />
                                    </Link>
                                </div>
                                <div className="bg-custom-blue rounded-full w-[40px] h-[40px] flex items-center justify-center">
                                    <Link href={''}>
                                        <Image src={'/images/twitter.svg'} width={400} height={400} alt="" className="w-[20px]" />
                                    </Link>
                                </div>

                            </div>
                        </div>
                        <div className="md:w-[130px] md:mx-auto">
                            <h2 className="text-[24px] font-[500] pb-4 text-primary-blue">Company</h2>
                            <ul className="flex flex-col space-y-4 text-[16px] font-[400]">
                                <Link href={'/about-us'}>
                                    <li>About Us</li>
                                </Link>
                                <Link href={'/privacy-policy'}>
                                    <li>Privacy Policy</li>
                                </Link>
                                <Link href={'/latest-news'}>

                                    <li>Latest News</li>
                                </Link>
                                <Link href={'/contact-us'}>

                                    <li>Contact Us</li>
                                </Link>
                            </ul>
                        </div>
                        <div className="md:w-[180px] ">
                            <h2 className="text-[24px] font-[500] pb-4 text-primary-blue">Use Cases</h2>
                            <ul className="flex flex-col space-y-4 text-[16px] font-[400]">
                                <Link href={'/team'}>
                                    <li>For Team</li>
                                </Link>
                                <Link href={'/email-marketers'}>
                                    <li>For Email Marketers</li>
                                </Link>
                                <Link href={'/blog-writers'}>

                                    <li>For Blog Writers</li>
                                </Link>
                                <Link href={'/social-managers'}>

                                    <li>For Social Managers</li>
                                </Link>
                            </ul>
                        </div>
                        <div className="md:w-[300px] md:ml-[-3rem]">
                            <h1 className="text-[24px] font-[500] pb-4 text-primary-blue ">
                                News & Updates
                            </h1>
                            <p className="text-[16px] font-[400]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                            <div className="flex my-5 ml-[-3rem] md:ml-0 ">
                                <div className="bg-gradient-to-br from-[#27B6D7] via-[#07174F54] to-[#27B6D7] bg-opacity-50 rounded-md mx-auto p-[1px]">
                                    <div className="relative rounded-md flex-grow w-full md:w-[300px] bg-white dark:bg-gradient-to-r from-[#112B59] to-[#07174F]">
                                        <input
                                            type="text"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="Email Address"
                                            className="md:w-full w-full focus:outline-none px-5 pr-10 h-[50px] bg-transparent rounded-md"
                                        />

                                    </div>

                                </div>

                            </div>
                            <button
                                type="button"
                                onClick={handleSubscribe}
                                className=" w-[100%] h-10 my-2 transform translate-y-[-50%] right-3 bg-primary-blue text-white h-[30px] px-2 md:px-4 py-1 rounded-md"
                            >
                                Subscribe
                            </button>

                        </div>
                    </div>
                    <div className="border-t mt-5 border-primary-blue/20" />
                    <div className="pt-7 text-center">
                        <p className="text-[14px] md:text-[16px] font-[500]">
                            Design and developed by <Link className="text-primary-pink-color" href={'https://zysoftec.com/'}>ZySoftec</Link>
                        </p>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Footer;
