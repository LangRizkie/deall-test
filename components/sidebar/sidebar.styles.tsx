import { ButtonGroupProps, ButtonProps, FlexProps, SlideProps } from '@chakra-ui/react'

class SidebarAttr {
  static Slide = (isOpen: boolean) : SlideProps => {
    return { in: isOpen, direction: 'left' }
  }

  static Container: FlexProps = {
    height: 'full',
    minHeight: '100vh',
  }

  static NavigationContainer: FlexProps = {
    width: 64,
    padding: 4,
    gap: 4,
    borderRightStyle: 'solid',
    borderRightWidth: 'thin',
    borderRightColor: 'blackAlpha.200',
    background: 'white',
    flexDirection: 'column'
  }

  static NavigationCloseButton: ButtonProps = {
    width: 'fit-content',
    alignSelf: 'flex-end',
    size: 'sm'
  }

  static NavigationButtonGroup: ButtonGroupProps = {
    variant: 'ghost',
    colorScheme: 'purple',
    width: 'full',
    gap: 4,
    spacing: 0,
    flexDirection: 'column'
  }

  static NavigationButton: ButtonProps = {
    width: 'full',
    justifyContent: 'flex-start'
  }

  static SubNavigationContainer: FlexProps = {
    position: 'fixed',
    padding: 4,
    zIndex: 'modal'
  }

  static SubNavigationButton: ButtonProps = {
    size: 'sm'
  }
}

export default SidebarAttr
