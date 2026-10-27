// Task 1 - Rainbow circles (red to red)

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const drawButton = document.getElementById("drawButton");

function drawCircles() {
  const numCircles = Number(document.getElementById("numCircles").value);
  const outerRadius = Number(document.getElementById("outerRadius").value);

  // Clear the canvas before drawing again
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // How much smaller each circle gets
  const step = outerRadius / numCircles;

  // Draw the biggest circle first, so the smaller ones are painted on top
  for (let i = 0; i < numCircles; i++) {
    const radius = outerRadius - i * step;

    // Hue goes around the color wheel: 360 (red) on the outside
    // down to a little above 0 (red) in the middle
    const hue = 360 - (i * 360) / numCircles;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    ctx.fill();
    ctx.stroke();
  }
}

drawButton.addEventListener("click", drawCircles);

// Draw once when the page loads
drawCircles();
