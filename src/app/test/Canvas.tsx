import React from "react";

import dynamic from 'next/dynamic'

import p5Types from 'p5'

// Will only import `react-p5` on client-side
let Sketch: any = null
Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})
  
const Canvas = () => {
  const preload = (p5: p5Types) => {
    // ここは今回使わない
  };

  const setup = (p5: p5Types) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB, p5.width, p5.height, 100);
    p5.noStroke();
  };

  const barWidth = 20;
  let lastBar = -1;

  const draw = (p5: p5Types) => {
    let whichBar = p5.mouseX / barWidth;
    if (whichBar !== lastBar) {
      let barX = whichBar * barWidth;
      p5.fill(barX, p5.mouseY, 66);
      p5.rect(barX, 0, barWidth, p5.height);
      lastBar = whichBar;
    }
  };

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
        windowResized={windowResized}
    />
  );
};

export default Canvas