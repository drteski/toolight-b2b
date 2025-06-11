import { useEffect, useState } from 'react'
import { WindowSize } from '@/lib/types'

const useWindowSize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    function updateSize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}

export default useWindowSize
