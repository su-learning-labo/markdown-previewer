import { useState, useEffect, useCallback } from 'react';
import { parseMarkdown, countCharacters, countLines } from '../utils/markdown.js';

/**
 * マークダウン処理用のカスタムフック
 * @param {string} initialMarkdown - 初期マークダウンテキスト
 * @returns {Object} マークダウン関連の状態と関数
 */
export const useMarkdown = (initialMarkdown = '') => {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [html, setHtml] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);

  // マークダウンテキストが変更されたときにHTMLを更新
  useEffect(() => {
    const parsedHtml = parseMarkdown(markdown);
    setHtml(parsedHtml);
    setCharCount(countCharacters(markdown));
    setLineCount(countLines(markdown));
  }, [markdown]);

  // マークダウンテキストを更新
  const updateMarkdown = useCallback((newMarkdown) => {
    setMarkdown(newMarkdown);
  }, []);

  // マークダウンテキストをクリア
  const clearMarkdown = useCallback(() => {
    setMarkdown('');
  }, []);

  // サンプルテキストを読み込み
  const loadSample = useCallback(async () => {
    try {
      const response = await fetch('/data/sample.md');
      const sampleText = await response.text();
      setMarkdown(sampleText);
    } catch (error) {
      console.error('Failed to load sample text:', error);
      // フォールバック用のサンプルテキスト
      const fallbackSample = `# Markdown Previewer サンプル

## 基本的な記法

**太字** と *斜体* のテキスト

### リスト
- 項目1
- 項目2
- 項目3

### コードブロック
\`\`\`javascript
console.log("Hello, World!");
\`\`\`

> これは引用文です。

[リンクの例](https://example.com)`;
      setMarkdown(fallbackSample);
    }
  }, []);

  return {
    markdown,
    html,
    charCount,
    lineCount,
    updateMarkdown,
    clearMarkdown,
    loadSample
  };
};
