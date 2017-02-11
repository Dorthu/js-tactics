require('../sass/main.scss');
import { THREE } from './Three'
import { init_textures } from './texture_lookup'
import assign from 'object-assign'
import Space from './space'
import Camera from './camera'
import Unit from './unit'
import Highlight from './hightlight'

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
console.log(scene);

const light = new THREE.AmbientLight( 0xA9BEA9 );
scene.add(light);

const cam = new Camera();

/// Do level creation here

const spaces = [];

const unit = new Unit(0,0, 'baddie', scene);
for(let x=-5; x<6; x++) {
    for(let z=-5; z<6; z++) {
        spaces.push(new Space(x,z, 'grass', scene));
    }
}

const hl = new Highlight(0,0,scene);

/// Render
const startTime = new Date().getTime();
function render() {
    requestAnimationFrame( render );
    renderer.clear();
    renderer.render( scene, cam.camera );
}
render();


