require('../sass/main.scss');
import { THREE } from './Three'
import { init_textures } from './texture_lookup'
import assign from 'object-assign'
import Camera from './camera'
import Unit from './unit'
import Highlight from './hightlight'
import Grid from './grid'
import TurnController from './turn_controller'
import UnitInfo from './unit_info'

/// Make a canvas
const canvas = document.createElement('canvas')
canvas.width = 750;
canvas.height = 500;
console.log(canvas.width);
console.log(canvas.height);
const width = canvas.width;
const height = canvas.height;

document.getElementById("canvas_goes_here").appendChild(canvas);

/// Make a renderer
const renderer = new THREE.WebGLRenderer(assign({
    canvas: canvas
}))

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );
renderer.autoClear=false;

/// Load Up Texutures
init_textures();

/// Make a scene
const scene = new THREE.Scene();
scene.gamedata={};
console.log(scene);

/// mouse tracker
let mouse = new THREE.Vector2();
scene.gamedata.mouse = mouse;

const light = new THREE.AmbientLight( 0xA9BEA9 );
scene.add(light);

const cam = new Camera();
scene.gamedata.cam = cam;

const right_info = new UnitInfo();

/// Do level creation here
const grid = new Grid(scene);
scene.gamedata.grid = grid;

const unit = new Unit('baddie', scene);
grid.add_unit(unit, 5, 5);
right_info.update(unit);

const turn_controller = new TurnController(scene);

//const highlight = new Highlight(0,0,scene);

/// Render
const startTime = new Date().getTime();
function render() {
    requestAnimationFrame( render );
    renderer.clear();
    renderer.render( scene, cam.camera );
}
render();

let cpos = 0;
window.addEventListener('keydown', (e) => {
    if(e.key ==  'c') {
        cpos++;
        if(cpos > 2) { cpos = 0; }
        cam.position(cpos);
    }
});

window.addEventListener('mousemove', (e) => {
    let cpos = canvas.getBoundingClientRect();
    mouse.x = ( (e.clientX  - cpos.left) / width) * 2 - 1;
    mouse.y = - ( (e.clientY - cpos.top) / height ) * 2 + 1;
}, false);


canvas.addEventListener('click', (e) => {
    turn_controller.click(e);
});

