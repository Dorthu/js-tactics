/*
 * Responsible for loading and managing the grid of spaces.
 */
import { THREE } from './Three'
import Space from './space'

class Grid {
    constructor(scene) {
        this.scene = scene;
        this.grid_group = new THREE.Object3D();
        this.scene.add(this.grid_group);

        this.create_test_grid(); /// TODO 
    }

    /*
     * Makes a simple grid of grass terrain spaces for testing.
     */
    create_test_grid() {
        this.spaces = [];

        for(let x=-5; x<6; x++) {
            let row = [];
            for(let z=-5; z<6; z++) {
                row.push(new Space(x,z, 'grass', 'brick', 'woodfloor', this.grid_group));
            }
            this.spaces.push(row);
        }
    }

    clear_selection() {
        for(let sp of this.grid_group.children) {
            sp.gamedata.deselect();
        }
    }

    highlight_around(x, y, radius) {
        console.log(`highliginting around ${x}, ${y}`);
        for(let cx=0; cx < this.spaces.length; cx++) {
            for(let cy=0; cy < this.spaces[cx].length; cy++) {
                /// check if the point is within a circle of the given radius
                /// actaully a bit smaller than the given radius for corners
                if( Math.sqrt( Math.pow(cx - x, 2) + Math.pow(cy - y, 2)) < radius - .9 ) {
                    this.spaces[cx][cy].highlight();
                }
            }
        }
    }

}

export default Grid;