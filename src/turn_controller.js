/*
 * Responsible for handling your own turn.  Doesn't receieve input on an opponent's
 * turn.
 */
import { THREE } from './Three'

class TurnController {
    constructor(scene) {
        this.scene = scene;
    }

    click(e) {
        this._do_selection(e);
    }

    _do_selection(e) {
        let selection = this.__unproject(e);

        if(selection) {
            if(selection.selected) {
                this.scene.gamedata.grid.highlight_around(selection.x+5, selection.z+5, 3);
            } else {
                this.scene.gamedata.grid.clear_selection();
                selection.select();
            }
        }
    }

    __unproject(e) {
        let rc = new THREE.Raycaster();
        rc.setFromCamera(this.scene.gamedata.mouse, this.scene.gamedata.cam.camera);
        let intersects = rc.intersectObjects(this.scene.gamedata.grid.grid_group.children);

        if(intersects && intersects[0]) {

            let obj = intersects[0].object;

            return obj.gamedata;
        }

    }
}

export default TurnController;
