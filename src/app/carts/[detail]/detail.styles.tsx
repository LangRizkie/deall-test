import { FlexProps, GridProps, GridItemProps } from '@chakra-ui/react'

class CartDetailAttr {
  static Container: FlexProps = {
    width: 'full',
    flexDirection: 'column',
    alignItems: 'flex-start'
  }

  static ContentContainer: FlexProps = {
    width: 'full',
    flexDirection: 'column'
  }

  static DetailContainer: FlexProps = {
    width: 'full',
    padding: 6,
    backgroundColor: 'whitesmoke'
  }

  static DetailGridContainer: GridProps = {
    templateColumns: 'repeat(2, 1fr)',
    width: 'full',
    gap: 6
  }

  static DetailGridItemContainer: GridItemProps = {
    width: 'full'
  }

  static TableContainer: FlexProps = {
    marginY: 4
  }
}

export default CartDetailAttr
