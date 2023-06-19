import Image from "next/image"
import holder from "../../assets/img/holder.png"
import Toman from "./toman"
import { FaImage, FaNewspaper, FaStar, FaSwimmer, FaWifi } from "react-icons/fa"
import { IoMdOptions } from 'react-icons/io'
import { BsCheck2All } from 'react-icons/bs'

import Link from "next/link"
import { useEffect, useState } from "react"
import { IoFastFood } from "react-icons/io5"
import { GiCooler } from "react-icons/gi"

const IndexPost = (props: any) => {
    const [actionActive, setActionActive] = useState(false)
    const [moreInfoShow, setMoreInfoShow] = useState(false)
    const [picsShow, setPicsShow] = useState(false)
    const [optionsShow, setOptionsShow] = useState(false)

    const [id, setID] = useState(parseInt(props.id) || 0)

    useEffect ( ()=>{
        // alert(id)
    }) 

    const hideActionWindow = () => {
        setActionActive(false)
        setMoreInfoShow(false)
        setPicsShow(false)
        setOptionsShow(false)
    }
    const getMoreInfo = (id: number) => {
        setActionActive(true)
        setMoreInfoShow(true)
    }
    const getPics = (id: number) => {
        setActionActive(true)
        setPicsShow(true)
    }
    const reserveHotel = (id: number) => {
        alert("به زودی....")
    }
    const getOptions = (id: number) => {
        setActionActive(true)
        setOptionsShow(true)
    }
    return (
        <div className="rounded-xl  shadow-xl flex flex-col m-4 relative">
            <div className="relative">
                <img alt="نام مکان" src ={(props.imgURL==null)?holder:props.imgURL} width={420} height={240} />
                <div className="absolute w-full h-full top-0 right-0 p-3 flex flex-col justify-start">
                    <div className="flex bg-black bg-opacity-30 p-2 rounded-xl justify-between items-center">
                        <strong className="font-bold text-white" style={{ filter: "drop-shadow(0 0 5px rgba(0,0,0,0.6))" }}>
                            {props.location || 'ناشناخته'}
                        </strong>
                        <div className="flex">
                            <FaStar className="text-yellow-400 mx-[3]" />
                            <FaStar className="text-yellow-400 mx-[3]" />
                            <FaStar className="text-yellow-400 mx-[3]" />
                            <FaStar className="text-yellow-400 mx-[3]" />
                        </div>
                    </div>
                </div>
            </div>
            <legend className="font-bold mt-1 text-xl p-2 text-gray-600"> {props.hotelName || 'بدون نام'} </legend>
            <div className="flex items-center">
                <span className="font-bold mt-1 text-xl p-2 text-rose-600">{parseInt(props.price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                <Toman />
            </div>
            <div className="flex justify-stretch rounded-xl overflow-hidden">
                <button onClick={() => { getMoreInfo(3) }} className="border border-solid border-white text-sm flex items-center justify-center py-2 text-center w-full bg-gray-500 hover:bg-blue-500 text-white">
                    <FaNewspaper className="mx-2" />
                    <span> اطلاعات بیشتر </span>
                </button>
                <button onClick={() => { getPics(3) }} className="border border-solid border-white text-sm flex items-center justify-center py-2 text-center w-3/4 bg-gray-500 hover:bg-green-500 text-white">
                    <FaImage className="mx-2" />
                    <span> تصاویر </span>
                </button>
                <button onClick={() => { getOptions(3) }} className="border border-solid border-white text-sm flex items-center justify-center py-2 text-center w-3/4 bg-gray-500 hover:bg-amber-500 text-white">
                    <IoMdOptions className="mx-2" />
                    <span> امکانات </span>
                </button>
                <button onClick={() => { reserveHotel(3) }} className="border border-solid border-white text-sm flex items-center justify-center py-2 text-center w-3/4 bg-gray-500 hover:bg-rose-500 text-white">
                    <BsCheck2All className="mx-2" />
                    <span> رزرو </span>
                </button>
            </div>
            <div onClick={hideActionWindow} className={((actionActive) ? "opacity-100 visible" : "opacity-0 invisible") + " fixed w-full h-full top-0 right-0 bg-black bg-opacity-70 z-[9999]"}></div>
            <div className={(moreInfoShow ? "flex" : "hidden") + " text-justify leading-loose flex-col absolute z-[9999] top-full p-4 bg-white rounded-2xl mt-3 w-full"}>
                {props.description || "بدون توضیحات"}
            </div>
            <div className={(optionsShow ? "flex" : "hidden") + " flex-col absolute z-[9999] top-full p-4 bg-white rounded-2xl mt-3 w-full"}>
                <table>
                    <tbody>
                        <tr className="border-b border-solid border-slate-300">
                            <td className="flex items-center p-3">
                                <FaWifi className="mx-2" />
                                <p>وای‌فای رایگان</p>
                            </td>
                            <td>
                                <p>{(props.hasWifi?"دارد":"ندارد")}</p>
                            </td>
                        </tr>
                        <tr className="border-b border-solid border-slate-300">
                            <td className="flex items-center p-3">
                                <FaSwimmer className="mx-2" />
                                <p>استخر</p>
                            </td>
                            <td>
                                <p>{(props.hasSwim?"دارد":"ندارد")}</p>
                            </td>
                        </tr>
                        <tr className="border-b border-solid border-slate-300">
                            <td className="flex items-center p-3">
                                <IoFastFood className="mx-2" />
                                <p>رستوران</p>
                            </td>
                            <td>
                                <p>{(props.hasFood?"دارد":"ندارد")}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="flex items-center p-3">
                                <GiCooler className="mx-2" />
                                <p>تهویه مطبوع</p>
                            </td>
                            <td>
                                <p>{(props.hasAC?"دارد":"ندارد")}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div onClick={() => { setActionActive(false); setPicsShow(false) }} className={(picsShow ? "flex" : "hidden") + " flex-col fixed z-[9999] top-0 right-0 w-full h-full items-center justify-center"}>
                <img alt="تصویر" src={props.imgURL } />
            </div>
        </div>
    )
}
export default IndexPost