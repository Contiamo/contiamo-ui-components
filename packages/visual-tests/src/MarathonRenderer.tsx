import * as React from "react"
import styled from "react-emotion"

import { Icon } from "@operational/components"
import { OperationalStyleConstants, operational } from "@operational/theme"
import { MarathonRenderer } from "./Marathon"

const Container = styled("ul")({
  padding: 0,
})

const Content = styled("div")(
  {
    padding: 20,
  },
  ({ theme }: { theme?: OperationalStyleConstants }) => ({
    backgroundColor: theme.color.background.lighter,
    borderRadius: 4,
  }),
)

const Item = styled("li")({
  listStyle: "none",
  margin: 0,
  "& > *": {
    display: "inline-block",
    verticalAlign: "middle",
    marginTop: 2,
    marginBottom: 2,
  },
})

const Title = styled("p")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  fontSize: theme.font.size.title,
  display: "inline-block",
  "& :first-child": {
    position: "relative",
    top: -2,
    marginRight: 6,
  },
  "& > *": {
    display: "inline-block",
    verticalAlign: "middle",
  },
}))

const FailureMessage = styled("p")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  color: theme.color.error,
  display: "inline-block",
  marginLeft: 8,
  "&::before": {
    content: " → ",
  },
}))

const MarathonRendererComponent = ({ results, ref }: MarathonRenderer) => (
  <div>
    <Container>
      {results.map((result, index) => {
        const content = result.isCompleted ? (
          result.errors.length > 0 ? (
            <Icon name="X" size={12} color={operational.colors.error} />
          ) : (
            <Icon name="Check" size={12} color={operational.colors.success} />
          )
        ) : (
          <Icon name="MoreHorizontal" size={12} />
        )
        return (
          <Item key={index}>
            <Title>
              {content}
              {result.description}
            </Title>
            {result.errors.length > 0 && <FailureMessage>{result.errors.concat(" ")}</FailureMessage>}
          </Item>
        )
      })}
    </Container>
    <Content innerRef={ref} />
  </div>
)

export default MarathonRendererComponent
