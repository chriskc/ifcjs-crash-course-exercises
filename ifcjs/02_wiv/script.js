import { Color } from "three"
import { IfcViewerAPI } from "web-ifc-viewer"

const container = document.getElementById("viewer-container")
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) })
console.log(viewer)
viewer.axes.setAxes()
viewer.grid.setGrid()

// viewer.IFC.setWasmPath("./")
// console.log("model-house.ifc")

// await viewer.IFC.loadIfcUrl("model-house.ifc")

const input = document.getElementById("file-input")
input.addEventListener(
    "change",
    async (changed) => {
        const file = changed.target.files[0]
        const model =await viewer.IFC.loadIfc(file)
        await viewer.shadowDropper.renderShadow(model.modelID)
        viewer.context.renderer.postProduction.active = true
    }
)

window.onmousemove = async () => await viewer.IFC.selector.prePickIfcItem()
window.ondblclick = async () => await viewer.IFC.selector.pickIfcItem()
