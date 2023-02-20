import Toast from "./Toast"
import styles from "./toast.module.scss"

import React, {useContext, useEffect} from "react"
import {NotificationContext} from "./LayoutContainer"

export function ToastContainer() {
	const context = useContext(NotificationContext)
	useEffect(() => {
		console.log("toast container mounted")
	}, [context])

	console.log(context)
	return (
		<div className={styles.toastContainer}>
			{context.map(message => (
				<Toast
					key={crypto.randomUUID()}
					message={message}
				/>
			))}
		</div>
	)
}
