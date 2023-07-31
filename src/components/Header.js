import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
        <div>
            <h1>image processing</h1>
        </div>
        <nav>
            <ul>
                <li>
                    <Link to="/grayscale">グレースケール化</Link>
                </li>
                <li>
                    <Link to="/laplacian">エッジ処理</Link>
                </li>
                <li>
                    <Link to="/watermark">電子透かし処理</Link>
                </li>
            </ul>
        </nav>
    </header>
  );
};
