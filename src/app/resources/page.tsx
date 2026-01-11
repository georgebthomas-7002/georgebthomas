'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { Search, X, Play, Mic, FileText, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import resourceData from '../../../data/resources.json'
import './resources.css'

const ITEMS_PER_PAGE = 30

const ROTATING_ROLES = [
  'Leader',
  'AI Expert',
  'HubSpot User',
  'Marketer',
  'Sales Rep',
  'Podcaster',
  'Videographer'
]

function RotatingText({ words }: { words: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <span className="rotating-text">
      <span className="rotating-text__word">{words[currentIndex]}</span>
    </span>
  )
}

interface Resource {
  id: string
  title: string
  description: string
  url: string
  thumbnail: string
  publishedAt: string
  duration?: string
  type: 'video' | 'podcast' | 'article'
  source: string
  pillars: string[]
  tags: string[]
}

interface ResourceData {
  lastUpdated: string
  totalResources: number
  taxonomy: {
    pillars: string[]
    secondary_tags: string[]
  }
  resources: Resource[]
}

const data = resourceData as ResourceData

const typeIcons = {
  video: Play,
  podcast: Mic,
  article: FileText,
}

function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = typeIcons[resource.type]

  const formattedDate = resource.publishedAt
    ? new Date(resource.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : ''

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="resource-card"
    >
      <div className="resource-card__thumbnail">
        {resource.thumbnail ? (
          <img
            src={resource.thumbnail}
            alt={resource.title}
            className="resource-card__image"
          />
        ) : (
          <div className="resource-card__placeholder">
            <Icon className="resource-card__placeholder-icon" />
          </div>
        )}
        <span className={`resource-card__type resource-card__type--${resource.type}`}>
          <Icon size={12} />
          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
        </span>
        {resource.duration && (
          <span className="resource-card__duration">{resource.duration}</span>
        )}
      </div>

      <div className="resource-card__content">
        <div className="resource-card__meta">
          <span>{resource.source}</span>
          {formattedDate && (
            <>
              <span className="resource-card__meta-dot">•</span>
              <span>{formattedDate}</span>
            </>
          )}
        </div>

        <h3 className="resource-card__title">{resource.title}</h3>

        <p className="resource-card__description">{resource.description}</p>

        {resource.pillars.length > 0 && (
          <div className="resource-card__tags">
            {resource.pillars.slice(0, 2).map(pillar => (
              <span key={pillar} className="resource-card__tag">{pillar}</span>
            ))}
          </div>
        )}
      </div>

      <div className="resource-card__footer">
        <span className="resource-card__link">
          View Resource
          <ExternalLink size={12} />
        </span>
      </div>
    </a>
  )
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)

      if (currentPage > 3) {
        pages.push('ellipsis')
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis')
      }

      if (!pages.includes(totalPages)) pages.push(totalPages)
    }

    return pages
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination__btn pagination__btn--nav"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
        <span>Previous</span>
      </button>

      <div className="pagination__pages">
        {getVisiblePages().map((page, idx) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${idx}`} className="pagination__ellipsis">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`pagination__btn ${currentPage === page ? 'pagination__btn--active' : ''}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination__btn pagination__btn--nav"
        aria-label="Next page"
      >
        <span>Next</span>
        <ChevronRight size={18} />
      </button>
    </nav>
  )
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedPillar, setSelectedPillar] = useState<string>('')
  const [selectedSource, setSelectedSource] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isFiltersSticky, setIsFiltersSticky] = useState(false)
  const filtersRef = useRef<HTMLElement>(null)

  // Detect when filters bar becomes sticky
  useEffect(() => {
    const filtersEl = filtersRef.current
    if (!filtersEl) return

    const handleScroll = () => {
      const rect = filtersEl.getBoundingClientRect()
      // Filter bar is sticky when its top reaches ~80px (header height)
      const sticky = rect.top <= 80
      setIsFiltersSticky(sticky)

      // Toggle body class for header shadow control
      document.body.classList.toggle('filters-sticky', sticky)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.classList.remove('filters-sticky')
    }
  }, [])

  const sources = useMemo(() => {
    const sourceSet = new Set(data.resources.map(r => r.source))
    return Array.from(sourceSet).sort()
  }, [])

  const filteredResources = useMemo(() => {
    return data.resources.filter(resource => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = resource.title.toLowerCase().includes(query)
        const matchesDesc = resource.description.toLowerCase().includes(query)
        const matchesTags = resource.pillars.some(p => p.toLowerCase().includes(query))
        if (!matchesTitle && !matchesDesc && !matchesTags) return false
      }

      if (selectedType && resource.type !== selectedType) return false
      if (selectedPillar && !resource.pillars.includes(selectedPillar)) return false
      if (selectedSource && resource.source !== selectedSource) return false

      return true
    })
  }, [searchQuery, selectedType, selectedPillar, selectedSource])

  // Reset to page 1 when filters change
  const handleFilterChange = (setter: (val: string) => void, value: string) => {
    setter(value)
    setCurrentPage(1)
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE)
  const paginatedResources = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredResources.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredResources, currentPage])

  const hasActiveFilters = selectedType || selectedPillar || selectedSource

  const clearFilters = () => {
    setSelectedType('')
    setSelectedPillar('')
    setSelectedSource('')
    setSearchQuery('')
    setCurrentPage(1)
  }

  // Scroll to top when page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Header />
      <main className="resources-page">
        {/* Hero Section */}
        <section className="resources-hero">
          <div className="container">
            <span className="page-hero__tagline">Your Superhuman Toolkit</span>
            <h1 className="resources-hero__title">Resource Center</h1>
            <p className="resources-hero__count">{data.totalResources}+ RESOURCES AND GROWING DAILY.</p>
            <p className="resources-hero__subtitle">
              Fuel For Your Transformation Into A Superhuman <RotatingText words={ROTATING_ROLES} />.
            </p>
          </div>
        </section>

        {/* Search & Filters */}
        <section
          ref={filtersRef}
          className={`resources-filters ${isFiltersSticky ? 'is-sticky' : ''}`}
        >
          <div className="container">
            <div className="resources-filters__bar">
              {/* Search */}
              <div className="resources-search">
                <Search className="resources-search__icon" size={20} />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="resources-search__input"
                />
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(''); setCurrentPage(1) }} className="resources-search__clear">
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Dropdown Filters */}
              <div className="resources-filters__dropdowns">
                <select
                  value={selectedType}
                  onChange={(e) => handleFilterChange(setSelectedType, e.target.value)}
                  className="resources-select"
                >
                  <option value="">All Types</option>
                  <option value="video">Videos</option>
                  <option value="podcast">Podcasts</option>
                  <option value="article">Articles</option>
                </select>

                <select
                  value={selectedPillar}
                  onChange={(e) => handleFilterChange(setSelectedPillar, e.target.value)}
                  className="resources-select"
                >
                  <option value="">All Topics</option>
                  {data.taxonomy.pillars.map(pillar => (
                    <option key={pillar} value={pillar}>{pillar}</option>
                  ))}
                </select>

                <select
                  value={selectedSource}
                  onChange={(e) => handleFilterChange(setSelectedSource, e.target.value)}
                  className="resources-select"
                >
                  <option value="">All Sources</option>
                  {sources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>

                {hasActiveFilters && (
                  <button onClick={clearFilters} className="resources-filters__clear">
                    <X size={14} />
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="resources-results">
          <div className="container">
            <div className="resources-results__header">
              <p className="resources-results__count">
                Showing <strong>{paginatedResources.length}</strong> of <strong>{filteredResources.length}</strong> resources
                {filteredResources.length !== data.totalResources && (
                  <span className="resources-results__filtered"> (filtered from {data.totalResources})</span>
                )}
              </p>
              {totalPages > 1 && (
                <p className="resources-results__page">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>

            {paginatedResources.length > 0 ? (
              <>
                <div className="resources-grid">
                  {paginatedResources.map(resource => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="resources-empty">
                <div className="resources-empty__icon">
                  <Search size={32} />
                </div>
                <h3 className="resources-empty__title">No resources found</h3>
                <p className="resources-empty__text">
                  Try adjusting your search or filters to find what you&apos;re looking for.
                </p>
                <button onClick={clearFilters} className="btn btn--secondary">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
