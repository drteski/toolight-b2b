'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetPayloadData = (endpoint: string, globals: boolean, locale: string) => {
  const getPayloadData = async () => {
    return await axios
      .get(`/api/${globals ? 'globals' : ''}/${endpoint}/?depth=3&draft=false&locale=${locale}`, {
        // credentials: 'include',
        headers: {
          'Accept-Language': locale,
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Payload-HTTP-Method-Override': 'GET',
          'Cache-Control': 'public, max-age=300',
        },
      })
      .then((res) => res.data)
      .catch((error) => ({
        message: error,
      }))
  }
  const { data, error, isError, isLoading } = useQuery({
    queryKey: [`${endpoint}`, locale],
    queryFn: getPayloadData,
  })
  return { data, error, isError, isLoading }
}
