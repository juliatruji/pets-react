import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Context = React.createContext()

export const Provider = ({ children }) => {
  const [modalVaccine, setModalVaccine] = useState({open:false})
  const [modalImage, setModalImage] = useState({ open: false, img: '' })
  const [vaccines, setVaccines] = useState([])
  const [search, setSearch] = useState('')

  const value = {
    modalVaccine,
    setModalVaccine,
    vaccines,
    setVaccines, 
    modalImage, 
    setModalImage,
    search, 
    setSearch
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default Context
