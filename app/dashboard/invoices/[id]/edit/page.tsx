import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

import { Metadata } from 'next';

export async function generateMetadata({params} : {params : {id : string}}) : Promise<Metadata>{

  const {id} = params

  const getInvoice = fetchInvoiceById(id)
  const invoice = await getInvoice

  const getCustomers = fetchCustomers()
  const customers = await getCustomers
  const customer = customers.find( person => person.id === invoice.customer_id)
  
  if(!invoice || !customer){
    return {
      title: "Unknown Customer"
    }
  }

  return {
    title: `${customer.name} ${invoice.id}`
  }
}


export default async function Page({params} : {params : {id: string}}) {
  const {id} = params
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ])

  if(!invoice){
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}