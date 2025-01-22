import { FaUser } from "react-icons/fa6";
import { AiOutlineMenu } from "react-icons/ai";
import SideBar from './SideBar'
import Breadcrumb from "./Breadcrumb";

export default function ActivityPage() {
    return(
        <nav className="absolute w-full h-full -z-10 bg-gray-200">
            <div className="bg-transparent fixed w-full z-20 top-0 start-0 border-b-2 border-gray-500">
                <div className="flex items-center justify-between p-4">
                    <button
                        className="flex items-center justify-center text-white bg-transparent hover:bg-gray-500 rounded-lg w-10 h-10 border-2 border-gray-500 "
                    >
                        <AiOutlineMenu className="w-8 h-8"/>
                    </button>
                    <Breadcrumb />
                    <button className="w-10 h-10 flex items-center justify-center overflow-hidden bg-white rounded-full">
                        <FaUser className="w-10 h-10 text-gray-500 relative top-1" />
                    </button>
                </div>
            </div>
            
        </nav>
    
        
    );
}

