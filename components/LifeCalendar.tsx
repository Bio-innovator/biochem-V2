'use client';

import { useEffect, useState } from 'react';
import { LIFE_CALENDAR, LIFE_EVENT_STYLE, LifeEvent, LifeEventType } from '@/data/lifeCalendar';

const POPUP_OFF_KEY = 'lifeCalendarPopupOff';
const DISMISS_KEY = 'lifeCalendarDismissedDate';

const WEEKDAYS = [
  { zh: '日', en: 'Sun' },
  { zh: '一', en: 'Mon' },
  { zh: '二', en: 'Tue' },
  { zh: '三', en: 'Wed' },
  { zh: '四', en: 'Thu' },
  { zh: '五', en: 'Fri' },
  { zh: '六', en: 'Sat' },
];

const MONTH_NAMES = [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月',
];

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function todayEvent(): LifeEvent | null {
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  return LIFE_CALENDAR[monthKey]?.[now.getDate()] ?? null;
}

function isPopupOff(): boolean {
  try {
    return localStorage.getItem(POPUP_OFF_KEY) === '1';
  } catch {
    return false;
  }
}

function EventDetail({ event }: { event: LifeEvent }) {
  const style = LIFE_EVENT_STYLE[event.type];
  return (
    <div>
      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${style.badge}`}>
        {style.labelZh} · {style.labelEn}
      </span>
      <h3 className="font-semibold text-slate-900 mt-2">{event.titleZh}</h3>
      <p className="text-xs text-slate-400">{event.titleEn}</p>
      <p className="text-sm text-slate-700 leading-relaxed mt-2">{event.contentZh}</p>
      <p className="text-xs text-slate-500 leading-relaxed mt-1">{event.contentEn}</p>
    </div>
  );
}

/** 主日历卡片：只显示本月，不可翻页 */
export default function LifeCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based
  const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
  const monthEvents = LIFE_CALENDAR[monthKey] ?? {};
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  const today = now.getDate();

  const [selected, setSelected] = useState<number>(today);
  const [popupEnabled, setPopupEnabled] = useState(true);

  useEffect(() => {
    setPopupEnabled(!isPopupOff());
  }, []);

  function togglePopup() {
    const next = !popupEnabled;
    setPopupEnabled(next);
    try {
      if (next) {
        localStorage.removeItem(POPUP_OFF_KEY);
      } else {
        localStorage.setItem(POPUP_OFF_KEY, '1');
      }
    } catch {}
  }

  const cells: (number | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const selectedEvent = monthEvents[selected];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            生命教育日历 · Life Education Calendar
          </h2>
          <p className="text-xs text-slate-500">
            {year} 年 {MONTH_NAMES[month]} · {MONTH_NAMES[month]} {year}（仅显示本月 · Current month only）
          </p>
        </div>
        <button
          onClick={togglePopup}
          className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            popupEnabled
              ? 'bg-teal-50 text-teal-700 hover:bg-teal-100'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          {popupEnabled ? '每日弹窗：开 · Popup: On' : '每日弹窗：关 · Popup: Off'}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((d) => (
          <div key={d.en} className="text-center text-[10px] font-medium text-slate-400 py-1">
            {d.zh} {d.en}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} />;
          const event = monthEvents[day];
          const isToday = day === today;
          const isSelected = day === selected;
          return (
            <button
              key={day}
              onClick={() => setSelected(day)}
              className={`relative aspect-square rounded-lg text-sm flex flex-col items-center justify-center gap-0.5 transition ${
                isSelected
                  ? 'bg-teal-600 text-white'
                  : isToday
                  ? 'bg-teal-50 text-teal-700 font-semibold'
                  : event
                  ? 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              {day}
              {event && (
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? 'bg-white' : LIFE_EVENT_STYLE[event.type].dot
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 mt-3 text-[10px] text-slate-500">
        {(Object.keys(LIFE_EVENT_STYLE) as LifeEventType[]).map((t) => (
          <span key={t} className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${LIFE_EVENT_STYLE[t].dot}`} />
            {LIFE_EVENT_STYLE[t].labelZh} {LIFE_EVENT_STYLE[t].labelEn}
          </span>
        ))}
      </div>

      {selectedEvent && (
        <div className="mt-4 bg-slate-50 rounded-lg p-4">
          <EventDetail event={selectedEvent} />
        </div>
      )}
    </div>
  );
}

/** 进入 dashboard 时的每日弹窗 */
export function LifeCalendarPopup() {
  const [visible, setVisible] = useState(false);
  const [event, setEvent] = useState<LifeEvent | null>(null);

  useEffect(() => {
    try {
      if (isPopupOff()) return;
      if (localStorage.getItem(DISMISS_KEY) === todayKey()) return;
      const ev = todayEvent();
      if (!ev) return;
      setEvent(ev);
      setVisible(true);
    } catch {}
  }, []);

  if (!visible || !event) return null;

  function dismissToday() {
    try {
      localStorage.setItem(DISMISS_KEY, todayKey());
    } catch {}
    setVisible(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-lg leading-none"
          aria-label="Close"
        >
          ✕
        </button>
        <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">
          今日生命教育 · Today\u2019s Life Education
        </p>
        <EventDetail event={event} />
        <button
          onClick={dismissToday}
          className="mt-5 w-full py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium transition"
        >
          今日不再弹出 · Don\u2019t show again today
        </button>
      </div>
    </div>
  );
}

/** 首页底部轻量横幅：展示今日条目 */
export function LifeCalendarBanner() {
  const [visible, setVisible] = useState(false);
  const [event, setEvent] = useState<LifeEvent | null>(null);

  useEffect(() => {
    try {
      if (isPopupOff()) return;
      if (localStorage.getItem(DISMISS_KEY) === todayKey()) return;
      const ev = todayEvent();
      if (!ev) return;
      setEvent(ev);
      setVisible(true);
    } catch {}
  }, []);

  if (!visible || !event) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-lg">
      <div className="bg-white/95 backdrop-blur rounded-xl shadow-lg border border-slate-200 px-4 py-3 flex items-center gap-3">
        <span className={`w-2 h-2 rounded-full shrink-0 ${LIFE_EVENT_STYLE[event.type].dot}`} />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-900 truncate">
            {event.titleZh} · {event.titleEn}
          </p>
          <p className="text-[10px] text-slate-500 truncate">{event.contentZh}</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 text-slate-400 hover:text-slate-600 leading-none"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
