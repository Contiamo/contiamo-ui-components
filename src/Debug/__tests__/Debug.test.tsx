import { makeRowsFromObject } from "../Debug"

describe("Debug Viewer", () => {
  it("Should handle no data well", () => {
    expect(makeRowsFromObject({})).toMatchInlineSnapshot(`Array []`)
  })

  it("Should create table rows from config values", () => {
    const myConfig = {
      name: "Tejas",
      race: "Indian",
      loves: "Everyone",
    }

    expect(makeRowsFromObject(myConfig)).toMatchInlineSnapshot(`
Array [
  <tr>
    <td>
      Name
    </td>
    <td>
      Tejas
    </td>
  </tr>,
  <tr>
    <td>
      Race
    </td>
    <td>
      Indian
    </td>
  </tr>,
  <tr>
    <td>
      Loves
    </td>
    <td>
      Everyone
    </td>
  </tr>,
]
`)
  })

  it("Should handle JSON in config values", () => {
    const myConfig = {
      name: { first: "Tejas", last: "Kumar" },
      race: "Indian",
      loves: "Everyone",
    }

    expect(makeRowsFromObject(myConfig)).toMatchInlineSnapshot(`
Array [
  <React.Fragment>
    <tr>
      <td
        colSpan={2}
      >
        Name
      </td>
    </tr>
    <tr>
      <td
        colSpan={2}
      >
        <Styled(Code)
          codeTheme={
            Object {
              "base00": "transparent",
              "base02": "transparent",
              "base04": "cyan",
              "base07": "orange",
              "base09": "white",
            }
          }
          src={
            Object {
              "first": "Tejas",
              "last": "Kumar",
            }
          }
          syntax="json"
        />
      </td>
    </tr>
  </React.Fragment>,
  <tr>
    <td>
      Race
    </td>
    <td>
      Indian
    </td>
  </tr>,
  <tr>
    <td>
      Loves
    </td>
    <td>
      Everyone
    </td>
  </tr>,
]
`)
  })
})
