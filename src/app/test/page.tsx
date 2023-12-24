"use client"

import dynamic from 'next/dynamic'

import React from "react";

// Will only import `react-p5` on client-side
const Canvas = dynamic(() => import('./Canvas').then((mod) => mod.default), {
  ssr: false,
})


import p5Types from "p5"; //Import this for typechecking and intellisense

interface ComponentProps {
  // Your component props
}

let x = 50;
const y = 50;

export default function Home() {
  // See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
    x++;
  };

  return (
    <main>
      <Canvas />
    </main>
  )
}