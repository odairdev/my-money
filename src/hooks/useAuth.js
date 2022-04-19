import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

export function useAuth() {
  const context = useContext(AuthContext)

  if(!context) {
    throw new Error('useAuth must be inside an AuthContext Provider.')
  }

  return context
}