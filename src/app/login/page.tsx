'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Login.module.css'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      router.push('/dashboard');
    } else {
      console.error('Login failed');
    }
  };

  return (
    <div className={styles.container}>
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
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
          Login
        </button>
      </form>
    </div>
  </div>
  );
}
