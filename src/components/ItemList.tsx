import { Item } from '../types'

interface ItemListProps {
  items: Item[]
  onRemoveItem: (id: string) => void
}

const ItemList = ({ items, onRemoveItem }: ItemListProps) => {
  if (items.length === 0) {
    return (
      <p className="text-center text-purple-300 italic py-4">
        No items added yet
      </p>
    )
  }

  return (
    <ol className="list-decimal pl-8 pr-4 text-white space-y-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="py-2 px-3 flex justify-between items-center bg-white bg-opacity-5 hover:bg-opacity-10 rounded-lg transition-all duration-300"
        >
          <span className="text-purple-500">{item.text}</span>
          <button
            onClick={() => onRemoveItem(item.id)}
            className="text-pink-400 hover:text-pink-100 ml-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-pink-500 transition-all duration-300"
            aria-label={`Remove ${item.text}`}
          >
            ✕
          </button>
        </li>
      ))}
    </ol>
  )
}

export default ItemList
