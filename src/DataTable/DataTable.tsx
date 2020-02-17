import * as React from "react"
import { FixedSizeList, ListChildComponentProps, FixedSizeListProps } from "react-window"

import Message from "../Internals/Message/Message"

import { Cell, Container, DataWrapper, HeaderCell, HeaderRow, HeadersContainer, Row } from "./DataTable.styled"
import { ViewMorePopup } from "../Internals/ViewMorePopup"
import { defaultRowHeight, getRowHeight, findScrollableAncestor } from "./DataTable.util"
import useViewMore from "./useViewMore"
import CellContent from "./CellContent"

const fixedSizeListClass = "operational-ui__DataTable--virtual-scroller"

export interface DataTableProps<Columns, Rows> {
  /* The columns of our table. They are an array of header layers. */
  columns: Columns

  /** A collection of rows for the table */
  rows: Rows

  /** How high is each row (in pixels)? */
  rowHeight?: "regular" | "compact" | number

  /** Shall we include a footer? */
  footer?: React.ReactNode

  /**
   * Height of the list.
   *
   * For vertical lists, this must be a number. It affects the number of rows that will be rendered (and displayed) at any given time.
   * For horizontal lists, this can be a number or a string (e.g. "50%").
   */
  height?: FixedSizeListProps["height"]

  /** How much shall we restrict the width? Default: `unlimited` */
  width?: string

  /** How wide is each cell? Default `1fr` */
  cellWidth?: string

  /** A classname for all your custom CSS ~hacks~ needs */
  className?: string
}

export function DataTable<Columns extends any[][], Rows extends any[][]>({
  columns,
  rows,
  rowHeight: initialRowHeight = defaultRowHeight,
  footer = null,
  height = 500,
  width = "100%",
  cellWidth = "minmax(200px, 1fr)",
  className,
}: DataTableProps<Columns, Rows>) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { open, close, viewMorePopup } = useViewMore()
  React.useEffect(() => {
    if (ref.current) {
      const scrollableAncestor = findScrollableAncestor(
        // we can't get this element other way, because of react-window
        ref.current.getElementsByClassName(fixedSizeListClass)[0],
      )
      scrollableAncestor.addEventListener("scroll", close)
      return () => scrollableAncestor.removeEventListener("scroll", close)
    }
  }, [close, ref])
  const rowHeight = React.useMemo(() => getRowHeight(initialRowHeight), [initialRowHeight])

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
              <HeaderRow
                data-cy="operational-ui__DataTable-row-header"
                rowHeight={initialRowHeight}
                key={`op-column-header-${rowIndex}`}
              >
                {headerRow.map((cell, cellIndex) => (
                  <HeaderCell
                    rowIndex={cellIndex}
                    cell={rowIndex + 1}
                    rowHeight={initialRowHeight}
                    key={`op-column-header-cell-${rowIndex}-${cellIndex}`}
                    height={rowHeight}
                  >
                    <CellContent close={close} open={open} cell={cell} />
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

  const numCells = React.useMemo(() => (rows[0] ? rows[0].length : 0), [rows])
  const VirtualRow: React.FC<ListChildComponentProps> = React.useMemo(
    () =>
      React.memo(({ style, index }) => (
        <Row
          data-cy="operational-ui__DataTable-row"
          key={`op-row-${index}`}
          style={{ ...style, height: rowHeight }}
          cellWidth={cellWidth}
          numCells={numCells}
        >
          {rows[index] &&
            rows[index].map((cell, cellIndex) => {
              return (
                <Cell
                  rowIndex={index}
                  key={`op-row-${index}-cell-${cellIndex}`}
                  cell={cellIndex + 1}
                  height={rowHeight}
                >
                  <CellContent close={close} open={open} cell={cell} />
                </Cell>
              )
            })}
        </Row>
      )),
    [rows, rowHeight],
  )

  if (rows.length && rows[0].length !== columns.length) {
    return (
      <Message color="error">
        Invalid data: `rows` have different cardinality ({rows[0].length}) than `columns` ({columns.length}). Please
        check both props and try again.
      </Message>
    )
  }

  return (
    <>
      {viewMorePopup && (
        <ViewMorePopup top={viewMorePopup.y} left={viewMorePopup.x} onMouseLeave={close}>
          {viewMorePopup.content}
        </ViewMorePopup>
      )}
      <Container width={width} className={className} ref={ref}>
        <FixedSizeList
          itemCount={rows.length}
          itemSize={rowHeight}
          height={height}
          width={width}
          innerElementType={Table}
          /** can't use data-cy or any other prop because of react-window */
          className={fixedSizeListClass}
          style={{ willChange: undefined }}
        >
          {VirtualRow}
        </FixedSizeList>
        {footer}
      </Container>
    </>
  )
}

export default React.memo(DataTable)
