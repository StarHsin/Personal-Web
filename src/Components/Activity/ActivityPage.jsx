import ImgShow from "./ImgShow";
import { useNavigate } from "react-router-dom";
import StickyNavbar from "../StickyNavbar";

export default function ActivityPage() {
    const navigate = useNavigate();

    const handlePhotos = () => {
        navigate("/Photos")
      }

    return(
        <nav className="absolute w-full h-full pt-20 bg-slate-800">
            <StickyNavbar />
            <button
                onClick={handlePhotos} 
                className="w-full max-w-3xl mx-auto p-4 flex flex-col justify-center items-center border-4 border-transparent rounded-lg bg-transparent">
                <div className='text-[2rem] leading-none font-bold text-white'>202502 東京滑雪行</div>
                <ImgShow />
            </button>
        </nav>
    );
}

