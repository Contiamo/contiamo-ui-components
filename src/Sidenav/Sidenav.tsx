import * as React from "react"

import { DefaultProps } from "../types"
import { readableTextColor } from "../utils"
import styled from "../utils/styled"

export interface SidenavProps extends DefaultProps {
  /** Show the sidebar in compact mode */
  compact?: boolean
  /** Render a dark sidenav */
  dark?: boolean
}

export interface State {
  isHovered: boolean
}

const Container = styled("div")<SidenavProps>(({ theme, compact, dark }) => {
  const backgroundColor = dark ? theme.color.primaryDark : theme.color.white
  const color = readableTextColor(backgroundColor, [theme.color.text.default, theme.color.white])
  return {
    color: dark ? theme.color.white : color,
    backgroundColor,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    overflow: "auto",
    width: compact ? theme.compactSidebarWidth : theme.sidebarWidth,
    height: "100%",
    borderRight: "1px solid",
    borderRightColor: theme.color.separators.default,

    ".operational-ui__sidenav-item_end": {
      marginTop: "auto",
    },

    ".operational-ui__sidenav-item_end + .operational-ui__sidenav-item_end": {
      marginTop: 0,
    },

    /** Give people a slightly nicer experience on Chrome/Safari/Edge */
    "::-webkit-scrollbar": {
      width: 6,
    },

    "::-webkit-scrollbar-track": {
      background: "transparent",
    },

    "::-webkit-scrollbar-thumb": {
      background: dark ? "rgba(255, 255, 255, 0.3)" : theme.color.background.light,
      cursor: "grab",
    },

    "::-webkit-scrollbar-thumb:hover": {
      background: theme.color.primary,
    },
  }
})

const Sidenav: React.SFC<SidenavProps> = ({ children, ...props }) => (
  <Container {...props}>
    {React.Children.map(children, child => {
      if (!child) {
        return
      }
      // see line 8 for the safety of this assertion
      const childElement = child as React.ReactElement<any>
      return {
        ...childElement,
        props: { ...childElement.props, compact: props.compact, dark: props.dark },
      }
    })}
  </Container>
)

export default Sidenav
