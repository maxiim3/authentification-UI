import styles from "./layout.module.scss"
import React, {ReactNode} from "react"
import Footer from "./Footer"
import Header from "./Header"
import {Provider} from "react-redux"
import {Store} from "../store/store"
import {TokenBasedDataRetriever} from "./TokenBasedDataRetriever"

// export const NotificationContext = React.createContext([] as string[])

export default (props: {children: ReactNode | ReactNode[]}) => {
	return (
		<>
			<Provider store={Store}>
				{/*<NotificationContext.Provider value={["message", "coucou", "123"]}>*/}
				<TokenBasedDataRetriever>
					<Header />
					{/*<ToastContainer />*/}
					<main className={styles.container}>{props.children}</main>
					{/*</NotificationContext.Provider>*/}
					<Footer />
				</TokenBasedDataRetriever>
			</Provider>
		</>
	)
}
