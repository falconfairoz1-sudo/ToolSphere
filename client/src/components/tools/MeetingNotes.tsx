'use client';

import { useState } from 'react';
import { Users, Plus, Trash2, CheckSquare } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  date: string;
  attendees: string;
  notes: string;
  actionItems: string[];
}

export default function MeetingNotes() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [current, setCurrent] = useState<Meeting | null>(null);
  const [form, setForm] = useState({ title: '', attendees: '', notes: '', actionItem: '' });

  const createMeeting = () => {
    const meeting: Meeting = {
      id: Date.now().toString(),
      title: form.title || 'Untitled Meeting',
      date: new Date().toISOString(),
      attendees: form.attendees,
      notes: form.notes,
      actionItems: [],
    };
    setMeetings([meeting, ...meetings]);
    setCurrent(meeting);
    setForm({ title: '', attendees: '', notes: '', actionItem: '' });
  };

  const addActionItem = () => {
    if (!current || !form.actionItem) return;
    const updated = { ...current, actionItems: [...current.actionItems, form.actionItem] };
    setMeetings(meetings.map(m => m.id === current.id ? updated : m));
    setCurrent(updated);
    setForm({ ...form, actionItem: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Users className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meeting Notes</h1>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <button
                onClick={createMeeting}
                className="w-full mb-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>New Meeting</span>
              </button>
              <div className="space-y-2">
                {meetings.map(meeting => (
                  <div
                    key={meeting.id}
                    onClick={() => setCurrent(meeting)}
                    className={`p-4 rounded-lg cursor-pointer ${
                      current?.id === meeting.id ? 'bg-indigo-100 dark:bg-indigo-900/30' : 'bg-gray-50 dark:bg-gray-700'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">{meeting.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(meeting.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              {current ? (
                <div>
                  <input
                    type="text"
                    value={current.title}
                    onChange={(e) => {
                      const updated = { ...current, title: e.target.value };
                      setCurrent(updated);
                      setMeetings(meetings.map(m => m.id === current.id ? updated : m));
                    }}
                    className="w-full mb-4 px-4 py-2 text-2xl font-bold border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Attendees"
                    value={current.attendees}
                    onChange={(e) => {
                      const updated = { ...current, attendees: e.target.value };
                      setCurrent(updated);
                      setMeetings(meetings.map(m => m.id === current.id ? updated : m));
                    }}
                    className="w-full mb-4 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <textarea
                    placeholder="Meeting notes..."
                    value={current.notes}
                    onChange={(e) => {
                      const updated = { ...current, notes: e.target.value };
                      setCurrent(updated);
                      setMeetings(meetings.map(m => m.id === current.id ? updated : m));
                    }}
                    className="w-full mb-4 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    rows={8}
                  />
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Action Items</h3>
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        placeholder="Add action item..."
                        value={form.actionItem}
                        onChange={(e) => setForm({ ...form, actionItem: e.target.value})}
                        onKeyPress={(e) => e.key === 'Enter' && addActionItem()}
                        className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                      <button
                        onClick={addActionItem}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {current.actionItems.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <CheckSquare className="w-4 h-4 text-green-600" />
                          <span className="flex-1 text-gray-900 dark:text-white">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Users className="w-16 h-16 mx-auto mb-4" />
                  <p>Select a meeting or create a new one</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
