import chartTestCases from "./Chart"
import pieChartTestCases from "./PieChart"
import processFlowTestCases from "./ProcessFlow"
import sunburstTestCases from "./Sunburst"

export default [
  { title: "Charts", marathons: chartTestCases },
  { title: "Pie Charts", marathons: pieChartTestCases },
  { title: "Process Flow", marathons: processFlowTestCases },
  { title: "Sunburst charts", marathons: sunburstTestCases }
]
