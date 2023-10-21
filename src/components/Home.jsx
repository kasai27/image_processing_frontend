import React from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { useHandleImage } from "./hooks/useHandleImage";

const Home = () => {
  // useHandleImage.jsから取得
  const { selectedFile, processedImage, setProcessedImage, handleFileChange } = useHandleImage()

  // FastAPIのURL
  const url_gray = "http://127.0.0.1:8000/gray/";
  const url_edge = "http://127.0.0.1:8000/edge/";
  const url_face_detection = "http://127.0.0.1:8000/face_detection/";
    
  const handleGray = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      try {
        const response = await axios.post(url_gray, formData, {
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

  const handleEdge = async (filter) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('filter_type', filter);
            
      try {
        const response = await axios.post(url_edge, formData, {
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

  const handleFaceDetection = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post(url_face_detection, formData, {
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
      <Form.Group controlId="formFile" className="mb-3">
        <Col sm="5">
          <Form.Control type="file" onChange={handleFileChange} />
        </Col>
      </Form.Group>

      {/* 変換ボタン */}
      <Button onClick={handleGray}>グレースケール化</Button>{' '}
      <Button onClick={() => handleEdge("Sobel")}>Sobel</Button>{' '}
      <Button onClick={() => handleEdge("Laplacian")}>Laplacian</Button>{' '}
      <Button onClick={() => handleEdge("Canny")}>Canny</Button>{' '}
      <Button onClick={handleFaceDetection}>顔検出</Button>

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

export default Home