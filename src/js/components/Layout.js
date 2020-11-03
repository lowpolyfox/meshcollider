import React from "react";
import { useSiteMetadata } from "../hooks/useSiteMetadata";
import { Header } from "./Header";
import Sketch from "react-p5";

export const Layout = ({ children }) => {
  const { title } = useSiteMetadata();

  let yoff = 0.0;
  function setup(p5, canvasParentRef) {
    const canvas = p5.createCanvas(p5.windowWidth, 140).parent(canvasParentRef);
    canvas.style("display", "block");
  }

  function draw(p5) {
    p5.background(255);
    p5.fill("#343434");

    p5.beginShape();

    var xoff = 0;
    for (let x = 0; x <= p5.width; x += 10) {
      var y = p5.map(p5.noise(xoff, yoff), 0, 1, 70, 140);
      p5.vertex(x, y);
      xoff += 0.05;
    }

    yoff += 0.01;
    p5.vertex(p5.width, p5.height);
    p5.vertex(0, p5.height);
    p5.endShape(p5.CLOSE);
  }

  return (
    <>
      <Header title={title} />

      {children}

      <div className="canvas">
        <Sketch setup={setup} draw={draw} />
      </div>
    </>
  );
};
