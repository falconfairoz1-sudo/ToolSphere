'use client';

import { useState } from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
}

export default function CalendarPlanner() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [newEvent, setNewEvent] = useState({ title: '', time: '09:00', description: '' });

  const addEvent = () => {
    if (!newEvent.title) return;
    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: selectedDate,
      time: newEvent.time,
      description: newEvent.description,
    };
    setEvents([...events, event]);
    setNewEvent({ title: '', time: '09:00', description: '' });
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const eventsForDate = events.filter(e => e.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Calendar className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendar Planner</h1>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
              />
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <textarea
                  placeholder="Description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  rows={3}
                />
                <button
                  onClick={addEvent}
                  className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Event</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Events for {new Date(selectedDate).toLocaleDateString()}
              </h3>
              <div className="space-y-3">
                {eventsForDate.map(event => (
                  <div key={event.id} className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{event.title}</div>
                        <div className="text-sm text-purple-600">{event.time}</div>
                        {event.description && (
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.description}</div>
                        )}
                      </div>
                      <button onClick={() => deleteEvent(event.id)} className="text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {eventsForDate.length === 0 && (
                  <div className="text-center py-8 text-gray-400">No events for this date</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
