import React, { useEffect, useState } from "react";

const FOLDER_ID = "1f9VHxWiUkwOgdHOEhUG5MkfzR44bdrLI";
const API_KEY = "AIzaSyAEHtvd1FDsgA8yfZXSL-PxOAb-U-mEmWs"; 



export default function PhotoShow() {
    const [groupedImages, setGroupedImages] = useState({});
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [flatImages, setFlatImages] = useState([]); // 存放所有圖片的陣列

    useEffect(() => {
        fetch(`https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name)`)
            .then(response => response.json())
            .then(data => {
                if (data.files) {
                    const imageUrls = data.files.map(file => ({
                        url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
                        id: file.id
                    }));

                    // 取得圖片尺寸後分類
                    const imageGroups = {};
                    let loadedCount = 0;
                    const allImages = [];

                    imageUrls.forEach(image => {
                        const img = new Image();
                        img.src = image.url;
                        img.onload = () => {
                            const sizeKey = `${img.naturalWidth}x${img.naturalHeight}`;
                            if (!imageGroups[sizeKey]) {
                                imageGroups[sizeKey] = [];
                            }
                            imageGroups[sizeKey].push(image.url);
                            allImages.push(image.url);

                            loadedCount++;
                            if (loadedCount === imageUrls.length) {
                                setGroupedImages(imageGroups);
                                setFlatImages(allImages);
                            }
                        };
                    });
                }
            })
            .catch(error => console.error("Error fetching images:", error));
    }, []);

    // 打開 Lightbox 並設定當前圖片索引
    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    // 關閉 Lightbox
    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    // 切換到上一張圖片
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? flatImages.length - 1 : prevIndex - 1));
    };

    // 切換到下一張圖片
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === flatImages.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="max-w-5xl mx-auto p-4">
            {/* 📸 圖片分組顯示 */}
            {Object.keys(groupedImages).map((sizeKey, idx) => (
                <div key={idx} className="mb-6">
                    <div className="grid grid-cols-5 gap-4">
                        {groupedImages[sizeKey].map((src, index) => (
                            <img
                                key={index}
                                className="w-full h-auto rounded-lg cursor-pointer"
                                src={src}
                                alt=""
                                onClick={() => openLightbox(flatImages.indexOf(src))} // 取得該圖片在 flatImages 中的索引
                            />
                        ))}
                    </div>
                </div>
            ))}

            {/* 🔍 Lightbox 放大顯示 */}
            {lightboxOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    {/* 關閉按鈕 */}
                    <button
                        className="absolute top-5 right-5 text-white text-3xl font-bold"
                        onClick={closeLightbox}
                    >
                        ✕
                    </button>

                    {/* 左箭頭 */}
                    <button
                        className="absolute left-5 text-white text-5xl"
                        onClick={prevImage}
                    >
                        ❮
                    </button>

                    {/* 圖片 */}
                    <img
                        src={flatImages[currentImageIndex]}
                        alt=""
                        className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
                    />

                    {/* 右箭頭 */}
                    <button
                        className="absolute right-5 text-white text-5xl"
                        onClick={nextImage}
                    >
                        ❯
                    </button>
                </div>
            )}
        </div>
    );
}