import * as React from "react"

import Icon from "../Icon/Icon"
import styled from "../utils/styled"

export interface TogglerProps {
  isFolded?: boolean
  isHovered?: boolean
  innerRef?: React.RefObject<HTMLDivElement>
  onMouseEnter?: React.EventHandler<React.SyntheticEvent>
  onMouseLeave?: React.EventHandler<React.SyntheticEvent>
  onClick?: React.EventHandler<React.SyntheticEvent>
}

const FoldableIcon = styled(Icon)`
  margin-left: auto;
  pointer-events: none;
`

/**
 * This component overlays its child with a full-size
 * div that gets darker on hover in order to signal
 * clickability.
 *
 * This was done in order to support cases where
 * `CardSection`s become Foldable but BOTH become
 * foldable when stacked horizontally.
 *
 * @micha-f has more info.
 */
const TogglerOverlay = styled("div")<{ isHovered: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  padding-right: ${({ theme }) => theme.space.content}px;
  background-color: ${({ isHovered }) => (isHovered ? "rgba(0, 0, 0, 0.04)" : "transparent")};
`

const Toggler: React.SFC<TogglerProps> = ({ isFolded, isHovered, ...props }) => (
  <TogglerOverlay isHovered={Boolean(isHovered)} {...props}>
    <FoldableIcon
      color={
        isHovered
          ? "color.text.lighter"
          : "#00000022" /* <- is alpha-blended in order to be visible even on grey backgrounds as in <Group /> */
      }
      name={isFolded ? "ChevronDown" : "ChevronUp"}
    />
  </TogglerOverlay>
)

export default Toggler
