import * as React from "react"

import { isCmdEnter } from "../utils"
import styled from "../utils/styled"

const Container = styled("form")(({ theme }) => ({
  "> div, > label": {
    display: "block",
  },

  // Space between groups
  "> :not(:last-child)": {
    marginBottom: 34 - theme.space.small,
  },

  // Space between children _inside_ groups
  "> :not(:last-child) > *": {
    marginBottom: theme.space.small,
  },

  // Space between siblings inside children inside groups
  "> * > *:not(:last-child)": {
    marginRight: theme.space.small,
  },
}))

const Form: React.SFC<React.FormHTMLAttributes<{}>> = props => (
  <Container
    {...props}
    onKeyDown={(ev: React.KeyboardEvent<HTMLFormElement>) => {
      if (isCmdEnter(ev) && props.onSubmit) {
        props.onSubmit(ev)
      }
    }}
  />
)

export default Form
