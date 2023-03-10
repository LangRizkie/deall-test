'use client'

import { useState } from 'react'
import { ChakraProvider, Flex, useBreakpointValue } from '@chakra-ui/react'
import { Children } from '@/modules/types.module'

import Sidebar from '@/components/sidebar/sidebar.component'


const Components: React.FC<Children> = ({ children }) => {
  const breakpoint = useBreakpointValue({ base: false, lg: true }) || false
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Flex>
      <Sidebar state={breakpoint || open} setState={setOpen} isMobile={!breakpoint} />
      <Flex width='full' paddingLeft={ breakpoint ? 64 : 0 } zIndex='base'>
        <Flex width='full' padding={6}>
          { children }
        </Flex>
      </Flex>
    </Flex>
  )
}

const Providers: React.FC<Children> = ({ children }) => {
  return (
    <ChakraProvider>
      <Components>
        { children }
      </Components>
    </ChakraProvider>
  )
}

export default Providers
