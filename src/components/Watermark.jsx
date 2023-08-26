import React, { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button'
import { useHandleImage } from "./hooks/useHandleImage";

const Watermark = () => {
  // useHandleImage.jsから取得
  const { selectedFile, processedImage, setProcessedImage, handleFileChange } = useHandleImage()

  // 埋め込みテキストを管理
  const [text, setText] = useState(null);

  // FastAPIのURL
  const url_watermark = "http://127.0.0.1:8000/watermark/";

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
        const response = await axios.post(url_watermark, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          responseType: 'arraybuffer',
        });

        const blob = new Blob([response.data], { type: 'image/png' });
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
    link.download = 'processed_image.png';
    link.click();
  };

  return (
    <div className="container">
      {/* 画像ファイルの選択用の入力フィールド */}
      <input type="file" onChange={handleFileChange} />
      {/* 埋め込みテキスト入力フィールド */}
      <input type="text" value={text} onChange={handleTextChange} />
      {/* 変換ボタン */}
      <Button onClick={handleWatermark}>電子透かし処理</Button>

      {/* 変換前の画像の表示 */}
      {selectedFile && !processedImage && (
        <div>
          <p>selected image</p>
          <img src={URL.createObjectURL(selectedFile)} alt="selected" width="300" height="300" />
        </div>
      )}

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
  );
};

export default Watermark