import { useEffect, useRef, useState } from "react"
import { projectFirestore } from "../firebase/config"

export function useCollection(collection, _query = null, _orderBy = null) {
  const [documents, setDocuments] = useState()
  const [error, setError] = useState()

  // if there's no useRef it'll cause an infinite loop in useEffect
  //_query is an array and is 'different' on every function call
  const query = useRef(_query).current
  const orderBy = useRef(_orderBy).current

  useEffect(() => {
    let ref = projectFirestore.collection(collection)

    if(query) {
      ref = ref.where(...query)
    }

    if(orderBy) {
      ref = ref.orderBy(...orderBy)
    }

    const unsub = ref.onSnapshot(snapshot => {
      let results = []

      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      })

      setDocuments(results)
      setError(null)
    }, (err) => {
      console.log(err)
      setError('Could not fetch the data.')
    })

    return () => unsub()

  }, [collection, query, orderBy])

  return {documents, error}
}