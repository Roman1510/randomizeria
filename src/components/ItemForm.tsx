import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { MAX_ITEM_LENGTH, ERROR_MESSAGES } from '../const/constants'
import Button from './GlowButton'

interface ItemFormProps {
  onAddItem: (text: string) => void
}

const ItemForm = ({ onAddItem }: ItemFormProps) => {
  const [newItem, setNewItem] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItem(e.target.value)
    setError('')
  }

  const handleSubmit = () => {
    if (newItem.trim() === '') {
      setError(ERROR_MESSAGES.EMPTY_ITEM)
      return
    }

    if (newItem.length > MAX_ITEM_LENGTH) {
      setError(ERROR_MESSAGES.TOO_LONG)
      return
    }

    onAddItem(newItem.trim())
    setNewItem('')
    setError('')
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder={`Add an item (max ${MAX_ITEM_LENGTH} chars)`}
          className="flex-grow p-3 bg-white bg-opacity-20 backdrop-blur-sm border border-purple-300 border-opacity-30 rounded-lg text-purple-900 placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          maxLength={MAX_ITEM_LENGTH}
        />
        <Button onClick={handleSubmit} variant="primary" size="md">
          Add
        </Button>
      </div>
      {error && (
        <p className="text-pink-300 mt-2 text-sm font-medium">{error}</p>
      )}
    </div>
  )
}

export default ItemForm
