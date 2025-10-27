'use client'

import { useState } from 'react'
import { Mafs, Coordinates, Vector, Point, useMovablePoint, Theme, Text } from 'mafs'

export default function VectorDemo() {
  const [showSum, setShowSum] = useState(false)
  
  // Movable points for vector endpoints
  const vector1 = useMovablePoint([2, 1], {
    constrain: (point) => [
      Math.max(-5, Math.min(5, point[0])),
      Math.max(-5, Math.min(5, point[1]))
    ]
  })
  
  const vector2 = useMovablePoint([1, 3], {
    constrain: (point) => [
      Math.max(-5, Math.min(5, point[0])),
      Math.max(-5, Math.min(5, point[1]))
    ]
  })

  // Calculate vector sum
  const sumVector: [number, number] = [
    vector1.point[0] + vector2.point[0],
    vector1.point[1] + vector2.point[1]
  ]

  // Calculate dot product
  const dotProduct = (vector1.point[0] * vector2.point[0] + vector1.point[1] * vector2.point[1]).toFixed(2)

  // Calculate magnitudes
  const mag1 = Math.sqrt(vector1.point[0] ** 2 + vector1.point[1] ** 2).toFixed(2)
  const mag2 = Math.sqrt(vector2.point[0] ** 2 + vector2.point[1] ** 2).toFixed(2)

  // Calculate angle between vectors (in degrees)
  const angle = (Math.acos(
    (vector1.point[0] * vector2.point[0] + vector1.point[1] * vector2.point[1]) /
    (parseFloat(mag1) * parseFloat(mag2))
  ) * 180 / Math.PI).toFixed(1)

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Interactive Vector Operations
      </h3>
      
      <div className="mb-4 text-sm text-gray-700 dark:text-gray-300">
        Drag the blue and red dots to move the vectors!
      </div>

      <div className="w-full h-[500px] mb-6">
        <Mafs
          viewBox={{ x: [-5, 5], y: [-5, 5] }}
          preserveAspectRatio={false}
        >
          <Coordinates.Cartesian />
          
          {/* Vector 1 (blue) */}
          <Vector
            tail={[0, 0]}
            tip={vector1.point}
            color={Theme.blue}
          />
          {vector1.element}
          
          {/* Vector 2 (red) */}
          <Vector
            tail={[0, 0]}
            tip={vector2.point}
            color={Theme.red}
          />
          {vector2.element}
          
          {/* Sum vector (green) - shown when enabled */}
          {showSum && (
            <>
              <Vector
                tail={[0, 0]}
                tip={sumVector}
                color={Theme.green}
                style="dashed"
              />
              <Text x={sumVector[0]} y={sumVector[1] + 0.5} attach="n" size={14}>
                v + w
              </Text>
            </>
          )}

          {/* Labels */}
          <Text x={vector1.point[0]} y={vector1.point[1] + 0.5} attach="n" size={14}>
            v
          </Text>
          <Text x={vector2.point[0]} y={vector2.point[1] + 0.5} attach="n" size={14}>
            w
          </Text>
        </Mafs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Vector v (blue)</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            [{vector1.point[0].toFixed(2)}, {vector1.point[1].toFixed(2)}]
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Magnitude: {mag1}
          </p>
        </div>

        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h4 className="font-semibold text-red-900 dark:text-red-300 mb-2">Vector w (red)</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            [{vector2.point[0].toFixed(2)}, {vector2.point[1].toFixed(2)}]
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Magnitude: {mag2}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">Dot Product</h4>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            v · w = {dotProduct}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {parseFloat(dotProduct) > 0 ? '✓ Same general direction' : 
             parseFloat(dotProduct) === 0 ? '⊥ Perpendicular' : 
             '↔ Opposite directions'}
          </p>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">Angle Between</h4>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {isNaN(parseFloat(angle)) ? '—' : `${angle}°`}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            cos(θ) = {(parseFloat(dotProduct) / (parseFloat(mag1) * parseFloat(mag2))).toFixed(3)}
          </p>
        </div>
      </div>

      <button
        onClick={() => setShowSum(!showSum)}
        className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
      >
        {showSum ? 'Hide' : 'Show'} Vector Sum (v + w)
      </button>

      {showSum && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">Vector Sum</h4>
          <p className="text-gray-700 dark:text-gray-300">
            v + w = [{sumVector[0].toFixed(2)}, {sumVector[1].toFixed(2)}]
          </p>
        </div>
      )}
    </div>
  )
}
