'use client'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import SearchBar from '../components/SearchBar'
import SearchResultSkeleton from '../components/SearchResultSkeleton'
import { useRouter } from 'next/navigation'

type SearchResultItem = {
  titulo: string;
  descricao: string;
  link_acesso?: string;
  categoria?: string;
  orgao?: string;
  ano?: string;
  portal?: string;
  servico?: boolean;
};

function SearchResultContent() {
  const searchParams = useSearchParams()
  const query = searchParams?.get('q') || ''
  const [results, setResults] = useState<SearchResultItem[]>([])
  const [loading, setLoading] = useState(true)
  // const [selectedFilters, setSelectedFilters] = useState({
  //   categoria: '',
  //   orgao: '',
  //   ano: '',
  //   portal: ''
  // })

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        setLoading(true)
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
          const data = await response.json()
          setResults(data.result || [])
        } catch (error) {
          console.error('Error fetching search results:', error)
          setResults([])
        } finally {
          setLoading(false)
        }
      }
    }

    fetchResults()
  }, [query])

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8">
      {/* Search Bar */}
      <SearchBar defaultValue={query} className="mb-6" />

      {/* Filters */}
      <div className="flex gap-4 mb-8">
        {/* <select 
          value={selectedFilters.categoria}
          onChange={(e) => setSelectedFilters(prev => ({ ...prev, categoria: e.target.value }))}
          className="px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 text-sm"
        >
          <option value="">Categoria</option>
          <option value="servicos">Serviços</option>
          <option value="imoveis">Imóveis</option>
        </select> */}

        {/* <select 
          value={selectedFilters.orgao}
          onChange={(e) => setSelectedFilters(prev => ({ ...prev, orgao: e.target.value }))}
          className="px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 text-sm"
        >
          <option value="">Órgão</option>
        </select>

        <select 
          value={selectedFilters.ano}
          onChange={(e) => setSelectedFilters(prev => ({ ...prev, ano: e.target.value }))}
          className="px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 text-sm"
        >
          <option value="">Ano</option>
        </select> */}

        {/* <select 
          value={selectedFilters.portal}
          onChange={(e) => setSelectedFilters(prev => ({ ...prev, portal: e.target.value }))}
          className="px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 text-sm"
        >
          <option value="">Portal</option>
        </select> */}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500 mb-4">
        {results.length} Resultados
      </div>

      {/* Results */}
      {loading ? (
        <SearchResultSkeleton />
      ) : (
        <>
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((item, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-lg shadow-sm p-6 hover:bg-gray-50 ${item.link_acesso ? 'cursor-pointer' : 'cursor-default'}`}
                  onClick={() => item.link_acesso && window.open(item.link_acesso, '_blank')}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-medium mb-2">{item.titulo}</h3>
                      <div className="flex items-center gap-2 text-xs text-[#008FBE] mb-2">
                        {item.servico === true ? (
                        <span className="font-bold">Serviços</span>
                        ) : (
                          <span className="font-bold">Informações</span>
                        )}
                        <span className="text-gray-500">{'>'}</span>
                        <span className="text-gray-500">lorem</span>
                        <span className="text-gray-500">{'>'}</span>
                        <span className="text-gray-500">ipsum</span>
                      </div>
                      <hr className="border-gray-200 my-4" />
                      <p className="text-gray-600 text-sm">{item.descricao}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600">Nenhum resultado encontrado para &ldquo;{query}&rdquo;</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function SearchResult() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#008FBE] py-4">
        <div className="flex justify-center">
          <Image
            onClick={() => router.push('/')} 
            src="/logo_prefeitura.svg" 
            alt="Prefeitura do Rio" 
            width={80} 
            height={100} 
            className="brightness-0 invert cursor-pointer"
          />
        </div>
      </div>

      {/* Main Content */}
      <Suspense fallback={<SearchResultSkeleton />}>
        <SearchResultContent />
      </Suspense>
    </div>
  )
}
