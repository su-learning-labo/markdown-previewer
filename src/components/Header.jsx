import React from 'react';
import '../styles/components.css';

/**
 * ヘッダーコンポーネント
 * @param {Object} props - プロパティ
 * @param {Function} props.onClear - クリアボタンのクリックハンドラー
 * @param {Function} props.onLoadSample - サンプル読み込みボタンのクリックハンドラー
 * @param {Object} props.stats - 統計情報
 * @returns {JSX.Element} ヘッダーコンポーネント
 */
const Header = ({ onClear, onLoadSample, stats }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Markdown Previewer</h1>
        <div className="header-actions">
          <button 
            className="btn btn-secondary" 
            onClick={onLoadSample}
            title="サンプルテキストを読み込み"
          >
            サンプル表示
          </button>
          <button 
            className="btn btn-primary" 
            onClick={onClear}
            title="テキストをクリア"
          >
            クリア
          </button>
        </div>
      </div>
      {stats && (
        <div className="header-stats">
          <span className="stat-item">
            文字数: <strong>{stats.charCount}</strong>
          </span>
          <span className="stat-item">
            行数: <strong>{stats.lineCount}</strong>
          </span>
          {stats.lintStats && (
            <span className="stat-item">
              校正: <strong>{stats.lintStats.total}</strong>件
              {stats.lintStats.errors > 0 && (
                <span className="error-count"> (エラー: {stats.lintStats.errors})</span>
              )}
            </span>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
