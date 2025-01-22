import DynamicBackgrounds from './DynamicBackgrounds'
import StickyNavbar from './StickyNavbar' 

export default function HomePage() {
    return(
        <div className='flex items-center justify-center h-screen'>
            <div className="flex flex-col justify-center items-center">
                <div className='text-[10rem] leading-none font-bold bg-gradient-to-b from-blue-700 via-blue-600 to-blue-50 bg-clip-text text-transparent'>你好</div>
                <div className='text-[3.5rem] leading-none font-bold text-white'>我是李慧芯</div>
                <div className='font-bold text-white'>目前還在開發中造成不便請見諒。</div>
            </div>
            <StickyNavbar />
            <DynamicBackgrounds />
        </div>
    );
}