"use client";
import { Hamburger } from '@/Assets/Icons';
import React, { useEffect, useRef, useState } from 'react'
import {
    Drawer,
    DrawerContent,

} from "@/components/ui/drawer"
import Sidebar from './sidebar';
type Props = {
    sideBar?: any;
}

function MobileNavBar({ sideBar }: Props) {
    const [open, setOpen] = useState(false)
    const drawerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // @ts-ignore
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);
    return (
        <>
            {sideBar ? <>
                <div className=" md:hidden  bg-blueDark flex items-end h-[100px]">
                    <div className='flex items-center justify-between w-full px-6 p-[30px]'>
                        <h2 className="font-extrabold text-[24px] leading-[28.8px] tracking-[0.03em] text-left mb-0 text-white flex items-end ">
                            UNGRADE
                        </h2>
                        <div onClick={() => {
                            setOpen(true)
                        }}>
                            <Hamburger />
                        </div>
                    </div>
                </div>
                <Drawer open={open} direction='left'>
                    <div ref={drawerRef}>
                        <DrawerContent className='md:h-screen h-full w-2/3 rounded-none'>
                            <div className='h-screen bg-blueDark overflow-y-auto'>
                                <Sidebar />
                            </div>
                        </DrawerContent>
                    </div>
                </Drawer>
            </> : <><div className=" md:hidden  bg-blueDark flex items-end h-[100px]">
                <div className='flex items-center justify-between w-full px-6 p-[30px]'>
                    <h2 className="font-extrabold text-[24px] leading-[28.8px] tracking-[0.03em] text-left mb-0 text-white flex items-end ">
                        UNGRADE
                    </h2>

                </div>
            </div> </>}

        </>
    )
}

export default MobileNavBar