import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Context = React.createContext()

export const Provider = ({ children }) => {
  const [modalCreateDog, setModalCreateDog] = useState({open: false, type: ''})
  const [modalAdoptDog, setModalAdoptDog] = useState({open:false})
  const [modalImage, setModalImage] = useState({ open: false, img: '' })
  const [search, setSearch] = useState('')




  const [dogs, setDogs] = useState([])

  const value = {
    modalCreateDog,
    setModalCreateDog,
    dogs, 
    setDogs,
    modalAdoptDog,
    setModalAdoptDog,
    modalImage, 
    setModalImage,
    search,
    setSearch
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default Context
