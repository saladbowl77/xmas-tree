import dynamic from 'next/dynamic'

import React from "react";

// Will only import `react-p5` on client-side
const Canvas = dynamic(() => import('./Canvas').then((mod) => mod.default), {
  loading: () => <></>,
  ssr: false,
})

let x = 50;
const y = 50;

export default function Home() {
  return (
    <main>
      <Canvas />
    </main>
  )
}