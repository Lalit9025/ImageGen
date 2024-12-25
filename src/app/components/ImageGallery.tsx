'use client'

import { useState } from 'react'
import styles from '../../styles/ImageGallery.module.css'

interface ImageData {
  url: string
}

interface ImageGalleryProps {
  images: ImageData[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.gallery}>
        {images.map((image, index) => (
          <div key={index} className={styles.imageWrapper}>
            <img
              src={image.url}
              alt={`Generated Image ${index + 1}`}
              className={styles.image}
              onClick={() => setSelectedImage(image.url)}
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className={styles.modal} onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Selected Image" className={styles.modalImage} />
        </div>
      )}
    </div>
  )
}

