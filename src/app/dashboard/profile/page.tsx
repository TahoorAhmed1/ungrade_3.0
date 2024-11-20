import Heading from "@/components/common/Heading";
import ProfileForm from "@/components/forms/profileForm";

type Props = {};

function page({}: Props) {
  return (
    <div className="lg:p-8 p-4 bg-white min-h-screen">
      <Heading text="Profile" className="text-[32px] font-medium mb-5" />
      <ProfileForm />
    </div>
  );
}

export default page;
