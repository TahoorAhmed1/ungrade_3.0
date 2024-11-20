import Details from "@/page/Occupations/Details";
import React from "react";

type Props = {};

function page(props: any) {
  return (
    <div>
      <Details id={props.params?.id}/>
    </div>
  );
}

export default page;
