import React from 'react';
import Header from './components/Header.jsx';
import Editor from './components/Editor.jsx';
import Preview from './components/Preview.jsx';
import Layout from './components/Layout.jsx';
import { useMarkdown } from './hooks/useMarkdown.js';
import { useTextlint } from './hooks/useTextlint.js';

/**
 * メインアプリケーションコンポーネント
 * @returns {JSX.Element} アプリケーションコンポーネント
 */
function App() {
  const {
    markdown,
    html,
    charCount,
    lineCount,
    updateMarkdown,
    clearMarkdown,
    loadSample
  } = useMarkdown();

  const {
    lintResults,
    isLoading: isLintLoading,
    error: lintError,
    getLintStats
  } = useTextlint(markdown);

  // 統計情報の準備
  const stats = {
    charCount,
    lineCount,
    lintStats: getLintStats()
  };

  return (
    <div className="app">
      <Header
        onClear={clearMarkdown}
        onLoadSample={loadSample}
        stats={stats}
      />
      
      <Layout>
        {{
          editor: (
            <Editor
              markdown={markdown}
              onChange={updateMarkdown}
              lintResults={lintResults}
              isLoading={isLintLoading}
            />
          ),
          preview: (
            <Preview
              html={html}
              lintResults={lintResults}
            />
          )
        }}
      </Layout>

      {lintError && (
        <div className="error-message">
          <p>校正処理でエラーが発生しました: {lintError}</p>
        </div>
      )}
    </div>
  );
}

export default App;
