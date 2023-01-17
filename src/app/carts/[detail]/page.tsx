'use client'

import { Flex, Grid, GridItem, Text, Td, Tr } from '@chakra-ui/react'
import { CartProps } from '@/modules/types.module'
import { Table } from '@/components/table/table.component'

import CartDetailAttr from './detail.styles'
import Endpoint from '@/modules/endpoint.module'
import Loading from '@/components/loading/loading.component'

const CartsDetail = ({ params } : { params: { detail: string } }) => {

  const headTable: Array<string> = [
    'title',
    'price',
    'discounted Price',
    'discount Percentage',
    'quantity',
    'total'
  ]

  const { data: carts, isLoading } =
    Endpoint.fetch<CartProps>(Endpoint.baseAPI, `/carts/${params.detail}`)

  if (isLoading) return <Loading />

  return (
    <Flex { ...CartDetailAttr.Container }>
      <Flex { ...CartDetailAttr.ContentContainer }>
        {
          carts &&
            <Flex { ...CartDetailAttr.DetailContainer }>
              <Grid { ...CartDetailAttr.DetailGridContainer }>
                <GridItem { ...CartDetailAttr.DetailGridItemContainer }>
                  <Text>User: { carts.userId }</Text>
                </GridItem>
                <GridItem { ...CartDetailAttr.DetailGridItemContainer }>
                  <Text># of Items: { carts.totalProducts } </Text>
                </GridItem>
                <GridItem { ...CartDetailAttr.DetailGridItemContainer }>
                  <Text>Added On: -</Text>
                </GridItem>
                <GridItem { ...CartDetailAttr.DetailGridItemContainer }>
                  <Text>Total Amount: { carts.totalQuantity }</Text>
                </GridItem>
              </Grid>
            </Flex>
        }
        <Flex { ...CartDetailAttr.TableContainer }>
          {
            !isLoading && carts &&
            <Table head={headTable}>
              {
                carts.products.map((detail, index) =>
                  <Tr key={index}>
                    <Td>{ detail.title }</Td>
                    <Td>{ detail.price }</Td>
                    <Td>{ detail.discountedPrice }</Td>
                    <Td>{ detail.discountPercentage }</Td>
                    <Td>{ detail.quantity }</Td>
                    <Td>{ detail.total }</Td>
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

export default CartsDetail
