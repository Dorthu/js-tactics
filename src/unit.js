import { THREE, geo } from './Three'
import { get_material } from './texture_lookup'
import GridObject from './grid_object'

export default class Unit extends GridObject {
    constructor(mat, scene) {
        super();
        this.loc = { x: 0, y: 0, z: 0 };
        this.scene = scene;

        this.mesh = new THREE.Sprite(get_material(mat));
        //this.mesh.set_scale(1,1,1); /// redundant?

        this.scene.add(this.mesh);

        this.name = 'test';
        this.move = 3;
        this.attack = 1;
        this.profile = '';

        this.team = 0;
    }

    blocks(unit=null) {
        if(unit) {
            return unit.team != this.team;
        }
        return true;
    }
}
