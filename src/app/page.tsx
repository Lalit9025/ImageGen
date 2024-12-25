'use client'; // This ensures it's a client-side component
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import styles from './page.module.css'

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        router.push('/login');
      } else {
        console.error('Signup failed', response.data);
      }
    } catch (error) {

      console.error('An error occurred while signing up:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Sign Up</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
