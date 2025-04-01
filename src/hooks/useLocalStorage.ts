import { useState, useEffect } from 'react'

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      if (
        storedValue === initialValue &&
        Array.isArray(initialValue) &&
        initialValue.length === 0
      ) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(storedValue))
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }, [key, storedValue, initialValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
