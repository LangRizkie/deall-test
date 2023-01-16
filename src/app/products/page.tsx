'use client'

import { ChangeEvent, Fragment, useEffect, useMemo, useState } from 'react'
import { NextPage } from 'next'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Flex, Input, InputProps, Td, Tr, useBreakpointValue } from '@chakra-ui/react'
import { ProductsProps } from '@/modules/types.module'
import { Table } from '@/components/table/table.component'

import ProductsAttr from './products.styles'
import Endpoint from '@/modules/endpoint.module'
import Global from '@/modules/variable.module'
import Loading from '@/components/loading/loading.component'
import Pagination from '@/components/pagination/pagination.component'
import { ReactPaginateProps } from 'react-paginate'
import { debounce, isEmpty } from 'lodash'

type ProductSearchProps = InputProps & {
  currentValue?: string
  onValueChange: (value: string) => void
}

type ProductTableProps = ReactPaginateProps & {
  headTable: Array<string>
  products: ProductsProps
}

const ProductSearch: React.FC<ProductSearchProps> = (props) => {
  const onChange = debounce((e: ChangeEvent<HTMLInputElement>) =>
    props.onValueChange(e.target.value), Number(Global.debounceTime))

  return <Input
    defaultValue={props.currentValue}
    { ...ProductsAttr.SearchInput }
    onChange={onChange}
  />
}

const ProductTable: React.FC<ProductTableProps> = (props) => {
  const breakpoint = useBreakpointValue({ base: 'center', lg: 'flex-end' }) || 'center'

  return (
    <Fragment>
      <Flex { ...ProductsAttr.TableContainer }>
        <Table 
          head={props.headTable}
          isEmpty={isEmpty(props.products.products)}
        >
          {
            props.products.products.map((product, index) =>
              <Tr key={index}>
                <Td aria-label='title'>{ product.title }</Td>
                <Td aria-label='brand'>{ product.brand }</Td>
                <Td aria-label='price'>{ product.price }</Td>
                <Td aria-label='stock'>{ product.stock }</Td>
                <Td aria-label='category'>{ product.category }</Td>
              </Tr>
            )
          }
        </Table>
      </Flex>
      {
        !isEmpty(props.products.products) &&
          <Flex { ...ProductsAttr.PaginationContainer(breakpoint) }>
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

const Products: NextPage = () => {
  const limit = Global.paginationLimit
  const params = useSearchParams()
  const router = useRouter()
  const path = usePathname()
  const [skip, setSkip] = useState<string>(params.get('skip') || Global.paginationSkip)
  const [search, setSearch] = useState<string>(params.has('q') ? (params.get('q') || '' ): '')
  const createParams = useMemo(() => 
    (new URLSearchParams(
      isEmpty(Array.from(params.keys())) 
      ? { limit, skip } 
      : Object.fromEntries(params.entries()))), 
    []
  )

  const headTable: Array<string> = [
    'title',
    'brand',
    'price',
    'stock',
    'category'
  ]

  const onSearch = (value: string) => {
    createParams.set('limit', limit)
    createParams.set('skip', Global.paginationSkip)
    createParams.set('q', value)

    setSearch(value)
  }

  const onPageChange = (value: string) => {
    createParams.set('limit', limit)
    createParams.set('skip', value)

    setSkip(value)
  }

  const { data: products, isLoading: productsLoading } =
    Endpoint.fetch<ProductsProps>(
      Endpoint.baseAPI, 
      (search || params.has('q') ? '/products/search?' : '/products?') + createParams
    )

  useEffect(() => {
    router.replace(path + '?' + createParams)

  }, [path, createParams, router, products])

  return (
    <Flex { ...ProductsAttr.Container }>
      <Flex { ...ProductsAttr.HeaderContainer }>
        <ProductSearch
          currentValue={search}
          onValueChange={onSearch}
        />
      </Flex>
      {
        productsLoading
        ?
          <Loading />
        :
          <Flex { ...ProductsAttr.ContentContainer }>
            {
              !productsLoading && !isEmpty(products) &&
                <ProductTable 
                  headTable={headTable}
                  products={products}
                  pageCount={Math.ceil(products.total / Number(limit))}
                  onPageChange={(e) => onPageChange(String(e.selected * Number(limit)))}
                  forcePage={Math.ceil(Number(skip) / Number(limit))}
                />
            }
          </Flex>
      }
    </Flex>
  )
}

export default Products
