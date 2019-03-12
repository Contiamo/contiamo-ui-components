Tooltips give helpful hints about actions an end-user can perform. They are designed to be reusable, elegant and unobtrusive. Tooltips are great for UX, so we try to make them as versatile as possible.

### Usage

```jsx
import * as React from "react"
import { Tooltip   } from "@operational/components"
;<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <div style={{ position: "relative", border: "1px solid black", margin: 20, padding: 5, width: 80 }}>
    <p>I am a box full of mysteries.</p>
    <Tooltip top>All is clearer with tooltips</Tooltip>
    <Tooltip right>Even short ones</Tooltip>
  </div>
  <div style={{ position: "relative", border: "1px solid black", margin: 20, padding: 5, width: 80 }}>
    <p>I am a box full of mysteries.</p>
    <Tooltip bottom>Bottom-positioned tooltip</Tooltip>
    <Tooltip left>Tooltip from the left</Tooltip>
    <Tooltip right>Tooltip from the right</Tooltip>
  </div>
</div>
```
