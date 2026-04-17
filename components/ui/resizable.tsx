"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

// react-resizable-panels v4:
// PanelGroup -> Group
// PanelResizeHandle -> Separator
// direction -> orientation
// data-panel-group-direction -> aria-orientation
// (shadcn wrapper names stay the same) [1](https://ui.shadcn.com/docs/components/resizable)

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Group>) => (
  <ResizablePrimitive.Group
    className={cn(
      "flex h-full w-full aria-[orientation=vertical]:flex-col data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

ResizablePanelGroup.displayName = "ResizablePanelGroup"

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Separator> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.Separator
    className={cn(
      "relative flex w-px items-center justify-center bg-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring aria-[orientation=vertical]:h-px aria-[orientation=vertical]:w-full data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVerticalIcon className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.Separator>
)

ResizableHandle.displayName = "ResizableHandle"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
