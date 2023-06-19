'use client'
import axios from "axios"
import InlineInput from "../../../components/input"
import { useState } from "react"
const Login = () => {
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [messageClasses, setMessageClasses] = useState(" bg-blue-100 border-blue-800 text-blue-800 ")
    const [message, setMessage] = useState("متن پیام")
    const [messageShow, setMessageShow] = useState(false)

    const loginProccess = () => {
        axios.get("http://localhost:7500/login.php", { params: { username: user, password: pass } })
            .then(res => {
                console.log(res.data)
                if (res.data) {
                    localStorage.setItem("authStatus", true)
                    localStorage.setItem("fullName", res.data.firstName + " " + res.data.lastName)
                    setMessage("خوش‌‌ آمدید")
                    setMessageClasses(" bg-green-100 border-green-800 text-green-800 ")
                    setMessageShow(true)
                    setTimeout(()=>{
                        window.location.replace("http://localhost:3000")
                    }, 1000)
                } else {
                    setMessage("نام کاربری یا رمز عبور اشتباه است")
                    setMessageClasses(" bg-red-100 border-red-800 text-red-800 ")
                    setMessageShow(true)
                }
            })
    }
    return (
        <div className="flex flex-col items-center justify-center" onKeyDown={e=>{if(e.key=="Enter"){loginProccess()}}}>
            {messageShow &&
                <div className={"p-4 m-4 bg-blue-100 rounded-lg border border-solid" + messageClasses}>
                    {message}
                </div>
            }
            <div className="flex w-full my-2 justify-between items-center">
                <label htmlFor="firstName">نام کاربری</label>
                <input value={user} onChange={e => { setUser(e.target.value) }} className="outline-none focus:border-2 focus:border-slate-400 mx-3 p-2 rounded-lg border border-solid border-slate-300 hover:border-slate-400 placeholder:text-gray-300" type="text" />
            </div>
            <div className="flex w-full my-2 justify-between items-center">
                <label htmlFor="firstName">رمزعبور</label>
                <input value={pass} onChange={e => { setPass(e.target.value) }} className="outline-none focus:border-2 focus:border-slate-400 mx-3 p-2 rounded-lg border border-solid border-slate-300 hover:border-slate-400 placeholder:text-gray-300" type="text" />
            </div>

            <button onClick={() => { loginProccess() }} className="px-20 py-4 my-4 text-white rounded-lg bg-sky-600 hover:bg-sky-500 active:bg-blue-600">ورود</button>
        </div>
    )
}
export default Login