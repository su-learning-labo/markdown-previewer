import React from 'react';
import '../styles/components.css';

/**
 * マークダウン入力エディターコンポーネント
 * @param {Object} props - プロパティ
 * @param {string} props.markdown - マークダウンテキスト
 * @param {Function} props.onChange - テキスト変更ハンドラー
 * @param {Array} props.lintResults - 校正結果
 * @param {boolean} props.isLoading - 校正処理中のフラグ
 * @returns {JSX.Element} エディターコンポーネント
 */
const Editor = ({ markdown, onChange, lintResults = [], isLoading = false }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  // 校正結果をハイライト用のスタイルに変換
  const getLineStyle = (lineNumber) => {
    const lineLintResults = lintResults.filter(result => result.line === lineNumber);
    if (lineLintResults.length === 0) return {};

    const hasError = lineLintResults.some(result => result.severity === 2);
    const hasWarning = lineLintResults.some(result => result.severity === 1);

    if (hasError) {
      return { backgroundColor: 'rgba(255, 0, 0, 0.1)', borderLeft: '3px solid #ff0000' };
    } else if (hasWarning) {
      return { backgroundColor: 'rgba(255, 165, 0, 0.1)', borderLeft: '3px solid #ffa500' };
    }
    return {};
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2 className="editor-title">マークダウン入力</h2>
        {isLoading && (
          <div className="loading-indicator">
            <span className="loading-text">校正中...</span>
          </div>
        )}
      </div>
      <div className="editor-wrapper">
        <textarea
          className="editor-textarea"
          value={markdown}
          onChange={handleChange}
          placeholder="マークダウン記法でテキストを入力してください..."
          spellCheck={false}
        />
        {/* 校正結果のハイライト表示（視覚的なフィードバック用） */}
        {lintResults.length > 0 && (
          <div className="lint-overlay">
            {lintResults.map((result, index) => (
              <div
                key={index}
                className="lint-marker"
                style={{
                  top: `${(result.line - 1) * 20}px`, // 行の高さを仮定
                  left: `${result.column * 8}px` // 文字幅を仮定
                }}
                title={`${result.message} (${result.ruleId})`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
