import { ButtonGroupProps, ButtonProps, FlexProps, SlideProps } from '@chakra-ui/react'

class SidebarAttr {
  static Slide = (isOpen: boolean) : SlideProps => {
    return { in: isOpen, direction: 'left' }
  }

  static Container: FlexProps = {
    width: 64,
    height: 'full',
    minHeight: '100vh',
    padding: 4,
    borderRightStyle: 'solid',
    borderRightWidth: 'thin',
    borderRightColor: 'blackAlpha.200',
    background: 'white',
    flexDirection: 'column'
  }

  static ButtonGroup: ButtonGroupProps = {
    variant: 'ghost',
    colorScheme: 'purple',
    width: 'full',
    gap: 4,
    spacing: 0,
    flexDirection: 'column'
  }

  static Button: ButtonProps = {
    width: 'full',
    justifyContent: 'flex-start'
  }
}

export default SidebarAttr
