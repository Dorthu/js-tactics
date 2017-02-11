import { THREE, geo } from './Three'
import { get_material } from './texture_lookup'

export default class Unit {
    constructor(x,z, mat, scene) {
        this.loc = { x: x, y: 0, z: z };
        this.scene = scene;
        
        this.mesh = new THREE.Sprite(get_material(mat));
        //this.mesh.set_scale(1,1,1); /// redundant?

        this.scene.add(this.mesh)
        
    }
}
