import React, { useState, useEffect, useContext } from 'react';
import { db } from '@/config/firebase';
import { message } from 'antd';
import { set } from 'firebase/database';
import { auth } from '@/config/firebase';
import cookie from "js-cookie"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, getDocs, query, where, setDoc, doc, collection } from 'firebase/firestore';
import AppContext from '../appContext';
import { storage } from '@/config/firebase';
import { getStorage } from "firebase/storage";
import { serverTimestamp } from 'firebase/firestore'; // Added this import
import { Select } from 'antd';
import { Menu, Dropdown, Button } from 'antd';
import { useRouter } from 'next/router';
import { DownOutlined } from '@ant-design/icons';
import Loader from '../Loader';
import { Router } from 'next/router';
const { Option, OptGroup } = Select;



const categories = [
  "Text",
  "Image",
  "Code",
  "Audio",
  "Video",
  "3D",
  "Business",
  "Others"
];

const options = {
  Text: [
    "COPYWRITING",
    "EMAIL ASSISTANT",
    "GENERAL WRITING",
    "PARAPHRASER",
    "PROMPTS",
    "SEO",
    "SOCIAL MEDIA ASSISTANT",
    "STORY TELLER",
    "SUMMARIZER"
  ],
  Image: [
    "ART",
    "AVATARS",
    "DESIGN ASSISTANT",
    "IMAGE EDITING",
    "IMAGE GENERATOR",
    "LOGO GENERATOR"
  ],
  Code: [
    "CODE ASSISTANT",
    "DEVELOPER TOOLS",
    "LOW-CODE/NO-CODE",
    "SPREADSHEETS",
    "SQL"
  ],
  Audio: [
    "AUDIO EDITING",
    "MUSIC",
    "TEXT TO SPEECH",
    "TRANSCRIBER"
  ],
  Video: [
    "PERSONALIZED VIDEOS",
    "VIDEO EDITING",
    "VIDEO GENERATOR"
  ],
  "3D": ["3D"],
  Business: [
    "CUSTOMER SUPPORT",
    "E-COMMERCE",
    "EDUCATION ASSISTANT",
    "FASHION",
    "FINANCE",
    "HUMAN RESOURCES",
    "LEGAL ASSISTANT",
    "PRESENTATIONS",
    "PRODUCTIVITY",
    "REAL ESTATE",
    "SALES",
    "STARTUP TOOLS"
  ],
  Others: [
    "DATING",
    "EXPERIMENTS",
    "FITNESS",
    "FUN TOOLS",
    "GAMING",
    "GIFT IDEAS",
    "HEALTHCARE",
    "LIFE ASSISTANT",
    "MEMORY",
    "RELIGION",
    "RESEARCH",
    "RESOURCES",
    "SEARCH ENGINE",
    "TRAVEL"
  ]
};

