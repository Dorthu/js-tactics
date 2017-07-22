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
const grid_group = new THREE.Object3D();
scene.add(grid_group);

const unit = new Unit(0,0, 'baddie', scene);
for(let x=-5; x<6; x++) {
    for(let z=-5; z<6; z++) {
        spaces.push(new Space(x,z, 'grass', 'brick', grid_group));
    }
}

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

let mouse = new THREE.Vector2();

window.addEventListener('mousemove', (e) => {
    let cpos = canvas.getBoundingClientRect();
    mouse.x = ( (e.clientX  - cpos.left) / width) * 2 - 1;
    mouse.y = - ( (e.clientY - cpos.top) / height ) * 2 + 1;
}, false);

function unproject(e) {
    console.log(mouse);
    let rc = new THREE.Raycaster();
    rc.setFromCamera(mouse, cam.camera);
    let intersects = rc.intersectObjects(grid_group.children);

    if(intersects && intersects[0]) {
        let obj = intersects[0].object;
        console.log('clicked a thing');
        console.log(obj);
        console.log(obj.gamedata);
        obj.gamedata.select();
    }

}

canvas.addEventListener('click', (e) => {
    unproject(e);
});

