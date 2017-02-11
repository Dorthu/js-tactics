import { THREE, geo } from './Three'
import { get_material } from './texture_lookup'

export default class Highlight {
    constructor(x,z, scene) {
        this.x = x;
        this.y = -0.45;
        this.z = z;
        this.scene = scene;

        this.mesh = new THREE.Mesh(geo, get_material('highlight'));
        this.mesh.position.set( this.x, this.y, this.z );
        this.mesh.rotation.x = - Math.PI / 2;
        this.scene.add(this.mesh);
    }
}
