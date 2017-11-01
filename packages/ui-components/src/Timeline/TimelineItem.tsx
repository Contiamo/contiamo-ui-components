import * as React from "react"
import * as ReactFeather from "react-feather"
import glamorous, { GlamorousComponent, withTheme } from "glamorous"
import { hexOrColor } from "contiamo-ui-utils"
import { Theme, ThemeColorName } from "../theme"

export type CustomColor = ThemeColorName | string

export interface IProps {
  css?: {}
  className?: string
  children?: React.ReactNode
  color?: CustomColor
  icon?: string
  theme: Theme
}

export interface IPropsWithTheme extends IProps {
  theme: Theme
}

const Line = glamorous.div(
  {
    position: "absolute",
    left: 7,
    top: 2,
    height: "100%"
  },
  ({ theme }: { theme: Theme }) => ({
    borderLeft: `2px solid ${theme.colors.palette.grey30}`
  })
)

const StatusContainer = glamorous.div(
  {
    border: "2px solid transparent",
    borderRadius: "100px",
    height: 16,
    position: "absolute",
    top: 2,
    width: 16,
    "& > svg": {
      height: 18,
      width: 18
    }
  },
  ({ theme, color, children }: { theme: Theme; color: CustomColor; children: any }) => ({
    backgroundColor: `${theme.colors.palette.white}`,
    borderColor: `${color}`,
    color: `${color}`,
    ...children
      ? {
          border: 0,
          borderRadius: 0,
          height: "auto",
          left: -7,
          lineHeight: 0,
          marginTop: 10,
          padding: "3px 0",
          position: "absolute",
          textAlign: "center",
          transform: "translateY(-50%)",
          width: 30
        }
      : {}
  })
)

const Content = glamorous.div(
  {
    padding: "0 0 5px 26px",
    position: "relative",
    top: 0,
    "& > *": {
      margin: 0
    },
    "& p": {
      marginBottom: 0
    }
  },
  ({ theme }: { theme: Theme }): {} => ({
    ...theme.typography.body
  })
)

const Container = glamorous.li({
  listStyle: "none",
  margin: 0,
  padding: "0 0 24px",
  position: "relative",
  "&:last-child > :first-child": {
    display: "none"
  }
})

const TimelineItem: React.SFC<IPropsWithTheme> = ({
  css,
  className,
  children,
  color = "info",
  icon = "",
  theme
}: IPropsWithTheme) => {
  const IconLib = ReactFeather as any
  const isValidIcon = IconLib.hasOwnProperty(icon)
  const Icon = IconLib[icon]
  color = hexOrColor(color)(theme.colors.palette[color] || theme.colors.palette.info)

  return (
    <Container css={css} className={className}>
      <Line />
      <StatusContainer color={color}>{isValidIcon ? <Icon color={color} /> : null}</StatusContainer>
      <Content>{children}</Content>
    </Container>
  )
}

const WrappedTimelineItem: React.SFC<IProps> = withTheme(TimelineItem)

export default WrappedTimelineItem
