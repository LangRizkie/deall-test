import { useBreakpointValue } from '@chakra-ui/react'
import ReactPaginate, { ReactPaginateProps } from 'react-paginate'

import './pagination.styles.scss'

const Pagination = (props: ReactPaginateProps) => {
  const breakpoint = useBreakpointValue({ base: 1, lg: 3 }) || 1
  
  return (
    <ReactPaginate
      containerClassName='pagination-deall'
      breakLabel=".."
      nextLabel="▶"
      previousLabel="◀"
      pageRangeDisplayed={2}
      marginPagesDisplayed={breakpoint}
      pageCount={props.pageCount}
      onPageChange={props.onPageChange}
      forcePage={props.forcePage}
    />
  )
}

export default Pagination