import { FlexProps, InputProps } from '@chakra-ui/react'

class CartsAttr {
  static Container: FlexProps = {
    width: 'full',
    flexDirection: 'column',
    alignItems: 'flex-start'
  }

  static SearchContainer: FlexProps = {
    alignSelf: 'flex-end'
  }

  static SearchInput: InputProps = {
    placeholder: 'Search Product'
  }

  static ContentContainer: FlexProps = {
    width: 'full',
    flexDirection: 'column'
  }

  static TableContainer: FlexProps = {
    marginY: 4
  }
}

export default CartsAttr