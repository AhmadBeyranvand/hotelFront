import Link from "next/link"
import Image from "next/image"
import logo from "../components/logo.svg"
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai"
import style from "./header.module.scss"

const Footer: React.FC = () => {
	return (
		<>
			<footer className="flex justify-center text-white bg-gray-800 rounded-xl shadow-2xl py-3">
				ساخته شده با
				❤️	
				و
				💻
				توسط 
				<Link href="https://t.me/Absardeh">احمد بیرانوند</Link>
				 <div className="mx-2">- </div>
				 ۱۴۰۲ هـ.ش
			</footer>
		</>
	)
}

export default Footer