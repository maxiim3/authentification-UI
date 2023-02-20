import styles from "./header.module.scss"
import React from "react"
import {NavLink} from "react-router-dom"
import {paths} from "../routes/config.json"
import {AiOutlineLogin, AiOutlineLogout, AiOutlineUserAdd} from "react-icons/ai"
import {useDispatch, useSelector} from "react-redux"
import {logOutUser} from "../store/store"

export default () => {
	const {isLoggedIn} = useSelector(state => state.app)
	const dispatch = useDispatch()

	return (
		<header className={styles.header}>
			<ul className={styles.linksContainer}>
				<NavLink to={paths.ROOT}>Home</NavLink>
				{isLoggedIn ? (
					<>
						<NavLink
							to={"/"}
							onClick={() => dispatch(logOutUser())}>
							Log out
							<AiOutlineLogout />
							Hello User
						</NavLink>
					</>
				) : (
					<>
						<NavLink to={paths.LOGIN}>
							Log in <AiOutlineLogin />
						</NavLink>
						<NavLink to={paths.REGISTER}>
							Register <AiOutlineUserAdd />
						</NavLink>
					</>
				)}
			</ul>
		</header>
	)
}
