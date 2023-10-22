import React, { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

const Detection = () => {
  // 選択された元の画像ファイルと抽出したテキストを管理するための状態
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState(null);

  // FastAPIのURL
  const url_detection = "https://image-processing-1o5o.onrender.com/detection/";

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
    <div className="container">
      {/* 画像ファイルの選択用の入力フィールド */}
      <Form.Group controlId="formFile" className="mb-3">
        <Col sm="5">
          <Form.Control type="file" onChange={handleFileChange} />
        </Col>
      </Form.Group>

      {/* 変換ボタン */}
      <Button onClick={handleDetection}>埋め込み情報抽出</Button>

      {/* 変換前の画像の表示 */}
      {selectedFile && (
        <div className="selectedImage">
          <p>選択された画像</p>
          <img src={URL.createObjectURL(selectedFile)} alt="selected" width="300" height="300" />
        </div>
      )}

      {/* 埋め込んだテキストの表示 */}
      {text && (
        <div>
          <p>埋め込んだテキスト</p>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default Detection