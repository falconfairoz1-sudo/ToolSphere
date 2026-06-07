'use client';

import { useState, useEffect } from 'react';
import { FileText, Save, Download, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function NotesMaker() {
  const { user, isAuthenticated } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storageKey = isAuthenticated && user ? `notes_${user.id}` : 'notes_guest';
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse notes:', e);
      }
    }
  }, [isAuthenticated, user]);

  const saveNote = () => {
    if (!title.trim() || !content.trim()) return;

    const note: Note = {
      id: currentNote?.id || Date.now().toString(),
      title,
      content,
      date: new Date().toLocaleString(),
    };

    let updatedNotes;
    if (currentNote) {
      updatedNotes = notes.map(n => n.id === note.id ? note : n);
    } else {
      updatedNotes = [note, ...notes];
    }

    setNotes(updatedNotes);
    const storageKey = isAuthenticated && user ? `notes_${user.id}` : 'notes_guest';
    localStorage.setItem(storageKey, JSON.stringify(updatedNotes));
    
    setTitle('');
    setContent('');
    setCurrentNote(null);
  };

  const loadNote = (note: Note) => {
    setCurrentNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(n => n.id !== id);
    setNotes(updatedNotes);
    const storageKey = isAuthenticated && user ? `notes_${user.id}` : 'notes_guest';
    localStorage.setItem(storageKey, JSON.stringify(updatedNotes));
    if (currentNote?.id === id) {
      setCurrentNote(null);
      setTitle('');
      setContent('');
    }
  };

  const downloadNote = () => {
    const blob = new Blob([`${title}\n\n${content}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'note'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const newNote = () => {
    setCurrentNote(null);
    setTitle('');
    setContent('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <FileText className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Notes Maker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and organize your notes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Notes List */}
          <div className="md:col-span-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                My Notes ({notes.length})
              </h3>
              <button
                onClick={newNote}
                className="px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 transition text-sm"
              >
                + New
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {notes.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
                  No notes yet. Create one!
                </p>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => loadNote(note)}
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      currentNote?.id === note.id
                        ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                          {note.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {note.date}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(note.id);
                        }}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Editor */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Note Title..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none text-lg font-semibold"
                />
              </div>
              <div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your note..."
                  className="w-full h-80 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={saveNote}
                  disabled={!title.trim() || !content.trim()}
                  className="flex-1 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>{currentNote ? 'Update' : 'Save'} Note</span>
                </button>
                {(title || content) && (
                  <button
                    onClick={downloadNote}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
