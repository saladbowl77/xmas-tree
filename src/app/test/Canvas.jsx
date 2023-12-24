import React from "react";
import Sketch from "react-p5";
  
const Canvas = () => {
  const preload = (p5) => {
    // ここは今回使わない
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB, p5.width, p5.height, 100);
    p5.noStroke();
  };

  const barWidth = 20;
  let lastBar = -1;

  const draw = (p5) => {
    let whichBar = p5.mouseX / barWidth;
    if (whichBar !== lastBar) {
      let barX = whichBar * barWidth;
      p5.fill(barX, p5.mouseY, 66);
      p5.rect(barX, 0, barWidth, p5.height);
      lastBar = whichBar;
    }
  };

  const windowResized = (p5) => {
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