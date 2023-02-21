import React, {useEffect, useState} from "react"
import {requestAllUsers, requestDeleteUser} from "../api/api"
import styles from "./users.module.scss"
import {AiFillCloseCircle, AiOutlineCloseCircle} from "react-icons/ai"

export default () => {
	const [users, setUsers] = useState(undefined)
	useEffect(() => {
		requestAllUsers().then(({data}) => {
			setUsers(data)
		})
	}, [])
	const [updatedUsers, setUpdatedUsers] = useState(users)
	useEffect(() => {
		setUpdatedUsers(users)
	}, [users])



	function handleDelete(e: React.MouseEvent<HTMLButtonElement>, userId: string) {
		requestDeleteUser(userId).then(resp => {
			console.log("response from api", resp)
			if (resp.status === 200) {
				//@ts-ignore
				setUsers(users.filter((user: any) => user._id !== userId))
			}
		})
	}

	if (!updatedUsers) return <h1>Loading...</h1>

	return (
		<>
			<h1>{updatedUsers.length !== 0 ? "Users" : "No users registered"}</h1>
			<section className={styles.list}>
				{updatedUsers &&
				 updatedUsers.map(user => (
						<USER
							key={crypto.randomUUID()}
							data={user}
							onClick={handleDelete}
						/>
					))}
			</section>
		</>
	)
}

function USER({
	data,
	onClick,
}: {
	data: any
	onClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void
}) {
	const [btnState, setBtnState] = useState(false)

	return (
		<article
			className={styles.card}
			key={crypto.randomUUID()}>
			<dl>User Name</dl>
			<dd>{data.name}</dd>

			<dl>User Email</dl>
			<dd>{data.email}</dd>

			<dl>User ID</dl>
			<dd>{data._id}</dd>

			{data?.isAdmin && (
				<>
					<dl>User Admin</dl>
					<dd>{data?.isAdmin ? "true" : "false"}</dd>
				</>
			)}

			<dl>User Hashed Password</dl>
			<dd>{data.password}</dd>
			<button
				className={styles.delBtn}
				onMouseDown={e => {
					setBtnState(true)
					onClick(e, data._id)
				}}
				onMouseUp={() => setBtnState(false)}
				onMouseEnter={e => (e.currentTarget.dataset.animated = "true")}
				onMouseLeave={e => (e.currentTarget.dataset.animated = "false")}>
				{btnState ? (
					<AiFillCloseCircle className={styles.cross} />
				) : (
					<AiOutlineCloseCircle className={styles.cross} />
				)}
			</button>
		</article>
	)
}
