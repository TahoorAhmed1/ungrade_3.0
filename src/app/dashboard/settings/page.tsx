import Heading from "@/components/common/Heading";
import SettingForm from "@/components/forms/settingForm";

type Props = {};

function page({}: Props) {
  return (
    <div className="lg:p-6 px-4 bg-white min-h-screen ">
      <Heading text="Setting" className="text-[32px] font-medium mb-5" />
      <SettingForm />;
    </div>
  );
}

export default page;
