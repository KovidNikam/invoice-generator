export const formatInvoiceData = (InvoiceData) => { 
    const {
    title,
    amount = {},
    invoke = {},
    account = {},
    billing = {},
    shipping = {},
    tax = 0,
    notes = "",
    items = [],
    logo = "",
 } = InvoiceData || {};
    
    const currencySymbol = "$";
    const subtotal = items.reduce((acc, item) => acc + (item.qty * item.amount), 0);
    const taxAmount = subtotal * (tax / 100);
    const total = subtotal + taxAmount;

    return{
        title,
        companyName: company.name,
        companyAddress: company.address,
        companyPhone: company.phone,
        companyLogo: logo,

        invoiceNumber: invoice.number,
        invoiceDate: invoice.date,
        paymentDate: invoice.dueDate,

        accountName: account.name,
        accountNumber: account.number,
        accountTfscCode: account.ifsccode,

        billingName: billing.name,
        billingAddress: billing.address,
        billingPhone: billing.phone,

        shippingName: shipping.name,
        shippingAddress: shipping.address,
        shippingPhone: shipping.phone,

        currencySymbol,
        tax,
        items,
        notes,
        subtotal,
        taxAmount,
        total


    };


};
