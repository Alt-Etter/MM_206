// Task 3 - Click to draw circles (a and b)

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const radiusInput = document.getElementById("radius");
const colorInput = document.getElementById("color");

// array for circles, last in first out
let circles = [];

function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circles.length; i++) {
    const c = circles[i];
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, 2 * Math.PI);
    ctx.fillStyle = c.color;
    ctx.fill();
    ctx.stroke();
  }
}

// Prints the newest circle
function findCircle(x, y) {
  // Loop to find newest circle first
  for (let i = circles.length - 1; i >= 0; i--) {
    const c = circles[i];
    const dx = x - c.x;
    const dy = y - c.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= c.radius) {
      return c;
    }
  }
  return null;
}

canvas.addEventListener("click", function (event) {
  // place of the click inside the canvas
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const radius = Number(radiusInput.value);
  const color = colorInput.value;

  const clicked = findCircle(x, y);

  if (clicked) {
    // 3b: change the existing circle instead of making a new one
    clicked.radius = radius;
    clicked.color = color;
  } else {
    // 3a: make a new circle where we clicked
    circles.push({ x: x, y: y, radius: radius, color: color });
  }

  drawAll();
});
