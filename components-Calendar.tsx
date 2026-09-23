// components/common/Calendar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { eachDayOfInterval, startOfMonth, endOfMonth, format, isSameMonth } from 'date-fns';

interface CalendarTrip {
  id: string;
  date: string;
  title: string;
  status: string;
  taxiName?: string;
  color?: string;
  time?: string;
}

interface CalendarProps {
  month: number;
  year: number;
  trips: CalendarTrip[];
  onDateClick?: (date: Date) => void;
  onTripClick?: (trip: CalendarTrip) => void;
}

export function Calendar({ month, year, trips, onDateClick, onTripClick }: CalendarProps) {
  const [displayDate, setDisplayDate] = useState(new Date(year, month - 1));
  const days = eachDayOfInterval({
    start: startOfMonth(displayDate),
    end: endOfMonth(displayDate),
  });

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  // Group trips by date
  const tripsByDate: Record<string, CalendarTrip[]> = {};
  trips.forEach((trip) => {
    const dateKey = trip.date;
    if (!tripsByDate[dateKey]) {
      tripsByDate[dateKey] = [];
    }
    tripsByDate[dateKey].push(trip);
  });

  const handlePrevMonth = () => {
    setDisplayDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setDisplayDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth() + 1)
    );
  };

  const firstDayOfWeek = startOfMonth(displayDate).getDay();
  const emptyDays = Array(firstDayOfWeek).fill(null);

  return (
    <div className="w-full bg-white rounded-lg border border-primary-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-secondary-700">
          {format(displayDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="px-4 py-2 bg-primary-100 text-primary-700 rounded hover:bg-primary-200 transition"
          >
            ← Prev
          </button>
          <button
            onClick={handleNextMonth}
            className="px-4 py-2 bg-primary-100 text-primary-700 rounded hover:bg-primary-200 transition"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center font-bold text-secondary-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-2">
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {days.map((day, i) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const dayTrips = tripsByDate[dateKey] || [];
          const isCurrentMonth = isSameMonth(day, displayDate);

          return (
            <div
              key={i}
              onClick={() => isCurrentMonth && onDateClick?.(day)}
              className={`aspect-square p-2 rounded border transition cursor-pointer ${
                isCurrentMonth
                  ? 'bg-white border-primary-200 hover:bg-primary-50'
                  : 'bg-gray-50 border-gray-200 opacity-50'
              }`}
            >
              <div className="text-sm font-bold text-secondary-700 mb-1">
                {format(day, 'd')}
              </div>
              <div className="text-xs space-y-1">
                {dayTrips.length > 0 && (
                  <>
                    <div className="text-secondary-600 font-semibold">
                      {dayTrips.length} trip{dayTrips.length > 1 ? 's' : ''}
                    </div>
                    {dayTrips.slice(0, 2).map((trip) => (
                      <div
                        key={trip.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onTripClick?.(trip);
                        }}
                        className="px-1 py-0.5 rounded text-white truncate text-xs font-semibold hover:opacity-80 transition"
                        style={{
                          backgroundColor: trip.color || '#3a8b8b',
                        }}
                      >
                        {trip.time || 'Trip'}
                      </div>
                    ))}
                    {dayTrips.length > 2 && (
                      <div className="text-secondary-600 text-xs">
                        +{dayTrips.length - 2} more
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
