import { THREE, geo } from './Three'
import { get_material } from './texture_lookup'

export default class Terrain {
    constructor(mat, scene) {
        this.loc = { x: 0, y: 0, z: 0 };
        this.scene = scene;
        
        this.mesh = new THREE.Sprite(get_material(mat));
        this.scene.add(this.mesh);

        this.solid = true;
    }
}
