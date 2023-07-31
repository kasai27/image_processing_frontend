import React, { useState } from "react";
import axios from "axios";

const Grayscale = () => {
    // 選択された元の画像ファイルと変換後の画像ファイルを管理するための状態
    const [selectedFile, setSelectedFile] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);

    // FastAPIのURL
    const url_gray = "http://127.0.0.1:8000/gray/";

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    
    const handleGray = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            
            try {
              const response = await axios.post(url_gray, formData);
              setProcessedImage(response.data.processed_image);
            } catch (error) {
              console.error(error);
            }
        }   
    };

    return (
        <div>
            {/* 画像ファイルの選択用の入力フィールド */}
            <input type="file" onChange={handleFileChange} />

            {/* 変換ボタン */}
            <button onClick={handleGray}>グレースケール化</button>

            {/* 変換後の画像の表示 */}
            {processedImage && (
              <div>
                <p>Imgae Created!!</p>
                <img src={`data:image/jpeg;base64,${processedImage}`} alt="processed" />
              </div>
            )}
        </div>
    )
}

export default Grayscale