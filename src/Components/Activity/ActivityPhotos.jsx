import PhotoShow from "./PhototShow";
import StickyNavbar from "../StickyNavbar";

export default function ActivityPhotos() {

    return(
        <nav className="absolute w-full h-full pt-20 bg-slate-800">
            <StickyNavbar />
            <div
                className="flex flex-col justify-center items-center border-4 border-transparent rounded-lg bg-transparent">
                <div className='text-[2rem] leading-none font-bold text-white'>202502 東京滑雪行</div>
                <PhotoShow />
            </div>
        </nav>
    );
}