// import { setDoc, doc , collection,set } from 'firebase/firestore';
const Submit = () => {
  const storage = getStorage();
  const [loading, setLoading] = useState(false);
  const [userObject, setUserObject] = useState(null)
  var userCookie = cookie.get('user');
  const router =useRouter()

  useEffect(() => {
    if (userCookie) {
      setUserObject(JSON.parse(userCookie))

    }
  }, [userCookie]);
  const context = useContext(AppContext)
  console.log(context.userObject.displayName, " and ", context.userObject.email)
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState(null); // Added state for preview
  const [user, setUser] = useState({})
  const [email, setEmail] = useState('')
  console.log("email:", userObject?.email,);

  const [toolData, setToolData] = useState({
    title: "",
    detail: "",
    link: "",
    category: "",
    subCategory:"",
    email: "",

  });
  console.log(toolData)
  useEffect(() => {
    const paid = async () => {
      const email = userObject?.email;

      if (email) {
        const querySnapshot = await getDocs(query(collection(db, 'Payment'), where('email', '==', email)));

        if (querySnapshot.size === 0) {
          // If no documents with the same email exist, add a new payment
          await addDoc(collection(db, 'Payment'), {
            email: email,
            payment: 120,
            joiningDate: serverTimestamp(),
          });
          
        } else {
          // If a document with the same email already exists, you can choose to update it or take some other action
          console.log('User with this email already exists');
        }
      }
    };

    paid();
  }, [userObject]);


  const handleImagePreview = (e) => {

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);

    }
  };
  const handleSubmitTool = async () => {
    setLoading(true)

    if ((toolData.title && toolData.detail && toolData.category && toolData.link && image) === "") {
      message.error("Error, Feiled or Feilds are empty")
      setLoading(false)
      return;
    }

    try {
      const imageRef = ref(storage, `/images/ ${image.name}`)

      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      console.log(imageUrl)
      const Tool = await addDoc(collection(db, 'tools'), {
        detail: toolData.detail,
        link: toolData.link,
        category: toolData.category,
        subCategory:toolData.subCategory,
        email: userObject?.email,
        title: toolData.title,
        imageUrl: imageUrl,
        user: userObject?.displayName,
        mode: "Alternate",
        reviews:0,
        rating:0,
        joiningDate: serverTimestamp(),
      })


      const toolDocRef = doc(db, 'tools', Tool._key.path.segments[1]);
      await setDoc(toolDocRef, { TId: Tool._key.path.segments[1] }, { merge: true });



      message.success('Tool successfully Registered');
      setLoading(false)
      router.push("/")

    }
    catch (err) {
      console.log("error:", err)
      message.error("Failed to register tool")
      setLoading(false)

    }

  };

 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

 

  const handleMenuClick = (e) => {
    const [category, option] = e.keyPath;
    setSelectedCategory(category);
    setSelectedOption(option);
    const [first,secondValue] = category.split(","); // Use 'option' instead of 'category'
    
    setToolData({ ...toolData,category: option , subCategory: secondValue }); // Set 'secondValue' as the category

    
  };
  console.log(toolData)
  const menu = (
    <Menu onClick={handleMenuClick}>
      {categories.map((category) => (
        <Menu.SubMenu key={category} title={category}>
          {options[category].map((option) => (
            <Menu.Item key={[category, option]}>{option}</Menu.Item>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  );
  return (
    <>
      {loading ? (
        <div style={{ color: "black", width: "100%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", }}>

          <Loader />
        </div>
      ) : (
        <div>
          <div className="absolute md:block hidden left-0 bg-[#2CD7834F]/10 w-[338px] h-[338px] rounded-full blur-3xl"></div>
          <div className="absolute md:block hidden r bg-[#2CD7834F]/10 w-[338px] h-[338px] right-0 rounded-full blur-3xl"></div>
          <div className=" flex flex-col text-center justify-center items-center">
            <h1 className="text-[32px] md:text-[40px] font-[800] bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
              Submit AI Tool
            </h1>
            <p className="text-[18px] font-[500] text-black dark:text-[#FFF] md:px-[15rem] pt-5">
              These are the tools and posts you have favourited. You can remove them from your favourites by clicking the bookmark icon.
            </p>

            <div className='flex flex-col gap-5 px-3 py-5   md:p-10  my-10 w-full md:w-[80%] bg-custom-blue md:h-[105%] border border-primary-border rounded-md'>


              <input
                value={toolData.title}
                onChange={(e) => setToolData({ ...toolData, title: e.target.value })}
                placeholder='Title of your tool' type="text" className='dark:placeholder-white focus:outline-none text-[13px] md:text-[16px] pl-3 md:pl-5 w-full pt-5 pb-[25px] bg-custom-blue border rounded-md dark:border-primary-border border-primary-dark' />
              <input
                value={toolData.detail}
                onChange={(e) => setToolData({ ...toolData, detail: e.target.value })}
                placeholder='In Short, please share what the AI tool can do' type="text" className='dark:placeholder-white focus:outline-none text-[13px] md:text-[16px] pl-3 md:pl-5 w-full pt-5 pb-[170px] bg-custom-blue border rounded-md dark:border-primary-border border-primary-dark' />

              <input
                value={toolData.link}
                onChange={(e) => setToolData({ ...toolData, link: e.target.value })}
                placeholder='Link to the AI tool' type="text" className='dark:placeholder-white focus:outline-none text-[13px] md:text-[16px] pl-3 md:pl-5 w-full py-3 md:py-5  bg-custom-blue border rounded-md dark:border-primary-border border-primary-dark' />
              <div className='dark:placeholder-white flex flex-row items-center focus:outline-none text-[13px] md:text-[16px] pl-3 md:pl-5 w-full py-3 md:py-5 bg-custom-blue border rounded-md dark:border-primary-border border-primary-dark'>
                <p className='mr-10'>{toolData.subCategory ? <>Category : {toolData.subCategory}</> : <>Select Category: </>}</p>

                <Dropdown overlay={menu} trigger={['click']}>
                  <Button className='text-gray-500'>
                    Select a category <DownOutlined />
                  </Button>
                </Dropdown>
                {/* <Select
                  placeholder="Select a category"
                  style={{
                    width: '30%',
                    borderRadius: '0.375rem',
                    border: 'none',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                  dropdownClassName="custom-dropdown"
                  onChange={(value) => setToolData({ ...toolData, category: value })}
                  value={toolData.category}
                >

                  <OptGroup label="Text">
                    <Option value="COPYWRITING">COPYWRITING</Option>
                    <Option value="EMAIL ASSISTANT">EMAIL ASSISTANT</Option>
                    <Option value="GENERAL WRITING">GENERAL WRITING</Option>
                    <Option value="PARAPHRASER">PARAPHRASER</Option>
                    <Option value="PROMPTS">PROMPTS</Option>
                    <Option value="SEO">SEO</Option>
                    <Option value="SOCIAL MEDIA ASSISTANT">SOCIAL MEDIA ASSISTANT</Option>
                    <Option value="STORY TELLER">STORY TELLER</Option>
                    <Option value="SUMMARIZER">SUMMARIZER</Option>


                  </OptGroup>
                  <OptGroup label="Image">
                    <Option value="ART">ART</Option>
                    <Option value="AVATARS">AVATARS</Option>
                    <Option value="DESIGN ASSISTANT">DESIGN ASSISTANT</Option>
                    <Option value="IMAGE EDITING">IMAGE EDITING</Option>
                    <Option value="IMAGE GENERATOR">IMAGE GENERATOR</Option>
                    <Option value="LOGO GENERATOR">LOGO GENERATOR</Option>

                  </OptGroup>
                  <OptGroup label="Code">
                    <Option value="CODE ASSISTANT">CODE ASSISTANT</Option>
                    <Option value="DEVELOPER TO">DEVELOPER TO</Option>
                    <Option value="LOW-CODE/NO-CODE">LOW-CODE/NO-CODE</Option>
                    <Option value="SPREADSHEETS">SPREADSHEETS</Option>
                    <Option value="SQL">SQL</Option>

                  </OptGroup>
                  <OptGroup label="Audio">
                    <Option value="AUDIO EDITING">AUDIO EDITING</Option>
                    <Option value="MUSIC">MUSIC</Option>
                    <Option value="TEXT TO SPEECH">TEXT TO SPEECH</Option>
                    <Option value="TRANSCRIBER">TRANSCRIBER</Option>

                  </OptGroup>
                  <OptGroup label="Video">
                    <Option value="PERSONALIZED VIDEOS">PERSONALIZED VIDEOS</Option>
                    <Option value="VIDEO EDITING">VIDEO EDITING</Option>
                    <Option value="VIDEO GENERATOR">VIDEO GENERATOR</Option>

                  </OptGroup>
                  <OptGroup label="3D">
                    <Option value="3D">3D</Option>
                  </OptGroup>
                  <OptGroup label="Business">
                    <Option value="CUSTOMER SUPPORT">CUSTOMER SUPPORT</Option>
                    <Option value="E-COMMERCE">E-COMMERCE</Option>
                    <Option value="EDUCATION ASSISTANT">EDUCATION ASSISTANT</Option>
                    <Option value="FASHION">FASHION</Option>
                    <Option value="FINANCE">FINANCE</Option>
                    <Option value="HUMAN RESOURCES">HUMAN RESOURCES</Option>
                    <Option value="LEGAL ASSISTANT">LEGAL ASSISTANT</Option>
                    <Option value="PRESENTATIONS">PRESENTATIONS</Option>
                    <Option value="PRODUCTIVITY">PRODUCTIVITY</Option>
                    <Option value="REAL ESTATE">REAL ESTATE</Option>
                    <Option value="SALES">SALES</Option>
                    <Option value="STARTUP TOOLS">STARTUP TOOLS</Option>
                  </OptGroup>
                  <OptGroup label="Others">
                    <Option value="DATING">DATING</Option>
                    <Option value="EXPERIMENTS">EXPERIMENTS</Option>
                    <Option value="FITNESS">FITNESS</Option>
                    <Option value="FUN TOOLS">FUN TOOLS</Option>
                    <Option value="GAMING">GAMING</Option>
                    <Option value="GIFT IDEAS">GIFT IDEAS</Option>
                    <Option value="HEALTHCARE">HEALTHCARE</Option>
                    <Option value="LIFE ASSISTANT">LIFE ASSISTANT</Option>
                    <Option value="MEMORY">MEMORY</Option>
                    <Option value="RELIGION">RELIGION</Option>
                    <Option value="RESEARCH">RESEARCH</Option>
                    <Option value="RESOURCES">RESOURCES</Option>
                    <Option value="SEARCH ENGINE">SEARCH ENGINE</Option>
                    <Option value="TRAVEL">TRAVEL</Option>
                  </OptGroup>

                </Select> */}
              </div>
              <input
                disabled
                value={userObject?.email}
                placeholder='Your Email Address' type="email" className='dark:placeholder-white  text-gray-600 focus:outline-none text-[13px] md:text-[16px] pl-3 md:pl-5 w-full md:py-5 py-3  bg-custom-blue border rounded-md dark:border-primary-border border-primary-dark' />
              {previewImage && <img src={previewImage} alt="Preview" className="my-4 max-w-[200px]" />}

              <div className='my-6 flex flex-col justify-center items-center'>
                <input type='file' onChange={handleImagePreview} className='hidden ' accept="image/*" id="image-upload" />
                <label htmlFor="image-upload" className='cursor-pointer bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold'>
                  Select Image
                </label>


                <button disabled={loading} onClick={handleSubmitTool} className={`mt-3 ${loading ? "bg-gray-300" : "bg-gradient-to-r from-blue-400 via-green-500 to-blue-500"} font-[500] md:text-[18px] w-[130px] h-[40px] md:h-[50px] text-white dark:text-white rounded-md `}>
                  Submit
                </button>

              </div>
            </div>
          </div>
        </div>)}</>
  )
}

export default Submit




