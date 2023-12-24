"use client"

import Image from 'next/image'
import styles from './page.module.css'

import { getUserData } from '@/lib/api'

export default function Home() {

  const getData = () => {
    const userData = getUserData({site: 'misskey', id: 'vollboy5729SYas'});
  }

  return (
    <main className={styles.main}>
      <button onClick={() => {getData()}}></button>
    </main>
  )
}
