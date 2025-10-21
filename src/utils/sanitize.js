import DOMPurify from 'dompurify';

/**
 * HTMLをサニタイズする
 * @param {string} html - サニタイズ対象のHTML
 * @returns {string} サニタイズされたHTML
 */
export const sanitizeHtml = (html) => {
  if (!html) return '';
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'strong', 'em', 'del', 'code', 'pre',
      'ul', 'ol', 'li', 'blockquote', 'hr',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'a', 'img', 'span', 'div'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'style'],
    ALLOW_DATA_ATTR: false
  });
};

/**
 * 危険なスクリプトタグを除去
 * @param {string} html - 対象のHTML
 * @returns {string} 安全なHTML
 */
export const removeScriptTags = (html) => {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

/**
 * 危険なイベントハンドラーを除去
 * @param {string} html - 対象のHTML
 * @returns {string} 安全なHTML
 */
export const removeEventHandlers = (html) => {
  return html.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
};
