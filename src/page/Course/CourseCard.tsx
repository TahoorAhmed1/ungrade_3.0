import Heading from "@/components/common/Heading";
import { Badge } from "@/components/ui/badge";
import {
  addWishlist,
  getWishlist,
  removeWishlist,
} from "@/module/features/wishlist";
import { useAppDispatch, useAppSelector } from "@/module/store";
import Link from "next/link";
import React, { useState } from "react";

function CourseCard({ name, competencies, id, wishlistId }: any) {

  const [wishlistLoader, setWishListLoader] = useState(false);
  const dispatch = useAppDispatch();

  const wishlist: any = useAppSelector(
    (state) => state?.getWishlistSlice?.wishlist
  );

  const isInWishlist = wishlist?.some((item: any) => {
    return Number(item?.courses?.id) === Number(id);
  });

  const WishlistId = wishlist?.find((item: any) => {
    return Number(item?.courses?.id) === Number(id);
  })?.id;

  const handleRefresh = () => {
    // @ts-ignore
    dispatch(getWishlist());
  };

  const handleWishlist = (course_id: any) => {
    let payload: any = {
      wishlistLoader: setWishListLoader,
      data: {
        course_id,
      },
      callback: handleRefresh,
    };
    dispatch(addWishlist(payload));
  };

  const removeWishlistHandle = (wishlist_id: any) => {
    let payload: any = {
      wishlistLoader: setWishListLoader,
      data: {
        wishlist_id: wishlist_id,
      },
      callback: handleRefresh,
    };
    dispatch(removeWishlist(payload));
  };

  return (
    <div className="bg-white course-card-shadow py-[16px] px-[25px] w-full rounded-lg flex flex-col gap-y-[32px]">
      <div className="flex gap-x-[16px] items-center">
        <button
          disabled={wishlistLoader}
          onClick={() =>
            isInWishlist
              ? removeWishlistHandle(Number(WishlistId))
              : handleWishlist(Number(id))
          }
          className="disabled:cursor-not-allowed"
        >
          {isInWishlist ? (
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="44" height="44" rx="22" fill="red" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.9997 11.9711C28.6567 5.12808 45.3007 17.1026 21.9997 32.5001C-1.30133 17.1041 15.3427 5.12808 21.9997 11.9711Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="44" height="44" rx="22" fill="#CCEBEC" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.9997 11.9711C28.6567 5.12808 45.3007 17.1026 21.9997 32.5001C-1.30133 17.1041 15.3427 5.12808 21.9997 11.9711Z"
                fill="#033239"
              />
            </svg>
          )}
        </button>

        <div>
          <Heading text={name || ""} className="text-[20px]" />
        </div>
      </div>

      {/* <Heading text="Professor Name" className="text-[#0C0E0D]" /> */}
      <div>
        <Heading
          text={competencies?.length + " Top Skills"}
          className="text-[#0C0E0D] mb-[24px]"
        />
        <div className="flex flex-wrap gap-[12px]">
          {competencies?.length
            ? competencies?.slice(0, 7)?.map((a: any, i: string) => {
              return (
                <Badge
                  key={i}
                  variant="outline"
                  className="bg-[#E5F5F5] text-[20px] font-normal px-[12px] py-[1px] "
                >
                  {a?.competencies?.name}
                </Badge>
              );
            })
            : null}
        </div>
      </div>
      <Link
        href={`/dashboard/course/CourseDetail?id=${id}`}
        className="w-full py-2 rounded-lg bg-blueDark disabled:bg-[#EAEBED] text-[20px] font-medium text-white disabled:text-black text-center"
      >
        View Course{" "}
      </Link>
    </div>
  );
}

export default CourseCard;
