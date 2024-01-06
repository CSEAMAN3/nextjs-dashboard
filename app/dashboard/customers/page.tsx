import { Metadata } from "next"

import { fetchCustomers, fetchInvoiceById, fetchFilteredCustomers } from "@/app/lib/data"

export const metadata : Metadata = {
  title: "customers"
}

// export type CustomersTableType = {
//   id: string;
//   name: string;
//   email: string;
//   image_url: string;
//   total_invoices: number;
//   total_pending: number;
//   total_paid: number;
// };

export default async function page() {

  const getCustomers = fetchCustomers()
  const customers = await getCustomers

  



  return (
    <div>Cutomers</div>
  )
}