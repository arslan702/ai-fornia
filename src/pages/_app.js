import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Space_Grotesk } from "next/font/google";
import AppContext from "@/components/appContext";
import { useState } from "react";
import cookie from "js-cookie"

const font = Space_Grotesk({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {

  const [userObject, setUserObject] = useState({})
  


  return (
    <div className={`${font.className}  dark:from-primary-dark`}>
      <ThemeProvider
        enableSystem={true}
        attribute="class"
        defaultTheme="system"
      >
        <Navbar />
        <AppContext.Provider value={{userObject,setUserObject}}>
          <Component {...pageProps} />
        </AppContext.Provider>
        <Footer />
      </ThemeProvider>
    </div>
  );
}
