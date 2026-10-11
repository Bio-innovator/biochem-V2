'use client'

import { useEffect, useMemo, useState } from 'react'
import { useLang } from '@/components/LanguageContext'
import { LIFE_CALENDAR, LIFE_EVENT_STYLE, LifeEvent, LifeEventType } from '@/data/lifeCalendar'

const POPUP_OFF_KEY = 'lifeCalendarPopupOff'
const DISMISS_KEY = 'lifeCalendarDismissedDate'

const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function monthKey(year: number, month: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}`
}

/* ================= 日历主体 ================= */

export default function LifeCalendar() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const now = new Date()
  const [viewYear, setViewYear] = useState(now.getFullYear())
  const [viewMonth, setViewMonth] = useState(now.getMonth())
  const [selected, setSelected] = useState<{ day: number; event: LifeEvent } | null>(null)

  const key = monthKey(viewYear, viewMonth)
  const monthEvents = LIFE_CALENDAR[key] ?? {}

  const days = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1)
    const startWeekday = (first.getDay() + 6) % 7 // 周一起
    const count = new Date(viewYear, viewMonth + 1, 0).getDate()
    return { startWeekday, count }
  }, [viewYear, viewMonth])

  const shiftMonth = (delta: number) => {
    const d = new Date(viewYear, viewMonth + delta, 1)
    setViewYear(d.getFullYear())
    setViewMonth(d.getMonth())
    setSelected(null)
  }

  const isToday = (day: number) =>
    day === now.getDate() && viewMonth === now.getMonth() && viewYear === now.getFullYear()

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-1 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">{zh ? '生命日历' : 'Life Calendar'}</h3>
          <p className="mt-0.5 text-xs text-slate-500">
            {zh ? '点击带标记的日期，查看每日疾病防治、生命伦理与纪念科普' : 'Tap a marked day for a daily note on health, bioethics, and remembrance.'}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => shiftMonth(-1)} aria-label={zh ? '上一月' : 'Previous month'}
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <span className="min-w-[4.5rem] text-center text-sm font-semibold text-slate-700">
            {zh ? `${viewYear} 年 ${viewMonth + 1} 月` : `${MONTHS_EN[viewMonth]} ${viewYear}`}
          </span>
          <button onClick={() => shiftMonth(1)} aria-label={zh ? '下一月' : 'Next month'}
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>

      {/* 图例 */}
      <div className="mb-2 flex flex-wrap gap-x-3 gap-y-1">
        {(Object.keys(LIFE_EVENT_STYLE) as LifeEventType[]).map((t) => (
          <span key={t} className="flex items-center gap-1 text-[10px] text-slate-500">
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${LIFE_EVENT_STYLE[t].dot}`} />
            {zh ? LIFE_EVENT_STYLE[t].labelZh : LIFE_EVENT_STYLE[t].labelEn}
          </span>
        ))}
      </div>

      <div className="mx-auto max-w-sm">
        <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] font-medium text-slate-400">
          {(zh ? ['一', '二', '三', '四', '五', '六', '日'] : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']).map((w) => (
            <div key={w} className="py-0.5">{w}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({ length: days.startWeekday }).map((_, i) => (
            <div key={`blank-${i}`} />
          ))}
          {Array.from({ length: days.count }).map((_, i) => {
            const day = i + 1
            const ev = monthEvents[day]
            const active = selected?.day === day
            return (
              <button
                key={day}
                disabled={!ev}
                onClick={() => ev && setSelected({ day, event: ev })}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-md text-xs transition ${
                  active
                    ? 'bg-teal-600 font-bold text-white'
                    : ev
                      ? 'font-medium text-slate-800 hover:bg-teal-50'
                      : 'cursor-default text-slate-400'
                } ${isToday(day) && !active ? 'ring-1 ring-teal-500' : ''}`}
              >
                {day}
                {ev && !active && <span className={`absolute bottom-0.5 h-1 w-1 rounded-full ${LIFE_EVENT_STYLE[ev.type].dot}`} />}
              </button>
            )
          })}
        </div>
      </div>

      {/* 事件详情 */}
      {selected && (
        <div className="mt-3 rounded-xl border border-teal-100 bg-teal-50/60 p-3">
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              selected.event.type === 'disease'
                ? 'bg-rose-100 text-rose-700'
                : selected.event.type === 'ethics'
                  ? 'bg-violet-100 text-violet-700'
                  : 'bg-amber-100 text-amber-700'
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${LIFE_EVENT_STYLE[selected.event.type].dot}`} />
              {zh ? LIFE_EVENT_STYLE[selected.event.type].labelZh : LIFE_EVENT_STYLE[selected.event.type].labelEn}
            </span>
            <button onClick={() => setSelected(null)} aria-label={zh ? '关闭' : 'Close'} className="text-slate-400 transition hover:text-slate-600">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="text-sm font-bold text-slate-900">
            {zh ? `${viewMonth + 1} 月 ${selected.day} 日 · ` : `${MONTHS_EN[viewMonth]} ${selected.day} · `}
            {zh ? selected.event.nameZh : selected.event.nameEn}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">
            {zh ? selected.event.detailZh : selected.event.detailEn}
          </p>
        </div>
      )}
    </div>
  )
}

