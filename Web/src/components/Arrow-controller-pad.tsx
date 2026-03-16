import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Square } from "lucide-react"

interface ArrowControlPadProps {
  onDirectionStart: (direction: string) => void
  currentDirection?: string
}

export const ArrowControlPad = ({ onDirectionStart, currentDirection }: ArrowControlPadProps) => {
  return (
    <div className="mt-6 p-4 bg-[hsl(var(--meadow-light)/0.2)] rounded-xl border border-[hsl(var(--meadow)/0.2)]">
      <h4 className="text-sm font-semibold text-[hsl(var(--forest))] mb-3">Arrow Controls</h4>
      <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto">
        <div></div>
        <button
          onClick={() => onDirectionStart("f")}
          className={`p-3 rounded-lg transition-all duration-200 ${
            currentDirection === "f"
              ? "bg-[hsl(var(--forest))] text-white shadow-md"
              : "bg-white/70 text-[hsl(var(--forest))] hover:bg-[hsl(var(--meadow-light))] border border-[hsl(var(--meadow)/0.3)]"
          }`}
        >
          <ArrowUp className="h-5 w-5 mx-auto" />
        </button>
        <div></div>
        
        <button
          onClick={() => onDirectionStart("a")}
          className={`p-3 rounded-lg transition-all duration-200 ${
            currentDirection === "a"
              ? "bg-[hsl(var(--forest))] text-white shadow-md"
              : "bg-white/70 text-[hsl(var(--forest))] hover:bg-[hsl(var(--meadow-light))] border border-[hsl(var(--meadow)/0.3)]"
          }`}
        >
          <ArrowLeft className="h-5 w-5 mx-auto" />
        </button>
        <button
          onClick={() => onDirectionStart("s")}
          className={`p-3 rounded-lg transition-all duration-200 ${
            currentDirection === "s"
              ? "bg-[hsl(var(--sunset))] text-white shadow-md"
              : "bg-white/70 text-[hsl(var(--forest))] hover:bg-[hsl(var(--meadow-light))] border border-[hsl(var(--meadow)/0.3)]"
          }`}
        >
          <Square className="h-4 w-4 mx-auto" />
        </button>
        <button
          onClick={() => onDirectionStart("c")}
          className={`p-3 rounded-lg transition-all duration-200 ${
            currentDirection === "c"
              ? "bg-[hsl(var(--forest))] text-white shadow-md"
              : "bg-white/70 text-[hsl(var(--forest))] hover:bg-[hsl(var(--meadow-light))] border border-[hsl(var(--meadow)/0.3)]"
          }`}
        >
          <ArrowRight className="h-5 w-5 mx-auto" />
        </button>
        
        <div></div>
        <button
          onClick={() => onDirectionStart("b")}
          className={`p-3 rounded-lg transition-all duration-200 ${
            currentDirection === "b"
              ? "bg-[hsl(var(--forest))] text-white shadow-md"
              : "bg-white/70 text-[hsl(var(--forest))] hover:bg-[hsl(var(--meadow-light))] border border-[hsl(var(--meadow)/0.3)]"
          }`}
        >
          <ArrowDown className="h-5 w-5 mx-auto" />
        </button>
        <div></div>
      </div>
    </div>
  )
}
