'use client'

import { useEffect, useState } from 'react'
import styles from '../../styles/Dashboard.module.css'
import { useRouter } from 'next/navigation'
import { ImageGallery } from '../components/ImageGallery';

interface ImageData {
  url: string;
}

export default function Dashboard() {
  const router = useRouter()
  const [prompts, setPrompts] = useState<string[]>(['', '', ''])
  const [images, setImages] = useState<ImageData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      // Redirect to login page if not logged in
      router.push('/login')
    }
  }, [router])

  const handlePromptChange = (index: number, value: string) => {
    const newPrompts = [...prompts]
    newPrompts[index] = value
    setPrompts(newPrompts)
  }

  const generateImages = async () => {

    const validPrompts = prompts.filter(prompt => prompt.trim() !== '')
    
    if (validPrompts.length === 0) {
      alert('Please enter at least one prompt')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ prompts: validPrompts }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate images')
      }

      const data = await response.json()
      setImages(data.images)
    } catch (error) {
      console.error('Error generating images:', error)
      alert('Failed to generate images. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('token')  
    router.push('/login') 
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Image Generation</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </header>
      <div className={styles.content}>
        <div className={styles.promptInputs}>
          {prompts.map((prompt, index) => (
            <input
              key={index}
              type="text"
              value={prompt}
              onChange={(e) => handlePromptChange(index, e.target.value)}
              placeholder={`Prompt ${index + 1}`}
              className={styles.input}
              aria-label={`Prompt ${index + 1}`}
              disabled={isLoading}
            />
          ))}
        </div>
        <button 
          onClick={generateImages} 
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Images'}
        </button>
        {images.length > 0 && <ImageGallery images={images} />}
      </div>
    </div>
  )
}