/* ================= 登录后弹窗（每次登录弹出，可选今日不再弹出） ================= */

export function LifeCalendarPopup({ onOpenCalendar }: { onOpenCalendar?: () => void }) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [visible, setVisible] = useState(false)
  const [dontShowToday, setDontShowToday] = useState(false)
  const now = new Date()
  const ev = LIFE_CALENDAR[monthKey(now.getFullYear(), now.getMonth())]?.[now.getDate()]

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(POPUP_OFF_KEY) === '1') return
    if (localStorage.getItem(DISMISS_KEY) === todayStr()) return
    setVisible(true)
  }, [])

  if (!visible || !ev) return null

  const close = () => {
    if (dontShowToday) localStorage.setItem(DISMISS_KEY, todayStr())
    setVisible(false)
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm" onClick={close}>
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'lifePopupIn 0.3s ease-out' }}
      >
        <style>{`@keyframes lifePopupIn { from { opacity: 0; transform: translateY(12px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
        <div className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-teal-600">
          {zh ? '今日生命教育' : 'TODAY\u2019S LIFE EDUCATION'}
        </div>
        <div className="text-lg font-bold text-slate-900">
          {zh ? ev.nameZh : ev.nameEn}
        </div>
        <div className="mt-0.5 text-xs text-slate-400">
          {zh ? `${now.getFullYear()} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日` : `${MONTHS_EN[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {zh ? ev.detailZh : ev.detailEn}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-500">
            <input
              type="checkbox"
              checked={dontShowToday}
              onChange={(e) => setDontShowToday(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            {zh ? '今日不再弹出' : 'Don\u2019t show again today'}
          </label>
          <div className="flex gap-2">
            {onOpenCalendar && (
              <button
                onClick={() => { close(); onOpenCalendar() }}
                className="rounded-lg border border-teal-200 px-3 py-1.5 text-xs font-medium text-teal-700 transition hover:bg-teal-50"
              >
                {zh ? '查看日历' : 'Open calendar'}
              </button>
            )}
            <button
              onClick={close}
              className="rounded-lg bg-teal-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-teal-700"
            >
              {zh ? '知道了' : 'Got it'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ================= 顶部横幅（保留导出，目前未使用） ================= */

export function LifeCalendarBanner() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [visible, setVisible] = useState(false)
  const [dontShowToday, setDontShowToday] = useState(false)
  const now = new Date()
  const ev = LIFE_CALENDAR[monthKey(now.getFullYear(), now.getMonth())]?.[now.getDate()]

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(POPUP_OFF_KEY) === '1') return
    if (localStorage.getItem(DISMISS_KEY) === todayStr()) return
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 20000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible || !ev) return null

  const close = () => {
    if (dontShowToday) localStorage.setItem(DISMISS_KEY, todayStr())
    setVisible(false)
  }

  return (
    <div
      className="fixed left-1/2 top-20 z-[60] w-[calc(100%-2rem)] max-w-md rounded-2xl border border-teal-100 bg-white/95 p-4 shadow-xl backdrop-blur"
      style={{ animation: 'lifeBannerIn 0.35s ease-out', transform: 'translateX(-50%)' }}
    >
      <style>{`@keyframes lifeBannerIn { from { opacity: 0; transform: translate(-50%, -12px); } to { opacity: 1; transform: translate(-50%, 0); } }`}</style>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-teal-600">
            {zh ? '今日生命教育' : 'TODAY\u2019S LIFE EDUCATION'}
          </div>
          <div className="mt-0.5 text-sm font-bold text-slate-900">{zh ? ev.nameZh : ev.nameEn}</div>
        </div>
        <button onClick={close} aria-label={zh ? '关闭' : 'Close'} className="text-slate-400 transition hover:text-slate-600">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>
      <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2">
        <label className="flex cursor-pointer items-center gap-1.5 text-[11px] text-slate-400">
          <input
            type="checkbox"
            checked={dontShowToday}
            onChange={(e) => setDontShowToday(e.target.checked)}
            className="h-3 w-3 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
          />
          {zh ? '今日不再弹出' : 'Don\u2019t show again today'}
        </label>
        <button onClick={close} className="text-[11px] font-medium text-teal-700 hover:underline">
          {zh ? '知道了' : 'Got it'}
        </button>
      </div>
    </div>
  )
}
