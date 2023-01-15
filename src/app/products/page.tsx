'use client'

import { useEffect } from 'react'
import { NextPage } from 'next'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Flex, Input, Td, Tr } from '@chakra-ui/react'
import { ProductsProps } from '@/modules/types.module'
import { Table } from '@/components/table/table.component'

import ProductsAttr from './products.styles'
import Endpoint from '@/modules/endpoint.module'
import Loading from '@/components/loading/loading.component'

const Products: NextPage = () => {
  const params = useSearchParams()
  const router = useRouter()
  const path = usePathname()
  const limit = '10'

  const headTable: Array<string> = [
    'product name',
    'brand',
    'price',
    'stock',
    'category'
  ]

  const { data: products, isLoading } =
    Endpoint.fetch<ProductsProps>(Endpoint.baseAPI, `/products?limit=${limit}`)

  useEffect(() => {
    if (!params.has('limit') && path)
      router.replace(path + '?' + new URLSearchParams({ limit }))
  }, [params, path, router])


  if (isLoading) return <Loading />

  return (
    <Flex { ...ProductsAttr.Container }>
      <Flex { ...ProductsAttr.SearchContainer }>
        {/* <Input { ...ProductsAttr.SearchInput } /> */}
      </Flex>
      <Flex { ...ProductsAttr.ContentContainer }>
        <Flex { ...ProductsAttr.TableContainer }>
          {
            !isLoading && products &&
              <Table head={headTable}>
                {
                  products.products.map((product, index) =>
                    <Tr key={index}>
                      <Td>{ product.title }</Td>
                      <Td>{ product.brand }</Td>
                      <Td>{ product.price }</Td>
                      <Td>{ product.stock }</Td>
                      <Td>{ product.category }</Td>
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

export default Products
