"use client";
import image from "@/Assets/Images/logo.png";
import Image from "next/image";
import {
  BookIconFilled,
  DashboardIcon,
  GraphIcon,
  OccupationalMapIcon,
  UserIcon,
} from "@/Assets/Icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/module/features/authentication";
import { useDispatch } from "react-redux";

type Props = {};

function Sidebar({ }: Props) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const logoutFunction = () => {
    const callback = () => {
      router.push("/login");
    };
    let payload: any = { callback };
    dispatch(logout(payload));
  };
  return (
    <div className="sideMenu w-full bg-blueDark py-4 px-5 ">
      <div className="w-full flex items-center justify-center flex-col">
        <div className="ungradeLogo w-[90%]">
          <h1 className="text-white bg-white font-slab font-normal rounded-[10px] overflow-hidden h-[50px] flex items-center shadow-[0px_0px_11px_0px_black]">
            <span className="ungrade bg-[#053c6f] text-white font-slab font-normal py-1 px-[20px] h-[50px]  pl-[10px] flex items-center">
              <Image
                src={image}
                alt="logo"
                width={40}
                height={40}
                className="mr-[10px]"
              />
              UNGRADE
            </span>
            <span className="us bg-white text-[#053c6f] font-slab font-normal h-[50px] px-[10px] flex items-center">
              US
            </span>
          </h1>
        </div>
        <div className="w-full">
          <Link
            id="dashboard"
            href={"/dashboard"}
            className={` ${pathname == "/dashboard" ? "bg-[rgba(217,217,217,0.30)]" : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-11 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
          >
            <span className="text-white mr-4">
              <DashboardIcon />
            </span>
            Dashboard
          </Link>
          <Link
            id="courses"
            href={"/dashboard/course"}
            className={`  ${pathname == "/dashboard/course"
              ? "bg-[rgba(217,217,217,0.30)]"
              : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-11 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
          >
            <span className="text-white mr-4">
              <BookIconFilled />
            </span>
            Courses
          </Link>
          <Link
            id="evaluationCenter"
            href={"/dashboard/evaluation"}
            className={`  ${pathname == "/dashboard/evaluation"
              ? "bg-[rgba(217,217,217,0.30)]"
              : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-11 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
          >
            <span className="text-white mr-4">
              <GraphIcon />
            </span>
            Evaluation Center
          </Link>
          <Link
            id="occupationalMaps"
            href={"/dashboard/occupation"}
            className={`  ${pathname == "/dashboard/occupation"
              ? "bg-[rgba(217,217,217,0.30)]"
              : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-11 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
          >
            <span className="text-white mr-4">
              <OccupationalMapIcon />
            </span>
            Occupational Maps
          </Link>
          <Link
            id="profile"
            href={"/dashboard/profile"}
            className={`  ${pathname == "/dashboard/profile"
              ? "bg-[rgba(255,255,255,0.3)]"
              : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-11 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
          >
            <span className="text-white mr-4">
              <UserIcon fill="white" />
            </span>
            Profile
          </Link>
          <Link
            id="security"
            href={"/dashboard/resetsetting"}
            className={`  ${pathname == "/dashboard/resetsetting"
              ? "bg-[rgba(255,255,255,0.3)]"
              : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-11 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
          >
            <span className="text-white mr-4">
              <UserIcon fill="white" />
            </span>
            Security
          </Link>

          <a
            onClick={() => {
              logoutFunction();
            }}
            className={`  ${pathname == "/login" ? "bg-[rgba(255,255,255,0.3)]" : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-11 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
          >
            <span className="text-white mr-4">
              <UserIcon fill="white" />
            </span>
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
