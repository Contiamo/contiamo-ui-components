import { keyframes } from "@emotion/core"
import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface ProgressProps extends DefaultProps {
  /** Provide a button to retry the action to load */
  onRetry?: () => void
  /** OnClose callback */
  onClose?: () => void
  /** Show progress bar on the bottom? */
  bottom?: boolean
  /** Display progress bar inline? */
  inline?: boolean
  /** Progress as percentage */
  percentage?: number
  /** Explicit bar width for inline only. Default: 100%. Minimum: 64px.  */
  width?: number
}

function validWidth(width: number): number {
  return width > 64 ? width : 64
}

const Container = styled("div")<ProgressProps>(
  {
    label: "progress",
    overflowX: "hidden",
    textAlign: "center",
    left: 0,
  },
  ({ theme, bottom, inline, width }) => ({
    ...(inline
      ? {
          backgroundColor: theme.color.background.light,
          borderRadius: 2,
          width: width ? `${validWidth(width)}px` : "100%",
        }
      : {
          backgroundColor: "transparent",
          position: "fixed",
          width: "100%",
        }),
    zIndex: theme.zIndex.globalProgress,
    top: bottom ? "auto" : 0,
    bottom: bottom ? 0 : "auto",
  }),
)

const fillProgress = keyframes({
  from: {
    transform: "translate3d(-100%, 0, 0)",
  },
  to: {
    transform: "translate3d(0, 0, 0)",
  },
})

const Bar = styled("div")<Pick<ProgressProps, "percentage">>(({ percentage, theme }) => ({
  width: "100%",
  height: 3,
  position: "relative",
  ...(typeof percentage !== "undefined"
    ? {
        ":after": {
          content: `""`,
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: theme.color.primary,
          width: `${percentage}%`,
          height: "100%",
        },
      }
    : {
        animation: `${fillProgress} cubic-bezier(0, 0.9, 0.26, 1) forwards 20s`,
        backgroundColor: theme.color.primary,
      }),
}))

const Progress: React.SFC<ProgressProps> = ({ onRetry, onClose, percentage, ...props }) => (
  <Container {...props}>
    <Bar percentage={percentage} />
  </Container>
)

export default Progress
