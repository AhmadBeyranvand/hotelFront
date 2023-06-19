"use client"
import Link from "next/link"
import Image from "next/image"
import logo from "../components/logo.svg"
import { AiOutlineUser, AiOutlineLogout, AiOutlineUserAdd } from "react-icons/ai"
import style from "./header.module.scss"
import { useEffect, useState } from "react"

const Header: React.FC = () => {
	const [userName, setName] = useState("کاربر مهمان")
	const [authState, setAuthState] = useState(false)

	const logoutProccess = ()=>{
		localStorage.clear()
		window.location.replace("http://localhost:3000")
		setTimeout(()=>{
		}, 500)
	}

	useEffect(() => {
		setAuthState(localStorage.getItem("authStatus") || false)
		if (authState) {
			setName(localStorage.getItem("fullName")?.toString() || "نام کاربر")
		}
	})
	return (
		<>
			<header className="flex justify-around sticky top-0 z-[9999] bg-white bg-opacity-70 backdrop-blur-sm rounded-b-xl shadow-2xl py-3">
				<Link href="/">
					<Image alt="لوگو بیران هتل" src={logo} width={250} />
				</Link>
				<div className="flex justify-between items-center">
					<nav className={style.menu}>
						<ul >
							<li> <Link href="/">خانه</Link> </li>
							<li> <Link href="/#reserve">رزرواسیون</Link> </li>
							<li> <Link href="/#places">اماکن</Link> </li>
							<li> <Link href="/#hotels">هتل‌ها</Link> </li>
						</ul>
					</nav>
					{
						(!authState) ?
							<div className={style.buttonHolder}>
								<Link className={style.button} href="/auth/login">
									<AiOutlineUser />
									ورود
								</Link>
								<Link className={style.button} href="/auth/register">
									<AiOutlineUserAdd />
									ثبت نام
								</Link>
							</div>
							:
							<div className={style.buttonHolder}>
								<p className="mx-2">{userName}، خوش آمدید</p>
								<button onClick={()=>{logoutProccess()}} className={style.button + " " + style.logout} href="/logout">
									<AiOutlineLogout />
									خروج
								</button>
							</div>
					}
				</div>
			</header>
		</>
	)
}

export default Header