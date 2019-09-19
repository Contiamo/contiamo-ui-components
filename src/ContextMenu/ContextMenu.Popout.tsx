import * as React from "react"
import { createPortal } from "react-dom"

import styled from "../utils/styled"
import { ContextMenuProps } from "./ContextMenu"
import useSticky from "../useSticky/useSticky"

export interface ContextMenuPopoutProps {
  embedChildrenInMenu?: ContextMenuProps["embedChildrenInMenu"]
  numRows: number
  align: ContextMenuProps["align"]
  condensed: ContextMenuProps["condensed"]
  rowHeight: number
  container?: React.RefObject<HTMLDivElement>
  children?: React.ReactNode
}

interface PositionProps {
  left: string
  top: string
  position: string
  width?: string
}

const Container = styled.div<ContextMenuPopoutProps & PositionProps>`
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  max-height: 50vh;
  overflow: auto;
  box-shadow: ${({ theme }) => theme.shadows.contextMenu};
  min-width: fit-content;
  width: ${({ width }) => width};
  max-width: 90vw;
  min-height: ${({ rowHeight }) => rowHeight}px;
  display: grid;
  grid-template-rows: repeat(${({ numRows }) => numRows}, max-content);
  background-color: ${({ theme }) => theme.color.white};
  padding: ${({ theme }) => theme.space.small}px 0;
  z-index: ${({ theme }) => theme.zIndex.selectOptions + 2};
`

const ContextMenuPopout = React.forwardRef(
  (
    { align, children, condensed, container, embedChildrenInMenu, numRows, rowHeight }: ContextMenuPopoutProps,
    forwardRef: React.Ref<HTMLDivElement>,
  ) => {
    const fallbackRef = React.useRef<HTMLDivElement | null>(null)
    const ref = forwardRef || fallbackRef

    const { left, position, top, width } = useSticky({
      inputRef: ref,
      options: { shouldAvoidToggler: true },
      initialValue: {
        position: "absolute",
        left: align === "left" ? "0" : "auto",
        top: embedChildrenInMenu ? "0" : "100%",
        width: "100%",
        alignment: "flex-start",
      },
    })

    const areWeFixedYet = position === "fixed"
    const popOut = (
      <Container
        align={align}
        condensed={condensed}
        numRows={numRows}
        rowHeight={rowHeight}
        left={left}
        width={width}
        top={top}
        position={position}
        ref={ref}
      >
        {children}
      </Container>
    )

    return areWeFixedYet && container && container.current ? createPortal(popOut, container.current) : popOut
  },
)

export default ContextMenuPopout