import { MdHome, FaChevronRight} from "./icon";
import { useNavigate } from "react-router-dom";

export default function Breadcrumb() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/")
    }

    return(
        <div className="flex">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <button
                        onClick={handleGoHome} 
                        className="inline-flex items-center text-sm font-medium text-white hover:text-blue-600">
                        <MdHome className="w-5 h-5" />
                        首頁
                    </button>
                </li>
                <li>
                    <div className="flex items-center">
                        <FaChevronRight className="w-4 h-4 text-gray-500" />
                        <div className="ms-1 text-sm font-medium text-white hover:text-blue-600 md:ms-2">
                            Projects
                        </div>
                    </div>
                </li>
                <li>
                    <div className="flex items-center">
                        <FaChevronRight className="w-4 h-4 text-gray-500" />
                        <div className="ms-1 text-sm font-medium text-white md:ms-2">
                            Flowbite
                        </div>
                    </div>
                </li>
            </ol>
        </div>
    );
}