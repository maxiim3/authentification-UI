import jwtDecode from "jwt-decode"

export function useJWTDecoder(token:string) {
	return jwtDecode(token)
}
