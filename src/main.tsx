import React from "react"
import ReactDOM from "react-dom/client"
import router from "./routes/router"
import "./sass/index.scss"
import {RouterProvider} from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
