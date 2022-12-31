import { ServiceForm } from "./ServiceForm.js"
import { Requests } from "./Requests.js"

// function that displays the html, is called in main.js
export const SinkRepair = () => {
    return `
        <h1 class="title">Maude and Merle's Sink Repair</h1>
        <section class="serviceForm">
            ${ServiceForm()}
        </section>

        <section class="serviceRequests">
            <h2 class="title">Service Requests</h2>
            ${Requests()}
        </section>
    `
}