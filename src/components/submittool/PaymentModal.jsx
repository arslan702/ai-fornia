import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";

const PaymentModal = ({ isOpen, onClose }) => {
    const [selectedTab, setSelectedTab] = useState("card");
    const modalRef = useRef(null);
    const handleModal = () => {
        setSelectedTab(!selectedTab)

    }
    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <div
            className={`fixed z-[999]  top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${isOpen ? "" : "hidden"
                }`}
        >
            <div
                ref={modalRef}
                className="bg-white w-[325px] md:w-[600px] py-4 md:py-6 px-4 md:px-8 justify-center items-center rounded-md shadow-md"
            >
                {/* Your PayPal transaction content here */}
               
                <h1 className="text-center font-[800] text-black dark:text-black text-[24px]">
                    Submit AI tool
                </h1>
               
                <p className="text-[18px] text-black dark:text-black font-[500] text-center">
                    Submit your tool and skip the long waiting line.
                </p>

                <div className=" mt-5 bg-[#48A4D517] py-[10px] px-3 rounded-md h-[70px] w-full">
                    <button
                        className={`py-2 px-4 md:px-4 ${selectedTab === "card"
                            ? "font-[500] text-[16px] md:text-[18px] md:w-[240px] h-[50px] text-white dark:text-white rounded-md  bg-gradient-to-r from-blue-400 via-green-500 to-blue-500"
                            : "text-black font-[500] text-[16px] md:text-[18px] md:w-[260px] h-[50px]"
                            } `}
                        onClick={() => setSelectedTab("card")}
                    >
                        Pay by Card
                    </button>
                    <button
                        className={`py-2 px-4 ${selectedTab === "paypal"
                            ? "font-[500] text-[16px] md:text-[18px] md:w-[240px] h-[50px] text-white dark:text-white rounded-md  bg-gradient-to-r from-blue-400 via-green-500 to-blue-500"
                            : "text-black font-[500] text-[16px] md:text-[18px] md:w-[260px] h-[50px]"
                            } `}
                        onClick={() => setSelectedTab("paypal")}
                    >
                        Pay by PayPal
                    </button>
                </div>
                {selectedTab === "card" && (
                    <div className="mt-4">
                        <label className="block mb-2 text-base text-black dark:text-black">
                            Email Address
                        </label>
                        <input
                            type="text"
                            className="mb-3 p-2 w-full text-[#777] focus:outline-none rounded-md  dark:bg-white bg-white border-primary-blue border"
                            placeholder="Johndoe@email.com"
                        />
                        <label className="block mb-2 text-base text-black dark:text-black">
                            Card Information
                        </label>
                        <div className="mb-3 p-2 w-full flex h-[45px] justify-between   rounded-md  dark:bg-white bg-white border-primary-blue border">
                            <input
                                type="text"
                                className="focus:outline-none dark:bg-white bg-white text-[#777]"
                                placeholder="1234 4567 6789 5556 "
                            />
                            <div className="flex items-center">
                                <Image
                                    src={"/images/cards2.png"}
                                    alt=""
                                    width={600}
                                    height={600}
                                    className="w-[134px]"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4 w-full">
                            <label className=" w-full mb-2 text-base text-black dark:text-black">
                                Expiry
                                <input
                                    type="text"
                                    className="mt-3 p-2 w-full text-[#777] focus:outline-none rounded-md  dark:bg-white bg-white border-primary-blue border"
                                    placeholder="MM/YY"
                                />
                            </label>
                            <label className="block mb-2 w-full text-base text-black dark:text-black">
                                CVC
                                <input
                                    type="text"
                                    className="mt-3 p-2 w-full text-[#777] focus:outline-none rounded-md  dark:bg-white bg-white border-primary-blue border"
                                    placeholder="cvc"
                                />
                            </label>
                        </div>
                        <label className="block mb-2 text-base text-black dark:text-black">
                            Cardholder Name
                        </label>
                        <input
                            type="text"
                            className="mb-3 p-2 w-full text-[#777] focus:outline-none rounded-md  dark:bg-white bg-white border-primary-blue border"
                            placeholder="John Doe"
                        />
                        <label className="block mb-2 text-base text-black dark:text-black">
                            Biling Address
                        </label>
                        <select
                            name="product"
                            required
                            className="mb-3 p-2 w-full text-[#777] focus:outline-none rounded-md  dark:bg-white bg-white border-primary-blue border"
                        >
                            <option value="1" >United State</option>
                            <option value="2">UK</option>
                            <option value="3">Germany</option>
                        </select>
                        <Link href={'/submit'}>
                            <button className=" mt-5 w-full h-[50px] text-center text-white dark:text-white rounded-md  bg-gradient-to-r from-blue-400 via-green-500 to-blue-500 ">
                                Pay Now

                            </button>
                        </Link>
                    </div>
                )}
                {selectedTab === "paypal" && (
                    <div className="mt-4">
                    <label className="block mb-2 text-base text-black dark:text-black">
                        Email Address
                    </label>
                    <input
                        type="text"
                        className="mb-3 p-2 w-full text-[#777] focus:outline-none rounded-md  dark:bg-white bg-white border-primary-blue border"
                        placeholder="Johndoe@email.com"
                    />
                    <label className="block mb-2 text-base text-black dark:text-black">
                        Card Information
                    </label>
                    <div className="mb-3 p-2 w-full flex h-[45px] justify-between   rounded-md  dark:bg-white bg-white border-primary-blue border">
                        <input
                            type="text"
                            className="focus:outline-none dark:bg-white bg-white text-[#777]"
                            placeholder="1234 4567 6789 5556 "
                        />
                        <div className="flex items-center">
                            <Image
                                src={"/images/cards2.png"}
                                alt=""
                                width={600}
                                height={600}
                                className="w-[134px]"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 w-full">
                        <label className=" w-full mb-2 text-base text-black dark:text-black">
                            Expiry
                            <input
                                type="text"
                                className="mt-3 p-2 w-full text-[#777] focus:outline-none rounded-md  dark:bg-white bg-white border-primary-blue border"
                                placeholder="MM/YY"
                            />
                        </label>
                        <label className="block mb-2 w-full text-base text-black dark:text-black">
                            CVC
                            <input
                                type="text"
                                className="mt-3 p-2 w-full text-[#777] focus:outline-none rounded-md  dark:bg-white bg-white border-primary-blue border"
                                placeholder="cvc"
                            />
                        </label>
                    </div>
                    <label className="block mb-2 text-base text-black dark:text-black">
                        Cardholder Name
                    </label>
                    <input
                        type="text"
                        className="mb-3 p-2 w-full text-[#777] focus:outline-none rounded-md  dark:bg-white bg-white border-primary-blue border"
                        placeholder="John Doe"
                    />
                    <label className="block mb-2 text-base text-black dark:text-black">
                        Biling Address
                    </label>
                    <select
                        name="product"
                        required
                        className="mb-3 p-2 w-full text-[#777] focus:outline-none rounded-md  dark:bg-white bg-white border-primary-blue border"
                    >
                        <option value="1" >United State</option>
                        <option value="2">UK</option>
                        <option value="3">Germany</option>
                    </select>
                    <Link href={'/submit'}>
                        <button className=" mt-5 w-full h-[50px] text-center text-white dark:text-white rounded-md  bg-gradient-to-r from-blue-400 via-green-500 to-blue-500 ">
                            Pay Now

                        </button>
                    </Link>
                </div>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;
