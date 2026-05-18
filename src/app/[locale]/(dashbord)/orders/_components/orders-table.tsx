import { Suspense } from "react"
import { Table } from "@/components/ui/table"
import OrdersTableHeader from "./orders-table-header"
import OrdersTableBody from "./orders-table-body"
import Pagination from "@/shared/components/pagination"
import { getOrders } from "@/shared/lib/services/orders/get-orders"
import { OrderStatus } from "@/shared/lib/types/orders/order"

interface Props {
  page: number
  search?: string
  status?: OrderStatus
  isNewClient?: boolean
  isExpressWash?: boolean
}

export default async function OrdersTable({
  page,
  search,
  status,
  isNewClient,
  isExpressWash,
}: Props) {
  const { pagination } = await getOrders({
    page,
    search,
    status,
    isNewClient,
    isExpressWash,
  })
  const totalPages = Math.ceil(pagination.total / Number(pagination.limit))

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5 flex flex-col gap-4">
      <div className="overflow-x-auto">
        <Table className="min-w-[900px]">
          <OrdersTableHeader />
          <Suspense fallback={null}>
            <OrdersTableBody
              page={page}
              search={search}
              status={status}
              isNewClient={isNewClient}
              isExpressWash={isExpressWash}
            />
          </Suspense>
        </Table>
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  )
}