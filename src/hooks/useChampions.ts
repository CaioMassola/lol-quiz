import { useQuery } from '@tanstack/react-query'
import { VERSION_URL, CHAMP_DATA_URL } from '../constants'
import type { Champion } from '../types'

async function fetchChampions(): Promise<{ champions: Champion[]; version: string }> {
  const vRes = await fetch(VERSION_URL)
  const versions: string[] = await vRes.json()
  const version = versions[0]

  const cRes = await fetch(CHAMP_DATA_URL(version))
  const cData = await cRes.json()
  const champions: Champion[] = Object.values(cData.data).map((c: unknown) => {
    const champ = c as { id: string; name: string }
    return { id: champ.id, name: champ.name }
  })

  return { champions, version }
}

export function useChampions() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['champions'],
    queryFn: fetchChampions,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return {
    champions: data?.champions ?? [],
    version: data?.version ?? '',
    loading: isLoading,
    error: error ? 'Erro ao carregar campeões. Verifique sua conexão.' : null,
  }
}
