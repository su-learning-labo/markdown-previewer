import { useState, useEffect, useCallback } from 'react';
import { lintText, formatLintResults, debounce } from '../utils/textlint.js';

/**
 * 校正機能用のカスタムフック
 * @param {string} text - 校正対象のテキスト
 * @param {number} delay - デバウンスの遅延時間（ミリ秒）
 * @returns {Object} 校正関連の状態と関数
 */
export const useTextlint = (text, delay = 500) => {
  const [lintResults, setLintResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // デバウンスされた校正関数
  const debouncedLint = useCallback(
    debounce(async (textToLint) => {
      if (!textToLint || textToLint.trim() === '') {
        setLintResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await lintText(textToLint);
        const formattedResults = formatLintResults(results);
        setLintResults(formattedResults);
      } catch (err) {
        console.error('Textlint error:', err);
        setError('校正処理中にエラーが発生しました');
        setLintResults([]);
      } finally {
        setIsLoading(false);
      }
    }, delay),
    [delay]
  );

  // テキストが変更されたときに校正を実行
  useEffect(() => {
    setIsLoading(true);
    debouncedLint(text);
  }, [text, debouncedLint]);

  // 校正結果をクリア
  const clearLintResults = useCallback(() => {
    setLintResults([]);
    setError(null);
  }, []);

  // 特定の行の校正結果を取得
  const getLintResultsForLine = useCallback((lineNumber) => {
    return lintResults.filter(result => result.line === lineNumber);
  }, [lintResults]);

  // 校正結果の統計を取得
  const getLintStats = useCallback(() => {
    const errorCount = lintResults.filter(result => result.severity === 2).length;
    const warningCount = lintResults.filter(result => result.severity === 1).length;
    
    return {
      total: lintResults.length,
      errors: errorCount,
      warnings: warningCount
    };
  }, [lintResults]);

  return {
    lintResults,
    isLoading,
    error,
    clearLintResults,
    getLintResultsForLine,
    getLintStats
  };
};
