import { getElement, renderElements } from "./helper";

export function renderItems(data) {

    const element = getElement("#search .container .items-wrapper")

    if (data && data.length > 0) {
        renderElements(element, data)
    }
}