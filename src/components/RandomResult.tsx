import { Item } from '../types'

interface RandomResultProps {
  item: Item | null
}

const RandomResult = ({ item }: RandomResultProps) => {
  if (!item) return null

  return (
    <div className="animate-fadeIn mt-4 p-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-center shadow-lg">
      <h3 className="text-lg font-semibold mb-2 text-white">Random Pick:</h3>
      <p className="text-2xl font-bold text-white drop-shadow-md">
        {item.text}
      </p>
    </div>
  )
}

export default RandomResult
