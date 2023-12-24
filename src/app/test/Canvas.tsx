import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

interface ComponentProps {
  // Your component props
}

let x = 50;
const y = 50;
  
const Canvas = (): JSX.Element => {
  // See annotations in JS for more information
  const setup = (p5: any) => {
    p5.createCanvas(500, 500);
  };

  const draw = (p5: any) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
    x++;
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Canvas