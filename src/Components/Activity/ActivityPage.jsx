import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import ImgShow from "./ImgShow";
import ActivityScraping from "./ActivityScraping";
import StickyNavbar from "../StickyNavbar";

export default function ActivityPage() {
    const navigate = useNavigate();
    const [folderName, setFolderName] = useState("加載中...");

    const handlePhotos = () => {
        navigate("/Photos");
    };

    return (
        <nav className="absolute w-full pt-20 bg-slate-800">
            <StickyNavbar />
            <button
                onClick={handlePhotos} 
                className="w-full max-w-3xl mx-auto p-4 flex flex-col justify-center items-center border-4 border-transparent rounded-lg bg-transparent">
                <ActivityScraping />
            </button>
        </nav>
    );
}
