'use client'

import { Fragment, useEffect, useMemo, useState } from 'react'
import { NextPage } from 'next'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Button, Flex, Link, Td, Tr, useBreakpointValue } from '@chakra-ui/react'
import { CartsProps } from '@/modules/types.module'
import { Table } from '@/components/table/table.component'

import NextLink from 'next/link'

import CartsAttr from './carts.styles'
import Endpoint from '@/modules/endpoint.module'
import Global from '@/modules/variable.module'
import Loading from '@/components/loading/loading.component'
import Pagination from '@/components/pagination/pagination.component'
import { ReactPaginateProps } from 'react-paginate'
import { isEmpty } from 'lodash'

type CartsTableProps = ReactPaginateProps & {
  headTable: Array<string>
  carts: CartsProps
}

const CartTable: React.FC<CartsTableProps> = (props) => {
  const breakpoint = useBreakpointValue({ base: 'center', lg: 'flex-end' }) || 'center'

  return (
    <Fragment>
      <Flex { ...CartsAttr.TableContainer }>
        <Table 
          head={props.headTable} 
          isEmpty={isEmpty(props.carts.carts)}
        >
          {
            props.carts.carts.map((cart, index) =>
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
      </Flex>
      {
        !isEmpty(props.carts.carts) &&
          <Flex { ...CartsAttr.PaginationContainer(breakpoint) }>
            <Pagination
              pageCount={props.pageCount}
              onPageChange={props.onPageChange}
              forcePage={props.forcePage}
            />
          </Flex>
      }
    </Fragment>
  )
}

const Carts: NextPage = () => {
  const limit = Global.paginationLimit
  const params = useSearchParams()
  const router = useRouter()
  const path = usePathname()
  const [skip, setSkip] = useState<string>(params.get('skip') || Global.paginationSkip)
  const createParams = useMemo(() => (new URLSearchParams({ limit, skip })), [limit, skip])

  const headTable: Array<string> = [
    'detail',
    'total quantity',
    'total products',
    'discounted total',
    'total'
  ]

  const { data: carts, isLoading } =
    Endpoint.fetch<CartsProps>(Endpoint.baseAPI, '/carts?' + createParams)

  useEffect(() => {
    router.replace(path + '?' + createParams)
  }, [path, createParams, router])

  if (isLoading) return <Loading />

  return (
    <Flex { ...CartsAttr.Container }>
      <Flex { ...CartsAttr.ContentContainer }>
        {
          !isLoading && !isEmpty(carts) &&
            <CartTable 
              headTable={headTable}
              carts={carts}
              pageCount={Math.ceil(carts.total / Number(limit))}
              onPageChange={(e) => setSkip(String(e.selected * Number(limit)))}
              forcePage={Math.ceil(Number(skip) / Number(limit))}
            />
        }
      </Flex>
    </Flex>
  )
}

export default Carts
