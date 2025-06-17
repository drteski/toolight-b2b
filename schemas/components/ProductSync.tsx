'use client'

import axios from 'axios'
import { useState } from 'react'

const ProductSync = () => {
  const [uploadProducts, setUploadProducts] = useState('Wgraj nowe produkty')
  const [updateProducts, setUdateProducts] = useState('Synchronizuj produkty')
  const handleUpdateProducts = async () => {
    setUdateProducts('Wczytywanie ...')
    await axios.get('/api/update-product').then(() => {
      setUdateProducts('Zaktualizowano produkty')
    })
    return setTimeout(() => setUdateProducts('Synchronizuj produkty'), 2000)
  }
  const handleUploadProducts = async () => {
    setUploadProducts('Wczytywanie ...')
    await axios.get('/api/upload-product').then(() => {
      setUploadProducts('Wgrano produkty')
    })
    return setTimeout(() => setUploadProducts('Wgraj nowe produkty'), 2000)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 10 }}>
      <button
        style={{
          maxWidth: 200,
          padding: '8px 16px',
          cursor: 'pointer',
          color: '#191919',
          background: uploadProducts === 'Wczytywanie ...' ? '#4d4d4d' : '#f2f2f2',
          border: 'none',
          borderRadius: 4,
        }}
        disabled={uploadProducts === 'Wczytywanie ...'}
        onClick={() => handleUploadProducts()}
      >
        {uploadProducts}
      </button>
      <button
        style={{
          maxWidth: 200,
          padding: '8px 16px',
          cursor: 'pointer',
          color: '#191919',
          background: updateProducts === 'Wczytywanie ...' ? '#4d4d4d' : '#f2f2f2',
          border: 'none',
          borderRadius: 4,
        }}
        disabled={updateProducts === 'Wczytywanie ...'}
        onClick={() => handleUpdateProducts()}
      >
        {updateProducts}
      </button>
    </div>
  )
}

export default ProductSync
