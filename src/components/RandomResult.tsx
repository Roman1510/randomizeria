import { useState, useEffect } from 'react'
import { Item } from '../types'

interface RandomResultProps {
  item: Item | null
}

const RandomResult = ({ item }: RandomResultProps) => {
  const [bouncePhase, setBouncePhase] = useState<
    'none' | 'big' | 'small' | 'medium' | 'normal'
  >('none')

  useEffect(() => {
    if (item) {
      setBouncePhase('big')

      setTimeout(() => setBouncePhase('small'), 150)
      setTimeout(() => setBouncePhase('medium'), 300)
      setTimeout(() => setBouncePhase('normal'), 450)
      setTimeout(() => setBouncePhase('none'), 600)
    }
  }, [item])

  const getScaleClass = () => {
    switch (bouncePhase) {
      case 'big':
        return 'scale-115'
      case 'small':
        return 'scale-95'
      case 'medium':
        return 'scale-102'
      case 'normal':
        return 'scale-100'
      default:
        return ''
    }
  }

  const isAnimating = bouncePhase !== 'none'

  if (!item) {
    return (
      <div className="text-center p-6 bg-white bg-opacity-10 rounded-2xl">
        <p className="text-purple-300 italic">
          Click "Pick Random Item" to get a result!
        </p>
      </div>
    )
  }

  return (
    <div
      className={`text-center p-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-opacity-80 rounded-2xl shadow-lg transition-all duration-150 ease-out ${
        isAnimating
          ? `shadow-2xl shadow-purple-400/50 ring-4 ring-purple-300/30 ${getScaleClass()}`
          : ''
      }`}
    >
      <h3 className="text-lg font-semibold text-white mb-2">
        🎉 Selected Item:
      </h3>
      <p className="text-xl font-bold text-white bg-opacity-20 rounded-lg p-4 transition-all duration-150 ease-out">
        {item.text}
      </p>
    </div>
  )
}

export default RandomResult
