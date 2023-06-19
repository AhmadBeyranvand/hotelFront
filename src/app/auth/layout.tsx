import Image from "next/image"
import beach from "../../../assets/img/beach-house.jpg"
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="m-3">
      <div className="w-full h-[750px] bg-slate-300 rounded-2xl flex overflow-hidden justify-between">
        <div className="p-10 h-full flex flex-col w-full justify-center items-center">
          {children}
        </div>
        <Image alt="خانه ساحلی" src={beach} />
      </div>
    </div>
  )
}
