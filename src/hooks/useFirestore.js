import { useState, useEffect, useReducer } from 'react'
import { projectFirestore, timestamp } from '../firebase/config'

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

const firestoreReducer = (state, action) => {
  switch(action.type) {
    case 'ADDED_DOCUMENT':
      return {isPending: false, success: true, document: action.payload, error: null}
    case 'DELETED_DOCUMENT':
      return {isPending: false, success: true, error: null}
    case 'IS_PENDING':
      return {isPending: true, document: null, error: null, success: false}
    case 'ERROR': 
     return {document: null, error: action.payload, isPending: false, success: false}
    default:
      return state
  }
}

export function useFirestore(collection) {
  const [isCancelled, setIsCancelled] = useState(false)
  const [response, dispatch] = useReducer(firestoreReducer, initialState)

  const ref = projectFirestore.collection(collection)

  //Only dispatch if not cancelled
  function dispatchIfNotCancelled(action) {
    if(!isCancelled) {
      dispatch(action)
    }
  }

  //Add a docment
  const addDocument = async (doc) => {
    dispatch({type: 'IS_PENDING'})

    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument= await ref.add({...doc, createdAt})
      dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument})

    } catch(err) {
      console.log(err.message)
      dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
    }
  }
  
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING'})

    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({type: 'DELETED_DOCUMENT'})

    } catch(err) {
      console.log(err)
      dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
    }

  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return {addDocument, deleteDocument, response}
}