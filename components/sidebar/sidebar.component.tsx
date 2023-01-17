'use client'

import { Fragment } from 'react'
import { Button, ButtonGroup, Flex, Link, Slide } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { SidebarProps } from '@/modules/types.module'

import NextLink from 'next/link'

import SidebarAttr from './sidebar.styles'


const Sidebar: React.FC<SidebarProps> = ({ state, setState, isMobile }) => {
  const pathname = usePathname()
  const isButtonActive = (path: string) : boolean | undefined =>
    pathname?.toLowerCase().includes('/' + path.toLowerCase())

  return (
    <Fragment>
      <Slide
        {...SidebarAttr.Slide(state)}
        style={{ width: 'max-content', zIndex: 10 }}
      >
        <Flex {...SidebarAttr.Container}>
          <Flex {...SidebarAttr.NavigationContainer}>
            {
              isMobile &&
                <Button
                  {...SidebarAttr.NavigationCloseButton}
                  onClick={() => setState(!state)}
                >
                  &times;
                </Button>
            }
            <ButtonGroup {...SidebarAttr.NavigationButtonGroup}>
              <Link
                as={NextLink}
                href='/products'
                shallow
                passHref
                replace
              >
                <Button
                  {...SidebarAttr.NavigationButton}
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
                  {...SidebarAttr.NavigationButton}
                  isActive={isButtonActive('carts')}
                >
                  Carts
                </Button>
              </Link>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Slide>
      {
        !state &&
          <Flex {...SidebarAttr.SubNavigationContainer}>
            <Button
              {...SidebarAttr.SubNavigationButton}
              onClick={() => setState(!state)}
            >
              open
            </Button>
          </Flex>
      }
    </Fragment>
  )
}

export default Sidebar
