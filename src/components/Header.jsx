import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
        <div className='logo'>
            <h3>image processing</h3>
        </div>
        <nav>
            <ul>
                <li>
                    <Link to="/">ホーム</Link>
                </li>
                <li>
                    <Link to="/grayscale">グレースケール化</Link>
                </li>
                <li>
                    <Link to="/edge">エッジ処理</Link>
                </li>
                <li>
                    <Link to="/watermark">電子透かし処理</Link>
                </li>
                <li>
                    <Link to="/detection">埋め込み情報抽出</Link>
                </li>
            </ul>
        </nav>
    </header>
  );
};
