import { FlexProps } from '@chakra-ui/react'

class LoadingAttr {
  static Container: FlexProps = {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    left: 0,
    top: 0,
    background: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default LoadingAttr
