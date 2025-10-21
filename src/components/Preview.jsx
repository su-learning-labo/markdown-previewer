import React from 'react';
import '../styles/components.css';

/**
 * プレビュー表示コンポーネント
 * @param {Object} props - プロパティ
 * @param {string} props.html - レンダリングされたHTML
 * @param {Array} props.lintResults - 校正結果
 * @returns {JSX.Element} プレビューコンポーネント
 */
const Preview = ({ html, lintResults = [] }) => {
  // 校正結果をHTMLにハイライトとして追加
  const addLintHighlights = (htmlContent) => {
    if (!lintResults.length) return htmlContent;

    let highlightedHtml = htmlContent;
    
    // 校正結果をハイライト表示に変換
    lintResults.forEach((result, index) => {
      const highlightClass = result.severity === 2 ? 'lint-error' : 'lint-warning';
      const tooltip = `${result.message} (${result.ruleId})`;
      
      // 簡易的なハイライト表示（実際の実装ではより精密な処理が必要）
      highlightedHtml = highlightedHtml.replace(
        /<p>/g,
        `<p class="${highlightClass}" title="${tooltip}">`
      );
    });

    return highlightedHtml;
  };

  const highlightedHtml = addLintHighlights(html);

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h2 className="preview-title">プレビュー</h2>
        {lintResults.length > 0 && (
          <div className="lint-summary">
            <span className="lint-count">
              校正結果: {lintResults.length}件
            </span>
          </div>
        )}
      </div>
      <div className="preview-content">
        {html ? (
          <div 
            className="preview-html"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <div className="preview-empty">
            <p>マークダウンテキストを入力すると、ここにプレビューが表示されます。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
