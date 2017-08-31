// @flow
import React, { Component } from "react"
import type { Node } from "react"
import glamorous, { Div } from "glamorous"

import style from "./SidebarItem.style"
import withTooltip from "../../Tooltip/withTooltip"

type Props = {
  className: string,
  label: mixed,
  children?: Node,
  open: boolean,
  onClick?: void,
  tooltip: any,
}

type State = {
  open: boolean,
  updating: boolean, // async, woo!
}

class SidebarItem extends Component<Props, State> {
  static defaultProps = {
    children: "",
    open: false,
    tooltip: false
  }

  state = {
    open: this.props && this.props.open,
    updating: false
  }

  async toggle() {
    if (!this.props.children) {
      return false
    }
    this.setState(() => ({ updating: true }))
    // If it is closed,
    if (this.props.onClick && !this.state.open) {
      await this.props.onClick() // wait for the promise to resolve first.
    }
    this.setState(prevState => ({
      open: !prevState.open,
      updating: false
    }))
    return true
  }

  render() {
    /**
      Only the header should have a tooltip, else the tooltip will show
      even when the cursor is over the children... who may also have their
      own tooltips.
    */
    const HeaderWithTooltip = withTooltip(Div)
    return (
      <div
        className={`${this.props.className} ${this.state.updating ? "updating" : ""} ${this.state.open ? "open" : ""}`}
      >
        <HeaderWithTooltip
          className={`header ${this.state.open ? "open" : ""}`}
          tooltip={this.props.tooltip}
          onClick={() => this.toggle()}
        >
          {this.props.label}
        </HeaderWithTooltip>
        {this.state.open
          ? <div className="content">
            {this.props.children}
          </div>
          : ""}
      </div>
    )
  }
}

export default glamorous(SidebarItem)(style)
export { SidebarItem }
