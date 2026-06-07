'use client';

import { useState } from 'react';
import { Feather, Sparkles, Copy, Download, Heart } from 'lucide-react';

export default function AIPoemGenerator() {
  const [theme, setTheme] = useState('');
  const [poemStyle, setPoemStyle] = useState<'haiku' | 'sonnet' | 'free-verse' | 'limerick' | 'acrostic'>('free-verse');
  const [mood, setMood] = useState<'happy' | 'sad' | 'romantic' | 'inspirational'>('happy');
  const [poem, setPoem] = useState('');
  const [generating, setGenerating] = useState(false);

  const generatePoem = () => {
    if (!theme.trim()) {
      alert('Please enter a theme');
      return;
    }

    setGenerating(true);

    setTimeout(() => {
      let generatedPoem = '';

      switch (poemStyle) {
        case 'haiku':
          generatedPoem = mood === 'happy'
            ? `${theme} brings joy\nSunlight dancing on water\nPeace fills the heart`
            : mood === 'sad'
            ? `${theme} fades away\nSilent tears fall like rain drops\nMemories remain`
            : mood === 'romantic'
            ? `${theme} of love\nTwo hearts beating as one soul\nForever entwined`
            : `${theme} inspires\nDreams take flight on gentle wings\nHope lights the way`;
          break;

        case 'sonnet':
          generatedPoem = `When I contemplate the beauty of ${theme},\nMy heart swells with emotions pure and true,\nLike morning light that breaks through darkest night,\nRevealing wonders in a golden hue.\n\nThe essence of ${theme} speaks to my soul,\nIn whispered words that only hearts can hear,\nIt paints the world in colors bright and bold,\nAnd brings a sense of peace when it draws near.\n\nThrough seasons changing, constant it remains,\nA beacon shining through both joy and strife,\nIts presence felt in sunshine and in rains,\nA testament to all that's good in life.\n\nSo let us celebrate ${theme} today,\nAnd let its beauty guide us on our way.`;
          break;

        case 'limerick':
          generatedPoem = `There once was a ${theme} so bright,\nThat filled every day with delight,\nIt danced and it played,\nIn sunshine and shade,\nAnd made everything feel just right!`;
          break;

        case 'acrostic':
          const letters = theme.toUpperCase().split('').slice(0, 10);
          generatedPoem = letters.map(letter => {
            const words: Record<string, string> = {
              'A': 'Amazing wonders all around',
              'B': 'Beautiful moments to be found',
              'C': 'Cherished memories we hold dear',
              'D': 'Dreams that bring us joy and cheer',
              'E': 'Every day a gift so bright',
              'F': 'Forever shining in the light',
              'G': 'Graceful beauty everywhere',
              'H': 'Happiness beyond compare',
              'I': 'Inspiring hearts with gentle care',
              'J': 'Joyful spirits in the air',
              'K': 'Kindness flowing like a stream',
              'L': 'Love that makes our spirits gleam',
              'M': 'Magical moments that we share',
              'N': 'Nature\'s beauty pure and rare',
              'O': 'Opportunities to grow',
              'P': 'Peace and harmony we know',
              'Q': 'Quiet moments, soft and still',
              'R': 'Radiant hope that bends our will',
              'S': 'Sunshine warming every heart',
              'T': 'Together, never far apart',
              'U': 'Unity in all we do',
              'V': 'Visions bright and ever true',
              'W': 'Wonders waiting to unfold',
              'X': 'eXtraordinary stories told',
              'Y': 'Yearning for a brighter day',
              'Z': 'Zeal that lights our way'
            };
            return `${letter} - ${words[letter] || 'Wonderful things come our way'}`;
          }).join('\n');
          break;

        case 'free-verse':
        default:
          if (mood === 'happy') {
            generatedPoem = `${theme}\n\nLike sunshine breaking through the clouds,\nYou bring warmth to my world.\nEvery moment sparkles with possibility,\nAnd joy dances in the air.\n\nIn your presence, life blooms\nWith colors I never knew existed.\nLaughter echoes through the days,\nAnd happiness finds its home.\n\nThis is the magic of ${theme},\nA celebration of all that's bright,\nA reminder that beauty surrounds us,\nWhen we open our hearts to the light.`;
          } else if (mood === 'sad') {
            generatedPoem = `${theme}\n\nIn the quiet hours of twilight,\nWhen shadows grow long and deep,\nI think of what once was,\nAnd memories I keep.\n\nThe echoes of ${theme} linger,\nLike whispers in the wind,\nA bittersweet reminder\nOf where we've been.\n\nYet even in this sorrow,\nThere's beauty to be found,\nIn the gentle ache of longing,\nAnd the silence all around.`;
          } else if (mood === 'romantic') {
            generatedPoem = `${theme}\n\nYou are the poetry my heart writes,\nThe melody my soul sings,\nIn every beat, in every breath,\nYou are everything.\n\nLike stars that light the darkest night,\nYour love illuminates my way,\nAnd in your arms, I've found my home,\nWhere I forever want to stay.\n\nThis ${theme} we share is timeless,\nA love that knows no end,\nYou are my today, my tomorrow,\nMy lover and my friend.`;
          } else {
            generatedPoem = `${theme}\n\nRise up and embrace the journey,\nFor within you lies the strength\nTo overcome any mountain,\nTo go to any length.\n\nLet ${theme} be your guide,\nA compass pointing true,\nToward dreams that wait beyond the horizon,\nAnd all that you can do.\n\nBelieve in your own power,\nTrust the path you're on,\nFor every step you take today\nLeads to a brighter dawn.`;
          }
          break;
      }

      setPoem(generatedPoem);
      setGenerating(false);
    }, 900);
  };

  const copyPoem = () => {
    navigator.clipboard.writeText(poem);
    alert('Poem copied to clipboard!');
  };

  const downloadPoem = () => {
    const blob = new Blob([poem], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${theme.replace(/\s+/g, '-')}-poem.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const styleInfo = {
    haiku: { icon: '🌸', desc: '5-7-5 syllable pattern' },
    sonnet: { icon: '📜', desc: '14-line structured poem' },
    'free-verse': { icon: '✨', desc: 'No specific structure' },
    limerick: { icon: '😄', desc: 'Humorous 5-line poem' },
    acrostic: { icon: '🔤', desc: 'First letters spell theme' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl mb-4">
              <Feather className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Poem Generator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Create beautiful poetry with AI assistance
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme or Subject *
              </label>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="e.g., love, nature, friendship, dreams"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Poem Style
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {(Object.keys(styleInfo) as Array<keyof typeof styleInfo>).map((style) => (
                  <button
                    key={style}
                    onClick={() => setPoemStyle(style)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      poemStyle === style
                        ? 'border-pink-600 bg-pink-50 dark:bg-pink-900/30'
                        : 'border-gray-300 dark:border-gray-600 hover:border-pink-400'
                    }`}
                  >
                    <div className="text-2xl mb-1">{styleInfo[style].icon}</div>
                    <div className="font-semibold text-gray-900 dark:text-white text-xs mb-1">
                      {style.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {styleInfo[style].desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Mood
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(['happy', 'sad', 'romantic', 'inspirational'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`py-3 px-4 rounded-xl font-medium transition ${
                      mood === m
                        ? 'bg-pink-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={generatePoem}
            disabled={generating || !theme.trim()}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-8"
          >
            <Sparkles className="w-5 h-5" />
            <span>{generating ? 'Creating Poetry...' : 'Generate Poem'}</span>
          </button>

          {poem && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-pink-600" />
                  <span>Your Poem</span>
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={copyPoem}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={downloadPoem}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl border-2 border-pink-200 dark:border-pink-800">
                <pre className="text-gray-900 dark:text-white whitespace-pre-wrap font-serif text-lg leading-relaxed text-center">
                  {poem}
                </pre>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Lines</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {poem.split('\n').filter(l => l.trim()).length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Words</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {poem.split(/\s+/).length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Style</p>
                  <p className="text-lg font-bold text-pink-600 dark:text-pink-400">
                    {poemStyle}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
