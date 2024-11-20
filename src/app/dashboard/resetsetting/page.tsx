import Heading from "@/components/common/Heading";
import SecurityForm from "@/components/forms/securityForm";

type Props = {};

function page({}: Props) {
  return (
    <div className="lg:p-6 px-4 bg-white min-h-screen ">
      <Heading text="Security" className="text-[32px] font-medium mb-5" />
      <SecurityForm />;
    </div>
  );
}

export default page;
