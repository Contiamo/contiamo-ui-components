import * as React from "react"
import ActionMenu, { ActionMenuProps } from "../ActionMenu/ActionMenu"
import { DefaultProps } from "../types"
import Small from "../Typography/Small"
import styled from "../utils/styled"
import { IconComponentType, ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from "../Icon/Icon"

export interface TableProps<T> extends DefaultProps {
  data: T[]
  /** Table columns headings */
  columns: Array<Column<T> | Extract<keyof T, string>>
  /** Called on row click */
  onRowClick?: (dataEntry: T, index: number) => void
  /** Label to show on row hover */
  rowActionName?: string
  /**
   * Add actions on the end of each row
   */
  rowActions?: (dataEntry: T) => ActionMenuProps["items"] | React.ReactNode
  /** Icon name for row */
  icon?: (dataEntry: T) => IconComponentType
  /** Icon color for row */
  iconColor?: (dataEntry: T) => string
  /** Remove the header? */
  headless?: boolean
  /** Fixed Layout for performance */
  fixedLayout?: boolean
}

export interface Column<T> {
  heading: React.ReactNode
  cell: (dataEntry: T, index: number) => React.ReactNode
  sortOrder?: "asc" | "desc"
  onSortClick?: (order: "asc" | "desc") => void
  width?: number
}

const Container = styled("table")<{ fixedLayout: TableProps<any>["fixedLayout"] }>(({ theme, fixedLayout }) => ({
  width: "100%",
  backgroundColor: theme.color.white,
  textAlign: "left",
  borderCollapse: "collapse",
  fontSize: theme.font.size.small,
  fontFamily: theme.font.family.main,
  tableLayout: fixedLayout ? "fixed" : "initial",
}))

const Tr = styled("tr")<{ hover?: boolean; clickable?: boolean }>(({ hover, theme, clickable }) => ({
  height: 50,
  ...(hover
    ? {
        ":hover, :focus": {
          backgroundColor: theme.color.background.lighter,
          cursor: clickable ? "pointer" : "default",
        },
      }
    : {}),
}))

const Thead = styled("thead")`
  tr {
    height: initial;
  }
`

const Th = styled("th")<{ sortable?: boolean }>(({ theme, sortable }) => ({
  position: "relative",
  borderBottom: `1px solid ${theme.color.separators.default}`,
  color: theme.color.text.dark,
  paddingBottom: theme.space.base,
  "&:first-of-type": {
    paddingLeft: theme.space.small,
  },
  paddingRight: theme.space.small,
  ...(sortable
    ? {
        ":hover": {
          cursor: "pointer",
          color: theme.color.text.light,
          svg: {
            cursor: "pointer",
            fill: theme.color.text.light,
          },
        },
      }
    : {}),
}))

const ThContent = styled("span")<{ sorted?: boolean }>`
  display: inline-flex;
  align-items: center;
  height: ${props => props.theme.space.medium}px;
  ${props => props.sorted && `color: ${props.theme.color.text.light};`};
`

const Td = styled("td")<{ cellWidth?: Column<any>["width"] }>(({ theme, cellWidth }) => ({
  verticalAlign: "middle",
  borderBottom: `1px solid ${theme.color.separators.default}`,
  color: theme.color.text.default,
  hyphens: "auto",
  "&:first-of-type": {
    paddingLeft: theme.space.small,
  },
  paddingRight: theme.space.small,
  ...(cellWidth
    ? {
        width: cellWidth,
        wordBreak: "break-all",
        wordWrap: "break-word",
      }
    : {}),
}))

const Actions = styled(Td)(({ theme }) => ({
  textAlign: "right",
  paddingRight: theme.space.small,

  /**
   * We use opacity here instead of display: none; or
   * visibility: hidden; because both mess with
   * the box model of the Td while opacity does not.
   */
  opacity: 0,
  "tr:hover &, :hover, tr:focus &, :focus-within, &:focus": {
    opacity: 1,
  },

  "& > div": {
    display: "inline-flex",
  },
}))

const CellIcon = styled(Td)`
  width: 40px;
  padding: ${props => props.theme.space.base}px;
  color: ${props => props.theme.color.text.lightest};
`

const ActionLabel = styled(Small)`
  color: ${props => props.theme.color.primary};
  margin: 0;
  display: block;
`

const EmptyView = styled(Td)(({ theme }) => ({
  color: theme.color.text.default,
  height: 50,
  lineHeight: "50px",
  textAlign: "center",
}))

function Table<T>({
  data = [],
  columns,
  onRowClick,
  rowActionName,
  rowActions,
  icon,
  iconColor,
  headless,
  fixedLayout,
  ...props
}: TableProps<T>) {
  const standardizedColumns: Array<Column<T>> = columns.map(column => {
    if (typeof column === "string") {
      return {
        heading: column,
        cell: (dataEntry: T) => dataEntry[column],
      }
    } else {
      return column
    }
  })

  const hasIcons = Boolean(data[0] && icon && icon(data[0]))

  const handleKeyDownOnRow = React.useCallback(
    (entry, index) => (e: React.KeyboardEvent<HTMLTableRowElement>) => {
      if (!onRowClick) {
        return
      }
      switch (e.key) {
        case "Enter":
          onRowClick(entry, index)
      }
    },
    [onRowClick],
  )

  return (
    <Container fixedLayout={fixedLayout} {...props}>
      {!headless && (
        <Thead>
          <Tr>
            {hasIcons && <Th key="-1" />}
            {standardizedColumns.map((column, columnIndex) => (
              <Th
                key={columnIndex}
                sortable={Boolean(column.onSortClick)}
                onClick={() => column.onSortClick && column.onSortClick(column.sortOrder === "desc" ? "asc" : "desc")}
              >
                <ThContent sorted={Boolean(column.sortOrder)}>
                  {column.heading}
                  {column.onSortClick && !column.sortOrder && (
                    <ChevronUpDownIcon right size={10} color="color.border.disabled" />
                  )}
                  {column.sortOrder &&
                    (column.sortOrder === "desc" ? (
                      <ChevronUpIcon right size={10} color="primary" />
                    ) : (
                      <ChevronDownIcon right size={10} color="primary" />
                    ))}
                </ThContent>
              </Th>
            ))}
            {Boolean(rowActions || (onRowClick && rowActionName)) && <Th key="infinity" />}
          </Tr>
        </Thead>
      )}
      <tbody>
        {data.length ? (
          data.map((dataEntry, dataEntryIndex) => {
            const rowAction = (() => {
              if (!rowActions) {
                return null
              }
              const dataEntryRowActions = rowActions(dataEntry)
              return (
                <Actions>
                  {Array.isArray(dataEntryRowActions) ? (
                    <ActionMenu items={dataEntryRowActions as ActionMenuProps["items"]} />
                  ) : (
                    dataEntryRowActions
                  )}
                </Actions>
              )
            })()
            return (
              <Tr
                onKeyDown={handleKeyDownOnRow(dataEntry, dataEntryIndex)}
                tabIndex={onRowClick ? 0 : undefined}
                role={onRowClick ? "button" : undefined}
                hover={Boolean(onRowClick)}
                key={dataEntryIndex}
                clickable={Boolean(onRowClick)}
                onClick={() => {
                  if (onRowClick) {
                    onRowClick(dataEntry, dataEntryIndex)
                  }
                }}
              >
                {hasIcons && (
                  <CellIcon>
                    {/** Because has `hasIcon`, it is guaranteed that the `icon` function exists */}
                    {React.createElement(icon!(dataEntry), { color: iconColor && iconColor(dataEntry) })}
                  </CellIcon>
                )}
                {standardizedColumns.map((column, columnIndex) => (
                  <Td cellWidth={column.width} key={columnIndex}>
                    {column.cell(dataEntry, dataEntryIndex)}
                  </Td>
                ))}
                {rowAction}
                {onRowClick && rowActionName && (
                  <Actions>
                    <ActionLabel>{rowActionName}</ActionLabel>
                  </Actions>
                )}
              </Tr>
            )
          })
        ) : (
          <Tr>
            <EmptyView colSpan={columns.length}>There are no records available</EmptyView>
          </Tr>
        )}
      </tbody>
    </Container>
  )
}

export default Table
