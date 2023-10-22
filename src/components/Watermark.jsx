import React, { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useHandleImage } from "./hooks/useHandleImage";

const Watermark = () => {
  // useHandleImage.jsから取得
  const { selectedFile, processedImage, setProcessedImage, handleFileChange } = useHandleImage()

  // 埋め込みテキストを管理
  const [text, setText] = useState(null);

  // FastAPIのURL
  const url_watermark = "https://image-processing-1o5o.onrender.com/watermark/";

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
      <Form.Group controlId="formFile" className="mb-3">
        <Col sm="5">
          <Form.Control type="file" onChange={handleFileChange} />
        </Col>
      </Form.Group>
      {/* 埋め込みテキスト入力フィールド */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">埋め込むテキスト</Form.Label>
        <Col sm="5">
          <Form.Control type="text" value={text} onChange={handleTextChange} />
        </Col>
      </Form.Group>
      {/* 変換ボタン */}
      <Button onClick={handleWatermark}>電子透かし処理</Button>

      <div className="image">
        {/* 変換前の画像の表示 */}
        {selectedFile && (
          <div className="selectedImage">
            <p>選択された画像</p>
            <img src={URL.createObjectURL(selectedFile)} alt="selected" width="300" height="300" />
          </div>
        )}

        {/* 変換後の画像の表示 */}
        {processedImage && (
          <div className="processedImage">
            <p>画像処理後の画像</p>
            <img src={processedImage} alt="processed" width="300" height="300" />
            <br />
            <Button onClick={handleSave}>保存</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watermark