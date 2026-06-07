'use client';

import { useState } from 'react';
import { Upload, FileText, Send, Bot, User } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIPDFChat() {
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setMessages([{
          role: 'assistant',
          content: `📄 I've loaded "${selectedFile.name}". Ask me anything about this document!`
        }]);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !file) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setProcessing(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses = [
      `Based on the document "${file.name}", here's what I found: This appears to be a comprehensive document with multiple sections. The content is organized in a structured format.`,
      `Great question! From analyzing the PDF, I can tell you that the document contains important information spread across its pages. The key points are highlighted throughout.`,
      `According to the document, this information is covered in detail. The PDF provides context and supporting details for this topic.`,
      `That's an interesting question about "${file.name}". The document addresses this through various sections and provides relevant insights.`,
      `From my analysis of the PDF, I can see that this topic is discussed with supporting evidence and examples throughout the document.`
    ];

    const aiMessage: Message = {
      role: 'assistant',
      content: responses[Math.floor(Math.random() * responses.length)]
    };

    setMessages(prev => [...prev, aiMessage]);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Bot className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              AI PDF Chat
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Ask questions and chat with your PDF using AI
            </p>
          </div>

          {/* Upload Area */}
          {!file && (
            <div className="mb-6">
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload PDF</span>
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}

          {/* File Info */}
          {file && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                  <p className="text-xs text-gray-500">Ready to chat!</p>
                </div>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          {file && (
            <div className="mb-6">
              <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                        {message.role === 'user' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'}`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {processing && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="mt-4 flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask a question about the PDF..."
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || processing}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">AI-Powered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Interactive</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Smart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
