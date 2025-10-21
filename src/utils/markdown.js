import { marked } from 'marked';
import DOMPurify from 'dompurify';

// markedの設定
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: false,
  mangle: false
});

/**
 * マークダウンテキストをHTMLに変換し、サニタイズする
 * @param {string} markdown - マークダウンテキスト
 * @returns {string} サニタイズされたHTML
 */
export const parseMarkdown = (markdown) => {
  if (!markdown) return '';
  
  try {
    // マークダウンをHTMLに変換
    const html = marked(markdown);
    
    // XSS対策のためHTMLをサニタイズ
    const sanitizedHtml = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'strong', 'em', 'del', 'code', 'pre',
        'ul', 'ol', 'li', 'blockquote', 'hr',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'a', 'img'
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id']
    });
    
    return sanitizedHtml;
  } catch (error) {
    console.error('Markdown parsing error:', error);
    return '<p>エラー: マークダウンの解析に失敗しました</p>';
  }
};

/**
 * マークダウンテキストの文字数をカウント
 * @param {string} markdown - マークダウンテキスト
 * @returns {number} 文字数
 */
export const countCharacters = (markdown) => {
  return markdown ? markdown.length : 0;
};

/**
 * マークダウンテキストの行数をカウント
 * @param {string} markdown - マークダウンテキスト
 * @returns {number} 行数
 */
export const countLines = (markdown) => {
  if (!markdown) return 0;
  return markdown.split('\n').length;
};
