import React, { useState } from "react";
import axios from "axios";

function App() {
  // 選択された元の画像ファイルと変換後の画像ファイルを管理するための状態
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);

  // ローディング状態やエラーメッセージを管理するための状態
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  // FastAPIのURL
  const url = "http://127.0.0.1:8000";
  
  // フォームの送信時のハンドラ関数
  const handleSubmit = async (event) =>{
    event.preventDefault();

    // 選択されたファイルがない場合はエラーメッセージをセットして処理を中断
    if (!selectedFile) {
      setError("No image file selected");
      return;
    }

    // FromDataオブジェクトに選択されたファイルを追加
    const formData = new FormData();
    formData.append("image", selectedFile);

    try{
      setIsloading(true);

      // フォームデータを使ってFastAPIにPOSTリクエストを送信
      const response = await axios.post(url, formData, {
        header: {
          "Conttent-Type": "multipart/form-data",
        },
        responseType: "blob"
      });

      // レスポンスデータをBlobオブジェクトとして扱い，変換後の画像URLをセット
      const blob = new blob([response.data], {type: "image/png"});
      setConvertedFile(URL.createObjectURL(blob));
      setError(null);
    } catch (error) {
      console.log("An error occurred during the request");
    } finally {
      setIsloading(false);
    }
  };

  // 画像ファイルのアップロード時のハンドラ関数
  const handleImageUpload = (event) => {
    const file = event.target.file[0];
    setSelectedFile(file);
    setConvertedFile(null);
    setError(null);
  };

  return (
    <div className="container">
      {/* 画像ファイルの選択用の入力フィールド */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {/* 変換ボタン */}
      <button
        onClick={handleSubmit}
        disabled={!selectedFile || isloading}
      >
        {isloading ? "Loading...": "convert to Monochrome"}
      </button>

      {/* エラーメッセージの表示 */}
      {error && <p>Error: {error}</p>}

      {/* 変換後の画像の表示 */}
      {convertedFile && (
        <div>
          <p>Imgae Created!!</p>
          <img src={convertedFile} alt="Image" />
        </div>
      )}
    </div>
  );
};

export default App;
