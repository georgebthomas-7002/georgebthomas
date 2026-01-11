'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, Filter, X, Play, Mic, FileText, ExternalLink } from 'lucide-react'
import resourceData from '../../data/resources.json'

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

const typeColors = {
  video: 'bg-red-100 text-red-700',
  podcast: 'bg-purple-100 text-purple-700',
  article: 'bg-blue-100 text-blue-700',
}

function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = typeIcons[resource.type]
  const typeColor = typeColors[resource.type]
  
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
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {resource.thumbnail ? (
          <img
            src={resource.thumbnail}
            alt={resource.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <Icon className="w-12 h-12 text-gray-400" />
          </div>
        )}
        {/* Type badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${typeColor}`}>
          <Icon className="w-3 h-3" />
          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
        </div>
        {/* Duration badge for videos/podcasts */}
        {resource.duration && (
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 text-white text-xs">
            {resource.duration}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>{resource.source}</span>
          {formattedDate && (
            <>
              <span>•</span>
              <span>{formattedDate}</span>
            </>
          )}
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#FF6B35] transition-colors">
          {resource.title}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">
          {resource.description}
        </p>
        
        {/* Tags */}
        {resource.pillars.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {resource.pillars.slice(0, 2).map(pillar => (
              <span
                key={pillar}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {pillar}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* External link indicator */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-1 text-xs text-[#FF6B35] font-medium group-hover:gap-2 transition-all">
          View Resource
          <ExternalLink className="w-3 h-3" />
        </div>
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
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
        active
          ? 'bg-[#FF6B35] text-white'
          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
      }`}
    >
      {children}
      {count !== undefined && (
        <span className={`ml-1.5 ${active ? 'text-white/80' : 'text-gray-400'}`}>
          ({count})
        </span>
      )}
    </button>
  )
}

export default function ResourceCenter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null)
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Get unique sources
  const sources = useMemo(() => {
    const sourceSet = new Set(data.resources.map(r => r.source))
    return Array.from(sourceSet).sort()
  }, [])

  // Filter resources
  const filteredResources = useMemo(() => {
    return data.resources.filter(resource => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = resource.title.toLowerCase().includes(query)
        const matchesDesc = resource.description.toLowerCase().includes(query)
        const matchesTags = resource.pillars.some(p => p.toLowerCase().includes(query))
        if (!matchesTitle && !matchesDesc && !matchesTags) return false
      }

      // Type filter
      if (selectedType && resource.type !== selectedType) return false

      // Pillar filter
      if (selectedPillar && !resource.pillars.includes(selectedPillar)) return false

      // Source filter
      if (selectedSource && resource.source !== selectedSource) return false

      return true
    })
  }, [searchQuery, selectedType, selectedPillar, selectedSource])

  // Count by type
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
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Resource Center</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {data.totalResources} resources across {sources.length} sources
              </p>
            </div>
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-[#FF6B35] rounded-full" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className={`bg-white border-b border-gray-200 ${showFilters ? 'block' : 'hidden sm:block'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Type filters */}
          <div className="mb-4">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Content Type</div>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                active={selectedType === null}
                onClick={() => setSelectedType(null)}
                count={data.totalResources}
              >
                All
              </FilterButton>
              <FilterButton
                active={selectedType === 'video'}
                onClick={() => setSelectedType(selectedType === 'video' ? null : 'video')}
                count={typeCounts.video}
              >
                <span className="flex items-center gap-1">
                  <Play className="w-3 h-3" /> Videos
                </span>
              </FilterButton>
              <FilterButton
                active={selectedType === 'podcast'}
                onClick={() => setSelectedType(selectedType === 'podcast' ? null : 'podcast')}
                count={typeCounts.podcast}
              >
                <span className="flex items-center gap-1">
                  <Mic className="w-3 h-3" /> Podcasts
                </span>
              </FilterButton>
              <FilterButton
                active={selectedType === 'article'}
                onClick={() => setSelectedType(selectedType === 'article' ? null : 'article')}
                count={typeCounts.article}
              >
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" /> Articles
                </span>
              </FilterButton>
            </div>
          </div>

          {/* Pillar filters */}
          <div className="mb-4">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Topic</div>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                active={selectedPillar === null}
                onClick={() => setSelectedPillar(null)}
              >
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
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Source</div>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                active={selectedSource === null}
                onClick={() => setSelectedSource(null)}
              >
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

          {/* Clear filters */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={clearFilters}
                className="text-sm text-[#FF6B35] hover:text-[#e55a2b] font-medium flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{filteredResources.length}</span> of{' '}
            <span className="font-medium">{data.totalResources}</span> resources
          </p>
          <p className="text-xs text-gray-400">
            Last updated: {new Date(data.lastUpdated).toLocaleDateString()}
          </p>
        </div>

        {/* Resource grid */}
        {filteredResources.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="text-[#FF6B35] hover:text-[#e55a2b] font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} George B. Thomas. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
