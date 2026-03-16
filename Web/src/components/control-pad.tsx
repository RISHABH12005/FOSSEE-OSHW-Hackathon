import { DirectionButton } from "./direction-button"

interface ControlPadProps {
  onDirectionStart: (direction: string) => void
  currentDirection?: string
}

export const ControlPad = ({ onDirectionStart, currentDirection }: ControlPadProps) => {
  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Vehicle Controls</h4>
      <div className="grid grid-cols-3 gap-2">
        <div></div>
        <DirectionButton direction="f" onClick={onDirectionStart}>
          ↑ Forward
        </DirectionButton>
        <div></div>

        <DirectionButton direction="a" onClick={onDirectionStart}>
          ← Left
        </DirectionButton>
        <DirectionButton direction="s" onClick={onDirectionStart} variant="danger">
          ⏹ Stop
        </DirectionButton>
        <DirectionButton direction="c" onClick={onDirectionStart}>
          → Right
        </DirectionButton>

        <div></div>
        <DirectionButton direction="b" onClick={onDirectionStart}>
          ↓ Backward
        </DirectionButton>
        <div></div>
      </div>

      {currentDirection && (
        <div className="mt-3 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700 border border-purple-200">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span>Moving: {currentDirection.toUpperCase()}</span>
          </div>
        </div>
      )}
    </div>
  )
}
