"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ResizablePanelProps {
  children: React.ReactNode
  direction: "horizontal" | "vertical"
  defaultSize: number
  minSize?: number
  maxSize?: number
  onResize?: (size: number) => void
  className?: string
  resizeFrom?: "top" | "bottom" | "left" | "right"
}

export function ResizablePanel({
  children,
  direction,
  defaultSize,
  minSize = 100,
  maxSize = 800,
  onResize,
  className,
  resizeFrom = "bottom",
}: ResizablePanelProps) {
  const [size, setSize] = useState(defaultSize)
  const [isDragging, setIsDragging] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const startPosRef = useRef(0)
  const startSizeRef = useRef(0)

  const isVertical = direction === "vertical"
  const resizeProperty = isVertical ? "height" : "width"

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    startPosRef.current = isVertical ? e.clientY : e.clientX
    startSizeRef.current = size
    setIsDragging(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const currentPos = isVertical ? e.clientY : e.clientX
      const diff = currentPos - startPosRef.current

      // Adjust the direction of resizing based on resizeFrom
      const directionMultiplier = resizeFrom === "bottom" || resizeFrom === "right" ? 1 : -1

      let newSize = startSizeRef.current + diff * directionMultiplier

      // Clamp the size between minSize and maxSize
      newSize = Math.max(minSize, Math.min(maxSize, newSize))

      setSize(newSize)
      if (onResize) onResize(newSize)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isVertical, maxSize, minSize, onResize, resizeFrom])

  return (
    <div ref={panelRef} className={cn("relative", className)} style={{ [resizeProperty]: `${size}px` }}>
      {children}

      <div
        className={cn(
          "absolute cursor-row-resize",
          isVertical
            ? resizeFrom === "top"
              ? "top-0 left-0 right-0 h-1 -translate-y-1/2"
              : "bottom-0 left-0 right-0 h-1 translate-y-1/2"
            : resizeFrom === "left"
              ? "top-0 left-0 bottom-0 w-1 -translate-x-1/2"
              : "top-0 right-0 bottom-0 w-1 translate-x-1/2",
          isDragging ? "bg-blue-500" : "hover:bg-blue-500/50",
        )}
        onMouseDown={handleMouseDown}
      />
    </div>
  )
}
