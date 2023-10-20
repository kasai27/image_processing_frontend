import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <div className='logo'>
        <h3>画像処理webアプリ</h3>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">ホーム</Link>
            </li>
            <li>
              <Link to="/watermark">電子透かし</Link>
            </li>
            <li>
              <Link to="/detection">埋め込み抽出</Link>
            </li>
          </ul>
        </nav>
    </header>
  );
};
