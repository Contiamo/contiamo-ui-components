import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"
import AccordionSection, { AccordionSectionProps } from "../AccordionSection/AccordionSection"

export interface AccordionProps extends DefaultProps {
  children: React.ReactElement<AccordionSectionProps, typeof AccordionSection>[]
  onToggle?: (sectionIndex: number) => void
  expanded?: boolean[]
}

const Container = styled("div")<{ sections: boolean[] }>`
  label: Accordion;
  height: 100%;
  display: grid;
  grid-template-rows: ${({ theme, sections }) =>
    sections.map(expanded => (expanded ? "1fr" : `${theme.space.element * 2}px`)).join(" ")};
  border: solid 1px ${({ theme }) => theme.color.separators.default};
  border-top: none;
`

const Accordion = ({ onToggle, expanded, children, ...rest }: AccordionProps) => {
  // this ref is used to detect if visitor uses mouse or keyboard
  // to show focus state in case of keyboard
  const isMouseRef = React.useRef(false)

  const [sections, setSections] = React.useState<boolean[]>(expanded || [])

  const toggleSection = (index: number) => {
    if (onToggle && expanded) {
      onToggle(index)
    } else {
      const newSections = [...sections]
      newSections[index] = !newSections[index]
      setSections(newSections)
    }
    isMouseRef.current = false
  }

  // number of items in state and number of childre can be different
  const sectionsMapped = React.Children.map(children, (_, index) =>
    onToggle && expanded ? !!expanded[index] : !!sections[index],
  )

  return (
    <Container
      sections={sectionsMapped}
      onMouseDown={() => {
        isMouseRef.current = true
      }}
      onKeyDown={() => {
        isMouseRef.current = false
      }}
      data-cy="operational-ui__Accordion"
      {...rest}
    >
      {React.Children.map(children, (element, index) =>
        React.cloneElement(element, {
          ...element.props,
          expanded: sectionsMapped[index],
          toggleSection,
          index,
          isMouseRef,
        }),
      )}
    </Container>
  )
}

export default Accordion
