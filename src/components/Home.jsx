import React from 'react'
import opencvImage from '../Images/opencv.jpg'

const Home = () => {
  return (
    <div className='container text-center'>
      <h1>Open CV</h1>

      <img src={opencvImage} className='opencvImage' />

      <p>
        OpenCVは、その名の通りオープンソースのコンピュータビジョン用ライブラリです。
        コンピュータビジョンは、コンピュータによる視覚についての研究分野の名称ですが、
        画像認識とほぼ同義と考えていただければわかりやすいかと思います。OpenCVは、元々はインテルが開発したプログラムで、現在でも開発が進められています。
        ごく一部のアルゴリズムは特許を取得されているため、それらを商用利用する際には確認が必要ですが、基本的に無料で利用することができ、
        商用利用も可能です。また、クロスプラットフォームのライブラリで、Linux、MacOS、Windowsや、iOS、AndroidといったOSとC++、Python、Java
        の三つのプログラミング言語に対応しているため、あまり環境の制約を受けることなく活用することができます。
      </p>
    </div>
  );
};

export default Home