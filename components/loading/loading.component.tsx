import { Flex, Spinner } from '@chakra-ui/react'
import { NextComponentType } from 'next'
import LoadingAttr from './loading.styles'

const Loading: NextComponentType = () => {
  return (
    <Flex { ...LoadingAttr.Container }>
      <Spinner size='lg' />
    </Flex>
  )
}

export default Loading
