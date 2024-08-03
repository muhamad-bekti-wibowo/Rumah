const canvas = document.getElementById('gaugeCanvas');
const ctx = canvas.getContext('2d');

const maxGaugeValue = 54612;

function drawGauge(value) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 + 20; // Adjusted to center vertically
    const radius = 70;
    const startAngle = 0.75 * Math.PI;
    const endAngle = 2.25 * Math.PI;
    const angleRange = endAngle - startAngle;
    const needleLength = radius * 0.9;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the gauge background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#ddd';
    ctx.stroke();

    // Draw the gauge fill
    ctx.beginPath();
    const fillEndAngle = startAngle + (value / maxGaugeValue) * angleRange;
    ctx.arc(centerX, centerY, radius, startAngle, fillEndAngle);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#3cba54';
    ctx.stroke();

    // Draw the needle
    const needleAngle = startAngle + (value / maxGaugeValue) * angleRange;
    const needleX = centerX + needleLength * Math.cos(needleAngle);
    const needleY = centerY + needleLength * Math.sin(needleAngle);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(needleX, needleY);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Draw the value text
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(value, centerX, centerY + radius + 30); // Adjusted to center text below the gauge

    // Draw the percentage text in the center
    const percentage = ((value / maxGaugeValue) * 100).toFixed(2) + '%';
    ctx.font = '15px Arial';
    ctx.fillText(percentage, centerX, centerY +25 );
}

// Example: draw the gauge with a value of 30000
drawGauge(30000);