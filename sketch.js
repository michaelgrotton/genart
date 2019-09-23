const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [ 2048, 2048 ],
  pixelsPerInch: 1200
};

const sketch = () => {
  const palette = random.pick(palettes);
  const characters = ['=','-','__']

  const createGrid = () => {
    const points = [];
    count = 100;
    for (let x = 0; x < count; x++) {
      for(let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        const radius = Math.max(.5, random.noise2D(u , v)) * .09;

        points.push({
          color: random.pick(palette),
          radius,
          rotation: random.noise2D(u * 1.5, v * 1.5) * 1.2,
          position: [u, v],
          character: random.pick(characters)
        });
      }
    }
    return points;
  }

  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle ='white';
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const {
        position,
        radius,
        rotation,
        color,
        character
      } = data;

      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, width - margin, v);

      // context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.fillStyle = color;
      // context.fill();

      context.save()
      context.fillStyle = color;
      context.font = `${radius * width}px "Arial"`;
      context.translate(x, y)
      context.rotate(rotation);
      context.fillText(character, 0, 0);

      context.restore();
    })

  };
};

canvasSketch(sketch, settings);
