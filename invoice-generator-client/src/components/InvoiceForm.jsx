import { Trash2 } from "lucide-react";
import { assets } from "../assets/assets.js";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";

const InvoiceForm = () =>{
    const {invoiceData, setInvoiceData} = useContext(AppContext)
    // Add Items function
    const addItem = () =>{
        setInvoiceData((prev) =>({
            ...prev,
            items: [
                ...prev.items,
                {name: "", qty: "",amount: "",description: "",total: 0},
            ]
        }))
    }

    // Delete Items function
    const deleteItem = (index) =>{
        const items = invoiceData.items.filter((_, i) => i !== index);
        setInvoiceData((prev) => ({...prev, items}));
    }

    // Keeping rest of state unchanged
    const handleChange = (section, field, value) =>{
        setInvoiceData((prev) => ({
            ...prev,
            [section]: {...prev[section], [field]: value}
        }));
    }

    // Same as billing function
    const handleSameAsBilling = () =>{
        setInvoiceData((prev) => ({
            ...prev,
            shipping: {...prev.billing}
        }))
    }

    const handleItemChange = (index, field, value) => {
        const items = [...invoiceData.items];
        items[index][field] = value;
        if (field === "qty" || field === "amount") {
            items[index].total = (items[index].qty || 0) *(items[index].amount || 0);
        }
        setInvoiceData((prev) => ({...prev, items}));
    } 

    const calculateTotals = () =>{
        const subtotal = invoiceData.items.reduce((sum, items) => sum + (items.total || 0) , 0);
        const taxRate = Number(invoiceData.tax || 0);
        const taxAmount = (subtotal * taxRate) / 100;
        const grandTotal = subtotal + taxAmount;
        return {subtotal, taxAmount, grandTotal};
    }

    const {subtotal, taxAmount, grandTotal} = calculateTotals();

    const handleLogoUpload = (e) =>{
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setInvoiceData((prev) => ({
                    ...prev, 
                    logo: reader.result
                }))
            };
            reader.readAsDataURL(file);
        } 
    }

    // To generate random invoice number
    useEffect( () => {
        if(!invoiceData.invoice.number) {
            const randomNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
            setInvoiceData((prev) => ({
                ...prev,
                invoice: {...prev.invoice, number: randomNumber},
            }))
        }
    }, []);

    // Submit button for all data (For now we don't need this)
    // const handleSubmit = () =>{
    //     console.log(invoiceData);
    // }

    return(
        <div className="invoiceform container p-4">

            {/* Company logo */}
            <div className="mb-4">
                <h5>Company Logo</h5>
                <div className="d-flex align-items-center gap-3">
                    <label htmlFor="image" className="form-label">
                        <img src={invoiceData.logo ? invoiceData.logo : assets.upload_area} alt="upload" width={98}/>
                    </label>
                    <input type="file" name="logo" id="image" hidden className="form-control" accept="image/*"
                        onChange={handleLogoUpload}/>
                </div>
            </div>
            {/* Company info */}
            <div className="mb-4">
                <h5>Your Company</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Company name" 
                            onChange={(e) => handleChange("company", "name", e.target.value)} 
                            value={invoiceData.company.name}/>
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Company phone"
                            onChange={(e) => handleChange("company", "phone", e.target.value)}  
                            value={invoiceData.company.phone}/>
                    </div>
                    <div className="col-md-12">
                        <input type="text" className="form-control" placeholder="Company address"
                            onChange={(e) => handleChange("company", "address", e.target.value)} 
                            value={invoiceData.company.address}/>
                    </div>
                </div>
            </div>
            {/* Bill to */}
            <div className="mb-4">
            <h5>Bill to</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Name"
                            onChange={(e) => handleChange("billing", "name", e.target.value)} 
                            value={invoiceData.billing.name}/>
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Phone number"
                            onChange={(e) => handleChange("billing", "phone", e.target.value)} 
                            value={invoiceData.billing.phone}/>
                    </div>
                    <div className="col-md-12">
                        <input type="text" className="form-control" placeholder="Address"
                            onChange={(e) => handleChange("billing", "address", e.target.value)} 
                            value={invoiceData.billing.address}/>
                    </div>
                </div>
            </div>
            {/* Ship to */}
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>Ship to</h5>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="sameAsBilling"
                            onChange={handleSameAsBilling}/>
                        <label htmlFor="sameAsBilling" className="form-check-label">
                            Same As Billing
                        </label>
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Name"
                            value={invoiceData.shipping.name}
                            onChange={(e) => handleChange("shipping", "name", e.target.value)}/> 
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Phone number"
                            value={invoiceData.shipping.phone}
                            onChange={(e) => handleChange("shipping", "phone", e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <input type="text" className="form-control" placeholder="Shipping address"
                            value={invoiceData.shipping.address}
                            onChange={(e) => handleChange("shipping", "address", e.target.value)} />
                    </div>
                </div>
            </div>
            {/* Invoice info */}
            <div className="mb-4">
            <h5>Invoice Information</h5>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="invoiceNumber" className="form-label">Invoice Number</label>
                        <input type="text" disabled className="form-control"  
                            id="invoiceNumber" value={invoiceData.invoice.number}
                            onChange={(e) => handleChange("invoice", "number", e.target.value)} />
                    </div>
                    <div className="col-md-4">
                    <label htmlFor="invoiceDate" className="form-label">Invoice Date</label>
                        <input type="date" className="form-control" 
                            id="invoiceDate" value={invoiceData.invoice.date}
                            onChange={(e) => handleChange("invoice", "date", e.target.value)}/>
                    </div>
                    <div className="col-md-4">
                    <label htmlFor="invoiceDueDate" className="form-label">Invoice Due Date</label>
                        <input type="date" className="form-control" 
                        id="invoiceDueDate" value={invoiceData.invoice.dueDate}
                        onChange={(e) => handleChange("invoice", "dueDate", e.target.value)}/>
                    </div>
                </div>
            </div>
            {/* Item details */}
            <div className="mb-4">
                <h5>Item Details</h5>
                {invoiceData.items.map((items,index) => (
                <div key={index} className="card p-3 mb-3">
                    <div className="row g-3 mb-2">
                        <div className="col-md-3">
                            <input type="text" placeholder="Item Name" className="form-control"
                                value={items.name}
                                onChange={(e) => handleItemChange(index, "name", e.target.value)} />
                        </div>
                        <div className="col-md-3">
                            <input type="number" placeholder="Qty" className="form-control"
                                value={items.qty}
                                onChange={(e) => handleItemChange(index, "qty", e.target.value)} />
                        </div>
                        <div className="col-md-3">
                            <input type="number" placeholder="Amount" className="form-control"
                                value={items.amount}
                                onChange={(e) => handleItemChange(index, "amount", e.target.value)} />
                        </div>
                         <div className="col-md-3">
                            <input type="number" placeholder="Total" className="form-control"
                                value={items.total} disabled />
                        </div>      
                    </div>
                    <div className="d-flex gap-2">
                        <textarea className="form-control" placeholder="Description"
                                value={items.description}
                                 onChange={(e) => handleItemChange(index, "description", e.target.value)}></textarea>
                        {/* If item is only one delete button won't show */}
                        {invoiceData.items.length > 1 && (
                            <button className="btn btn-outline-danger" type="button" onClick={() => deleteItem(index)}>
                            <Trash2 size={18} />
                        </button>
                        )}
                    </div>
                </div>
                ))}
                <button className="btn btn-primary" type="button" onClick={addItem}>Add Item</button>
            </div>
            {/* Bank Account details */}
            <div className="mb-4">
                <h5>Bank Account Details</h5>
                <div className="row g-3">
                    <div className="col-md-4">
                        <input type="text"  className="form-control" placeholder="Account Name"
                            value={invoiceData.account.name} 
                            onChange={(e) => handleChange("account", "name", e.target.value)}/>
                    </div>
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Account Number"
                            value={invoiceData.account.number} 
                            onChange={(e) => handleChange("account", "number", e.target.value)}/>
                    </div>
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Branch/IFSC Code"
                            value={invoiceData.account.ifsccode} 
                            onChange={(e) => handleChange("account", "ifsccode", e.target.value)}/>
                    </div>
                </div>
            </div>
            {/* Totals */}
            <div className="mb-4">
                <h5>Totals</h5>
                <div className="d-flex justify-content-end">
                    <div className="w-100 w-md-50">
                        <div className="d-flex justify-content-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center my-2">
                            <label htmlFor="taxInput" className="me-2">Tax Rate(%)</label>
                            <input type="number" id="taxInput" className="form-control w-50 text-end" placeholder="2"
                                value={invoiceData.tax}
                                onChange={(e) => setInvoiceData((prev) => ({...prev, tax: e.target.value}))}/>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Tax Amount</span>
                            <span>₹{taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold mt-2">
                            <span>Grand Total</span>
                            <span>₹{grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Notes */}
            <div className="mb-4">
                <h5>Notes:</h5>
                <div className="w-100">
                    <textarea name="notes" className="form-control" rows={3}
                        value={invoiceData.notes} 
                        onChange={(e) => setInvoiceData((prev) => ({...prev, notes: e.target.value}))}
                    ></textarea>
                </div>
            </div>
            {/* Submit button of all data (For now we don't need this)*/}
            {/* <button onClick={handleSubmit}>Submit</button> */}

        </div>
    )
}

export default InvoiceForm;