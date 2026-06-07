'use client';

import { useState } from 'react';
import { Download, Copy, Eye, EyeOff, FileText, Code } from 'lucide-react';

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('# Welcome to Markdown Editor\n\nStart typing your markdown here...\n\n## Features\n- **Bold text**\n- *Italic text*\n- `Code snippets`\n- [Links](https://example.com)\n\n### Code Block\n```javascript\nconst hello = "world";\nconsole.log(hello);\n```\n\n> This is a blockquote\n\n1. Numbered list\n2. Second item\n3. Third item');
  const [showPreview, setShowPreview] = useState(true);
  const [splitView, setSplitView] = useState(true);

  const parseMarkdown = (text: string): string => {
    let html = text;

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono">$1</code>');

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-10 mb-5 text-gray-900 dark:text-white">$1</h1>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong class="font-bold">$1</strong>');

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
    html = html.replace(/_(.+?)_/g, '<em class="italic">$1</em>');

    // Strikethrough
    html = html.replace(/~~(.+?)~~/g, '<del class="line-through">$1</del>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />');

    // Blockquotes
    html = html.replace(/^&gt; (.+)/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20">$1</blockquote>');
    html = html.replace(/^> (.+)/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20">$1</blockquote>');

    // Horizontal rule
    html = html.replace(/^---$/gim, '<hr class="my-8 border-gray-300 dark:border-gray-600" />');

    // Unordered lists
    html = html.replace(/^\- (.+)/gim, '<li class="ml-6 list-disc">$1</li>');
    html = html.replace(/^\* (.+)/gim, '<li class="ml-6 list-disc">$1</li>');

    // Ordered lists
    html = html.replace(/^\d+\. (.+)/gim, '<li class="ml-6 list-decimal">$1</li>');

    // Wrap consecutive list items
    html = html.replace(/(<li class="ml-6 list-disc">.*<\/li>\n?)+/g, '<ul class="my-4 space-y-1">$&</ul>');
    html = html.replace(/(<li class="ml-6 list-decimal">.*<\/li>\n?)+/g, '<ol class="my-4 space-y-1">$&</ol>');

    // Paragraphs
    html = html.replace(/^(?!<[houpb]|<li|<code|<pre)(.+)$/gim, '<p class="my-3 text-gray-800 dark:text-gray-200">$1</p>');

    // Line breaks
    html = html.replace(/\n/g, '<br />');

    return html;
  };

  const escapeHtml = (text: string): string => {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    alert('Markdown copied to clipboard!');
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Document</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    pre {
      background: #2d2d2d;
      color: #f8f8f8;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
    }
    pre code {
      background: none;
      padding: 0;
      color: inherit;
    }
    blockquote {
      border-left: 4px solid #3b82f6;
      padding-left: 16px;
      margin: 16px 0;
      font-style: italic;
      background: #eff6ff;
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }
    a {
      color: #3b82f6;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
${parseMarkdown(markdown)}
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const insertTemplate = (template: string) => {
    setMarkdown(markdown + '\n\n' + template);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Markdown Editor</h1>
              <p className="text-gray-600 dark:text-gray-400">Write and preview markdown in real-time</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSplitView(!splitView)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {splitView ? 'Single View' : 'Split View'}
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
            </button>
          </div>
        </div>

        {/* Quick Insert Templates */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => insertTemplate('## Heading 2')}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            + Heading
          </button>
          <button
            onClick={() => insertTemplate('**bold text**')}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            + Bold
          </button>
          <button
            onClick={() => insertTemplate('*italic text*')}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            + Italic
          </button>
          <button
            onClick={() => insertTemplate('[Link Text](https://example.com)')}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            + Link
          </button>
          <button
            onClick={() => insertTemplate('```javascript\n// Your code here\n```')}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            + Code Block
          </button>
          <button
            onClick={() => insertTemplate('- List item 1\n- List item 2\n- List item 3')}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            + List
          </button>
          <button
            onClick={() => insertTemplate('> This is a blockquote')}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            + Quote
          </button>
        </div>

        {/* Editor and Preview */}
        <div className={`grid ${splitView && showPreview ? 'grid-cols-2' : 'grid-cols-1'} gap-4 mb-6`}>
          {/* Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <Code className="w-4 h-4 mr-2" />
                Markdown Input
              </label>
              <span className="text-xs text-gray-500">{markdown.length} characters</span>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-[500px] px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none"
              placeholder="Type your markdown here..."
            />
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Live Preview
              </label>
              <div
                className="w-full h-[500px] px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 overflow-y-auto prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={copyMarkdown}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Markdown</span>
          </button>
          <button
            onClick={downloadMarkdown}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Download className="w-4 h-4" />
            <span>Download .md</span>
          </button>
          <button
            onClick={downloadHTML}
            className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            <Download className="w-4 h-4" />
            <span>Download HTML</span>
          </button>
        </div>

        {/* Markdown Cheatsheet */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Markdown Cheatsheet</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
            <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded"># H1</code> - Heading 1</div>
            <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">## H2</code> - Heading 2</div>
            <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">**bold**</code> - Bold text</div>
            <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">*italic*</code> - Italic text</div>
            <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">[text](url)</code> - Link</div>
            <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">![alt](url)</code> - Image</div>
            <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">- item</code> - Bullet list</div>
            <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">1. item</code> - Numbered list</div>
            <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">`code`</code> - Inline code</div>
            <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">```code```</code> - Code block</div>
            <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">&gt; quote</code> - Blockquote</div>
            <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">---</code> - Horizontal rule</div>
          </div>
        </div>
      </div>
    </div>
  );
}
