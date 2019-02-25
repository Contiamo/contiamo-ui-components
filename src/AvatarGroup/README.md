### Display a group of avatars

```jsx
import * as React from "react"
import { AvatarGroup } from "@operational/components"
const avatars = [
  {
    name: "Peter Pan",
    photo: "https://www.robots-and-dragons.de/sites/default/files/field/image/preview/disney-peter_pan.jpg",
  },
  { name: "Wendy Darling" },
  { name: "John Darling" },
  { name: "Micheal Darling" },
  { name: "George Darling" },
  { name: "Tiger Lily" },
  { name: "Tinker Bell" },
  { name: "The Crocodile" },
  { name: "Captain Hook" },
  { name: "Mr. Smee" },
]
;<>
  <AvatarGroup avatars={avatars.slice(0, 3)} />
  <AvatarGroup avatars={avatars.slice(0, 4)} />
  <AvatarGroup avatars={avatars.slice(0, 5)} />
  <AvatarGroup avatars={avatars} />
</>
```

### Provide a custom onMoreClick action

```jsx
import * as React from "react"
import { AvatarGroup } from "@operational/components"
const avatars = [
  {
    name: "Peter Pan",
    photo: "https://www.robots-and-dragons.de/sites/default/files/field/image/preview/disney-peter_pan.jpg",
  },
  { name: "Wendy Darling" },
  { name: "John Darling" },
  { name: "Micheal Darling" },
  { name: "George Darling" },
  { name: "Tiger Lily" },
  { name: "Tinker Bell" },
  { name: "The Crocodile" },
  { name: "Captain Hook" },
  { name: "Mr. Smee" },
]
;<>
  <AvatarGroup avatars={avatars} onMoreClick={() => alert("onMore was clicked!")} />
</>
```

### Use the medium size

```jsx
import * as React from "react"
import { AvatarGroup } from "@operational/components"
const avatars = [
  {
    name: "Peter Pan",
    photo: "https://www.robots-and-dragons.de/sites/default/files/field/image/preview/disney-peter_pan.jpg",
  },
  { name: "Wendy Darling" },
  { name: "John Darling" },
  { name: "Micheal Darling" },
  { name: "George Darling" },
  { name: "Tiger Lily" },
  { name: "Tinker Bell" },
  { name: "The Crocodile" },
  { name: "Captain Hook" },
  { name: "Mr. Smee" },
]
;<>
  <AvatarGroup avatars={avatars} size="medium" />
</>
```

### Customize how many avatars is on screen

```jsx
import * as React from "react"
import { AvatarGroup } from "@operational/components"
const avatars = [
  {
    name: "Peter Pan",
    photo: "https://www.robots-and-dragons.de/sites/default/files/field/image/preview/disney-peter_pan.jpg",
  },
  { name: "Wendy Darling" },
  { name: "John Darling" },
  { name: "Micheal Darling" },
  { name: "George Darling" },
  { name: "Tiger Lily" },
  { name: "Tinker Bell" },
  { name: "The Crocodile" },
  { name: "Captain Hook" },
  { name: "Mr. Smee" },
]
;<>
  <AvatarGroup avatars={avatars} maximumToDisplay={2} />
  <AvatarGroup avatars={avatars} maximumToDisplay={5} />
  <AvatarGroup avatars={avatars} maximumToDisplay={8} />
</>
```

### Should also work with the old API

```jsx
import * as React from "react"
import { AvatarGroup, Avatar } from "@operational/components"
const avatars = [
  {
    name: "Peter Pan",
    photo: "https://www.robots-and-dragons.de/sites/default/files/field/image/preview/disney-peter_pan.jpg",
  },
  { name: "Wendy Darling" },
  { name: "John Darling" },
  { name: "Micheal Darling" },
  { name: "George Darling" },
  { name: "Tiger Lily" },
  { name: "Tinker Bell" },
  { name: "The Crocodile" },
  { name: "Captain Hook" },
  { name: "Mr. Smee" },
]
;<AvatarGroup>
  {avatars.map(({ name, photo }, i) => (
    <Avatar key={i} name={name} photo={photo} />
  ))}
</AvatarGroup>
```
