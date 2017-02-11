import { THREE, geo } from './Three'
import { get_material } from './texture_lookup'

export default class Space {
    constructor(x,z, mat, scene) {
        this.x = x;
        this.y = -0.5;
        this.z = z;
        this.scene = scene;

        this.mesh = new THREE.Mesh(geo, get_material(mat));
        this.mesh.position.x = this.x;
        this.mesh.position.y = this.y;
        this.mesh.position.z = this.z;
        this.mesh.rotation.x = -Math.PI / 2;

        console.log(this.scene);
        this.scene.add(this.mesh);
    }
}
