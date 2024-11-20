import TierAssesment from "@/page/TierAssesment/TierAssesment";
import React from "react";

type Props = {
  params: any;
};

function page(props: Props) {
  return <TierAssesment params={props?.params?.id} course={true} />;
}

export default page;
