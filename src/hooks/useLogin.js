import { useState, useEffect} from 'react'
import { useAuth } from './useAuth'
import { projectAuth } from '../firebase/config'

export function useLogin() {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuth()

  const login = async (email, password) => {
    setIsPending(true)

    try {
      const response = await projectAuth.signInWithEmailAndPassword(email, password)

      dispatch({type: 'LOGIN', payload: response.user})

      //update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }

    } catch(err) {
      if(!isCancelled) {
        setError(err.message)
        setIsPending(false)
        console.log(err)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return {login, error, isPending}
}