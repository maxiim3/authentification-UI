import style from "./header.module.scss"
import React from "react"
import {NavLink} from "react-router-dom"

export default () => {
	return (
		<header className={style.header}>
			<ul className={style.linksContainer}>
				<NavLink to="/">Home</NavLink>
				<NavLink to="about">About</NavLink>
			</ul>
		</header>
	)
}