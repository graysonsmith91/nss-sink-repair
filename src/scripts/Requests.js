import { getRequests, deleteRequest, getPlumbers, saveCompletion } from "./dataAccess.js"

// Function that displays all list item requests in HTML
// Added delete button next to each request
// Also added dropdown menu to select a plumber under each request
const requestListHTML = (requestObj) => {
    const plumbers = getPlumbers()

    let html = `<li>
        ${requestObj.description}
        <button class="request__delete"
        id="request--${requestObj.id}">
        Delete
        </button>
        </li>`
    html += `<select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${
        plumbers.map(
            plumber => {
                return `<option value="${requestObj.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
</select>`

    return html
}

// Function that gets the requests from dataAccess.js and maps all of them out
// then joins them in an html string
export const Requests = () => {
    const requests = getRequests()
    let html = `
        <ul>
        ${requests.map((request) => requestListHTML(request)).join("")
        }
    </ul>
    `
    return html
}

// Event listener that deletes the request from the API using the requestId
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

// Function that if a plumber is clicked on from dropdown menu then destructure the ID's
// and create new completion object to add request and plumber and store in API
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            const completion = { requestId: requestId, plumberId: plumberId, date_created: Date.now() }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)
        }
    }
)