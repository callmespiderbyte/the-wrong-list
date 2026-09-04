'use client'

import { useEffect, useRef, useState } from 'react'

type SortMode = 'az' | 'za' | null
type TagMode = 'and' | 'or'

interface DirectoryToolbarProps {
  allTags: string[]
  activeTags: string[]
  sortMode: SortMode
  tagMode: TagMode
  onRandomize: () => void
  onSortToggle: () => void
  onToggleTag: (tag: string) => void
  onClearTags: () => void
  onTagModeChange: (mode: TagMode) => void
}

export default function DirectoryToolbar({
  allTags,
  activeTags,
  sortMode,
  tagMode,
  onRandomize,
  onSortToggle,
  onToggleTag,
  onClearTags,
  onTagModeChange,
}: DirectoryToolbarProps) {
  const [filterOpen, setFilterOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!filterOpen) return
    function onDocClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFilterOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [filterOpen])

  const sortLabel = sortMode === 'za' ? 'sort z → a' : 'sort a → z'

  return (
    <div
      style={{
        position: 'sticky',
        top: '96px',
        zIndex: 40,
        backgroundColor: 'var(--black)',
        border: '1px solid rgba(242, 237, 228, 0.5)',
        padding: '16px clamp(16px, 4vw, 24px)',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <button
          className="dir-toolbar-btn"
          onClick={onRandomize}
          aria-label="Randomize profile order"
        >
          <span className="dir-toolbar-label">randomize</span>
          <ShuffleIcon />
        </button>

        <button
          className={`dir-toolbar-btn${sortMode ? ' is-active' : ''}`}
          onClick={onSortToggle}
          aria-label={sortMode === 'za' ? 'Sort Z to A' : 'Sort A to Z'}
        >
          <span className="dir-toolbar-label">{sortLabel}</span>
          <span className="dir-toolbar-icon-glyph" aria-hidden="true">⇅</span>
        </button>
      </div>

      <div className="dir-filter-wrapper" ref={wrapperRef}>
        <button
          className={`dir-toolbar-btn${activeTags.length > 0 ? ' is-active' : ''}`}
          onClick={() => setFilterOpen((v) => !v)}
          aria-label="Filter by availability"
          aria-expanded={filterOpen}
        >
          <span className="dir-toolbar-label">
            filter{activeTags.length > 0 ? ` (${activeTags.length})` : ''} ▾
          </span>
          <span className="dir-toolbar-icon-wrap" aria-hidden="true">
            <FilterIcon />
            {activeTags.length > 0 && <span className="dir-filter-dot" />}
          </span>
        </button>

        {filterOpen && (
          <div className="dir-filter-panel">
            <div className="dir-filter-mode-row">
              <button
                className={`dir-filter-chip${tagMode === 'and' ? ' is-active' : ''}`}
                onClick={() => onTagModeChange('and')}
              >
                match all
              </button>
              <button
                className={`dir-filter-chip${tagMode === 'or' ? ' is-active' : ''}`}
                onClick={() => onTagModeChange('or')}
              >
                match any
              </button>
            </div>
            <div className="dir-filter-chips">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`dir-filter-chip${activeTags.includes(tag) ? ' is-active' : ''}`}
                  onClick={() => onToggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            {activeTags.length > 0 && (
              <button className="dir-filter-clear" onClick={onClearTags}>
                clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ShuffleIcon() {
  return (
    <svg
      className="dir-toolbar-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg
      className="dir-toolbar-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="4 4 20 4 14 12.5 14 19 10 21 10 12.5 4 4" />
    </svg>
  )
}
