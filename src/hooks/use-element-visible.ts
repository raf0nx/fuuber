import { useEffect, useRef, useState } from 'react'

export const useElementVisible = <T>(isInitiallyVisible: boolean) => {
  const [isElementVisible, setIsElementVisible] = useState(isInitiallyVisible)
  const ref = useRef<T>(null)

  const clickOutsideHandler = ({ target }: MouseEvent) => {
    if (
      ref.current &&
      !(ref.current as unknown as Node).contains(target as Node)
    ) {
      setIsElementVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', clickOutsideHandler, true)

    return () => {
      document.removeEventListener('click', clickOutsideHandler, true)
    }
  }, [])

  return { ref, isElementVisible, setIsElementVisible }
}
