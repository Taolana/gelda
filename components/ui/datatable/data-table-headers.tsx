import type { Table } from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'

// import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const DataTableHeaders = <T,>({ table }: { table: Table<T> }) => {
  return (
    <div className='flex items-center py-4'>
      {/* <Input
        placeholder='Filter emails...'
        value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
        onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
        className='max-w-sm'
      /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='ml-auto'>
            Columns <ChevronDown className='ml-2 h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export { DataTableHeaders }
