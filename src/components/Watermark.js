import React, { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button'

const Watermark = () => {
    // 選択された元の画像ファイルと変換後の画像ファイルを管理するための状態
    const [selectedFile, setSelectedFile] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);

    // 埋め込みテキストを管理
    const [text, setText] = useState(null);

    // FastAPIのURL
    const url_watermark = "http://127.0.0.1:8000/watermark/";

    // 画像ファイルをセット
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // テキストをセット
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleWatermark = async () => {
        if (selectedFile && text) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('text', text);
    
            try {
                const response = await axios.post(url_watermark, formData);
                setProcessedImage(response.data.processed_image);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="container">
            {/* 画像ファイルの選択用の入力フィールド */}
            <input type="file" onChange={handleFileChange} />
            {/* 埋め込みテキスト入力フィールド */}
            <input type="text" value={text} onChange={handleTextChange}/>
            {/* 変換ボタン */}
            <Button onClick={handleWatermark}>電子透かし処理</Button>
            
            {/* 変換後の画像の表示 */}
            {processedImage && (
              <div>
                <p>Imgae Created!!</p>
                <img src={`data:image/jpeg;base64,${processedImage}`} alt="processed" width="300" height="300" />
              </div>
            )}
        </div>
    )
}

export default Watermark