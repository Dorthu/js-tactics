import { THREE, geo } from './Three'
import { get_material } from './texture_lookup'

export default class Space {
    constructor(x,z, normal_mat, selected_mat, highlight_mat, scene) {
        this.x = x ;
        this.y = -0.5;
        this.z = z ;
        this.scene = scene;

        this.normal_mat = get_material(normal_mat);
        this.highlight_mat = get_material(highlight_mat);
        this.selected_mat = get_material(selected_mat);

        this.mesh = new THREE.Mesh(geo, this.normal_mat);
        this.mesh.position.x = this.x;
        this.mesh.position.y = this.y;
        this.mesh.position.z = this.z;
        this.mesh.rotation.x = -Math.PI / 2;

        this.mesh.gamedata = this;

        this.scene.add(this.mesh);

        this.selected = false;
    }

    select() {
        this.mesh.material = this.selected_mat;
        this.selected = true;
    }

    deselect() {
        this.mesh.material = this.normal_mat;
        this.selected = false;
    }

    highlight() {
        this.mesh.material = this.highlight_mat;
    }
}
