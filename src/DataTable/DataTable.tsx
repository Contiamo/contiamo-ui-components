import * as React from "react"
import { FixedSizeList, ListChildComponentProps } from "react-window"

import Message from "../Internals/Message/Message"
import styled from "../utils/styled"

export interface DataTableProps<T, P> {
  /* The columns of our table. They are an array of header layers. */
  columns: T[][]

  /** A collection of rows for the table */
  rows: P[][]

  /** How high is each row (in pixels)? */
  rowHeight?: number

  /** Shall we include a footer? */
  footer?: React.ReactNode

  /** How much shall we restrict the height? */
  height?: string

  /** How much shall we restrict the width? Default: unlimited */
  width?: string

  /** How wide is each cell? Default `1fr` */
  cellWidth?: string
}

const Container = styled("div", { shouldForwardProp: prop => prop !== "width" })<{ width: string }>`
  position: relative;
  width: ${({ width }) => width};
  border: 1px solid ${({ theme }) => theme.color.border.medium};
`

const TableContainer = styled("div")<{ numColumns: number; numRows: number; columnWidth: string; rowHeight: number }>`
  display: grid;
  border-bottom: ${({ theme }) => `1px solid ${theme.color.border.gentle}`};
  grid-template-columns: repeat(${({ numColumns, columnWidth }) => `${numColumns}, ${columnWidth}`});
  grid-template-rows: repeat(${({ numRows, rowHeight }) => `${numRows}, ${rowHeight}px`});
`

const Row = styled("div")<{ numCells: number; cellWidth: string; isEven?: boolean }>`
  display: grid;
  grid-template-columns: repeat(${({ numCells, cellWidth }) => `${numCells}, ${cellWidth}`});
  background-color: ${({ theme, isEven }) => (isEven ? theme.color.background.almostWhite : theme.color.white)};
`

const Cell = styled("div", { shouldForwardProp: prop => prop !== "height" })<{ height: number }>`
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: 0 0 0 0.5px ${({ theme }) => theme.color.border.medium};
  height: ${({ height }) => height}px;
  font-family: ${({ theme }) => theme.font.family.code};
  font-weight: ${({ theme }) => theme.font.weight.regular};
  padding: ${({ theme }) => theme.space.content}px;
  color: ${({ theme }) => theme.color.text.default};
`

const HeaderRow = styled("div")<{ rowHeight: number; numHeaders: number }>`
  left: 0;
  width: 100%;
  height: ${({ rowHeight, numHeaders }) => rowHeight * numHeaders}px;
  position: sticky;
  grid-row: 1;
  top: 0;
  z-index: 100;
`

const HeaderCell = styled(Cell)`
  background-color: ${({ theme }) => theme.color.background.gentle};
  color: ${({ theme }) => theme.color.text.dark};
  height: ${({ height }) => height}px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  box-shadow: 0 0 0 0.5px ${({ theme }) => theme.color.border.gentle};
`

const DataWrapper = styled("div")<{ numHeaders: number; rowHeight: number }>`
  position: absolute;
  width: 100%;
  top: ${({ numHeaders, rowHeight }) => numHeaders * rowHeight + numHeaders * 2}px
    /* ^ 1px border top and bottom per cell */;
`

const defaultProps = {
  rowHeight: 30,
  footer: null,
  height: "500px",
  cellWidth: "1fr",
  width: "100%",
}

export function DataTable<P, T>({
  columns,
  rows,
  rowHeight = defaultProps.rowHeight,
  footer = defaultProps.footer,
  height = defaultProps.height,
  width = defaultProps.width,
  cellWidth = defaultProps.cellWidth,
}: DataTableProps<T, P>) {
  if (rows.length && rows[0].length !== columns.length) {
    return (
      <Message color="error">
        Invalid data: `rows` have different cardinality than `columns`. Please check both props and try again.
      </Message>
    )
  }

  const Table = React.useMemo(
    () =>
      React.memo(({ children, ...rest }) => (
        <TableContainer
          {...rest}
          numColumns={columns.length}
          numRows={rows.length}
          columnWidth={cellWidth}
          rowHeight={rowHeight}
        >
          {columns.map((headerRow, columnHeaderIndex) => (
            <HeaderRow
              key={`op-column-header-${columnHeaderIndex}-${performance.now()}`}
              numHeaders={columns[0].length}
              rowHeight={rowHeight}
            >
              {headerRow.map((cell, cellIndex) => (
                <HeaderCell
                  key={`op-column-header-cell-${columnHeaderIndex}-${cellIndex}-${performance.now()}`}
                  height={rowHeight}
                >
                  {cell}
                </HeaderCell>
              ))}
            </HeaderRow>
          ))}

          <DataWrapper numHeaders={columns[0].length} rowHeight={rowHeight}>
            {children}
          </DataWrapper>
        </TableContainer>
      )),
    [columns, rows],
  )

  const numCells = React.useMemo(() => rows[0].length, [rows])
  const VirtualRow: React.FC<ListChildComponentProps> = React.useMemo(
    () =>
      React.memo(({ style, index }) => (
        <Row isEven={index % 2 === 0} style={{ ...style, height: rowHeight }} cellWidth={cellWidth} numCells={numCells}>
          {rows[index] &&
            rows[index].map(cell => (
              <Cell key={`op-row-${index}-${performance.now()}`} height={rowHeight}>
                {cell}
              </Cell>
            ))}
        </Row>
      )),
    [rows],
  )

  return (
    <Container width={width}>
      <FixedSizeList
        style={{ minWidth: "max-content" }}
        itemCount={rows.length}
        itemSize={rowHeight}
        height={height}
        width={width}
        innerElementType={Table}
      >
        {VirtualRow}
      </FixedSizeList>
      {footer}
    </Container>
  )
}

export default React.memo(DataTable)