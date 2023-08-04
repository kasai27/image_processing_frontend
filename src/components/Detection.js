import React, { useState } from "react";
import axios from "axios";

const Detection = () => {
    // 選択された元の画像ファイルと抽出したテキストを管理するための状態
    const [selectedFile, setSelectedFile] = useState(null);
    const [text, setText] = useState(null);

    // FastAPIのURL
    const url_detection = "http://127.0.0.1:8000/detection/";

    // 画像ファイルをセット
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleDetection = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
    
            try {
                const response = await axios.post(url_detection, formData);
                setText(response.data.result_text);
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
            <button onClick={handleDetection}>埋め込み情報抽出</button>
            
            {/* 変換後の画像の表示 */}
            {text && (
              <div>
                <p>text extract!!</p>
                <p>{text}</p>
              </div>
            )}
        </div>
    )
}

export default Detection