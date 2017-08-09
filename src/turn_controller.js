/*
 * Responsible for handling your own turn.  Doesn't receieve input on an opponent's
 * turn.
 */
import { THREE } from './Three'

export default class TurnController {
    constructor(scene) {
        this.scene = scene;
        this.selection_mode = true;
    }

    tick() {
        this._do_tracking();
    }

    click(e) {
        this._do_selection(e);
    }

    _do_tracking() {
        if(!this.selection_mode) return;

        let selection = this.__unproject();

        if(selection && !selection.selected) {
            this.scene.gamedata.grid.clear_selection();
            this.scene.gamedata.grid.select(
                    ...this.scene.gamedata.grid.untranslate(selection.x, selection.z),
                    true);
        }
    }

    _do_selection(e) {
        let selection = this.__unproject();

        if(selection) {
            const unit = this.scene.gamedata.grid.get_selected_unit();
            if(selection.highlighted) {
                if(unit) {
                    this.scene.gamedata.grid.move_unit(unit,
                            ...this.scene.gamedata.grid.untranslate(selection.x, selection.z));
                    this.scene.gamedata.grid.clear_selection();
                    this.selection_mode=true;
                }
            } else if(selection.selected) {
                if(unit) {
                    this.scene.gamedata.grid.highlight_around(
                            ...this.scene.gamedata.grid.untranslate(selection.x, selection.z), unit.move);
                    this.selection_mode = false;
                }
            } else {
                this.scene.gamedata.grid.select(
                        ...this.scene.gamedata.grid.untranslate(selection.x, selection.z),
                        true);
                this.scene.gamedata.unit_info.update();
            }
        }
    }

    __unproject() {
        let rc = new THREE.Raycaster();
        rc.setFromCamera(this.scene.gamedata.mouse, this.scene.gamedata.cam.camera);
        let intersects = rc.intersectObjects(this.scene.gamedata.grid.grid_group.children);

        if(intersects && intersects[0]) {

            let obj = intersects[0].object;

            return obj.gamedata;
        }

    }
}
