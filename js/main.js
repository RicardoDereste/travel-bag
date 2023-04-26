const form = document.getElementById("new-item")
const list = document.getElementById("list")
const items = JSON.parse(localStorage.getItem("items")) || []

items.forEach( (element) => {
    createElement(element)
} )

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const name = event.target.elements['name']
    const amount = event.target.elements['amount']

    const exist = items.find( element => element.name === name.value )

    const currentItem = {
        "name": name.value,
        "amount": amount.value
    }

    if (exist) {
        currentItem.id = exist.id
        
        updateElement(currentItem)

        items[items.findIndex(element => element.id === exist.id)] = currentItem
    } else {
        currentItem.id = items[items.length -1] ? (items[items.length-1]).id + 1 : 0;

        createElement(currentItem)

        items.push(currentItem)
    }

    localStorage.setItem("items", JSON.stringify(items))

    name.value = ""
    amount.value = ""
})

function createElement(item) {
    const newItem = document.createElement("li")
    newItem.classList.add("item")

    const numberItem = document.createElement("strong")
    numberItem.innerHTML = item.amount
    numberItem.dataset.id = item.id
    newItem.appendChild(numberItem)
    
    newItem.innerHTML += item.name

    newItem.appendChild(buttonDelete(item.id))

    list.appendChild(newItem)
}

function updateElement(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.amount
}

function buttonDelete(id) {
    const elementButton = document.createElement("button")
    elementButton.innerText = "X"

    elementButton.addEventListener("click", function() {
        deleteElement(this.parentNode, id)
    })

    return elementButton
}

function deleteElement(tag, id) {
    tag.remove()

    items.splice(items.findIndex(element => element.id === id), 1)

    localStorage.setItem("items", JSON.stringify(items))
}