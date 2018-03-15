import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"
import { operational } from "@operational/theme"
import { OperationalUI } from "@operational/components"

injectStylesheet(baseStylesheet(operational))

const containerNode = document.getElementById("app")

import Chart from "../../src/Chart/facade"
import { VisualizationWrapper } from "../../src/index"

const LineRenderer: any = {
  type: "line"
}

const BarsRenderer: any = {
  type: "bars"
}

const StackedRenderer = {
  type: "stacked",
  renderAs: [BarsRenderer]
}

const data: any = {
  series: [
    {
      data: [
        {x: new Date("March 10, 2018"), y: 100},
        {x: new Date("March 11, 2018"), y: 200},
        {x: new Date("March 12, 2018"), y: 300},
        {x: new Date("March 13, 2018"), y: 400},
        {x: new Date("March 14, 2018"), y: 500}
      ],
      name: "my series",
      key: "unique_key",
      renderAs: [LineRenderer]  	  
    },
    {
      data: [
        {
          data: [
            {x: new Date("March 10, 2018"), y: 100},
            {x: new Date("March 11, 2018"), y: 200},
            {x: new Date("March 12, 2018"), y: 300},
            {x: new Date("March 13, 2018"), y: 400},
            {x: new Date("March 14, 2018"), y: 500}
          ],
          name: "series1",
          key: "series1"
        },
        {
          data: [
            {x: new Date("March 10, 2018"), y: 10},
            {x: new Date("March 11, 2018"), y: 20},
            {x: new Date("March 12, 2018"), y: 30},
            {x: new Date("March 13, 2018"), y: 40},
            {x: new Date("March 14, 2018"), y: 50}
          ],
          name: "series2",
          key: "series2"
        }
      ],
      name: "my series",
      key: "unique_key2",
      renderAs: [StackedRenderer]  // Similar concept for range renderer, but data.length === 2	  
    }
  ],
  axes: {
    x1: {
      type: "time"
    },
    y1: {
      type: "quant"
    }
  }    
}

const App = () => <OperationalUI><VisualizationWrapper facade={Chart} data={data} /></OperationalUI>

render(<App />, containerNode)
