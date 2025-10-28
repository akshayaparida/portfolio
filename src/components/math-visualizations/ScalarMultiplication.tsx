'use client'

import { useState } from 'react'
import { Mafs, Coordinates, Vector, useMovablePoint, Theme, Text } from 'mafs'

export default function ScalarMultiplication() {
  const [scalar, setScalar] = useState(2)
  
  const baseVector = useMovablePoint([2, 1.5], {
    constrain: (point) => [
      Math.max(-4, Math.min(4, point[0])),
      Math.max(-4, Math.min(4, point[1]))
    ]
  })

  const scaledVector: [number, number] = [
    baseVector.point[0] * scalar,
    baseVector.point[1] * scalar
  ]

  const baseMag = Math.sqrt(baseVector.point[0] ** 2 + baseVector.point[1] ** 2).toFixed(2)
  const scaledMag = Math.sqrt(scaledVector[0] ** 2 + scaledVector[1] ** 2).toFixed(2)

  return (
    <div className="w-full max-w-3xl mx-auto my-6 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm">
      <h4 className="text-base font-semibold mb-1 text-gray-800 dark:text-white">
        Try it: Scalar Multiplication
      </h4>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
        Drag the blue dot • Use the slider to scale
      </p>

      <div className="w-full h-[320px] mb-3 bg-gray-50 dark:bg-gray-950 rounded border border-gray-200 dark:border-gray-700">
        <Mafs
          viewBox={{ x: [-8, 8], y: [-8, 8] }}
          preserveAspectRatio={false}
        >
          <Coordinates.Cartesian />
          
          {/* Base vector (blue) */}
          <Vector
            tail={[0, 0]}
            tip={baseVector.point}
            color={Theme.blue}
            opacity={0.4}
          />
          {baseVector.element}
          
          {/* Scaled vector (red) */}
          <Vector
            tail={[0, 0]}
            tip={scaledVector}
            color={Theme.red}
            weight={3}
          />
          
          {/* Labels */}
          <Text x={baseVector.point[0]} y={baseVector.point[1] + 0.5} attach="n" size={14}>
            v
          </Text>
          <Text x={scaledVector[0]} y={scaledVector[1] + 0.6} attach="n" size={16}>
            {scalar}v
          </Text>
        </Mafs>
      </div>

      {/* Slider */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Scalar: {scalar.toFixed(1)}
        </label>
        <input
          type="range"
          min="-3"
          max="3"
          step="0.1"
          value={scalar}
          onChange={(e) => setScalar(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
          <span>-3</span>
          <span>0</span>
          <span>+3</span>
        </div>
      </div>

      {/* Compact info display */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
          <span className="font-semibold text-blue-700 dark:text-blue-300">v:</span>
          <span className="ml-1 text-gray-700 dark:text-gray-300">
            [{baseVector.point[0].toFixed(1)}, {baseVector.point[1].toFixed(1)}]
          </span>
        </div>

        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
          <span className="font-semibold text-red-700 dark:text-red-300">{scalar.toFixed(1)}v:</span>
          <span className="ml-1 text-gray-700 dark:text-gray-300">
            [{scaledVector[0].toFixed(1)}, {scaledVector[1].toFixed(1)}]
          </span>
        </div>
      </div>

      {/* Key insight - compact */}
      <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-[11px] text-gray-700 dark:text-gray-300">
        {
          scalar > 1 ? `Stretches ${scalar}× longer` :
          scalar === 1 ? 'Same vector' :
          scalar > 0 ? `Shrinks to ${scalar}× length` :
          scalar === 0 ? 'Disappears!' :
          `Flips & scales ${Math.abs(scalar)}×`
        }
      </div>
    </div>
  )
}
