import { THREE } from './Three'

export let mat_map = null;

const HIGHLIGHT_COLOR = 0x0000FF;
const SELECTED_COLOR = 0x890000;

function load_texture(file) {
    let t = new THREE.TextureLoader().load(file);
    t.magFilter = THREE.NearestFilter;
    return t;
}

function make_material(texture, type) {
    if(type == 'sprites') {
        return new THREE.SpriteMaterial({map: texture});
    } else if(type == 'overlay') {
        return new THREE.SpriteMaterial({map: texture}); //these should be rendered by a different scene and overlayed
    } else if(type == 'doublesided') {
        return new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide, transparent: true});
    } else if(type == 'skybox') {
        return new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide});
    } else if(type == 'grid') { /// these are special textures that need highligh and selected materials
        const normal = new THREE.MeshLambertMaterial({ map: texture, side: THREE.SingleSide });
        const highlight = new THREE.MeshLambertMaterial({ map: texture, side: THREE.SingleSide });
        highlight.emissive.setHex(HIGHLIGHT_COLOR);
        const selected = new THREE.MeshLambertMaterial({ map: texture, side: THREE.SingleSide });
        selected.emissive.setHex(SELECTED_COLOR);
        return [ normal, highlight, selected ];
    } else {
        return new THREE.MeshLambertMaterial({map: texture, side: THREE.SingleSide});
    }
}

const resources = require('./loaders/directory_loader!./empty');

export function init_textures() {
    mat_map={};
    console.log("I was called");
    for(let cdir of Object.keys(resources)) {
        for(let cimg of resources[cdir]) {
            let ikey = cimg.substring(0, cimg.length-4); //lop off extension
            let tex = load_texture('resources/'+cdir+'/'+cimg);
            if(cdir == 'grid') { /// special case
                const [ normal, highlight, selected ] = make_material(tex, cdir);
                mat_map[ikey] = normal;
                mat_map[`${ikey}_highlighted`] = highlight;
                mat_map[`${ikey}_selected`] = selected;
            } else {
                mat_map[ikey] = make_material(tex, cdir);
            }
        }
    }
    load_special();
}

function load_special() {
    /*
        This is a special-case catchall where we load textures that need specific metadata.
        The resources/special folder is otherwise ignored, so these *must* be loaded here to
        be referenced in a level.  TODO: These are almost certainly game specific, so move this to game?
    */

    let cube_wall = load_texture('resources/special/cube-wall.png');
    cube_wall.wrapS = THREE.RepeatWrapping;
    cube_wall.wrapT = THREE.RepeatWrapping;
    cube_wall.repeat.set(1,.666);
    mat_map['cube-wall'] = new THREE.MeshLambertMaterial({map: cube_wall, side: THREE.SingleSide});

    let cube_wall_cap = load_texture('resources/special/cube-wall-cap.png');
    cube_wall_cap.wrapS = THREE.RepeatWrapping;
    cube_wall_cap.wrapT = THREE.RepeatWrapping;
    cube_wall_cap.repeat.set(.166,.666);
    mat_map['cube-wall-cap'] = new THREE.MeshLambertMaterial({map: cube_wall_cap, side: THREE.SingleSide});

}

export function init_textures_old() {
    /*
        TODO: make this work on a webpack meta-function that dumps the contents of
        resources/textures and resources/sprites into a dict for further processing
    */
    const texture = load_texture('resources/textures/debug.png');
    const walltex = load_texture('resources/textures/debug-2.png');
    const doortex = load_texture('resources/textures/debug-door.png');
    const itemtex = load_texture('resources/textures/itemsm.png');
    const solidobjtex = load_texture('resources/textures/solidobj.png');
    const treewalltex = load_texture('resources/textures/treewall.png');
    const dogtex = load_texture('resources/textures/dog.png');
    const dudetex = load_texture('resources/textures/dude.png');
    const revolvertex = load_texture('resources/textures/revolver.png');
    const talltex = load_texture('resources/textures/tall.png');
    const bricktex = load_texture('resources/textures/brickwall.png');
    const grasstex = load_texture('resources/textures/grass.png');
    const pavementtex = load_texture('resources/textures/pavement.png');
    const skytex = load_texture('resources/textures/sky.png');
    const sidewalktex = load_texture('resources/textures/sidewalk.png');
    const sidewalktex2 = load_texture('resources/textures/sidewalk-2.png');
    const planttex = load_texture('resources/textures/plant.png');

    mat_map = {
        mat1: new THREE.MeshLambertMaterial({color: 0xffff00, side: THREE.SingleSide }),
        mat2: new THREE.MeshLambertMaterial({color: 0xff00ff, side: THREE.SingleSide }),
        mat3: new THREE.MeshLambertMaterial({color: 0xff0000, side: THREE.SingleSide }),
        floor_mat: new THREE.MeshLambertMaterial({map: texture, side: THREE.SingleSide}),
        wall_mat: new THREE.MeshLambertMaterial({map: walltex, side: THREE.SingleSide}),
        door_mat: new THREE.MeshLambertMaterial({map: doortex, side: THREE.SingleSide}),
        sprite_mat: new THREE.SpriteMaterial({map: itemtex, side: THREE.SingleSide}),
        tree_mat: new THREE.SpriteMaterial({map: solidobjtex, side:THREE.SingleSide}),
        treewall_mat: new THREE.MeshLambertMaterial({map: treewalltex, side: THREE.DoubleSide, transparent: true}),
        dog_mat: new THREE.SpriteMaterial({map: dogtex, side:THREE.SingleSide}),
        dude_mat: new THREE.SpriteMaterial({map: dudetex, side:THREE.SingleSide}),
        revolver: new THREE.SpriteMaterial({map: revolvertex, side:THREE.SingleSide}),
        tall_mat: new THREE.SpriteMaterial({map: talltex, side:THREE.SingleSide}),
        plant_mat: new THREE.SpriteMaterial({map: planttex, side:THREE.SingleSide}),
        brick_mat: new THREE.MeshLambertMaterial({map: bricktex, side: THREE.SingleSide}),
        grass_mat: new THREE.MeshLambertMaterial({map: grasstex, side: THREE.SingleSide}),
        pavement_mat: new THREE.MeshLambertMaterial({map: pavementtex, side: THREE.SingleSide}),
        sky_mat: new THREE.MeshBasicMaterial({map: skytex, side: THREE.BackSide}),
        sidewalk_mat: [
            new THREE.MeshLambertMaterial({map: sidewalktex, side: THREE.SingleSide}),
            new THREE.MeshLambertMaterial({map: sidewalktex2, side: THREE.SingleSide}),
        ]
    };
};

export function get_material(name, pos={x: 0, z: 0}) {
    let m = mat_map[name];
    if(Array.isArray(m)) {
        let i = pos.x + pos.z;
        i = i % m.length;
        m = m[i];
    }
    return m;
};
