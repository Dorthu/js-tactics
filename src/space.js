import { THREE, geo } from './Three'
import { get_material } from './texture_lookup'

export default class Space {
    constructor(x,z, normal_mat, scene) {
        this.x = x ;
        this.y = -0.5;
        this.z = z ;
        this.scene = scene;

        this.normal_mat = get_material(normal_mat);
        this.highlight_mat = get_material(`${normal_mat}_highlighted`);
        this.selected_mat = get_material(`${normal_mat}_selected`);

        this.mesh = new THREE.Mesh(geo, this.normal_mat);
        this.mesh.position.x = this.x;
        this.mesh.position.y = this.y;
        this.mesh.position.z = this.z;
        this.mesh.rotation.x = -Math.PI / 2;

        this.mesh.gamedata = this;

        this.scene.add(this.mesh);

        this.selected = false;
        this.highlighted = false;

        /// space info
        this.profile = '/resources/textures/grass.png'; /// TODO
        this.name = 'Grass';
        this.movement = 1;
    }

    select() {
        this.mesh.material = this.selected_mat;
        this.selected = true;
    }

    deselect() {
        this.mesh.material = this.normal_mat;
        this.selected = false;
        this.highlighted = false;
    }

    highlight() {
        this.highlighted = true;
        this.mesh.material = this.highlight_mat;
    }

    blocked() {
        return false;
    }
}
