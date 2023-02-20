import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import {requestRetrieveUserData} from "../api/api"
import {useJWTDecoder} from "../hooks/useJWTDecoder"
import {setUser} from "../store/store"

export function TokenBasedDataRetriever(props: {children: React.ReactNode}) {
	const dispatch = useDispatch()

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (token) {
			requestRetrieveUserData(token).then(res => {
				const decodedTokenId = useJWTDecoder(token)._id
				const fetchedId = res._id
				if (fetchedId !== decodedTokenId) throw new Error("Token is invalid")
				const user = {
					name: res.name,
					email: res.email,
					isAdmin: res.isAdmin,
				}
				dispatch(setUser(user))
			})
		}
	}, [])

	return <>{props.children}</>
}