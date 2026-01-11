'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, X, Play, Mic, FileText, ExternalLink } from 'lucide-react'
import resourceData from '../../../data/resources.json'
import './resources.css'

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

function FilterButton({
  active,
  onClick,
  children,
  count
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  count?: number
}) {
  return (
    <button
      onClick={onClick}
      className={`filter-button ${active ? 'filter-button--active' : ''}`}
    >
      {children}
      {count !== undefined && (
        <span className="filter-button__count">({count})</span>
      )}
    </button>
  )
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null)
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

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

  const typeCounts = useMemo(() => ({
    video: data.resources.filter(r => r.type === 'video').length,
    podcast: data.resources.filter(r => r.type === 'podcast').length,
    article: data.resources.filter(r => r.type === 'article').length,
  }), [])

  const hasActiveFilters = selectedType || selectedPillar || selectedSource

  const clearFilters = () => {
    setSelectedType(null)
    setSelectedPillar(null)
    setSelectedSource(null)
    setSearchQuery('')
  }

  return (
    <div className="resources-page">
      {/* Hero Section */}
      <section className="resources-hero">
        <div className="container">
          <h1 className="resources-hero__title">Resource Center</h1>
          <p className="resources-hero__subtitle">
            {data.totalResources} resources across {sources.length} sources to help you grow
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="resources-filters">
        <div className="container">
          {/* Search */}
          <div className="resources-search">
            <Search className="resources-search__icon" size={20} />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="resources-search__input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="resources-search__clear">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="resources-filters__toggle"
          >
            <Filter size={16} />
            Filters
            {hasActiveFilters && <span className="resources-filters__indicator" />}
          </button>

          {/* Filter groups */}
          <div className={`resources-filters__groups ${showFilters ? 'is-open' : ''}`}>
            {/* Type filters */}
            <div className="filter-group">
              <div className="filter-group__label">Content Type</div>
              <div className="filter-group__buttons">
                <FilterButton active={selectedType === null} onClick={() => setSelectedType(null)} count={data.totalResources}>
                  All
                </FilterButton>
                <FilterButton active={selectedType === 'video'} onClick={() => setSelectedType(selectedType === 'video' ? null : 'video')} count={typeCounts.video}>
                  <Play size={14} /> Videos
                </FilterButton>
                <FilterButton active={selectedType === 'podcast'} onClick={() => setSelectedType(selectedType === 'podcast' ? null : 'podcast')} count={typeCounts.podcast}>
                  <Mic size={14} /> Podcasts
                </FilterButton>
                <FilterButton active={selectedType === 'article'} onClick={() => setSelectedType(selectedType === 'article' ? null : 'article')} count={typeCounts.article}>
                  <FileText size={14} /> Articles
                </FilterButton>
              </div>
            </div>

            {/* Pillar filters */}
            <div className="filter-group">
              <div className="filter-group__label">Topic</div>
              <div className="filter-group__buttons">
                <FilterButton active={selectedPillar === null} onClick={() => setSelectedPillar(null)}>
                  All Topics
                </FilterButton>
                {data.taxonomy.pillars.map(pillar => (
                  <FilterButton
                    key={pillar}
                    active={selectedPillar === pillar}
                    onClick={() => setSelectedPillar(selectedPillar === pillar ? null : pillar)}
                  >
                    {pillar}
                  </FilterButton>
                ))}
              </div>
            </div>

            {/* Source filters */}
            <div className="filter-group">
              <div className="filter-group__label">Source</div>
              <div className="filter-group__buttons">
                <FilterButton active={selectedSource === null} onClick={() => setSelectedSource(null)}>
                  All Sources
                </FilterButton>
                {sources.map(source => (
                  <FilterButton
                    key={source}
                    active={selectedSource === source}
                    onClick={() => setSelectedSource(selectedSource === source ? null : source)}
                  >
                    {source}
                  </FilterButton>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button onClick={clearFilters} className="resources-filters__clear">
                <X size={16} />
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="resources-results">
        <div className="container">
          <div className="resources-results__header">
            <p className="resources-results__count">
              Showing <strong>{filteredResources.length}</strong> of <strong>{data.totalResources}</strong> resources
            </p>
            <p className="resources-results__updated">
              Last updated: {new Date(data.lastUpdated).toLocaleDateString()}
            </p>
          </div>

          {filteredResources.length > 0 ? (
            <div className="resources-grid">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="resources-empty">
              <div className="resources-empty__icon">
                <Search size={32} />
              </div>
              <h3 className="resources-empty__title">No resources found</h3>
              <p className="resources-empty__text">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button onClick={clearFilters} className="btn btn--secondary">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
