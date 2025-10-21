import React, { useState, useEffect } from 'react';
import '../styles/components.css';

/**
 * レイアウト管理コンポーネント
 * @param {Object} props - プロパティ
 * @returns {JSX.Element} レイアウトコンポーネント
 */
const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');

  // 画面サイズの監視
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 960);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className={`layout ${isMobile ? 'mobile' : 'desktop'}`}>
      {isMobile ? (
        <div className="mobile-layout">
          <div className="mobile-tabs">
            <button
              className={`tab-button ${activeTab === 'editor' ? 'active' : ''}`}
              onClick={() => setActiveTab('editor')}
            >
              入力
            </button>
            <button
              className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              プレビュー
            </button>
          </div>
          <div className="mobile-content">
            {activeTab === 'editor' ? children.editor : children.preview}
          </div>
        </div>
      ) : (
        <div className="desktop-layout">
          <div className="desktop-content">
            {children.editor}
            {children.preview}
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
