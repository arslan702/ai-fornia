"use client";
import React from "react";
import Wrapper from "../shared/Wrapper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RxCross1 } from "react-icons/rx";
import { CgMenuRightAlt } from "react-icons/cg";
import { BsMoon, BsSun } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Cookies from 'js-cookie';
import { Dropdown, Menu } from "antd";
import Link from "next/link";
import { Cookie } from "next/font/google";
const Navbar = () => {
  const router = useRouter();
  const [number, setNumber] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [nav, setNav] = useState(false);
  const [hoverIsOpen, hoverSetIsOpen] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  var userCookie = Cookies.get('user');

  const [userObject, setUserObject] = useState(null)
  useEffect(() => {
    setMounted(true);
    if (userCookie) {
      setUserObject(JSON.parse(userCookie))

    }
  }, [userCookie]);

  const sponsor = () => {

    // setUserObject(null)
    router.push("/sponsorOption")

  }
  const LogOut = () => {

    Cookies.remove("user")
    setUserObject(null)
    router.push("/login")

  }
  const profileMenu = (
    <Menu>
      <Menu.Item key="User"><Link href="/UserProfile">Profile</Link></Menu.Item>
      <Menu.Item key="logout" className="menu" onClick={LogOut}>Logout</Menu.Item>
    </Menu>
  );
  const submitMenu = (
    <Menu>
      <Menu.Item key="submit"><Link href="/submit-tool">Submit Tool</Link></Menu.Item>
      <Menu.Item key="sponsor" className="menu" onClick={sponsor}>Sponsor Option</Menu.Item>
    </Menu>
  );

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleNavbar = () => {
    setNav(!nav);
  };
  const closeMenu = () => {
    setNav(false);
  };
  return (
    <div className="border-b border-primary-blue/10 py-5 dark:bg-primary-dark">
      <Wrapper>
        <div className="flex justify-between items-center bg-transparent  ">
          {/* left  */}
          <div className="flex z-20">
            {/* logo  */}
            <Link href={'/'}>
              <Image src={'/images/ai.png'} alt="" width={500} height={500} className="w-[180px]" />
            </Link>
          </div>
          {/* right */}
          <div className="hidden md:flex items-center gap-10">
            {/* nav lis */}
            <div>
              <ul className="flex space-x-12 text-base  font-[500] text-[18px]">
              <button onClick={() => router.push("/Subscribe")} className=" z-20 ">
                  Subscribe
                </button>
                <button onClick={() => router.push("/favorites")} className=" z-20 ">
                  Favorites
                </button>
                <Dropdown overlay={submitMenu} placement="bottomRight" arrow>

                  <div className="py-3 rounded-full cursor-pointer  flex flex-col justify-center items-center    ">

                    <span className='p-0 m-0  ' style={{ display: "flex" }}>
                      <div
                        className=" transition-translate duration-200  pl-4 pr-4 pt-3  rounded-md h-12">
                        Submit
                      </div></span>
                  </div>
                </Dropdown>
                <button onClick={() => router.push("/discover")} className="  z-20">
                  Discover
                </button>
                <button onClick={() => router.push("/latest-news")} className="  z-20">
                  Latest News
                </button>
              </ul>
            </div>
            {/* toggle  */}
            <div className="flex ">
              {currentTheme === "dark" ? (
                <button className=" z-20" onClick={() => setTheme("light")}>
                  {" "}
                  <BsSun size={25} className="text-yellow-300" />
                </button>
              ) : (
                <button className=" z-20" onClick={() => setTheme("dark")}>
                  <BsMoon size={22} className="text-black" />
                </button>
              )}
            </div>
            {/* sign in */}
            {
              userObject && userObject ?
                (<Dropdown overlay={profileMenu} placement="bottomRight" arrow>

                  <div className="py-3 rounded-full cursor-pointer  flex flex-col justify-center items-center    ">

                    {/* <Image className="rounded-full" src={userObject.imageUrl} width={40} height={40} alt="userImage" /> */}
                    <span className='p-0 m-0  ' style={{ display: "flex" }}>
                      <div
                        className="border-teal-500 border transition duration-300  pl-4 pr-4 pt-3 hover:bg-teal-100 rounded-md h-12">
                        {userObject.displayName}
                      </div></span>
                  </div>
                </Dropdown>) :

                <div className="flex  items-center space-x-2 pl-2  rounded-md">
                  <button onClick={() => router.push("/login")} className="font-[500] text-[18px] w-[124px] h-[50px] z-20 text-primary-blue  dark:text-white border border-[#15CADF] bg-transparent rounded-md">
                    Sign in
                  </button>
                </div>
            }


            {/* start a project  */}
            
            <button onClick={() => router.push("/submit-tool")} className="font-[500] text-[18px] z-20  w-[180px] h-[50px] text-white dark:text-white rounded-md  bg-gradient-to-r from-blue-400 via-green-500 to-blue-500">
              Submit a tool
            </button>
          </div>
          {/* toggle  */}
          <div className="flex sm:hidden z-20">
            {currentTheme === "dark" ? (
              <button className="" onClick={() => setTheme("light")}>
                {" "}
                <BsSun size={25} className="text-yellow-300" />
              </button>
            ) : (
              <button className="" onClick={() => setTheme("dark")}>
                <BsMoon size={22} className="text-black" />
              </button>
            )}
          </div>
          {/* mobile menu  */}
          <div
            onClick={handleNavbar}
            className=" sm:block md:hidden flex items-center z-50"
          >
            {nav ? (
              <RxCross1 size={35} className="text-black dark:text-white z-50" />
            ) : (
              <CgMenuRightAlt
                size={35}
                className=" text-black dark:text-white"
              />
            )}
          </div>
          <div
            className={
              nav
                ? "md:hidden z-40 fixed top-0 right-0 shadow-md overflow-scroll bottom-0 flex justify-start items-start py-20 px-5 w-80 h-screen dark:bg-primary-dark bg-white  text-black dark:text-white text-right ease-linear duration-100 transform translate-x-0"
                : "md:hidden z-40 fixed top-0 right-0 shadow-md overflow-scroll bottom-0 flex justify-start items-start py-20 px-5 w-80 h-screen dark:bg-primary-dark bg-white text-black dark:text-white text-right ease-linear duration-100  transform translate-x-full"
            }
          >
            <div className="absolute mt-[-3.5rem]">
              <h3 className="font-black text-lg  text-primary-green-text">
                Menu
              </h3>
            </div>
            <div className="flex flex-col justify-between ">
              <div className="flex flex-col basis-[50%]">
                <ul className="flex flex-col justify-start items-start gap-5 text-2xl font-black">
                  <Link href={'/favorites'}>
                    <li onClick={closeMenu} className=" ">
                      Favorites
                    </li>
                  </Link>
                  <Link href={'/discover'}>
                    <li onClick={closeMenu} className=" ">
                      Discover
                    </li>
                  </Link>
                  <Link href={'/submit-tool'}>
                    <li onClick={closeMenu} className=" ">
                      Submit
                    </li>
                  </Link>
                  <Link href={'/latest-news'}>
                    <li onClick={closeMenu} className=" ">
                      Latest News
                    </li>
                  </Link>

                </ul>
                <div className="flex flex-col gap-y-6 mt-5">
                  {/* sign in */}
                  <div className="flex  items-center  rounded-md">
                    <Link href={'/login'}>
                      <button onClick={closeMenu} className="font-[500] text-[18px] w-[180px] h-[50px] text-primary-blue  dark:text-white border border-[#15CADF] bg-transparent rounded-md">
                        Sign in
                      </button>
                    </Link>
                  </div>
                  {/* start a project  */}
                  <Link href={'/submit-tool'}>
                    <button onClick={closeMenu} className="font-[500] text-[18px] w-[180px] h-[50px] text-white dark:text-white rounded-md  bg-gradient-to-r from-blue-400 via-green-500 to-blue-500">
                      Submit a tool
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Navbar;
