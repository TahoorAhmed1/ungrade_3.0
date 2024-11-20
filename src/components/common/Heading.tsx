import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  text: string;
  className?: string;
};

function Heading({ text, className }: Props) {
  return (
    <h5
      className={cn(
        "font-medium text-2xl  text-black leading-7 text-left",
        className
      )}
    >
      {text}
    </h5>
  );
}

export const SmallHeading = ({ text, className }: Props) => {
  return (
    <h6
      className={cn(
        `font-medium text-xl text-black leading-6 text-left`,
        className
      )}
    >
      {text}
    </h6>
  );
};

export default Heading;
