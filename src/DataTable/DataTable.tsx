import * as React from "react"
import { FixedSizeList, ListChildComponentProps } from "react-window"

import Message from "../Internals/Message/Message"
import styled from "../utils/styled"
import { truncate } from "../utils/truncate"

export interface DataTableProps<Columns, Rows> {
  /* The columns of our table. They are an array of header layers. */
  columns: Columns

  /** A collection of rows for the table */
  rows: Rows

  /** How high is each row (in pixels)? */
  rowHeight?: "regular" | "compact" | number

  /** Shall we include a footer? */
  footer?: React.ReactNode

  /** How much shall we restrict the height? */
  height?: number

  /** How much shall we restrict the width? Default: `unlimited` */
  width?: string

  /** How wide is each cell? Default `1fr` */
  cellWidth?: string

  /** Max characters in cell */
  maxCharactersInCell?: number
}

const Container = styled("div", { shouldForwardProp: prop => prop !== "width" })<{ width: string }>`
  width: ${({ width }) => width};
  overflow: visible;
`

const HeadersContainer = styled("div")<{
  numColumns: number
  numHeaders: number
  columnWidth: string
  rowHeight: number
}>`
  display: grid;
  grid-template-columns: repeat(${({ numColumns, columnWidth }) => `${numColumns}, ${columnWidth}`});
  grid-template-rows: repeat(${({ numHeaders, rowHeight }) => `${numHeaders}, ${rowHeight}px`});
`

const Row = styled("div")<{ numCells: number; cellWidth: string }>`
  display: grid;
  grid-template-columns: repeat(${({ numCells, cellWidth }) => `${numCells}, ${cellWidth}`});
`

const Cell = styled("div", { shouldForwardProp: prop => !["isEvenRow", "height", "cell"].includes(prop) })<{
  height: number
  cell: number
  rowIndex: number
  isEvenRow?: boolean
}>`
  position: relative;
  display: flex;
  align-items: center;
  border-top: 0;
  border-left: ${({ cell }) => (cell === 1 ? "1px solid" : 0)};
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-color: ${({ theme }) => theme.color.border.medium};
  height: ${({ height }) => height}px;
  font-family: ${({ theme }) => theme.font.family.code};
  font-weight: ${({ theme }) => theme.font.weight.regular};
  padding: 0 ${({ theme }) => theme.space.content}px;
  color: ${({ theme }) => theme.color.text.default};
  grid-column: ${({ cell }) => cell};
  background-color: ${({ theme, isEvenRow }) => (isEvenRow ? theme.color.background.almostWhite : theme.color.white)};
`

const HeaderRow = styled("div")<{ rowHeight: number }>`
  left: 0;
  width: 100%;
  height: ${({ rowHeight }) => rowHeight}px;
  position: sticky;
  grid-row: 1;
  top: 0;
  z-index: 100;
`

const HeaderCell = styled(Cell)`
  position: relative;
  background-color: ${({ theme }) => theme.color.background.light};
  color: ${({ theme }) => theme.color.text.dark};
  height: ${({ height }) => height}px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  border-top: ${({ rowIndex }) => (rowIndex === 0 ? "1px solid" : 0)};
  border-color: ${({ theme }) => theme.color.border.default};
`

const DataWrapper = styled("div")<{ numHeaders: number; rowHeight: number }>`
  position: absolute;
  width: 100%;
  top: ${({ numHeaders, rowHeight }) => numHeaders * rowHeight}px;
`

export function DataTable<Columns extends any[][], Rows extends any[][]>({
  columns,
  rows,
  rowHeight: initialRowHeight = 35,
  footer = null,
  height = 500,
  width = "100%",
  cellWidth = "1fr",
  maxCharactersInCell = 30,
}: DataTableProps<Columns, Rows>) {
  if (rows.length && rows[0].length !== columns.length) {
    return (
      <Message color="error">
        Invalid data: `rows` have different cardinality ({rows[0].length}) than `columns` ({columns.length}). Please
        check both props and try again.
      </Message>
    )
  }

  const rowHeight: number = React.useMemo(() => {
    switch (initialRowHeight) {
      case "compact":
        return 22
      case "regular":
        return 35
      default:
        return initialRowHeight
    }
  }, [initialRowHeight])

  const Table = React.useMemo(
    () =>
      React.memo(({ children, ...rest }) => (
        <>
          <HeadersContainer
            {...rest}
            numColumns={columns.length}
            numHeaders={columns[0].length}
            columnWidth={cellWidth}
            rowHeight={rowHeight}
          >
            {columns.map((headerRow, rowIndex) => (
              <HeaderRow key={`op-column-header-${rowIndex}`} rowHeight={rowHeight}>
                {headerRow.map((cell, cellIndex) => (
                  <HeaderCell
                    rowIndex={cellIndex}
                    cell={rowIndex + 1}
                    key={`op-column-header-cell-${rowIndex}-${cellIndex}`}
                    height={rowHeight}
                  >
                    {truncate(maxCharactersInCell)(cell)}
                  </HeaderCell>
                ))}
              </HeaderRow>
            ))}
          </HeadersContainer>
          <DataWrapper numHeaders={columns[0].length} rowHeight={rowHeight}>
            {children}
          </DataWrapper>
        </>
      )),
    [columns, rows, rowHeight],
  )

  const numCells = React.useMemo(() => rows[0].length, [rows])
  const VirtualRow: React.FC<ListChildComponentProps> = React.useMemo(
    () =>
      React.memo(({ style, index }) => (
        <Row key={`op-row-${index}`} style={{ ...style, height: rowHeight }} cellWidth={cellWidth} numCells={numCells}>
          {rows[index] &&
            rows[index].map((cell, cellIndex) => (
              <Cell
                rowIndex={index}
                isEvenRow={index % 2 === 0}
                key={`op-row-${index}-cell-${cellIndex}`}
                cell={cellIndex + 1}
                height={rowHeight}
              >
                {truncate(maxCharactersInCell)(cell)}
              </Cell>
            ))}
        </Row>
      )),
    [rows, rowHeight],
  )

  return (
    <Container width={width}>
      <FixedSizeList
        itemCount={rows.length}
        itemSize={rowHeight}
        height={height}
        width={width}
        innerElementType={Table}
        /** can't use data-cy or any other prop because of react-window */
        className="operational-ui__DataTable--virtual-scroller"
      >
        {VirtualRow}
      </FixedSizeList>
      {footer}
    </Container>
  )
}

export default React.memo(DataTable)
