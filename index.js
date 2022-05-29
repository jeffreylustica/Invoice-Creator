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
    const {id,name, amount} = service
    return `<button data-btn-service data-id=${id} class="btn btn-service">${name}: $${amount}</button>`
}).join("")

serviceListEL.innerHTML = servicesHtml




//adding function to buttons
const serviceBtn = document.querySelectorAll("[data-btn-service]")
serviceBtn.forEach((button, index) => {
    button.addEventListener("click", () => {
        const serviceItem = services[index]
        if (!invoiceItem.includes(serviceItem)) {
            invoiceItem.push(serviceItem)  
            createItemEl(serviceItem, index)
            displayTotalAmount() 
            changeBtnBg(button)
        }
        // button.classList.add('btn-clicked')
    })
})

function changeBtnBg(button) {
    button.classList.add('btn-clicked')
}


function createItemEl(serviceItem, index) {
    const itemli = document.createElement('li')
    itemli.classList.add("invoice-item")

    const itemPara = document.createElement('p')
    itemPara.classList.add("service-name")
    itemPara.textContent = serviceItem.name

    const itemBtn = document.createElement('button')
    itemBtn.classList.add("btn-remove")
    itemBtn.setAttribute("id","remove-el")
    itemBtn.textContent = "Remove"

    const itemSpan = document.createElement('span')
    itemSpan.classList.add("service-amount")
    itemSpan.textContent = serviceItem.amount

    const dollarSpan = document.createElement('span')
    dollarSpan.classList.add('item-dollar-sign')
    dollarSpan.textContent = "$"

    itemSpan.appendChild(dollarSpan)
    itemli.appendChild(itemPara)
    itemli.appendChild(itemBtn)
    itemli.appendChild(itemSpan)
    invoiceListEl.appendChild(itemli)

    //remove button
    itemBtn.addEventListener("click", () => {
        removeInvoiceItem(index, itemli)
    })
}


function removeInvoiceItem(index, itemli) {
    invoiceItem = invoiceItem.filter(item => item !== services[index])
    invoiceListEl.removeChild(itemli)
    displayTotalAmount()  
    serviceBtn[index].classList.remove('btn-clicked')
}


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
    serviceBtn.forEach(button => {
        button.classList.remove('btn-clicked')
    })

    const invoiceTotalHtml = `<p></p>
    <span class="total-amount"><span class="dollar-sign">$</span>0</span>`
    invoiceTotalEl.innerHTML =  invoiceTotalHtml 
})

