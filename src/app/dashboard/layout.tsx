"use client"
import { Jost } from "next/font/google";

import Sidebar from "@/components/common/sidebar";
import Navbar from "@/components/common/navbar";
import MobileNavBar from "@/components/common/MobileNavBar";
import { useEffect } from "react";
import { getProfile } from "@/module/features/completeProfile";
import { useAppDispatch } from "@/module/store";

const inter = Jost({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  return (
    <div className={`flex min-h-screen bg-background ${inter.className} `}>

      <div className="sideBarDiv w-[250px] bg-blueDark md:block hidden">
        <Sidebar />
      </div>
      <div className="md:w-[calc(100%-250px)] w-full">
        <div className="w-full md:block hidden">
          <Navbar />
        </div>
        <MobileNavBar sideBar={true} />
        {children}
      </div>
    </div>
  );
}
