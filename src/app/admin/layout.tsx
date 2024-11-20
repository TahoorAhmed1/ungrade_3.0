"use client";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { getCourse } from "@/module/features/courses";
import { getOutcomes } from "@/module/features/outcomesSlice";
import { useAppDispatch } from "@/module/store";
import Cookies from "js-cookie";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const inter = Poppins({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter()
  useEffect(() => {
    if (Cookies.get("ungradeToken")) {
      dispatch(getCourse());
      dispatch(getOutcomes());
    }
  }, [router]);
  return (
    <div
      className={`flex min-h-screen bg-[#edf2f4]  overflow-y-hidden ${inter.className}`}
    >
      <div className="sideBarDiv w-[250px] bg-blueDark md:block hidden">
        <AdminSidebar />
      </div>
      <div className="md:w-[calc(100%-250px)] w-full p-8 overflow-y-hidden">
        {children}
      </div>

    </div>
  );
}
