import {useEffect, useState} from "react"

export function useRedirectOnCountDown() {
	const [redirect, setRedirect] = useState(false)
	const [counter, setCounter] = useState(10)

	useEffect(() => {
		if (!redirect) {
			const interval = setInterval(() => {
				setCounter(counter => counter - 1)
			}, 1000)

			return () => clearInterval(interval)
		}
	}, [redirect])

	useEffect(() => {
		if (counter === 0) {
			setRedirect(true)
		}
	}, [counter])
	return {redirect, counter}
}