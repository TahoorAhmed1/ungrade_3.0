"use client";

import { Jost } from "next/font/google";
import "@/styles/globals.css";
import { useEffect } from "react";
// import { Cookies } from "js-cookie";
const inter = Jost({ subsets: ["latin"] });

// useEffect(() => {
//   const user = Cookies.get("ungradeUser")?.value || "";
//   const userProfile = user ? JSON.parse(user).userProfile : null;
// });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`flex min-h-screen bg-background `}>
    {/* <div className={`flex min-h-screen bg-background ${inter.className} `}> */}
      {children}
    </div>
  );
}
