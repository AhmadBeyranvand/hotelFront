import Image from "next/image"
import pic from "../../assets/img/toman.png"

export default function Toman () {
    return (
        <Image alt="مبالغ به تومان است" className="mx-1" src={pic} width={24} height={24}/>
    )
}