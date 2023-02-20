import React, {createRef, MutableRefObject} from "react"
import styles from "./toast.module.scss"
import {useRedirectOnCountDown} from "../hooks/useRedirectOnCountDown"

export default (props: {message: string}) => {
	const toastRef = createRef() as MutableRefObject<HTMLDivElement>
	const {counter, redirect} = useRedirectOnCountDown()

	// if (redirect) return (toastRef.current.dataset.display = "none")

	return (
		<div
			ref={toastRef}
			className={styles.toast}>
			<h3>Notification</h3>
			<button>x</button>
			<p>{props.message}</p>
			<aside> {counter}</aside>
		</div>
	)
}
