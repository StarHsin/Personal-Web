import React, { useEffect, useState } from "react";

const PARENT_FOLDER_ID = "1w7n0Res9ySmi3G-Nlk-npUY0h8RodArQ";
const API_KEY = "AIzaSyAEHtvd1FDsgA8yfZXSL-PxOAb-U-mEmWs"; 


export default function ActivityScraping() {
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        // 取得所有子資料夾
        fetch(`https://www.googleapis.com/drive/v3/files?q='${PARENT_FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}&fields=files(id,name)`)
            .then(response => response.json())
            .then(data => {
                if (data.files) {
                    // 取得每個子資料夾的圖片
                    const folderPromises = data.files.map(folder =>
                        fetch(`https://www.googleapis.com/drive/v3/files?q='${folder.id}'+in+parents+and+(mimeType='image/jpeg'+or+mimeType='image/png')&key=${API_KEY}&fields=files(id,name)&pageSize=4`)
                            .then(response => response.json())
                            .then(imgData => ({
                                name: folder.name,
                                images: imgData.files.map(file => `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`)
                            }))
                    );

                    // 等待所有請求完成後更新 state
                    Promise.all(folderPromises).then(results => setFolders(results));
                }
            })
            .catch(error => console.error("Error fetching folders:", error));
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-4">
            {folders.map((folder, index) => (
                <div key={index} className="mb-6">
                    <div className="text-[2rem] font-bold text-white mb-2">{folder.name}</div>
                    <div className="grid grid-cols-4 gap-4">
                        {folder.images.map((src, idx) => (
                            <img key={idx} className="w-full h-auto rounded-lg mb-4" src={src} alt="" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}