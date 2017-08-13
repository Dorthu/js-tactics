import { THREE, geo } from './Three'
import { get_material } from './texture_lookup'
import GridObject from './grid_object'

export default class Terrain extends GridObject{
    constructor(mat, scene) {
        super();
        this.loc = { x: 0, y: 0, z: 0 };
        this.scene = scene;
        
        this.mesh = new THREE.Sprite(get_material(mat));
        this.scene.add(this.mesh);

        this.solid = true;
    }
}
