'use client'

import { ChangeEvent, Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
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

const Products = () => {
  const limit = Global.paginationLimit
  const [mounted, setMounted] = useState<boolean>(false)
  const [skip, setSkip] = useState<string>(Global.paginationSkip)
  const [search, setSearch] = useState<string>()

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname() || ''

  const containParams = !isEmpty(Array.from(searchParams.values()))
  const containSearch = search && searchParams.has('q')

  const productPath = '/products'
  const searchPath = '/products/search'

  const productEndpoint = (containSearch ? searchPath : productPath)
    + '?' + new URLSearchParams(Object.fromEntries(searchParams.entries()))

  const headTable: Array<string> = [
    'title',
    'brand',
    'price',
    'stock',
    'category'
  ]

  const onSearch = (value: string) => {
    setSearch(value)
    setSkip('0')
    setSearchParams({ 'skip': '0', 'q': value })
  }

  const onPageChange = (value: string) => {
    setSkip(value)
    setSearchParams({ 'skip': value })
  }

  const setSearchParams = useCallback((object: object) => {
    const record = new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), ...object })
    const url = new URLSearchParams(record)

    return router.replace(`${pathname}?${url}`)
  }, [pathname, router, searchParams])

  useEffect(() => {
    if (!containParams && !mounted) {
      return setSearchParams({ limit, skip })
    }

    setMounted(true)

    if (searchParams.has('skip')) setSkip(searchParams.get('skip') || '')
    if (searchParams.has('q')) setSearch(searchParams.get('q') || '')

  }, [containParams, limit, mounted, searchParams, setSearchParams, skip])

  const { data: products, isLoading: productsLoading } =
    Endpoint.fetch<ProductsProps>(
      Endpoint.baseAPI,
      productEndpoint,
      mounted
    )

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
