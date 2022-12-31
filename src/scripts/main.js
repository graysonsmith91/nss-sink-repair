import { fetchRequests, fetchPlumbers, fetchCompletions } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"

// Need to fetch the data from the API and store it in application state
// before converting to html representations

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(() => fetchCompletions())
        .then(
            () => {
                mainContainer.innerHTML = SinkRepair()
            }
        )
}

render()

// Event listener that renders html again if state changes
mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)