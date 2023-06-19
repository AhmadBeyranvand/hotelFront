'use client';
import Image from 'next/image'
import beach from "../../assets/img/beach-house.jpg"
import style from "./page.module.scss"
import { FaWifi, FaSwimmer, FaMosque, FaSkiing } from "react-icons/fa"
import { GiCooler, GiPalmTree } from "react-icons/gi"
import { IoFastFoodSharp } from "react-icons/io5"
import { GiCastle } from "react-icons/gi"
import { useEffect, useState } from 'react'
import IndexPost from '@/components/post';
import mashhad from "../../assets/img/locations/mashhad.jpg"
import lorestan from "../../assets/img/locations/lorestan.jpg"
import shiraz from "../../assets/img/locations/shiraz.jpg"
import kerman from "../../assets/img/locations/kerman.jpg"
import esfahan from "../../assets/img/locations/esfahan.jpg"
import Link from 'next/link';
import axios from 'axios';
import loading from "../../assets/img/loading.gif"

interface Hotel {
  id: number,
  name: string,
  description: string,
  price: number,
  hasAC: boolean,
  hasFood: boolean,
  hasSwim: boolean,
  hasWifi: boolean,
  locationID?: number,
  location: string
}

export default function Home() {
  const newTestHotel: Hotel = { id: 0, name: "", description: "", price: 0, hasAC: false, hasFood: false, hasSwim: false, hasWifi: false, location: "نامعلوم" }
  const [hasWifi, setHasWifi] = useState(false)
  const [hasAC, setHasAC] = useState(false)
  const [hasFood, setHasFood] = useState(false)
  const [hasSwim, setHasSwim] = useState(false)
  const [typeOfHotel, setTypeOfHotel] = useState('')
  const [result, setResult] = useState([newTestHotel])
  const [hotelsTitle, setHotelsTitle] = useState("لیست تمام هتل ها")
  const [budget, setBudget] = useState(0)
  const [searching, setSearching] = useState(true)

  const searchByBudget = (price)=>{
    setResult([])
    axios.get("http://localhost:7500/api/getHotelsBelowPrice.php?price="+price)
      .then(res=>{
        res.data.map(item=>{
          setResult(current=>[...current, {id:item.id, name:item.hotel_name, description:item.description, price: parseInt(item.price_per_night), hasAC:item.hasAC, hasFood:item.hasFood, hasSwim: item.hasSwim, hasWifi: item.hasWifi, location: item.location_name }])
        })
      })
      .finally(()=>{
        setSearching(false)
      })
  }

  const budgetEventHandler = (ev) =>{
    if (ev.target.value){
      searchByBudget(ev.target.value)
      setBudget(ev.target.value)
    } else {
      searchAllHotels()
    }
  }

  const searchAllHotels = ()=>{
    setResult([])
    axios.get("http://localhost:7500/api/getAllHotels.php")
      .then(res=>{
        res.data.map(item=>{
          setResult(current=>[...current, {id:item.id, name:item.hotel_name, description:item.description, price: parseInt(item.price_per_night), hasAC:item.hasAC, hasFood:item.hasFood, hasSwim: item.hasSwim, hasWifi: item.hasWifi, location: item.location_name }])
        })
      })
      .finally(()=>{
        setSearching(false)
      })
  }
  
  useEffect(() => {
    searchAllHotels()    
  }, [])

  return (
    <>
      {/* IMAGE HERO */}
      <div className="w-full my-8 rounded-2xl overflow-hidden relative shadow-xl z-0 flex justify-end">
        <Image src={beach} alt='تصویر اصلی سایت' />
        <div className={"absolute w-full h-full text-right p-20 top-0 right-0 flex flex-col justify-center " + style.onPictureObj}>
          <h1 className="text-6xl font-black leading-loose">
            تجربه‌ی اقامتی خوش با
            <br />
            بیران هتل
          </h1>
          <div className="my-5 text-white text-xl font-bold w-1/4">
            <legend>
              آیا می‌دانید بیش از ۹۶٪ مشتریان ما به صورت کامل از خدمات ارائه شده راضی هستند؟
            </legend>
            <legend className='mt-2'>
              مشتریان ما بزرگ‌ترین سرمایه‌های ما هستند 🥰
            </legend>
          </div>
        </div>
      </div>

      {/* Reservation */}
      <div id='reserve' className="w-3/4 justify-between bg-white shadow-2xl z-20 p-8 -mt-16 relative m-auto rounded-xl flex lg:flex-row flex-col">
        <div className="flex flex-col w-full px-3">
          <legend className="font-bold text-xl mx-auto">امکانات</legend>
          <div className="flex justify-around my-3">
            <div onClick={() => { setHasWifi(!hasWifi) }} className={style.optionBox + ((!hasWifi) ? " border-pink-700 text-pink-700" : " bg-pink-700 text-white")}>
              <FaWifi onClick={() => { setHasWifi(!hasWifi) }} />
              <span onClick={() => { setHasWifi(!hasWifi) }}>وای فای</span>
            </div>
            <div onClick={() => { setHasAC(!hasAC) }} className={style.optionBox + ((!hasAC) ? " border-emerald-600 text-emerald-600" : " bg-emerald-600 text-white")}>
              <GiCooler onClick={() => { setHasAC(!hasAC) }} />
              <span onClick={() => { setHasAC(!hasAC) }}>تهویه</span>
            </div>
            <div onClick={() => { setHasSwim(!hasSwim) }} className={style.optionBox + ((!hasSwim) ? " border-orange-500 text-orange-500" : " bg-orange-500 text-white")}>
              <FaSwimmer onClick={() => { setHasSwim(!hasSwim) }} />
              <span onClick={() => { setHasSwim(!hasSwim) }}>استخر</span>
            </div>
            <div onClick={() => { setHasFood(!hasFood) }} className={style.optionBox + ((!hasFood) ? " border-sky-500 text-sky-500" : " bg-sky-500 text-white")}>
              <IoFastFoodSharp onClick={() => { setHasFood(!hasFood) }} />
              <span onClick={() => { setHasFood(!hasFood) }}>غذا</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full px-3 justify-center">
          <legend className="font-bold text-xl mx-auto">بودجه</legend>
          <div className="flex justify-between w-10/12 mx-auto bg-white rounded-xl shadow-md items-center overflow-hidden border border-solid border-gray-300 my-3">
            <input type='number' className='p-3 w-full' value={budget} onChange={e=>{ budgetEventHandler(e) }} />
            <span className='bg-gray-100 p-3'>تومان</span>
          </div>
        </div>
        <div className="flex flex-col w-full px-3">
          <legend className="font-bold text-xl mx-auto">اماکن</legend>
          <div className="flex justify-around my-3">
            <button className={(typeOfHotel == "religious") ? style.locationButtonActive : style.locationButton} onClick={() => { setTypeOfHotel("religious") }}>
              <FaMosque onClick={() => { setTypeOfHotel("religious") }} />
              زیارتی
            </button>
            <button className={(typeOfHotel == "entertainment") ? style.locationButtonActive : style.locationButton} onClick={() => { setTypeOfHotel("entertainment") }}>
              <FaSkiing onClick={() => { setTypeOfHotel("entertainment") }} />
              تفریحی
            </button>
            <button className={(typeOfHotel == "historical") ? style.locationButtonActive : style.locationButton} onClick={() => { setTypeOfHotel("historical") }}>
              <GiCastle onClick={() => { setTypeOfHotel("historical") }} />
              تاریخی
            </button>
            <button className={(typeOfHotel == "natural") ? style.locationButtonActive : style.locationButton} onClick={() => { setTypeOfHotel("natural") }}>
              <GiPalmTree onClick={() => { setTypeOfHotel("natural") }} />
              طبیعی
            </button>
          </div>
        </div>
      </div>

      {/* Search Result */}
      <h3 className='text-3xl text-emerald-800 font-semibold my-20 mx-auto text-center'>{hotelsTitle}</h3>
      <div id='hotels' className='my-10 flex flex-wrap justify-around'>
        { !searching ?
          result.length>1 ?
          result.map(item=>(
            <IndexPost
              key={"post"+item.id}
              id={item.id}
              hotelName={item.name}
              description={item.description}
              location={item.location}
              imgURL={"http://localhost:7500/imagesOfHotels/"+item.id.toString()+".jpg"}
              hasAC={item.hasAC} hasSwim={item.hasSwim} hasFood={item.hasFood} hasWifi={item.hasWifi}
              price={item.price} />
          ))
          :
          <p>هیچ آیتمی متناسب با درخواست شما وجود ندارد</p>
         :
         <Image src={loading} style={{filter:"contrast(1.2)"}} width={128} alt='در حال بارگذاری' />
        }
      </div>

      <hr className='my-10' />

      <div id='places' className='mt-10 mb-5 flex flex-col justify-center items-center w-full'>
        <h2 className='font-bold text-4xl my-4'> تفکیک بر اساس مکان </h2>
        <div className='flex flex-col'>
          <Link href="#" className='p-2 relative'>
            <Image className='hover:opacity-70 rounded-xl' src={mashhad} alt='مشهد' />
            <div className="absolute w-full h-full top-0 right-0 p-2">
              <div className="bg-black rounded-xl bg-opacity-60 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <h4 className='text-2xl font-bold text-white'> مشهد مقدس </h4>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex justify-between">
          <Link href="#" className='p-2 relative'>
            <Image alt='' src={shiraz} className=' hover:opacity-70 rounded-xl' />
            <div className="absolute w-full h-full top-0 right-0 p-2">
              <div className="bg-black rounded-xl bg-opacity-60 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <h4 className='text-2xl font-bold text-white'> شیراز </h4>
              </div>
            </div>
          </Link>
          <Link href="#" className='p-2 relative'>
            <Image alt='' src={kerman} className=' hover:opacity-70 rounded-xl' />
            <div className="absolute w-full h-full top-0 right-0 p-2">
              <div className="bg-black rounded-xl bg-opacity-60 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <h4 className='text-2xl font-bold text-white'> کرمان </h4>
              </div>
            </div>
          </Link>
          <Link href="#" className='p-2 relative'>
            <Image alt='' src={esfahan} className=' hover:opacity-70 rounded-xl' />
            <div className="absolute w-full h-full top-0 right-0 p-2">
              <div className="bg-black rounded-xl bg-opacity-60 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <h4 className='text-2xl font-bold text-white'> اصفهان </h4>
              </div>
            </div>
          </Link>
          <Link href="#" className='p-2 relative'>
            <Image alt='' src={lorestan} className=' hover:opacity-70 rounded-xl' />
            <div className="absolute w-full h-full top-0 right-0 p-2">
              <div className="bg-black rounded-xl bg-opacity-60 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <h4 className='text-2xl font-bold text-white'> لرستان </h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
