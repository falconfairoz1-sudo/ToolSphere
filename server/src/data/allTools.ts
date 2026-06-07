export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  tags: string[];
  trending?: boolean;
  new?: boolean;
  route: string;
}

export const allTools: Tool[] = [
  // 1. PRODUCTIVITY TOOLS (10)
  { id: 'resume-builder', name: 'Resume Builder', description: 'Create professional resumes', category: 'productivity', icon: '📄', tags: ['resume', 'cv', 'job'], trending: true, route: '/tools/resume-builder' },
  { id: 'cover-letter', name: 'Cover Letter Generator', description: 'Generate cover letters', category: 'productivity', icon: '✉️', tags: ['cover', 'letter', 'job'], route: '/tools/cover-letter' },
  { id: 'notes-maker', name: 'Notes Maker', description: 'Create and organize notes', category: 'productivity', icon: '📝', tags: ['notes', 'organize'], route: '/tools/notes-maker' },
  { id: 'todo-list', name: 'To-Do List', description: 'Manage your tasks', category: 'productivity', icon: '✅', tags: ['todo', 'task', 'list'], trending: true, route: '/tools/todo-list' },
  { id: 'daily-planner', name: 'Daily Planner', description: 'Plan your day', category: 'productivity', icon: '📅', tags: ['planner', 'schedule'], route: '/tools/daily-planner' },
  { id: 'habit-tracker', name: 'Habit Tracker', description: 'Track your habits', category: 'productivity', icon: '🎯', tags: ['habit', 'tracker'], route: '/tools/habit-tracker' },
  { id: 'clipboard-manager', name: 'Clipboard Manager', description: 'Manage clipboard history', category: 'productivity', icon: '📋', tags: ['clipboard', 'copy'], route: '/tools/clipboard-manager' },
  { id: 'text-formatter', name: 'Text Formatter', description: 'Format text easily', category: 'productivity', icon: '📃', tags: ['text', 'format'], route: '/tools/text-formatter' },
  { id: 'markdown-editor', name: 'Markdown Editor', description: 'Edit markdown files', category: 'productivity', icon: '✍️', tags: ['markdown', 'editor'], route: '/tools/markdown-editor' },
  { id: 'note-sharing', name: 'Note Sharing Tool', description: 'Share notes securely', category: 'productivity', icon: '🔗', tags: ['share', 'notes'], route: '/tools/note-sharing' },

  // 2. PDF TOOLS (19)
  { id: 'pdf-merge', name: 'PDF Merge', description: 'Combine multiple PDFs', category: 'pdf', icon: '📑', tags: ['pdf', 'merge'], trending: true, route: '/tools/pdf-merge' },
  { id: 'pdf-split', name: 'PDF Split', description: 'Split PDF into pages', category: 'pdf', icon: '✂️', tags: ['pdf', 'split'], route: '/tools/pdf-split' },
  { id: 'pdf-page-remover', name: 'PDF Page Remover', description: 'Remove specific pages from PDF', category: 'pdf', icon: '🗑️', tags: ['pdf', 'remove', 'pages'], route: '/tools/pdf-page-remover' },
  { id: 'pdf-rotate', name: 'PDF Rotate', description: 'Rotate PDF pages', category: 'pdf', icon: '🔄', tags: ['pdf', 'rotate'], route: '/tools/pdf-rotate' },
  { id: 'pdf-organizer', name: 'PDF Organizer', description: 'Reorder PDF pages', category: 'pdf', icon: '📋', tags: ['pdf', 'organize', 'reorder'], route: '/tools/pdf-organizer' },
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF to DOCX', category: 'pdf', icon: '📄', tags: ['pdf', 'word', 'convert'], route: '/tools/pdf-to-word' },
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert DOCX to PDF', category: 'pdf', icon: '📝', tags: ['word', 'pdf', 'convert'], route: '/tools/word-to-pdf' },
  { id: 'image-to-pdf', name: 'Image to PDF', description: 'Convert images to PDF', category: 'pdf', icon: '🖼️', tags: ['image', 'pdf', 'convert'], route: '/tools/image-to-pdf' },
  { id: 'pdf-to-image', name: 'PDF to Image', description: 'Convert PDF to images', category: 'pdf', icon: '🎞️', tags: ['pdf', 'image', 'convert'], route: '/tools/pdf-to-image' },
  { id: 'pdf-compressor', name: 'PDF Compressor', description: 'Reduce PDF file size', category: 'pdf', icon: '🗜️', tags: ['pdf', 'compress'], route: '/tools/pdf-compressor' },
  { id: 'pdf-lock', name: 'PDF Lock/Unlock', description: 'Protect or unlock PDFs', category: 'pdf', icon: '🔒', tags: ['pdf', 'lock', 'security'], route: '/tools/pdf-lock' },
  { id: 'pdf-watermark', name: 'PDF Watermark', description: 'Add watermarks to PDF', category: 'pdf', icon: '💧', tags: ['pdf', 'watermark'], route: '/tools/pdf-watermark' },
  { id: 'pdf-crop', name: 'PDF Crop', description: 'Crop PDF pages', category: 'pdf', icon: '✂️', tags: ['pdf', 'crop'], route: '/tools/pdf-crop' },
  { id: 'pdf-reader', name: 'PDF Reader', description: 'View PDF files online', category: 'pdf', icon: '📖', tags: ['pdf', 'read', 'view'], route: '/tools/pdf-reader' },
  { id: 'pdf-signature', name: 'PDF Signature', description: 'Add signature to PDF', category: 'pdf', icon: '✍️', tags: ['pdf', 'signature', 'sign'], route: '/tools/pdf-signature' },
  { id: 'pdf-text-extractor', name: 'PDF Text Extractor', description: 'Extract text from PDF', category: 'pdf', icon: '📝', tags: ['pdf', 'text', 'extract'], route: '/tools/pdf-text-extractor' },
  { id: 'pdf-page-numbers', name: 'PDF Page Numbers', description: 'Add page numbers to PDF', category: 'pdf', icon: '🔢', tags: ['pdf', 'page', 'numbers'], route: '/tools/pdf-page-numbers' },
  { id: 'pdf-metadata', name: 'PDF Metadata Editor', description: 'Edit PDF metadata', category: 'pdf', icon: 'ℹ️', tags: ['pdf', 'metadata', 'info'], route: '/tools/pdf-metadata' },
  { id: 'pdf-repair', name: 'PDF Repair', description: 'Repair corrupted PDFs', category: 'pdf', icon: '🔧', tags: ['pdf', 'repair', 'fix'], route: '/tools/pdf-repair' },

  // 3. IMAGE TOOLS (13)
  { id: 'background-remover', name: 'Background Remover', description: 'Remove image backgrounds', category: 'image', icon: '🎨', tags: ['background', 'remove'], route: '/tools/background-remover' },
  { id: 'background-adder', name: 'Background Adder', description: 'Add custom backgrounds to images', category: 'image', icon: '🖼️', tags: ['background', 'add'], new: true, route: '/tools/background-adder' },
  { id: 'image-compressor', name: 'Image Compressor', description: 'Compress images', category: 'image', icon: '📦', tags: ['image', 'compress'], route: '/tools/image-compressor' },
  { id: 'image-resizer', name: 'Image Resizer', description: 'Resize images', category: 'image', icon: '📏', tags: ['image', 'resize'], route: '/tools/image-resizer' },
  { id: 'image-cropper', name: 'Image Cropper', description: 'Crop images', category: 'image', icon: '✂️', tags: ['image', 'crop'], route: '/tools/image-cropper' },
  { id: 'png-to-jpg', name: 'PNG to JPG', description: 'Convert PNG to JPG', category: 'image', icon: '🔄', tags: ['png', 'jpg', 'convert'], route: '/tools/png-to-jpg' },
  { id: 'jpg-to-png', name: 'JPG to PNG', description: 'Convert JPG to PNG', category: 'image', icon: '🔄', tags: ['jpg', 'png', 'convert'], route: '/tools/jpg-to-png' },
  { id: 'webp-converter', name: 'WebP Converter', description: 'Convert to/from WebP', category: 'image', icon: '🌐', tags: ['webp', 'convert'], route: '/tools/webp-converter' },
  { id: 'watermark-adder', name: 'Watermark Adder', description: 'Add watermarks', category: 'image', icon: '💧', tags: ['watermark', 'image'], route: '/tools/watermark-adder' },
  { id: 'meme-generator', name: 'Meme Generator', description: 'Create memes', category: 'image', icon: '😂', tags: ['meme', 'funny'], route: '/tools/meme-generator' },
  { id: 'color-picker', name: 'Color Picker', description: 'Pick and convert colors', category: 'image', icon: '🎨', tags: ['color', 'picker'], route: '/tools/color-picker' },
  { id: 'image-blur', name: 'Image Blur Tool', description: 'Blur parts of images', category: 'image', icon: '🌫️', tags: ['blur', 'image'], route: '/tools/image-blur' },
  { id: 'ai-image-enhancer', name: 'AI Image Enhancer', description: 'Enhance image quality', category: 'image', icon: '✨', tags: ['ai', 'enhance'], new: true, route: '/tools/ai-image-enhancer' },

  // 4. VIDEO TOOLS (9)
  { id: 'video-downloader', name: 'Video Downloader', description: 'Download videos from YouTube, Instagram, etc', category: 'video', icon: '⬇️', tags: ['video', 'download', 'youtube', 'instagram'], new: true, route: '/tools/video-downloader' },
  { id: 'video-compressor', name: 'Video Compressor', description: 'Compress videos', category: 'video', icon: '🎬', tags: ['video', 'compress'], route: '/tools/video-compressor' },
  { id: 'video-to-mp3', name: 'Video to MP3', description: 'Extract audio from video', category: 'video', icon: '🎵', tags: ['video', 'mp3', 'audio'], trending: true, route: '/tools/video-to-mp3' },
  { id: 'video-cutter', name: 'Video Cutter', description: 'Trim videos', category: 'video', icon: '✂️', tags: ['video', 'cut', 'trim'], route: '/tools/video-cutter' },
  { id: 'gif-maker', name: 'GIF Maker', description: 'Create GIFs from videos', category: 'video', icon: '🎞️', tags: ['gif', 'video'], route: '/tools/gif-maker' },
  { id: 'subtitle-generator', name: 'Subtitle Generator', description: 'Generate subtitles', category: 'video', icon: '📝', tags: ['subtitle', 'video'], route: '/tools/subtitle-generator' },
  { id: 'video-speed', name: 'Video Speed Controller', description: 'Change video speed', category: 'video', icon: '⚡', tags: ['video', 'speed'], route: '/tools/video-speed' },
  { id: 'thumbnail-downloader', name: 'Thumbnail Downloader', description: 'Download video thumbnails', category: 'video', icon: '🖼️', tags: ['thumbnail', 'download'], route: '/tools/thumbnail-downloader' },
  { id: 'screen-recorder', name: 'Screen Recorder', description: 'Record your screen', category: 'video', icon: '🎥', tags: ['screen', 'record'], route: '/tools/screen-recorder' },

  // 5. AI TOOLS (10)
  { id: 'ai-text-generator', name: 'AI Text Generator', description: 'Generate text with AI', category: 'ai', icon: '🤖', tags: ['ai', 'text'], new: true, route: '/tools/ai-text-generator' },
  { id: 'ai-resume-writer', name: 'AI Resume Writer', description: 'AI-powered resume writing', category: 'ai', icon: '📄', tags: ['ai', 'resume'], new: true, route: '/tools/ai-resume-writer' },
  { id: 'ai-code-generator', name: 'AI Code Generator', description: 'Generate code with AI', category: 'ai', icon: '💻', tags: ['ai', 'code'], new: true, route: '/tools/ai-code-generator' },
  { id: 'ai-email-writer', name: 'AI Email Writer', description: 'Write emails with AI', category: 'ai', icon: '✉️', tags: ['ai', 'email'], new: true, route: '/tools/ai-email-writer' },
  { id: 'ai-paraphraser', name: 'AI Paraphraser', description: 'Rephrase text', category: 'ai', icon: '🔄', tags: ['ai', 'paraphrase'], route: '/tools/ai-paraphraser' },
  { id: 'ai-summarizer', name: 'AI Summarizer', description: 'Summarize long text', category: 'ai', icon: '📊', tags: ['ai', 'summarize'], route: '/tools/ai-summarizer' },
  { id: 'ai-chatbot', name: 'AI Chatbot', description: 'Chat with AI', category: 'ai', icon: '💬', tags: ['ai', 'chat'], route: '/tools/ai-chatbot' },
  { id: 'ai-blog-generator', name: 'AI Blog Generator', description: 'Generate blog posts', category: 'ai', icon: '📝', tags: ['ai', 'blog'], route: '/tools/ai-blog-generator' },
  { id: 'ai-grammar-fixer', name: 'AI Grammar Fixer', description: 'Fix grammar errors', category: 'ai', icon: '✏️', tags: ['ai', 'grammar'], route: '/tools/ai-grammar-fixer' },
  { id: 'ai-idea-generator', name: 'AI Idea Generator', description: 'Generate creative ideas', category: 'ai', icon: '💡', tags: ['ai', 'ideas'], route: '/tools/ai-idea-generator' },
  { id: 'ai-translator', name: 'AI Translator', description: 'Translate text between languages', category: 'ai', icon: '🌐', tags: ['ai', 'translate', 'language'], new: true, route: '/tools/ai-translator' },
  { id: 'ai-sentiment-analyzer', name: 'AI Sentiment Analyzer', description: 'Analyze text sentiment and emotions', category: 'ai', icon: '😊', tags: ['ai', 'sentiment', 'emotion'], new: true, route: '/tools/ai-sentiment-analyzer' },
  { id: 'ai-keyword-extractor', name: 'AI Keyword Extractor', description: 'Extract keywords from text', category: 'ai', icon: '🔑', tags: ['ai', 'keywords', 'seo'], new: true, route: '/tools/ai-keyword-extractor' },
  { id: 'ai-content-improver', name: 'AI Content Improver', description: 'Improve and enhance your content', category: 'ai', icon: '✨', tags: ['ai', 'improve', 'enhance'], new: true, route: '/tools/ai-content-improver' },
  { id: 'ai-title-generator', name: 'AI Title Generator', description: 'Generate catchy titles and headlines', category: 'ai', icon: '📰', tags: ['ai', 'title', 'headline'], new: true, route: '/tools/ai-title-generator' },
  { id: 'ai-meta-description', name: 'AI Meta Description', description: 'Generate SEO meta descriptions', category: 'ai', icon: '🏷️', tags: ['ai', 'seo', 'meta'], new: true, route: '/tools/ai-meta-description' },
  { id: 'ai-product-description', name: 'AI Product Description', description: 'Generate product descriptions', category: 'ai', icon: '🛍️', tags: ['ai', 'product', 'ecommerce'], new: true, route: '/tools/ai-product-description' },
  { id: 'ai-social-post', name: 'AI Social Post Generator', description: 'Generate social media posts', category: 'ai', icon: '📱', tags: ['ai', 'social', 'post'], new: true, route: '/tools/ai-social-post' },
  { id: 'ai-essay-writer', name: 'AI Essay Writer', description: 'Write essays and articles', category: 'ai', icon: '📚', tags: ['ai', 'essay', 'writing'], new: true, route: '/tools/ai-essay-writer' },
  { id: 'ai-poem-generator', name: 'AI Poem Generator', description: 'Generate creative poems', category: 'ai', icon: '🎭', tags: ['ai', 'poem', 'creative'], new: true, route: '/tools/ai-poem-generator' },

  // 6. DEVELOPER TOOLS (11)
  { id: 'json-formatter', name: 'JSON Formatter', description: 'Format and validate JSON', category: 'developer', icon: '{ }', tags: ['json', 'format'], route: '/tools/json-formatter' },
  { id: 'base64-encoder', name: 'Base64 Encoder/Decoder', description: 'Encode/decode Base64', category: 'developer', icon: '🔐', tags: ['base64', 'encode'], route: '/tools/base64-encoder' },
  { id: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode JWT tokens', category: 'developer', icon: '🔑', tags: ['jwt', 'token'], route: '/tools/jwt-decoder' },
  { id: 'regex-tester', name: 'Regex Tester', description: 'Test regular expressions', category: 'developer', icon: '🔍', tags: ['regex', 'test'], route: '/tools/regex-tester' },
  { id: 'html-minifier', name: 'HTML Minifier', description: 'Minify HTML code', category: 'developer', icon: '📄', tags: ['html', 'minify'], route: '/tools/html-minifier' },
  { id: 'css-minifier', name: 'CSS Minifier', description: 'Minify CSS code', category: 'developer', icon: '🎨', tags: ['css', 'minify'], route: '/tools/css-minifier' },
  { id: 'js-minifier', name: 'JavaScript Minifier', description: 'Minify JS code', category: 'developer', icon: '⚡', tags: ['javascript', 'minify'], route: '/tools/js-minifier' },
  { id: 'api-tester', name: 'API Tester', description: 'Test API endpoints', category: 'developer', icon: '🔌', tags: ['api', 'test'], route: '/tools/api-tester' },
  { id: 'sql-formatter', name: 'SQL Formatter', description: 'Format SQL queries', category: 'developer', icon: '🗄️', tags: ['sql', 'format'], route: '/tools/sql-formatter' },
  { id: 'code-beautifier', name: 'Code Beautifier', description: 'Beautify code', category: 'developer', icon: '✨', tags: ['code', 'beautify'], route: '/tools/code-beautifier' },
  { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate UUIDs', category: 'developer', icon: '🆔', tags: ['uuid', 'generate'], route: '/tools/uuid-generator' },

  // 7. FINANCE TOOLS (8)
  { id: 'emi-calculator', name: 'EMI Calculator', description: 'Calculate loan EMI', category: 'finance', icon: '💰', tags: ['emi', 'loan'], route: '/tools/emi-calculator' },
  { id: 'loan-calculator', name: 'Loan Calculator', description: 'Calculate loan details', category: 'finance', icon: '🏦', tags: ['loan', 'calculate'], route: '/tools/loan-calculator' },
  { id: 'gst-calculator', name: 'GST Calculator', description: 'Calculate GST', category: 'finance', icon: '📊', tags: ['gst', 'tax'], route: '/tools/gst-calculator' },
  { id: 'currency-converter', name: 'Currency Converter', description: 'Convert currencies', category: 'finance', icon: '💱', tags: ['currency', 'convert'], trending: true, route: '/tools/currency-converter' },
  { id: 'profit-loss', name: 'Profit/Loss Calculator', description: 'Calculate P&L', category: 'finance', icon: '📈', tags: ['profit', 'loss'], route: '/tools/profit-loss' },
  { id: 'sip-calculator', name: 'SIP Calculator', description: 'Calculate SIP returns', category: 'finance', icon: '💹', tags: ['sip', 'investment'], route: '/tools/sip-calculator' },
  { id: 'tax-estimator', name: 'Tax Estimator', description: 'Estimate taxes', category: 'finance', icon: '🧾', tags: ['tax', 'estimate'], route: '/tools/tax-estimator' },
  { id: 'budget-planner', name: 'Budget Planner', description: 'Plan your budget', category: 'finance', icon: '💼', tags: ['budget', 'plan'], route: '/tools/budget-planner' },

  // 8. DATA TOOLS (8)
  { id: 'csv-to-json', name: 'CSV to JSON', description: 'Convert CSV to JSON', category: 'data', icon: '📊', tags: ['csv', 'json'], route: '/tools/csv-to-json' },
  { id: 'json-to-csv', name: 'JSON to CSV', description: 'Convert JSON to CSV', category: 'data', icon: '📋', tags: ['json', 'csv'], route: '/tools/json-to-csv' },
  { id: 'excel-viewer', name: 'Excel Viewer', description: 'View Excel files', category: 'data', icon: '📗', tags: ['excel', 'view'], route: '/tools/excel-viewer' },
  { id: 'data-visualizer', name: 'Data Visualizer', description: 'Visualize data', category: 'data', icon: '📈', tags: ['data', 'visualize'], route: '/tools/data-visualizer' },
  { id: 'chart-generator', name: 'Chart Generator', description: 'Generate charts', category: 'data', icon: '📊', tags: ['chart', 'generate'], route: '/tools/chart-generator' },
  { id: 'random-data', name: 'Random Data Generator', description: 'Generate test data', category: 'data', icon: '🎲', tags: ['random', 'data'], route: '/tools/random-data' },
  { id: 'text-to-table', name: 'Text to Table', description: 'Convert text to table', category: 'data', icon: '📋', tags: ['text', 'table'], route: '/tools/text-to-table' },
  { id: 'word-counter', name: 'Word Counter', description: 'Count words and characters', category: 'data', icon: '🔢', tags: ['word', 'count'], trending: true, route: '/tools/word-counter' },

  // 9. STUDENT TOOLS (8)
  { id: 'flashcards', name: 'Flashcards Generator', description: 'Create flashcards', category: 'student', icon: '🎴', tags: ['flashcard', 'study'], route: '/tools/flashcards' },
  { id: 'plagiarism-checker', name: 'Plagiarism Checker', description: 'Check for plagiarism', category: 'student', icon: '🔍', tags: ['plagiarism', 'check'], route: '/tools/plagiarism-checker' },
  { id: 'citation-generator', name: 'Citation Generator', description: 'Generate citations', category: 'student', icon: '📚', tags: ['citation', 'reference'], route: '/tools/citation-generator' },
  { id: 'study-timer', name: 'Study Timer', description: 'Pomodoro timer', category: 'student', icon: '⏱️', tags: ['timer', 'study'], trending: true, route: '/tools/study-timer' },
  { id: 'formula-calculator', name: 'Formula Calculator', description: 'Calculate formulas', category: 'student', icon: '🧮', tags: ['formula', 'math'], route: '/tools/formula-calculator' },
  { id: 'unit-converter', name: 'Unit Converter', description: 'Convert units', category: 'student', icon: '📏', tags: ['unit', 'convert'], trending: true, route: '/tools/unit-converter' },
  { id: 'gpa-calculator', name: 'GPA Calculator', description: 'Calculate GPA', category: 'student', icon: '🎓', tags: ['gpa', 'grade'], route: '/tools/gpa-calculator' },
  { id: 'vtu-cgpa-calculator', name: 'VTU CGPA Calculator', description: 'Calculate VTU CGPA with credits', category: 'student', icon: '🎯', tags: ['vtu', 'cgpa', 'calculator', 'credits'], trending: true, new: true, route: '/tools/vtu-cgpa-calculator' },

  // 10. WEB & SEO TOOLS (6)
  { id: 'website-screenshot', name: 'Website Screenshot', description: 'Capture website screenshots', category: 'web', icon: '📸', tags: ['screenshot', 'website'], route: '/tools/website-screenshot' },
  { id: 'meta-tag-generator', name: 'Meta Tag Generator', description: 'Generate meta tags', category: 'web', icon: '🏷️', tags: ['meta', 'seo'], route: '/tools/meta-tag-generator' },
  { id: 'seo-analyzer', name: 'SEO Analyzer', description: 'Analyze SEO', category: 'web', icon: '🔍', tags: ['seo', 'analyze'], route: '/tools/seo-analyzer' },
  { id: 'keyword-density', name: 'Keyword Density Tool', description: 'Check keyword density', category: 'web', icon: '🔑', tags: ['keyword', 'density'], route: '/tools/keyword-density' },
  { id: 'sitemap-generator', name: 'Sitemap Generator', description: 'Generate XML sitemaps', category: 'web', icon: '🗺️', tags: ['sitemap', 'xml'], route: '/tools/sitemap-generator' },
  { id: 'robots-txt', name: 'Robots.txt Generator', description: 'Generate robots.txt', category: 'web', icon: '🤖', tags: ['robots', 'seo'], route: '/tools/robots-txt' },

  // 11. SECURITY TOOLS (7)
  { id: 'password-generator', name: 'Password Generator', description: 'Generate secure passwords', category: 'security', icon: '🔐', tags: ['password', 'generate'], trending: true, route: '/tools/password-generator' },
  { id: 'password-strength', name: 'Password Strength Checker', description: 'Check password strength', category: 'security', icon: '💪', tags: ['password', 'strength'], route: '/tools/password-strength' },
  { id: 'hash-generator', name: 'Hash Generator', description: 'Generate hashes', category: 'security', icon: '#️⃣', tags: ['hash', 'md5', 'sha'], route: '/tools/hash-generator' },
  { id: 'encryption-tool', name: 'Encryption Tool', description: 'Encrypt/decrypt text', category: 'security', icon: '🔒', tags: ['encrypt', 'decrypt'], route: '/tools/encryption-tool' },
  { id: 'ip-lookup', name: 'IP Lookup', description: 'Lookup IP information', category: 'security', icon: '🌐', tags: ['ip', 'lookup'], route: '/tools/ip-lookup' },
  { id: 'email-validator', name: 'Email Validator', description: 'Validate email addresses', category: 'security', icon: '✉️', tags: ['email', 'validate'], route: '/tools/email-validator' },
  { id: 'url-safety', name: 'URL Safety Checker', description: 'Check URL safety', category: 'security', icon: '🛡️', tags: ['url', 'safety'], route: '/tools/url-safety' },

  // 12. UTILITY TOOLS (30)
  { id: 'text-case-converter', name: 'Text Case Converter', description: 'Convert text case', category: 'utility', icon: 'Aa', tags: ['text', 'case'], trending: true, route: '/tools/text-case-converter' },
  { id: 'remove-duplicates', name: 'Remove Duplicate Lines', description: 'Remove duplicates', category: 'utility', icon: '🗑️', tags: ['duplicate', 'remove'], route: '/tools/remove-duplicates' },
  { id: 'lorem-ipsum', name: 'Lorem Ipsum Generator', description: 'Generate placeholder text', category: 'utility', icon: '📝', tags: ['lorem', 'ipsum'], route: '/tools/lorem-ipsum' },
  { id: 'random-name', name: 'Random Name Generator', description: 'Generate random names', category: 'utility', icon: '👤', tags: ['random', 'name'], route: '/tools/random-name' },
  { id: 'countdown-timer', name: 'Countdown Timer', description: 'Create countdowns', category: 'utility', icon: '⏰', tags: ['countdown', 'timer'], route: '/tools/countdown-timer' },
  { id: 'qr-generator', name: 'QR Code Generator', description: 'Generate QR codes', category: 'utility', icon: '📱', tags: ['qr', 'code'], trending: true, route: '/tools/qr-generator' },
  { id: 'barcode-generator', name: 'Barcode Generator', description: 'Generate barcodes', category: 'utility', icon: '▐▌▐', tags: ['barcode', 'generate'], route: '/tools/barcode-generator' },
  { id: 'stopwatch', name: 'Stopwatch', description: 'Precise time tracking', category: 'utility', icon: '⏱️', tags: ['stopwatch', 'timer'], route: '/tools/stopwatch' },
  { id: 'world-clock', name: 'World Clock', description: 'View time across timezones', category: 'utility', icon: '🌍', tags: ['clock', 'timezone'], route: '/tools/world-clock' },
  { id: 'color-palette-generator', name: 'Color Palette Generator', description: 'Generate color schemes', category: 'utility', icon: '🎨', tags: ['color', 'palette'], route: '/tools/color-palette-generator' },
  { id: 'gradient-generator', name: 'Gradient Generator', description: 'Create CSS gradients', category: 'utility', icon: '🌈', tags: ['gradient', 'css'], route: '/tools/gradient-generator' },
  { id: 'text-diff-checker', name: 'Text Diff Checker', description: 'Compare text differences', category: 'utility', icon: '🔀', tags: ['diff', 'compare'], route: '/tools/text-diff-checker' },
  { id: 'character-counter', name: 'Character Counter', description: 'Count characters and words', category: 'utility', icon: '🔢', tags: ['character', 'count'], route: '/tools/character-counter' },
  { id: 'text-reverser', name: 'Text Reverser', description: 'Reverse text and words', category: 'utility', icon: '🔄', tags: ['reverse', 'text'], route: '/tools/text-reverser' },
  { id: 'url-encoder-decoder', name: 'URL Encoder/Decoder', description: 'Encode and decode URLs', category: 'utility', icon: '🔗', tags: ['url', 'encode'], route: '/tools/url-encoder-decoder' },
  { id: 'html-encoder-decoder', name: 'HTML Encoder/Decoder', description: 'Encode and decode HTML entities', category: 'utility', icon: '🏷️', tags: ['html', 'encode'], route: '/tools/html-encoder-decoder' },
  { id: 'markdown-to-html', name: 'Markdown to HTML', description: 'Convert Markdown to HTML', category: 'utility', icon: '📄', tags: ['markdown', 'html'], route: '/tools/markdown-to-html' },
  { id: 'html-to-markdown', name: 'HTML to Markdown', description: 'Convert HTML to Markdown', category: 'utility', icon: '📃', tags: ['html', 'markdown'], route: '/tools/html-to-markdown' },
  { id: 'text-to-binary', name: 'Text to Binary Converter', description: 'Convert text to binary', category: 'utility', icon: '0️⃣1️⃣', tags: ['binary', 'convert'], route: '/tools/text-to-binary' },
  { id: 'morse-code-translator', name: 'Morse Code Translator', description: 'Translate to/from Morse code', category: 'utility', icon: '•−•', tags: ['morse', 'code'], route: '/tools/morse-code-translator' },
  { id: 'ascii-art-generator', name: 'ASCII Art Generator', description: 'Create ASCII art from text', category: 'utility', icon: '🖼️', tags: ['ascii', 'art'], route: '/tools/ascii-art-generator' },
  { id: 'text-to-slug', name: 'Text to Slug Converter', description: 'Convert text to URL slugs', category: 'utility', icon: '🔤', tags: ['slug', 'url'], route: '/tools/text-to-slug' },
  { id: 'random-number-generator', name: 'Random Number Generator', description: 'Generate random numbers', category: 'utility', icon: '🎲', tags: ['random', 'number'], route: '/tools/random-number-generator' },
  { id: 'random-password', name: 'Random Password Generator', description: 'Generate secure random passwords', category: 'utility', icon: '🔐', tags: ['password', 'random'], route: '/tools/random-password' },
  { id: 'list-randomizer', name: 'List Randomizer', description: 'Shuffle and randomize lists', category: 'utility', icon: '🔀', tags: ['list', 'shuffle'], route: '/tools/list-randomizer' },
  { id: 'text-sorter', name: 'Text Sorter', description: 'Sort lines alphabetically', category: 'utility', icon: '🔤', tags: ['sort', 'alphabetical'], route: '/tools/text-sorter' },
  { id: 'whitespace-remover', name: 'Whitespace Remover', description: 'Remove extra whitespace', category: 'utility', icon: '⬜', tags: ['whitespace', 'clean'], route: '/tools/whitespace-remover' },
  { id: 'line-break-remover', name: 'Line Break Remover', description: 'Remove line breaks from text', category: 'utility', icon: '↩️', tags: ['linebreak', 'remove'], route: '/tools/line-break-remover' },
  { id: 'text-replacer', name: 'Text Find & Replace', description: 'Find and replace text', category: 'utility', icon: '🔍', tags: ['find', 'replace'], route: '/tools/text-replacer' },
  { id: 'text-splitter', name: 'Text Splitter', description: 'Split text by delimiter', category: 'utility', icon: '✂️', tags: ['split', 'text'], route: '/tools/text-splitter' },
  { id: 'text-joiner', name: 'Text Joiner', description: 'Join text with delimiter', category: 'utility', icon: '🔗', tags: ['join', 'text'], route: '/tools/text-joiner' },
  { id: 'number-formatter', name: 'Number Formatter', description: 'Format numbers with commas', category: 'utility', icon: '💯', tags: ['number', 'format'], route: '/tools/number-formatter' },
  { id: 'roman-numeral-converter', name: 'Roman Numeral Converter', description: 'Convert to/from Roman numerals', category: 'utility', icon: 'Ⅰ', tags: ['roman', 'numeral'], route: '/tools/roman-numeral-converter' },

  // 13. AUDIO TOOLS (7)
  { id: 'audio-cutter', name: 'Audio Cutter', description: 'Cut audio files', category: 'audio', icon: '✂️', tags: ['audio', 'cut'], route: '/tools/audio-cutter' },
  { id: 'audio-compressor', name: 'Audio Compressor', description: 'Compress audio', category: 'audio', icon: '🗜️', tags: ['audio', 'compress'], route: '/tools/audio-compressor' },
  { id: 'audio-converter', name: 'Audio Converter', description: 'Convert audio formats', category: 'audio', icon: '🔄', tags: ['audio', 'convert'], route: '/tools/audio-converter' },
  { id: 'voice-recorder', name: 'Voice Recorder', description: 'Record voice', category: 'audio', icon: '🎤', tags: ['voice', 'record'], route: '/tools/voice-recorder' },
  { id: 'audio-joiner', name: 'Audio Joiner', description: 'Join audio files', category: 'audio', icon: '🔗', tags: ['audio', 'join'], route: '/tools/audio-joiner' },
  { id: 'noise-reducer', name: 'Noise Reducer', description: 'Reduce background noise', category: 'audio', icon: '🔇', tags: ['noise', 'reduce'], route: '/tools/noise-reducer' },
  { id: 'audio-speed', name: 'Audio Speed Changer', description: 'Change audio speed', category: 'audio', icon: '⚡', tags: ['audio', 'speed'], route: '/tools/audio-speed' },

  // 14. ENTERTAINMENT TOOLS (7)
  { id: 'random-picker', name: 'Random Picker Wheel', description: 'Random selection wheel', category: 'entertainment', icon: '🎰', tags: ['random', 'picker'], route: '/tools/random-picker' },
  { id: 'truth-dare', name: 'Truth or Dare Generator', description: 'Generate truth or dare', category: 'entertainment', icon: '🎭', tags: ['truth', 'dare', 'game'], route: '/tools/truth-dare' },
  { id: 'dice-roller', name: 'Dice Roller', description: 'Roll virtual dice', category: 'entertainment', icon: '🎲', tags: ['dice', 'roll'], route: '/tools/dice-roller' },
  { id: 'quiz-generator', name: 'Fun Quiz Generator', description: 'Create fun quizzes', category: 'entertainment', icon: '❓', tags: ['quiz', 'fun'], route: '/tools/quiz-generator' },
  { id: 'movie-picker', name: 'Random Movie Picker', description: 'Pick random movies', category: 'entertainment', icon: '🎬', tags: ['movie', 'random'], route: '/tools/movie-picker' },
  { id: 'name-picker', name: 'Name Picker', description: 'Pick random names', category: 'entertainment', icon: '🎯', tags: ['name', 'picker'], route: '/tools/name-picker' },
  { id: 'decision-maker', name: 'Decision Maker', description: 'Help make decisions', category: 'entertainment', icon: '🤔', tags: ['decision', 'maker'], route: '/tools/decision-maker' },

  // 15. WRITING TOOLS (5)
  { id: 'essay-generator', name: 'Essay Generator', description: 'Generate essays', category: 'writing', icon: '📝', tags: ['essay', 'write'], route: '/tools/essay-generator' },
  { id: 'story-generator', name: 'Story Generator', description: 'Generate stories', category: 'writing', icon: '📖', tags: ['story', 'write'], route: '/tools/story-generator' },
  { id: 'headline-generator', name: 'Headline Generator', description: 'Generate headlines', category: 'writing', icon: '📰', tags: ['headline', 'title'], route: '/tools/headline-generator' },
  { id: 'readability-checker', name: 'Readability Checker', description: 'Check text readability', category: 'writing', icon: '👓', tags: ['readability', 'check'], route: '/tools/readability-checker' },
  { id: 'keyword-rewriter', name: 'Keyword Rewriter', description: 'Rewrite with keywords', category: 'writing', icon: '🔄', tags: ['keyword', 'rewrite'], route: '/tools/keyword-rewriter' },

  // 16. BUSINESS TOOLS (7)
  { id: 'business-name', name: 'Business Name Generator', description: 'Generate business names', category: 'business', icon: '🏢', tags: ['business', 'name'], route: '/tools/business-name' },
  { id: 'startup-validator', name: 'Startup Idea Validator', description: 'Validate startup ideas', category: 'business', icon: '🚀', tags: ['startup', 'validate'], route: '/tools/startup-validator' },
  { id: 'invoice-generator', name: 'Invoice Generator', description: 'Generate invoices', category: 'business', icon: '🧾', tags: ['invoice', 'generate'], route: '/tools/invoice-generator' },
  { id: 'receipt-generator', name: 'Receipt Generator', description: 'Generate receipts', category: 'business', icon: '🧾', tags: ['receipt', 'generate'], route: '/tools/receipt-generator' },
  { id: 'pitch-deck', name: 'Pitch Deck Generator', description: 'Create pitch decks', category: 'business', icon: '📊', tags: ['pitch', 'deck'], route: '/tools/pitch-deck' },
  { id: 'swot-analysis', name: 'SWOT Analysis Tool', description: 'Create SWOT analysis', category: 'business', icon: '📈', tags: ['swot', 'analysis'], route: '/tools/swot-analysis' },
  { id: 'market-calculator', name: 'Market Size Calculator', description: 'Calculate market size', category: 'business', icon: '💹', tags: ['market', 'size'], route: '/tools/market-calculator' },

  // 17. SOCIAL MEDIA TOOLS (6)
  { id: 'caption-generator', name: 'Caption Generator', description: 'Generate captions', category: 'social', icon: '💬', tags: ['caption', 'social'], route: '/tools/caption-generator' },
  { id: 'hashtag-generator', name: 'Hashtag Generator', description: 'Generate hashtags', category: 'social', icon: '#️⃣', tags: ['hashtag', 'social'], route: '/tools/hashtag-generator' },
  { id: 'bio-generator', name: 'Bio Generator', description: 'Generate social bios', category: 'social', icon: '👤', tags: ['bio', 'social'], route: '/tools/bio-generator' },
  { id: 'post-scheduler', name: 'Post Scheduler', description: 'Schedule social posts', category: 'social', icon: '📅', tags: ['schedule', 'post'], route: '/tools/post-scheduler' },
  { id: 'engagement-calculator', name: 'Engagement Calculator', description: 'Calculate engagement', category: 'social', icon: '📊', tags: ['engagement', 'social'], route: '/tools/engagement-calculator' },
  { id: 'social-analyzer', name: 'Social Media Analyzer', description: 'Analyze social media', category: 'social', icon: '📈', tags: ['analyze', 'social'], route: '/tools/social-analyzer' },

  // 18. CONVERTER TOOLS (7)
  { id: 'length-converter', name: 'Length Converter', description: 'Convert lengths', category: 'converter', icon: '📏', tags: ['length', 'convert'], route: '/tools/length-converter' },
  { id: 'weight-converter', name: 'Weight Converter', description: 'Convert weights', category: 'converter', icon: '⚖️', tags: ['weight', 'convert'], route: '/tools/weight-converter' },
  { id: 'temperature-converter', name: 'Temperature Converter', description: 'Convert temperatures', category: 'converter', icon: '🌡️', tags: ['temperature', 'convert'], route: '/tools/temperature-converter' },
  { id: 'file-converter', name: 'File Converter', description: 'Convert file formats', category: 'converter', icon: '📁', tags: ['file', 'convert'], route: '/tools/file-converter' },
  { id: 'speed-converter', name: 'Speed Converter', description: 'Convert speeds', category: 'converter', icon: '🏃', tags: ['speed', 'convert'], route: '/tools/speed-converter' },
  { id: 'energy-converter', name: 'Energy Converter', description: 'Convert energy units', category: 'converter', icon: '⚡', tags: ['energy', 'convert'], route: '/tools/energy-converter' },
  { id: 'time-converter', name: 'Time Converter', description: 'Convert time zones', category: 'converter', icon: '🕐', tags: ['time', 'convert'], route: '/tools/time-converter' },

  // 19. HEALTH & FITNESS TOOLS (5)
  { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate BMI', category: 'health', icon: '⚖️', tags: ['bmi', 'health'], trending: true, route: '/tools/bmi-calculator' },
  { id: 'calorie-calculator', name: 'Calorie Calculator', description: 'Calculate calories', category: 'health', icon: '🍎', tags: ['calorie', 'health'], route: '/tools/calorie-calculator' },
  { id: 'water-intake', name: 'Water Intake Calculator', description: 'Calculate water intake', category: 'health', icon: '💧', tags: ['water', 'health'], route: '/tools/water-intake' },
  { id: 'workout-planner', name: 'Workout Planner', description: 'Plan workouts', category: 'health', icon: '💪', tags: ['workout', 'fitness'], route: '/tools/workout-planner' },
  { id: 'sleep-calculator', name: 'Sleep Calculator', description: 'Calculate sleep cycles', category: 'health', icon: '😴', tags: ['sleep', 'health'], route: '/tools/sleep-calculator' },

  // 20. ADVANCED TOOLS (6)
  { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate exact age', category: 'advanced', icon: '🎂', tags: ['age', 'calculate'], route: '/tools/age-calculator' },
  { id: 'date-calculator', name: 'Date Calculator', description: 'Calculate dates', category: 'advanced', icon: '📅', tags: ['date', 'calculate'], route: '/tools/date-calculator' },
  { id: 'percentage-calculator', name: 'Percentage Calculator', description: 'Calculate percentages', category: 'advanced', icon: '%', tags: ['percentage', 'math'], route: '/tools/percentage-calculator' },
  { id: 'scientific-calculator', name: 'Scientific Calculator', description: 'Advanced calculations', category: 'advanced', icon: '🔬', tags: ['calculator', 'science'], route: '/tools/scientific-calculator' },
  { id: 'mortgage-calculator', name: 'Mortgage Calculator', description: 'Calculate mortgage', category: 'advanced', icon: '🏠', tags: ['mortgage', 'finance'], route: '/tools/mortgage-calculator' },
  { id: 'tip-calculator', name: 'Tip Calculator', description: 'Calculate tips', category: 'advanced', icon: '💵', tags: ['tip', 'calculate'], route: '/tools/tip-calculator' },

  // 21. MS WORD/DOCUMENT TOOLS (22)
  { id: 'word-reader', name: 'Word Reader/Viewer', description: 'View Word documents online', category: 'word-doc', icon: '📖', tags: ['word', 'reader', 'viewer'], route: '/tools/word-reader' },
  { id: 'word-blank-remover', name: 'Word Blank Page Remover', description: 'Remove blank pages automatically', category: 'word-doc', icon: '🗑️', tags: ['word', 'blank', 'remove'], route: '/tools/word-blank-remover' },
  { id: 'word-repair', name: 'Word Repair', description: 'Repair corrupted Word files', category: 'word-doc', icon: '🔧', tags: ['word', 'repair', 'fix'], route: '/tools/word-repair' },
  { id: 'word-password-protect', name: 'Word Password Protector', description: 'Add password protection', category: 'word-doc', icon: '🔒', tags: ['word', 'password', 'protect'], route: '/tools/word-password-protect' },
  { id: 'word-password-remove', name: 'Word Password Remover', description: 'Remove password protection', category: 'word-doc', icon: '🔓', tags: ['word', 'password', 'unlock'], route: '/tools/word-password-remove' },
  { id: 'word-toc', name: 'Word Table of Contents', description: 'Generate table of contents', category: 'word-doc', icon: '📑', tags: ['word', 'toc', 'contents'], route: '/tools/word-toc' },
  { id: 'word-header-footer', name: 'Word Header/Footer Editor', description: 'Add/edit headers and footers', category: 'word-doc', icon: '📋', tags: ['word', 'header', 'footer'], route: '/tools/word-header-footer' },
  { id: 'word-rotate', name: 'Word Page Rotator', description: 'Rotate pages in Word documents', category: 'word-doc', icon: '🔄', tags: ['word', 'rotate', 'pages'], route: '/tools/word-rotate' },
  { id: 'word-organizer', name: 'Word Page Organizer', description: 'Reorder pages in Word documents', category: 'word-doc', icon: '📂', tags: ['word', 'organize', 'reorder'], route: '/tools/word-organizer' },
  { id: 'word-merger', name: 'Word Merger', description: 'Combine multiple Word documents', category: 'word-doc', icon: '🔗', tags: ['word', 'merge', 'combine'], route: '/tools/word-merger' },
  { id: 'word-page-remover', name: 'Word Page Remover', description: 'Remove specific pages from Word docs', category: 'word-doc', icon: '✂️', tags: ['word', 'remove', 'pages'], route: '/tools/word-page-remover' },
  { id: 'word-splitter', name: 'Word Splitter', description: 'Split Word document into separate files', category: 'word-doc', icon: '📄', tags: ['word', 'split', 'divide'], route: '/tools/word-splitter' },
  { id: 'word-compressor', name: 'Word Compressor', description: 'Reduce Word file size', category: 'word-doc', icon: '🗜️', tags: ['word', 'compress', 'reduce'], route: '/tools/word-compressor' },
  { id: 'word-to-pdf-converter', name: 'Word to PDF', description: 'Convert DOCX files to PDF format', category: 'word-doc', icon: '📕', tags: ['word', 'pdf', 'convert'], route: '/tools/word-to-pdf-converter' },
  { id: 'pdf-to-word-converter', name: 'PDF to Word', description: 'Convert PDF files to editable DOCX', category: 'word-doc', icon: '📘', tags: ['pdf', 'word', 'convert'], route: '/tools/pdf-to-word-converter' },
  { id: 'word-page-numbers', name: 'Word Page Number Editor', description: 'Add/edit page numbers in Word documents', category: 'word-doc', icon: '🔢', tags: ['word', 'page', 'numbers'], route: '/tools/word-page-numbers' },
  { id: 'word-plagiarism', name: 'Word Plagiarism Checker', description: 'Check for plagiarism in documents', category: 'word-doc', icon: '🔍', tags: ['word', 'plagiarism', 'check'], route: '/tools/word-plagiarism' },
  { id: 'word-citation', name: 'Word Citation Generator', description: 'Generate citations (APA, MLA, Chicago)', category: 'word-doc', icon: '📚', tags: ['word', 'citation', 'reference'], route: '/tools/word-citation' },
  { id: 'word-cover-page', name: 'Word Cover Page Generator', description: 'Create professional cover pages', category: 'word-doc', icon: '📃', tags: ['word', 'cover', 'page'], route: '/tools/word-cover-page' },
  { id: 'word-margin', name: 'Word Margin Adjuster', description: 'Set standard academic margins', category: 'word-doc', icon: '📐', tags: ['word', 'margin', 'adjust'], route: '/tools/word-margin' },
  { id: 'word-outline', name: 'Word Outline Generator', description: 'Create essay outlines', category: 'word-doc', icon: '📝', tags: ['word', 'outline', 'essay'], route: '/tools/word-outline' },
  { id: 'word-spacing', name: 'Word Line Spacing Tool', description: 'Adjust line spacing (single, double)', category: 'word-doc', icon: '↕️', tags: ['word', 'spacing', 'line'], route: '/tools/word-spacing' },
];
