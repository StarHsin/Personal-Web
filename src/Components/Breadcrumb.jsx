import { IoMdHome, FaChevronRight} from "./icon";

export default function Breadcrumb() {
    return(
        <div className="flex">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <div className="inline-flex items-center text-sm font-medium text-white hover:text-blue-600">
                        <IoMdHome className="w-5 h-5" />
                        Home
                    </div>
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