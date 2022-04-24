import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const useSessionStorage = (
  storageKey: string
): [string | null, Dispatch<SetStateAction<string | null>>] => {
  const [value, setValue] = useState<string | null>(
    sessionStorage.getItem(storageKey) ?? null
  )

  useEffect(() => {
    value && sessionStorage.setItem(storageKey, value)
    !value && sessionStorage.removeItem(storageKey)
  }, [storageKey, value])

  return [value, setValue]
}
