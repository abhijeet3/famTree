var state = {
  x: 0,
  y: 0,
  zoom: 1,
  width: 0,
  height: 0,
  gridSize: 100,
  translateX: 0,
  translateY: 0,
}

var ctx, canvas, json;

document.addEventListener('DOMContentLoaded', () => {

  json = [{
    name: 'Ram',
    id: '1',
    information: {},
    spouse: [],
    children: [{
      name: 'Luv',
      id: '11',
      information: {},
      spouse: [],
      children: []
    },
    {
      name: 'Kush',
      id: '12',
      information: {},
      spouse: [],
      children: []
    }]
  }];

  canvas = document.getElementById("famtreeCanvas");
  if (canvas.getContext) {
    InitDraw();
    panZoomCanvas();
  }
});

document.addEventListener('mousemove', (e) => {
  if (e.buttons === 1) {
    updatePosition({ ...state, x: state.x + e.movementX, y: state.y + e.movementY, translateX: state.translateX + e.movementX, translateY: state.translateY + e.movementY });
    panZoomCanvas();
  }
});

document.addEventListener('wheel', ({ clientX, clientY, deltaY }) => {
  if (deltaY > 0 && state.zoom <= .2) { return; }
  const zoom = deltaY > 0 ? state.zoom - .1 : state.zoom + 0.1;
  const x = state.translateX - ((clientX - state.translateX) * (zoom - 1));
  const y = state.translateY - ((clientY - state.translateY) * (zoom - 1));
  updatePosition({ ...state, zoom, x, y });
  panZoomCanvas();
});

const updatePosition = (newVals) => {
  state = newVals;
}

const InitDraw = () => {
  ctx = canvas.getContext("2d");
  canvas.width = state.width = document.body.clientWidth;
  canvas.height = state.height = document.body.clientHeight;
  clearCanvas();
  //redraw();
}

const clearCanvas = () => {
  ctx.clearRect(0, 0, state.width, state.height);
  ctx.save();
}

const panZoomCanvas = () => {
  clearCanvas();
  ctx.translate(state.x, state.y);
  ctx.scale(state.zoom, state.zoom);
  redraw();
}

const redraw = () => {
  ctx.beginPath();
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++)
      grid(i, j)
  }
  ctx.closePath();
  ctx.fillStyle = "#555";
  ctx.fill();
  ctx.restore();
}

const grid = (gridX, gridY) => {
  ctx.rect((gridX - 1) * state.gridSize, (gridY - 1) * state.gridSize, state.gridSize - 2, state.gridSize - 2);
}