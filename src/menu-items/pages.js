// assets
// import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// // icons
// const icons = {
//     LoginOutlined,
//     ProfileOutlined
// };

// ==============================|| MENU ITEMS - EXTRA pages ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    children: [
        {
            id: 'invoice',
            title: 'Invoice',
            type: 'item',
            url: '/invoice'
            // icon: icons.LoginOutlined
            // target: true
        },
        {
            id: 'addInvoice',
            title: 'Add Invoice',
            type: 'item',
            url: '/addInvoice'
            // icon: icons.ProfileOutlined,
            // target: true
        },
        {
            id: 'invoiceDetails',
            title: 'Invoice Details',
            type: 'item',
            url: '/invoiceDetails'
            // icon: icons.LoginOutlined
            // target: true
        },
        {
            id: 'payments',
            title: 'Payments',
            type: 'item',
            url: '/payments'
            // icon: icons.ProfileOutlined,
            // target: true
        },
        {
            id: 'taxes',
            title: 'Taxes',
            type: 'item',
            url: '/taxes'
            // icon: icons.ProfileOutlined,
            // target: true
        },
        {
            id: 'products',
            title: 'Products',
            type: 'collapse',
            children: [
                {
                    id: 'productList',
                    title: 'Product List',
                    type: 'item',
                    url: '/productList'
                },
                {
                    id: 'addProduct',
                    title: 'Add Product',
                    type: 'item',
                    url: '/addProduct'
                }
            ]
            // icon: icons.LoginOutlined
            // target: true
        },
        {
            id: 'reports',
            title: 'Report',
            type: 'collapse',
            children: [
                {
                    id: 'paymentSummary',
                    title: 'Payment Summary',
                    type: 'item',
                    url: '/paymentSummary'
                },
                {
                    id: 'saleReport',
                    title: 'Sale Report',
                    type: 'item',
                    url: '/saleReport'
                },
                {
                    id: 'expensesReport',
                    title: 'Expenses Report',
                    type: 'item',
                    url: '/expensesReport'
                }
            ]
            // icon: icons.LoginOutlined
            // target: true
        },
        {
            id: 'users',
            title: 'Users',
            type: 'item',
            url: '/users'
            // icon: icons.ProfileOutlined,
            // target: true
        },
        {
            id: 'transaction',
            title: 'Transaction',
            type: 'collapse',
            children: [
                {
                    id: 'transactionList',
                    title: 'Transaction List',
                    type: 'item',
                    url: '/transactionList'
                },
                {
                    id: 'newTransaction',
                    title: 'New Transaction',
                    type: 'item',
                    url: '/newTransaction'
                }
            ]
            // icon: icons.LoginOutlined
            // target: true
        }
    ]
};

export default pages;
