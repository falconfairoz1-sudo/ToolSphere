'use client';

import { useState } from 'react';
import { Sparkles, PenTool, Copy, Check, Download, Loader2, Wand2, FileText, Zap, Lightbulb } from 'lucide-react';

type ContentType = 'blog-post' | 'article' | 'social-media' | 'product-description' | 'email' | 'ad-copy' | 'story' | 'script';
type ToneType = 'professional' | 'casual' | 'friendly' | 'formal' | 'humorous' | 'persuasive' | 'informative' | 'creative';
type LengthType = 'short' | 'medium' | 'long';

export default function AIContentWriter() {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [contentType, setContentType] = useState<ContentType>('blog-post');
  const [tone, setTone] = useState<ToneType>('professional');
  const [length, setLength] = useState<LengthType>('medium');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const contentTypes = [
    { value: 'blog-post', label: 'Blog Post', icon: '📝' },
    { value: 'article', label: 'Article', icon: '📰' },
    { value: 'social-media', label: 'Social Media', icon: '📱' },
    { value: 'product-description', label: 'Product Description', icon: '🛍️' },
    { value: 'email', label: 'Email', icon: '✉️' },
    { value: 'ad-copy', label: 'Ad Copy', icon: '📢' },
    { value: 'story', label: 'Story', icon: '📖' },
    { value: 'script', label: 'Script', icon: '🎬' }
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'formal', label: 'Formal' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'persuasive', label: 'Persuasive' },
    { value: 'informative', label: 'Informative' },
    { value: 'creative', label: 'Creative' }
  ];

  const generateContent = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const keywordList = keywords.split(',').map(k => k.trim()).filter(k => k);
      let generatedContent = '';
      switch (contentType) {
        case 'blog-post': generatedContent = generateBlogPost(topic, keywordList, tone, length); break;
        case 'article': generatedContent = generateArticle(topic, keywordList, tone, length); break;
        case 'social-media': generatedContent = generateSocialMedia(topic, keywordList, tone); break;
        case 'product-description': generatedContent = generateProductDescription(topic, keywordList, tone, length); break;
        case 'email': generatedContent = generateEmail(topic, keywordList, tone, length); break;
        case 'ad-copy': generatedContent = generateAdCopy(topic, keywordList, tone); break;
        case 'story': generatedContent = generateStory(topic, keywordList, tone, length); break;
        case 'script': generatedContent = generateScript(topic, keywordList, tone, length); break;
      }
      setOutput(generatedContent);
      setLoading(false);
    }, 1500);
  };

  const generateBlogPost = (topic: string, keywords: string[], tone: string, length: string) => {
    const intro = getToneText(tone, `Welcome to ${topic}. Understanding ${topic} is important.`, `Hey! Let's explore ${topic}!`, `Hi! Today we talk about ${topic}.`);
    const body1 = `${topic} is significant. ${keywords.length > 0 ? 'Key concepts: ' + keywords.slice(0, 3).join(', ') : ''} Understanding helps us appreciate implications.`;
    const body2 = length !== 'short' ? `\n\nExamining ${topic} reveals important factors. ${keywords.length > 1 ? 'Important: ' + keywords[keywords.length - 1] : ''} This empowers informed decisions.` : '';
    const body3 = length === 'long' ? `\n\nApplications of ${topic} extend across domains. Experts recommend starting with basics. Examples demonstrate tangible benefits.` : '';
    const conclusion = getToneText(tone, `\n\nIn conclusion, ${topic} offers valuable insights.`, `\n\nSo there you have it! ${topic} is not complicated.`, `\n\nThanks for reading about ${topic}!`);
    return `# ${topic}: A Complete Guide\n\n${intro}\n\n## Understanding ${topic}\n\n${body1}${body2}${body3}${conclusion}`;
  };

  const generateArticle = (topic: string, keywords: string[], tone: string, length: string) => {
    const headline = `${topic}: What You Need to Know`;
    const intro = `${topic} has emerged as critical. This examines key aspects of ${topic}.`;
    const section1 = `\n\n## Background\n\n${topic} reflects broader trends. ${keywords.length > 0 ? 'Factors: ' + keywords.slice(0, 2).join(', ') : ''} Context provides perspective.`;
    const section2 = length !== 'short' ? `\n\n## Current Trends\n\nToday, ${topic} manifests in various forms. ${keywords.length > 1 ? keywords[keywords.length - 1] + ' shows promise.' : ''} Studies reveal successes.` : '';
    const section3 = length === 'long' ? `\n\n## Future\n\n${topic} is poised for evolution. Experts predict developments. Staying informed is key.` : '';
    return `# ${headline}\n\n${intro}${section1}${section2}${section3}`;
  };

  const generateSocialMedia = (topic: string, keywords: string[], tone: string) => {
    const hashtags = keywords.length > 0 ? keywords.map(k => '#' + k.replace(/\s+/g, '')).join(' ') : '#' + topic.replace(/\s+/g, '');
    const posts = {
      professional: `🎯 ${topic}: Key insights\n\n✅ Essential knowledge\n✅ Practical applications\n\nLearn about ${topic}.\n\n${hashtags}`,
      casual: `Hey! 👋 ${topic} is cool!\n\n${keywords.length > 0 ? keywords[0] + ' is interesting!' : ''}\n\nLet's chat! 💬\n\n${hashtags}`,
      friendly: `Hi friends! 😊\n\nThoughts on ${topic}!\n\n${keywords.length > 0 ? '💡 ' + keywords[0] : ''}\n\nDrop a comment! 👇\n\n${hashtags}`,
      default: `📢 ${topic}\n\n${keywords.length > 0 ? keywords.slice(0, 3).map(k => '• ' + k).join('\n') : 'Important insights'}\n\n${hashtags}`
    };
    return posts[tone as keyof typeof posts] || posts.default;
  };

  const generateProductDescription = (topic: string, keywords: string[], tone: string, length: string) => {
    const headline = `Introducing: ${topic}`;
    const intro = getToneText(tone, `${topic} delivers quality.`, `Meet ${topic}!`, `You'll love ${topic}!`);
    const features = keywords.length > 0 ? `\n\n**Features:**\n${keywords.map(k => `• ${k}`).join('\n')}` : `\n\n**Features:**\n• Premium quality\n• Great performance`;
    const benefits = length !== 'short' ? `\n\n**Benefits:**\n• Saves time\n• Quality guarantee` : '';
    return `# ${headline}\n\n${intro}${features}${benefits}`;
  };

  const generateEmail = (topic: string, keywords: string[], tone: string, length: string) => {
    const subject = `Important: ${topic}`;
    const greeting = getToneText(tone, `Dear Customer,`, `Hey there!`, `Hi friend!`);
    const body = `\n\nRegarding ${topic}. ${keywords.length > 0 ? 'About ' + keywords[0] : 'Important matter.'}\n\n${length !== 'short' ? 'We value your time. ' : ''}${keywords.length > 1 ? 'Points: ' + keywords.slice(0, 2).join(', ') : 'Review carefully.'}`;
    const action = length === 'long' ? `\n\nSteps:\n1. Review info\n2. Consider options\n3. Take action` : `\n\nPlease review.`;
    const closing = getToneText(tone, `\n\nBest regards,\n[Name]`, `\n\nCheers,\n[Name]`, `\n\nTalk soon!\n[Name]`);
    return `**Subject:** ${subject}\n\n${greeting}${body}${action}${closing}`;
  };

  const generateAdCopy = (topic: string, keywords: string[], tone: string) => {
    const headline = getToneText(tone, `${topic}: Professional Solutions`, `${topic} Made Easy!`, `Love ${topic}!`);
    const body = `${topic} has never been better. ${keywords.length > 0 ? 'With ' + keywords.slice(0, 2).join(', ') : ''} Exceptional value.`;
    const benefits = `\n\n✓ Fast\n✓ Easy\n✓ Proven`;
    return `# ${headline}\n\n${body}${benefits}`;
  };

  const generateStory = (topic: string, keywords: string[], tone: string, length: string) => {
    const title = `The Story of ${topic}`;
    const opening = `Once upon a time, ${topic} was just an idea. ${keywords.length > 0 ? keywords[0] + ' seemed impossible.' : 'Nobody believed.'} But that changed.`;
    const middle = length !== 'short' ? `\n\nThings shifted. ${keywords.length > 1 ? keywords[1] + ' played a role.' : 'New possibilities emerged.'} Determination prevailed.` : '';
    const ending = `\n\nToday, ${topic} stands as proof. ${getToneText(tone, 'Lessons remain valuable.', 'Happily ever after!', 'Amazing journey!')}`;
    return `# ${title}\n\n${opening}${middle}${ending}`;
  };

  const generateScript = (topic: string, keywords: string[], tone: string, length: string) => {
    const title = `${topic} - Script`;
    const scene1 = `**SCENE 1**\n\nNARRATOR: Welcome to ${topic}.\n\n${keywords.length > 0 ? 'HOST: Start with ' + keywords[0] : 'HOST: Let us begin.'}`;
    const scene2 = length !== 'short' ? `\n\n**SCENE 2**\n\nNARRATOR: ${topic} involves key elements. ${keywords.length > 1 ? keywords[1] + ' connects.' : 'Important role.'}\n\nHOST: Interesting!` : '';
    const closing = `\n\n**FINAL SCENE**\n\nHOST: That's ${topic}. ${getToneText(tone, 'Hope this helped.', 'Cool, right?', 'Thanks!')}\n\n**END**`;
    return `# ${title}\n\n${scene1}${scene2}${closing}`;
  };

  const getToneText = (tone: string, professional: string, casual: string, friendly: string) => {
    if (tone === 'professional' || tone === 'formal' || tone === 'informative') return professional;
    if (tone === 'casual' || tone === 'humorous') return casual;
    return friendly;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadOutput = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contentType}-${topic.replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStats = () => {
    const words = output.trim().split(/\s+/).length;
    const characters = output.length;
    const sentences = output.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = output.split(/\n\n+/).filter(p => p.trim()).length;
    return { words, characters, sentences, paragraphs };
  };

  const stats = output ? getStats() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <PenTool className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AI Content Writer</h1>
          </div>
          <p className="text-gray-600 text-lg">Generate high-quality content for any purpose with AI</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3"><FileText className="w-4 h-4 inline mr-2" />Topic / Subject</label>
              <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter your topic..." className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all" />
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3"><Zap className="w-4 h-4 inline mr-2" />Keywords</label>
              <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="keyword1, keyword2..." className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all" />
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-4"><Sparkles className="w-4 h-4 inline mr-2" />Content Type</label>
              <div className="grid grid-cols-2 gap-3">
                {contentTypes.map((type) => (
                  <button key={type.value} onClick={() => setContentType(type.value as ContentType)} className={`p-4 rounded-xl border-2 transition-all text-left ${contentType === type.value ? 'border-purple-500 bg-purple-50 shadow-md' : 'border-gray-200 hover:border-purple-300'}`}>
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <div className="text-sm font-medium text-gray-700">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-4"><Wand2 className="w-4 h-4 inline mr-2" />Tone</label>
              <div className="grid grid-cols-2 gap-2">
                {tones.map((t) => (
                  <button key={t.value} onClick={() => setTone(t.value as ToneType)} className={`px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium ${tone === t.value ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-gray-200 text-gray-600 hover:border-pink-300'}`}>{t.label}</button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-4">Length</label>
              <div className="grid grid-cols-3 gap-3">
                {['short', 'medium', 'long'].map((len) => (
                  <button key={len} onClick={() => setLength(len as LengthType)} className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium capitalize ${length === len ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>{len}</button>
                ))}
              </div>
            </div>
            <button onClick={generateContent} disabled={loading || !topic.trim()} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">
              {loading ? (<><Loader2 className="w-5 h-5 animate-spin" />Generating...</>) : (<><Sparkles className="w-5 h-5" />Generate Content</>)}
            </button>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Generated Content</h3>
                {output && (
                  <div className="flex gap-2">
                    <button onClick={copyToClipboard} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors" title="Copy">{copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-600" />}</button>
                    <button onClick={downloadOutput} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors" title="Download"><Download className="w-5 h-5 text-gray-600" /></button>
                  </div>
                )}
              </div>
              {output ? (
                <div className="prose prose-sm max-w-none"><div className="bg-gray-50 rounded-xl p-6 max-h-[600px] overflow-y-auto whitespace-pre-wrap text-gray-700 leading-relaxed">{output}</div></div>
              ) : (
                <div className="text-center py-16 text-gray-400"><PenTool className="w-16 h-16 mx-auto mb-4 opacity-50" /><p className="text-lg">Your content will appear here</p><p className="text-sm mt-2">Fill details and click Generate</p></div>
              )}
            </div>
            {stats && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4"><div className="text-2xl font-bold text-purple-600">{stats.words}</div><div className="text-sm text-purple-700">Words</div></div>
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4"><div className="text-2xl font-bold text-pink-600">{stats.characters}</div><div className="text-sm text-pink-700">Characters</div></div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4"><div className="text-2xl font-bold text-blue-600">{stats.sentences}</div><div className="text-sm text-blue-700">Sentences</div></div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4"><div className="text-2xl font-bold text-indigo-600">{stats.paragraphs}</div><div className="text-sm text-indigo-700">Paragraphs</div></div>
                </div>
              </div>
            )}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5" />Features</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2"><span className="text-yellow-300 mt-0.5">✓</span><span>8 content types</span></li>
                <li className="flex items-start gap-2"><span className="text-yellow-300 mt-0.5">✓</span><span>8 tone options</span></li>
                <li className="flex items-start gap-2"><span className="text-yellow-300 mt-0.5">✓</span><span>Adjustable length</span></li>
                <li className="flex items-start gap-2"><span className="text-yellow-300 mt-0.5">✓</span><span>Keyword integration</span></li>
                <li className="flex items-start gap-2"><span className="text-yellow-300 mt-0.5">✓</span><span>Copy and download</span></li>
                <li className="flex items-start gap-2"><span className="text-yellow-300 mt-0.5">✓</span><span>Real-time statistics</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
