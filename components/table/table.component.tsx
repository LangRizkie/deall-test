import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { TableProps } from '@/modules/types.module'

const TableComponent: React.FC<TableProps> = ({ head, children }) => {
  return (
    <TableContainer width='full' marginY={4}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            {
              head.map((title, index) =>
                <Th key={index}>{ title }</Th>
              )
            }
          </Tr>
        </Thead>
        <Tbody>
          { children }
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export { TableComponent as Table }
