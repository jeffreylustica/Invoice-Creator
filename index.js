const serviceListEL = document.querySelector("#service-list-el")
const invoiceListEl = document.querySelector("#invoice-list-el")
const invoiceTotalEl = document.querySelector("#invoice-total-el")
const sendInvoiceBtn = document.querySelector("#send-invoice-btn")

const services = [
    {id: 1, name: "Wash Car", amount: 10},
    {id: 2, name: "Mow Lawn", amount: 20},
    {id: 3, name: "Pull Weeds", amount: 30}
]

let invoiceItem = []

// display service
const servicesHtml = services.map(service => {
    const {id, name, amount} = service
    return `<button data-btn-service data-id=${id} class="btn btn-service">${name}: $${amount}</button>`
}).join("")

serviceListEL.innerHTML = servicesHtml

//adding function to buttons
serviceListEL.addEventListener('click', e => {
    if (e.target.className === "btn btn-service") {
        const thisButton = e.target
        const serviceId = thisButton.dataset.id
        const serviceItem = services.find(service => service.id == serviceId)
        if (!invoiceItem.includes(serviceItem)) {
            invoiceItem.push(serviceItem)          
            invoiceListEl.innerHTML += getInvoiceHtml(serviceItem)
            thisButton.classList.add('btn-clicked')
            displayTotalAmount()
        }
    }
})

function getInvoiceHtml(service) {
    const invoiceItemHtml = `
    <li class="invoice-item" data-id=${service.id}>
        <p class="service-name">${service.name}</p>
        <button class="btn-remove" id="remove-el">Remove</button>
        <span class="service-amount">${service.amount}<span class="item-dollar-sign">$</span></span>
    </li>`

    return invoiceItemHtml
}

//remove button
invoiceListEl.addEventListener('click', e => {
    if (e.target.className === "btn-remove") {
        const thisButton = e.target
        const listItem = thisButton.parentNode
        const listItemId = listItem.dataset.id
        // const itemName = item.querySelector('.service-name').textContent
        // invoiceItem = invoiceItem.filter(item => item.name !== itemName)
        invoiceItem = invoiceItem.filter(item => item.id != listItemId)
        removeButtonStyle(listItemId)
        invoiceListEl.removeChild(listItem)
        displayTotalAmount()
    }
})

//total amount
function displayTotalAmount() { 
    let totalAmount = 0
    if (invoiceItem.length > 1) {
        const tempTotal = invoiceItem.reduce((total, num) => {
            return {amount: total.amount + num.amount}
        }) 
        totalAmount = tempTotal.amount      
    } else if(invoiceItem.length === 1) {
        totalAmount = invoiceItem[0].amount
    } else {
        totalAmount = 0
    }
    const invoiceTotalHtml = `<p>We accept cash, credit card, or PayPal</p>
        <span class="total-amount"><span class="dollar-sign">$</span>${totalAmount}</span>`
        invoiceTotalEl.innerHTML =  invoiceTotalHtml  
}

//send invoice
sendInvoiceBtn.addEventListener("click",() => {
    invoiceItem = []
    invoiceListEl.innerHTML = ""
    removeAllButtonStyle()
    const invoiceTotalHtml = `<p></p>
    <span class="total-amount"><span class="dollar-sign">$</span>0</span>`
    invoiceTotalEl.innerHTML =  invoiceTotalHtml 
})

function removeAllButtonStyle() {
    const serviceBtn = serviceListEL.querySelectorAll('.btn-service')
    serviceBtn.forEach(button => {
        button.classList.remove('btn-clicked')
    })
}

function removeButtonStyle(itemId) {
    const serviceBtn = serviceListEL.querySelectorAll('.btn-service')
    serviceBtn.forEach(button => {
        if(button.dataset.id === itemId) {
            button.classList.remove('btn-clicked')
        }
    })
}







