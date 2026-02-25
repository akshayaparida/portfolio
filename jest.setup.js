import '@testing-library/jest-dom'
import 'jest-axe/extend-expect'

// Mock canvas getContext for jsdom (used by axe-core)
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  measureText: jest.fn(() => ({ width: 0 })),
  fillText: jest.fn(),
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(() => ({ data: [] })),
  putImageData: jest.fn(),
  createImageData: jest.fn(() => []),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  transform: jest.fn(),
  rect: jest.fn(),
  clip: jest.fn(),
  canvas: { width: 300, height: 150 },
}));
