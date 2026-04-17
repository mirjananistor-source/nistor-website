"use client"

import * as React from "react"

export type Toast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

type ToastState = Toast[]

const listeners: Array<(state: ToastState) => void> = []
let memoryState: ToastState = []

function emit(state: ToastState) {
  memoryState = state
  listeners.forEach((l) => l(state))
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastState>(memoryState)

  React.useEffect(() => {
    listeners.push(setToasts)
    return () => {
      const idx = listeners.indexOf(setToasts)
      if (idx > -1) listeners.splice(idx, 1)
    }
  }, [])

  return {
    toasts,
    toast: (toast: Omit<Toast, "id">) => {
      const id = crypto.randomUUID()
      emit([{ id, ...toast }, ...memoryState])
    },
    dismiss: (id?: string) => {
      emit(id ? memoryState.filter((t) => t.id !== id) : [])
    },
  }
}
