import React from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button'
import { useHandleImage } from "./hooks/useHandleImage";

const Edge = () => {
    // useHandleImage.jsから取得
    const { selectedFile, processedImage, setProcessedImage, handleFileChange } = useHandleImage()
    
    // FastAPIのURL
    const url_edgeProcessing = "http://127.0.0.1:8000/edge/";
    
    const edgeProcessing = async (filter) => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('filter_type', filter);
            
            try {
              const response = await axios.post(url_edgeProcessing, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'arraybuffer',
              });
              
              const blob = new Blob([response.data], { type: 'image/jpeg' });
              const imageUrl = URL.createObjectURL(blob);
              setProcessedImage(imageUrl);              
            } catch (error) {
              console.error('Error uploading image: ', error);
            };
        };
    };

    const handleSave = () => {
        const link = document.createElement('a');
        link.href = processedImage;
        link.download = 'processed_image.jpg';
        link.click();
    };

    return (
        <div className="container">
            {/* 画像ファイルの選択用の入力フィールド */}
            <input type="file" onChange={handleFileChange} />

            {/* 変換ボタン */}
            <Button onClick={() => edgeProcessing("Sobel")}>Sobel</Button>{' '}
            <Button onClick={() => edgeProcessing("Laplacian")}>Laplacian</Button>{' '}
            <Button onClick={() => edgeProcessing("Canny")}>Canny</Button>{' '}

            {/* 変換後の画像の表示 */}
            {processedImage && (
              <div>
                <p>Imgae Created!!</p>
                <img src={processedImage} alt="processed" width="300" height="300" />
                <br />
                <Button onClick={handleSave}>保存</Button>
              </div>
            )}
        </div>
    )
}

export default Edge