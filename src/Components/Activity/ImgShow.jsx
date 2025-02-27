import React, { useEffect, useState } from "react";

const FOLDER_ID = "1f9VHxWiUkwOgdHOEhUG5MkfzR44bdrLI";
const API_KEY = "AIzaSyAEHtvd1FDsgA8yfZXSL-PxOAb-U-mEmWs"; 

export default function ImgShow() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch(`https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name)`)
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data);
                
                if (data.files) {
                    const imageUrls = data.files.map(file => `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`);
                    console.log("Image URLs:", imageUrls);
                    setImages(imageUrls);
                }
            })
            .catch(error => console.error("Error fetching images:", error));
    }, []);
    
    
    
    return (
        <div className="max-w-5xl mx-auto p-4">
            <div className="grid grid-cols-4 gap-4" style={{ gridAutoFlow: "dense" }}>
                {images.slice(0, 4).map((src, index) => (
                    <div key={index}>
                        <img className="w-full h-auto rounded-lg" src={src} alt={`Image ${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
    
}



