import React from "react";

type Props = {
  name: string;
};

function WelcomeText({ name }: Props) {
  return (
    <div className="WelcomeText md:text-4xl text-[28px] font-semibold  md:leading-9 leading-[33.6px]">{name}</div>
  );
}

export default WelcomeText;
