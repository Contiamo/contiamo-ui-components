import * as React from "react"

import { Overlay, Container, ModalCard, ModalContent, Actions, ContentWrapper } from "./Modal.styled"

export interface ModalProps {
  title: string
  isOpen: boolean
  children: React.ReactNode
  onClickOutside?: () => void
  width?: "max-content" | number
  height?: React.CSSProperties["height"]
  anchor?: React.RefObject<HTMLElement>
  actions?: React.ReactNode[]
}

export type Top = number
export type Left = number
export type Width = ModalProps["width"]
export type Height = ModalProps["height"] // undefined for `auto`

const Modal: React.RefForwardingComponent<HTMLDivElement, ModalProps> = (
  { title, anchor, children, onClickOutside, height, isOpen, actions, width },
  ref,
) => {
  const $modalContainer = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState<[Top, Left, Width, Height]>([50, 0, 480, height])

  // Focus the modal on open
  React.useEffect(() => {
    const currentModalContainer = $modalContainer.current
    if (currentModalContainer && open) {
      currentModalContainer.focus()
    }
  }, [isOpen])

  // Anchor
  React.useEffect(() => {
    const currentAnchor = anchor && anchor.current
    if (currentAnchor) {
      currentAnchor.scrollIntoView()
      const { top, left, width, height } = currentAnchor.getBoundingClientRect()
      setSize([top, left, width, height])
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <>
      <Overlay onClick={onClickOutside} />
      <Container
        tabIndex={0}
        ref={$modalContainer}
        top={size[0]}
        left={size[1]}
        width={width || size[2]}
        height={height}
        modalHeight={$modalContainer.current && $modalContainer.current.clientHeight}
        anchorHeight={typeof size[3] === "number" && size[3]}
      >
        <ModalCard ref={ref} fullSize title={title}>
          <ModalContent anchor={Boolean(anchor)}>
            <ContentWrapper>{children}</ContentWrapper>
            {actions && <Actions childCount={actions.length}>{actions}</Actions>}
          </ModalContent>
        </ModalCard>
      </Container>
    </>
  )
}

export default React.forwardRef(Modal)
