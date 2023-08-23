import { useState } from "react"

export const useHandleImage = () => {
    // 選択された元の画像ファイルと変換後の画像ファイルを管理するための状態
    const [selectedFile, setSelectedFile] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);

    // 選択した画像をセット
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        // 新しい画像を選択したら処理済み画像をクリア
        setProcessedImage(null)
    };

    return { selectedFile, processedImage, setProcessedImage, handleFileChange }
    
}