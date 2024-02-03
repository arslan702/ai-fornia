import Image from "next/image";
import React, { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import cookie from "js-cookie"

const Review = () => {
  const toolCookie = cookie.get("tool")

  const [toolObject, setToolObject] = useState(null)

  useEffect(() => {
    if (toolCookie) {
      setToolObject(JSON.parse(toolCookie))
    }
  }, [toolCookie]);

  const [reviewArray, setReviewArray] = useState([]); // Use state to store savesArray
  console.log("Id is :", toolObject?.TId)
 
  useEffect(() => {
    const getToolSaves = async () => {
      try {
        const querySnapshot = await getDocs(query(
          collection(db, 'reviews'),
          where('Tid', '==', toolObject?.TId)
        ));

        const newArray = [];

        querySnapshot.forEach((doc) => {
          newArray.push({ id: doc.id, ...doc.data() });
        });

        setReviewArray(newArray);
      } catch (error) {
        console.error("Error fetching tool Reviews:", error);
      }
    }

    if (toolObject?.TId) {
      getToolSaves();
    }
  }, [toolObject?.TId]);
  console.log("review Array is :", reviewArray)
  function truncateText(text, maxWords) {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + ' ...';
    }
    return text;
  }

  return (
    <div className="">
      <div className="absolute md:block hidden left-0 bg-[#2CD7834F]/10 w-[338px] h-[338px] rounded-full blur-3xl"></div>
      <div className="absolute md:block hidden r bg-[#2CD7834F]/10 w-[338px] h-[338px] right-0 rounded-full blur-3xl"></div>
      <div className="flex flex-col text-center justify-center items-center">
        <h1 className="text-[32px] md:text-[40px] font-[800] bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
          Review List
        </h1>

        <p className="text-[18px] font-[500] text-black dark:text-[#FFF] md:px-[15rem] pt-5">
          These are the tools and posts you have favourited. You can remove them
          from your favourites by clicking the bookmark icon.{" "}
        </p>

        <div className="mt-16 mb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {reviewArray && reviewArray.map((item, index) => (
            <div
              key={index}
              className="w-[330px] md:w-[393px] bg-gradient-to-br from-[#27B6D7] via-[#07174F54] to-[#27B6D7] bg-opacity-50 rounded-md mx-auto p-[1px]"
            >
              <div className="w-full p-1 backdrop-blur-2xl bg-white dark:bg-primary-dark/90 h-full rounded-md">
                <div className="flex flex-col mx-3 my-3">
                  <div className="flex gap-4">
                    {/* <Image
                      // src={item.userimg}
                      alt=""
                      width={1080}
                      height={1080}
                      className="w-[50px] h-[50px] object-contain rounded-full"
                    /> */}
                    <div className="flex flex-col items-start justify-start">
                      <p className="text-[24px] font-[600]">{item.name}</p>
                      {/* <p className="text-[16px] font-[400] text-slate-500">
                        {item.regname}
                      </p> */}
                    </div>
                  </div>
                  <div className="text-left text-[25px]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${item.rating >= star ? 'filled' : ''}`}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                  <div className="h-[100px]">
                    <p className="text-left">{truncateText(item.review, 34)}</p>
                  </div>
                  <div className="my-5">
                    <Image
                      src={item.imageUrl}
                      alt=""
                      width={1080}
                      height={1080}
                      className="md:max-w-[340px] md:max-h-[184px] object-cover rounded-[10px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute md:block hidden left-0 bg-[#2CD7834F]/10 w-[338px] h-[338px] rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Review;
