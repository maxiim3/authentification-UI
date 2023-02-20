import React from "react"
import ReactDOM, {hydrateRoot} from "react-dom/client"
import "./sass/index.scss"
import {RouterProvider} from "react-router-dom"
import router from "./routes/router"

const element = document.getElementById("root") as HTMLDivElement
const root = ReactDOM.createRoot(element)
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
