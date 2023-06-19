'use client'
import axios from "axios"
import { useState } from "react"
const Register = () => {
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [first, setFirst] = useState("")
    const [last, setLast] = useState("")
    const [email, setEmail] = useState("")
    const [messageClasses, setMessageClasses] = useState(" bg-blue-100 border-blue-800 text-blue-800 ")
    const [message, setMessage] = useState("متن پیام")
    const [messageShow, setMessageShow] = useState(false)

    const registerProccess = () => {
        axios.get("http://localhost:7500/register.php", { params: { username: user, password: pass, firstName: first, lastName: last, email: email } })
            .then(res => {
                console.log(res.data)
                if (res.data.message) {
                    setMessage(res.data.message)
                    setMessageClasses(" bg-red-100 border-red-800 text-red-800 ")
                } else if(res.data===true){
                    setMessage("ثبت نام با موفقیت انجام شد! هم‌اکنون می‌توانید وارد شوید")
                    setMessageClasses(" bg-green-100 border-green-800 text-green-800 ")
                }
            }).finally(() => {
                setMessageShow(true)
            })
    }
    return (

        <div className="flex flex-col items-center justify-center">
            {messageShow &&
                <div className={"p-4 m-4 bg-blue-100 rounded-lg border border-solid" + messageClasses}>
                    {message}
                </div>
            }
            <div className="flex w-full my-2 justify-between items-center">
                <label htmlFor="firstName">نام</label>
                <input value={first} onChange={e => { setFirst(e.target.value) }} className="outline-none focus:border-2 focus:border-slate-400 mx-3 p-2 rounded-lg border border-solid border-slate-300 hover:border-slate-400 placeholder:text-gray-300" type="text" placeholder="برای مثال: علی" />
            </div>
            <div className="flex w-full my-2 justify-between items-center">
                <label htmlFor="firstName">نام خانوادگی</label>
                <input value={last} onChange={e => { setLast(e.target.value) }} className="outline-none focus:border-2 focus:border-slate-400 mx-3 p-2 rounded-lg border border-solid border-slate-300 hover:border-slate-400 placeholder:text-gray-300" type="text" placeholder="برای مثال: امیری" />
            </div>
            <div className="flex w-full my-2 justify-between items-center">
                <label htmlFor="firstName">ایمیل</label>
                <input value={email} onChange={e => { setEmail(e.target.value) }} className="outline-none focus:border-2 focus:border-slate-400 mx-3 p-2 rounded-lg border border-solid border-slate-300 hover:border-slate-400 placeholder:text-gray-300" type="text" placeholder="info@example.com" />
            </div>
            <div className="flex w-full my-2 justify-between items-center">
                <label htmlFor="firstName">نام کاربری</label>
                <input value={user} onChange={e => { setUser(e.target.value) }} className="outline-none focus:border-2 focus:border-slate-400 mx-3 p-2 rounded-lg border border-solid border-slate-300 hover:border-slate-400 placeholder:text-gray-300" type="text" placeholder="هر چیزی به جز علائم خاص!" />
            </div>
            <div className="flex w-full my-2 justify-between items-center">
                <label htmlFor="firstName">رمزعبور</label>
                <input value={pass} onChange={e => { setPass(e.target.value) }} className="outline-none focus:border-2 focus:border-slate-400 mx-3 p-2 rounded-lg border border-solid border-slate-300 hover:border-slate-400 placeholder:text-gray-300" type="text" placeholder="هرچی پیچیده‌تر، بهتر" />
            </div>

            <button onClick={() => { registerProccess() }} className="px-20 py-4 my-4 text-white rounded-lg bg-sky-600 hover:bg-sky-500 active:bg-blue-600">ثبت نام</button>
        </div>
    )
}

export default Register