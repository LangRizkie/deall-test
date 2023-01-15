'use client'

import { Button, ButtonGroup, Flex, Link, Slide } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { SidebarProps } from '@/modules/types.module'

import NextLink from 'next/link'

import SidebarAttr from './sidebar.styles'

const Sidebar: React.FC<SidebarProps> = ({ state }) => {
  const pathname = usePathname()
  const isButtonActive = (path: string) : boolean | undefined =>
    pathname?.toLowerCase().includes('/' + path.toLowerCase())

  return (
    <Slide
      {...SidebarAttr.Slide(state)}
      style={{ width: 'max-content', zIndex: 10 }}
    >
      <Flex {...SidebarAttr.Container}>
        <ButtonGroup {...SidebarAttr.ButtonGroup}>
          <Link
            as={NextLink}
            href='/products'
            shallow
            passHref
            replace
          >
            <Button
              {...SidebarAttr.Button}
              isActive={isButtonActive('products')}
            >
              Products
            </Button>
          </Link>
          <Link
            as={NextLink}
            href='/carts'
            shallow
            passHref
            replace
          >
            <Button
              {...SidebarAttr.Button}
              isActive={isButtonActive('carts')}
            >
              Carts
            </Button>
          </Link>
        </ButtonGroup>
      </Flex>
    </Slide>
  )
}

export default Sidebar
