import React from 'react'
import { Table, TableContainer, TableCaption, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { TableProps } from '@/modules/types.module'

const TableComponent: React.FC<TableProps> = ({ head, children, isEmpty }) => {
  return (
    <TableContainer width='full' marginY={4}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            {
              head.map((title, index) =>
                <Th key={index}>
                  { title }
                </Th>
              )
            }
          </Tr>
        </Thead>
        {
          isEmpty &&
            <TableCaption>
              No Data Available
            </TableCaption>
        }
        <Tbody>
          { children }
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export { TableComponent as Table }
