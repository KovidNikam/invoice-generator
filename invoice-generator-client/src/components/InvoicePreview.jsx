import { forwardRef } from "react";

const InvoicePreview = forwardRef(({invoiceData, template},ref) => {
    const formattedData=formatInvoiceData(invoiceData);
    return(
        <div ref={ref} className="invoice-preview container px-2 py-2 overflow-x-auto">
           <Template1 data={formattedData}/>
        </div>
    )
});

export default InvoicePreview;