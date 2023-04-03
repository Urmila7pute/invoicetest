import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard')));
const Invoice = Loadable(lazy(() => import('../pages/invoice')));
const AddInvoice = Loadable(lazy(() => import('../pages/addInvoice')));
const InvoiceDetails = Loadable(lazy(() => import('../pages/invoiceDetails')));
const Payments = Loadable(lazy(() => import('../pages/payments')));
const Taxes = Loadable(lazy(() => import('../pages/taxes')));
const ProductList = Loadable(lazy(() => import('../pages/productList')));
const AddProduct = Loadable(lazy(() => import('../pages/addProduct')));
const PaymentSummary = Loadable(lazy(() => import('../pages/paymentSummary')));
const SaleReport = Loadable(lazy(() => import('../pages/saleReport')));
const ExpensesReport = Loadable(lazy(() => import('../pages/expensesReport')));
const Users = Loadable(lazy(() => import('../pages/users')));
const TransactionList = Loadable(lazy(() => import('../pages/transactionList')));
const AddTransaction = Loadable(lazy(() => import('../pages/addTransaction')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'invoice',
            element: <Invoice />
        },
        {
            path: 'addInvoice',
            element: <AddInvoice />
        },
        {
            path: 'payments',
            element: <Payments />
        },
        {
            path: 'taxes',
            element: <Taxes />
        },
        {
            path: '/productList',
            element: <ProductList />
        },
        {
            path: '/addProduct',
            element: <AddProduct />
        },
        {
            path: '/paymentSummary',
            element: <PaymentSummary />
        },
        {
            path: '/saleReport',
            element: <SaleReport />
        },
        {
            path: '/expensesReport',
            element: <ExpensesReport />
        },
        {
            path: '/users',
            element: <Users />
        },
        {
            path: '/transactionList',
            element: <TransactionList />
        },
        {
            path: '/newTransaction',
            element: <AddTransaction />
        },
        {
            path: '/invoiceDetails',
            element: <InvoiceDetails />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },

    ]
};

export default MainRoutes;
