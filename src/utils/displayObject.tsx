import React from "react"

export default (obj: any) => {
	const keys = Object.keys(obj)
	return (
		<>
			{keys.map(key => (
				<div key={crypto.randomUUID()}>
					<h3>{key}</h3>
					<p>{obj[key]}</p>
				</div>
			))}
		</>
	)
}

