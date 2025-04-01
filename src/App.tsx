import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'

interface Item {
  id: string
  text: string
}

const App = () => {
  const [items, setItems] = useState<Item[]>([])
  const [newItem, setNewItem] = useState<string>('')
  const [randomItem, setRandomItem] = useState<Item | null>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    try {
      const savedItems = localStorage.getItem('pickerItems')
      if (savedItems) {
        setItems(JSON.parse(savedItems))
      }
    } catch (err) {
      console.error('Error loading from localStorage:', err)
      setItems([])
    }
  }, [])

  useEffect(() => {
    try {
      if (items.length > 0) {
        localStorage.setItem('pickerItems', JSON.stringify(items))
      } else {
        localStorage.removeItem('pickerItems')
      }
    } catch (err) {
      console.error('Error saving to localStorage:', err)
    }
  }, [items])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItem(e.target.value)
    setError('')
  }

  const addItem = () => {
    if (newItem.trim() === '') {
      setError('Please enter an item')
      return
    }

    if (newItem.length > 50) {
      setError('Item must be 50 characters or less')
      return
    }

    const newItemObject: Item = {
      id: Date.now().toString(),
      text: newItem.trim(),
    }

    setItems((prevItems) => [...prevItems, newItemObject])
    setNewItem('')
    setError('')
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const pickRandomItem = () => {
    if (items.length === 0) {
      setError('Add some items first!')
      setRandomItem(null)
      return
    }

    const randomIndex = Math.floor(Math.random() * items.length)
    setRandomItem(items[randomIndex])
    setError('')
  }

  const clearAllItems = () => {
    setItems([])
    setRandomItem(null)
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItem()
    }
  }

  return (
    <div className="flex flex-col items-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Random Item Picker</h1>

      <div className="w-full mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Add an item (max 50 chars)"
            className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={50}
          />
          <button
            onClick={addItem}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>

      <div className="w-full mb-6">
        <h2 className="text-xl font-semibold mb-2 text-center">Your Items</h2>
        {items.length > 0 ? (
          <ol className="list-decimal pl-8 pr-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="mb-2 flex justify-between items-center"
              >
                <span>{item.text}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  ✕
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-center text-gray-500">No items added yet</p>
        )}
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={pickRandomItem}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Pick Random Item
        </button>
        <button
          onClick={clearAllItems}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Clear All
        </button>
      </div>

      {randomItem && (
        <div className="mt-4 p-4 bg-yellow-100 rounded-lg text-center w-full">
          <h3 className="text-lg font-semibold mb-2">Random Pick:</h3>
          <p className="text-xl font-bold">{randomItem.text}</p>
        </div>
      )}
    </div>
  )
}

export default App
