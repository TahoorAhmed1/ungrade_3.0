"use client";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { UserIcon } from "@/Assets/Icons";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/module/features/authentication";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/utils";

type Props = {};

function Navbar({ }: Props) {
  const user_data: any = getCookie("ungradeUser")
  let value = user_data && JSON.parse(user_data)
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter();
  const logoutFunction = () => {
    const callback = () => {
      router.push('/login')
    }
    let payload: any = { callback }
    dispatch(logout(payload))
  }
  return (
    <div className="Navbar relative h-[72px] bg-white w-full shadow-sm flex items-center justify-end px-12">
      <div
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="relative cursor-pointer flex items-center justify-center"
      >
        <Avatar className="w-10 h-10 flex items-center justify-center">
          <AvatarImage
            src=""
            className="w-full h-full object-cover rounded-full"
          />
          <UserIcon />
        </Avatar>
        {isOpen && (
          <div className="z-10 bg-white divide-y absolute top-10 right-1 divide-gray-100 rounded-lg shadow w-28 text-center border-black border ">
            <ul className=" text-sm text-black font-medium dark:text-gray-200">
              {value?.type == "admin" &&
                <li>
                  <Link
                    href="/admin/user"
                    className="block px-4 py-2.5 hover:bg-gray-50  rounded-t-lg border-b border-black"
                  >
                    Admin
                  </Link>
                </li>}
              <li>
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2.5 hover:bg-gray-50  rounded-t-lg border-b border-black"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/settings"
                  className="block px-4 py-2.5 hover:bg-gray-50  border-b border-black"
                >
                  Settings
                </Link>
              </li>

              <li>
                <a
                  className="block px-4 py-2.5 hover:bg-gray-50  rounded-b-lg border-black"
                  onClick={() => {
                    logoutFunction()
                  }}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div >
  );
}

export default Navbar;
