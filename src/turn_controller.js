/*
 * Responsible for handling your own turn.  Doesn't receieve input on an opponent's
 * turn.
 */
import { THREE } from './Three'

export default class TurnController {
    constructor(scene) {
        this.scene = scene;
    }

    click(e) {
        this._do_selection(e);
    }

    _do_selection(e) {
        let selection = this.__unproject(e);

        if(selection) {
            const unit = this.scene.gamedata.grid.get_selected_unit();
            if(selection.highlighted) {
                if(unit) {
                    this.scene.gamedata.grid.move_unit(unit,
                            ...this.scene.gamedata.grid.untranslate(selection.x, selection.z));
                    this.scene.gamedata.grid.clear_selection();
                }
            } else if(selection.selected) {
                if(unit) {
                    this.scene.gamedata.grid.highlight_around(
                            ...this.scene.gamedata.grid.untranslate(selection.x, selection.z), unit.move);
                }
            } else {
                this.scene.gamedata.grid.select(
                        ...this.scene.gamedata.grid.untranslate(selection.x, selection.z),
                        true);
                this.scene.gamedata.unit_info.update();
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
