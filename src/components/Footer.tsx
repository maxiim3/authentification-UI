import style from "./footer.module.scss"
import React from "react"

export default () => {
	return (
		<footer className={style.footer}>
			<p>
				Edit <code>src/App.tsx</code> and save to test HMR
			</p>
			<p>This is a template </p>
			<p>Made by Maxime Tamburrini 2023</p>
		</footer>
	)
}