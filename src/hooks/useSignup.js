import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuth } from "./useAuth";

export function useSignup() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuth();

  const signup = async (email, password, username) => {
    setError(null);
    setIsPending(true);

    try {
      // signup user
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error("Could not complete signup");
      }

      // add display name/username to user
      await response.user.updateProfile({ displayName: username });

      //dispatch login action
      dispatch({ type: "LOGIN", payload: response.user });

      //update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setIsPending(false);
        setError(err.message);
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
}
