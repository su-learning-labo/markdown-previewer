// 簡易的な校正機能（textlintの代替実装）
// 実際のプロダクションでは、より高度な校正エンジンを使用することを推奨

/**
 * 簡易的な日本語校正ルール
 * @param {string} text - 校正対象のテキスト
 * @returns {Array} 校正結果の配列
 */
const simpleJapaneseLint = (text) => {
  const results = [];
  const lines = text.split('\n');

  lines.forEach((line, lineIndex) => {
    // 冗長な表現のチェック
    const redundantPatterns = [
      { pattern: /することができます/g, message: '「することができます」は「できます」に簡潔にできます', suggestion: 'できます' },
      { pattern: /ということが/g, message: '「ということが」は「ということが」を削除できます', suggestion: '' },
      { pattern: /ということです/g, message: '「ということです」は「です」に簡潔にできます', suggestion: 'です' },
      { pattern: /というように/g, message: '「というように」は「ように」に簡潔にできます', suggestion: 'ように' },
      { pattern: /というわけです/g, message: '「というわけです」は「です」に簡潔にできます', suggestion: 'です' }
    ];

    redundantPatterns.forEach(({ pattern, message, suggestion }) => {
      let match;
      while ((match = pattern.exec(line)) !== null) {
        results.push({
          line: lineIndex + 1,
          column: match.index + 1,
          message: message,
          ruleId: 'redundant-expression',
          severity: 1, // warning
          fix: suggestion
        });
      }
    });

    // 文体の混在チェック
    const desuMasuPattern = /です|ます|でした|ました|でしょう|ましょう/g;
    const daDeAruPattern = /だ|である|だった|であった|だろう|であろう/g;
    
    const desuMasuMatches = line.match(desuMasuPattern);
    const daDeAruMatches = line.match(daDeAruPattern);
    
    if (desuMasuMatches && daDeAruMatches) {
      results.push({
        line: lineIndex + 1,
        column: 1,
        message: '「です・ます調」と「だ・である調」が混在しています。文体を統一してください。',
        ruleId: 'mixed-style',
        severity: 2, // error
        fix: ''
      });
    }

    // 誤字脱字の簡易チェック（例）
    const typoPatterns = [
      { pattern: /こんにちわ/g, message: '「こんにちわ」は「こんにちは」が正しいです', suggestion: 'こんにちは' },
      { pattern: /ありがとうございました/g, message: '「ありがとうございました」は「ありがとうございます」が適切な場合があります', suggestion: 'ありがとうございます' }
    ];

    typoPatterns.forEach(({ pattern, message, suggestion }) => {
      let match;
      while ((match = pattern.exec(line)) !== null) {
        results.push({
          line: lineIndex + 1,
          column: match.index + 1,
          message: message,
          ruleId: 'typo-check',
          severity: 2, // error
          fix: suggestion
        });
      }
    });
  });

  return results;
};

/**
 * テキストを校正する（簡易版）
 * @param {string} text - 校正対象のテキスト
 * @returns {Promise<Array>} 校正結果の配列
 */
export const lintText = async (text) => {
  if (!text || text.trim() === '') {
    return [];
  }

  // 非同期処理をシミュレート
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return simpleJapaneseLint(text);
};

/**
 * 校正結果をハイライト用のデータに変換
 * @param {Array} lintResults - 校正結果
 * @returns {Array} ハイライト用のデータ
 */
export const formatLintResults = (lintResults) => {
  return lintResults.map(result => ({
    line: result.line,
    column: result.column,
    message: result.message,
    ruleId: result.ruleId,
    severity: result.severity,
    fix: result.fix
  }));
};

/**
 * デバウンス処理
 * @param {Function} func - 実行する関数
 * @param {number} delay - 遅延時間（ミリ秒）
 * @returns {Function} デバウンスされた関数
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};
