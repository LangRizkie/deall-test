'use client'

import { useEffect } from 'react'
import { NextPage } from 'next'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Button, Flex, Link, Td, Tr } from '@chakra-ui/react'
import { CartsProps } from '@/modules/types.module'
import { Table } from '@/components/table/table.component'

import NextLink from 'next/link'

import CartsAttr from './carts.styles'
import Endpoint from '@/modules/endpoint.module'
import Loading from '@/components/loading/loading.component'

const Carts: NextPage = () => {
  const params = useSearchParams()
  const router = useRouter()
  const path = usePathname()
  const limit = '10'

  const headTable: Array<string> = [
    'detail',
    'total quantity',
    'total products',
    'discounted total',
    'total'
  ]

  const { data: carts, isLoading } =
    Endpoint.fetch<CartsProps>(Endpoint.baseAPI, `/carts?limit=${limit}`)

  useEffect(() => {
    if (!params.has('limit') && path)
      router.replace(path + '?' + new URLSearchParams({ limit }))
  }, [params, path, router])

  if (isLoading) return <Loading />

  return (
    <Flex { ...CartsAttr.Container }>
      <Flex { ...CartsAttr.SearchContainer }>
      </Flex>
      <Flex { ...CartsAttr.ContentContainer }>
        <Flex { ...CartsAttr.TableContainer }>
          {
            !isLoading && carts &&
            <Table head={headTable}>
              {
                carts.carts.map((cart, index) =>
                  <Tr key={index}>
                    <Td>
                      <Link
                        as={NextLink}
                        href={`/carts/${cart.id}`}
                        shallow
                        passHref
                      >
                        <Button size='sm'>
                          Open Detail
                        </Button>
                      </Link>
                    </Td>
                    <Td>{ cart.totalQuantity }</Td>
                    <Td>{ cart.totalProducts }</Td>
                    <Td>{ cart.discountedTotal }</Td>
                    <Td>{ cart.total }</Td>
                  </Tr>
                )
              }
            </Table>
          }
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Carts
