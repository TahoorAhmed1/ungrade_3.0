"use client";
import image from "@/Assets/Images/logo.png";
import Image from "next/image";
import { BookIconFilled, UserIcon } from "@/Assets/Icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/module/features/authentication";
import { useDispatch } from "react-redux";
import { DockIcon, FilesIcon, User2 } from "lucide-react";

type Props = {};

function AdminSidebar({ }: Props) {
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
    <div className="sideMenu w-full bg-blueDark py-4 px-5 overflow-hidden ">
      <div className="w-full flex items-center justify-center flex-col overflow-hidden ">
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
            href={"/admin/user"}
            className={`  ${pathname == "/admin/user" ? "bg-[rgba(217,217,217,0.30)]" : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-10 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
          >
            <span className="text-white mr-4">
              <User2 />
            </span>
            Users
          </Link>
          <Link
            href={"/admin/professor"}
            className={`  ${pathname == "/admin/professor" ? "bg-[rgba(217,217,217,0.30)]" : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-10 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
          >
            <span className="text-white mr-4">
              <User2 />
            </span>
            Professor
          </Link>
          <Link
            href={"/admin/course"}
            className={`  ${pathname == "/admin/course" ? "bg-[rgba(217,217,217,0.30)]" : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-10 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
          >
            <span className="text-white mr-4">
              <BookIconFilled />
            </span>
            Courses
          </Link>

          <Link
            href={"/admin/competency"}
            className={`  ${pathname == "/admin/competency"
              ? "bg-[rgba(217,217,217,0.30)]"
              : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-10 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
          >
            <span className="text-white mr-4">
              <DockIcon />
            </span>
            Competencies
          </Link>
          <Link
            href={"/admin/department"}
            className={`  ${pathname == "/admin/department" ? "bg-[rgba(255,255,255,0.3)]" : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-10 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
          >
            <span className="text-white mr-4">
              <DockIcon />
            </span>
            Department
          </Link>
          <Link
            href={"/admin/degree"}
            className={`  ${pathname == "/admin/degree" ? "bg-[rgba(255,255,255,0.3)]" : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-10 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
          >
            <span className="text-white mr-4">
              <DockIcon />
            </span>
            Degree
          </Link>
          <Link
            href={"/admin/concentration"}
            className={`  ${pathname == "/admin/concentration"
              ? "bg-[rgba(255,255,255,0.3)]"
              : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-10 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
          >
            <span className="text-white mr-4">
              <DockIcon />
            </span>
            Concentrations
          </Link>
          <Link
            href={"/admin/university"}
            className={`  ${pathname == "/admin/university"
              ? "bg-[rgba(255,255,255,0.3)]"
              : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-10 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
          >
            <span className="text-white mr-4">
              <FilesIcon />
            </span>
            Universities
          </Link>
          <Link
            href={"/admin/outcomes"}
            className={`  ${pathname == "/admin/outcomes" ? "bg-[rgba(255,255,255,0.3)]" : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-10 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
          >
            <span className="text-white mr-4">
              <FilesIcon />
            </span>
            Outcomes
          </Link>

          <a
            onClick={() => {
              logoutFunction();
            }}
            className={`  ${pathname == "/login" ? "bg-[rgba(255,255,255,0.3)]" : ""
              } sidebar-link flex items-center px-3 py-3 text-white mt-10 hover:bg-[rgba(217,217,217,0.30)] rounded-lg`}
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

export default AdminSidebar;
