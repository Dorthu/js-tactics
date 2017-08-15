/*
 * Responsible for loading and managing the grid of spaces.
 */
import { THREE } from './Three'
import Unit from './unit'
import Space from './space'
import Terrain from './terrain'

export default class Grid {
    constructor(scene) {
        this.scene = scene;
        this.grid_group = new THREE.Object3D();
        this.scene.add(this.grid_group);
        this.selection = [ null, null ];

        this.spaces = [];
        this.objects = [];
        this.create_test_grid(); /// TODO
    }

    /*
     * Makes a simple grid of grass terrain spaces for testing.
     */
    create_test_grid() {
        for(let x=-5; x<6; x++) {
            let row = [];
            for(let z=-5; z<6; z++) {
                row.push(new Space(x,z, (z % 3) ? 'grass' : 'sidewalk', this.grid_group));
            }
            this.spaces.push(row);
            this.objects.push([ ,,,,,,,,,, ]);
        }

    }

    move_unit(unit, to_x, to_y) {
        /// Just remove then add for "move"
        this.remove_unit(unit);
        this.add_unit(unit, to_x, to_y);
    }

    add_unit(unit, x, y) {
        this.objects[x][y] = unit;
        const [ tx, tz ] = this.translate(x, y);

        console.log(`setting unit position to ${tx}, ${tz}`);

        unit.mesh.position.x = tx;
        unit.mesh.position.z = tz;
    }

    remove_unit(unit) {
        const [ x, y ] = this.untranslate(unit.mesh.position.x, unit.mesh.position.z);
        console.log(`Removing unit from ${x}, ${y}`);

        this.objects[x][y] = null;
    }

    get_selected_unit() {
        const [ x, y ] = this.selection;
        if(x == null) { console.log('x was null'); return null; }
        const ret = this.objects[x][y];

        if(ret instanceof Unit) {
            return ret;
        }
        return null;
    }

    /*
     * Returns the selected terrain if any is present, or the selected space if it isn't
     */
    get_selected_terrain() {
        const [ x, y ] = this.selection;
        if(x == null) { return null; }
        const ret = this.objects[x][y];

        if(ret instanceof Terrain) return ret;
        return this.spaces[x][y];
    }

    translate(x, y) {
        return [x-5, y-5];
    }

    untranslate(x, y) {
        return [x+5, y+5];
    }

    select(x, y, clear=false) {
        console.log(`selecting ${x}, ${y}`);
        if(clear) { this.clear_selection(); }

        this.selection = [x, y];
        this.spaces[x][y].select();
    }

    clear_selection() {
        this.selection = [ null, null ];

        for(let sp of this.grid_group.children) {
            sp.gamedata.deselect();
        }
    }

    blocked(x, y, for_unit=null) {
        if(x < 0 || x >= this.objects.length ||
                y < 0 || y >= this.objects[x].lenght) {
            return true; //if this isn't in the grid, it's blocked
        }

        /// if there's nothing there, we're open
        if(!this.objects[x][y]) return false;

        return this.objects[x][y].blocks(for_unit);
    }

    /*
     * Highlights an area around x, y that can be moved to in range space.
     * Expects x and y to have been untranslated already.
     * If unit is given, only shows spaces as blocked if they are blocked for
     * that unit (usually based on team).
     */
    highlight_range_from(x, y, range, unit=null) {
        ///TODO - error if x,y isn't on grid
        const allowed_spaces = new Set();
        let frontier = [];
        frontier.push({ val: this.spaces[x][y], priority: 1 });
        let cost_so_far = {};

        cost_so_far[`${x}:${y}`] = 0;

        const dirs = [ { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0 , y: 1 } ];
        const _get_neighbors = (x, y) => {
            const ret = [];
            for(const { x :dx, y :dy } of dirs) {
                if(x+dx >= 0 && x+dx < this.spaces.length &&
                        y+dy >= 0 && y+dy < this.spaces[x+dx].length) {
                    if(!this.blocked(x+dx, y+dy, unit)) {
                        ret.push(this.spaces[x+dx][y+dy]);
                    }
                }
            }
            return ret;
        };

        while(frontier.length) {
            let { val :cur } = frontier.shift();
            let [ cx, cy ] = this.untranslate(cur.x, cur.z);

            for(let next of _get_neighbors(cx, cy)) {
                let new_cost = cost_so_far[`${cx}:${cy}`] ? cost_so_far[`${cx}:${cy}`] + 1 : 1;
                if(new_cost > range) { continue; }
                allowed_spaces.add(next);
                const [ next_x, next_y ] = this.untranslate(next.x, next.z);
                if(!cost_so_far[`${next_x}:${next_y}`] || new_cost < cost_so_far[`${next_x}:${next_y}`]) {
                    cost_so_far[`${next_x}:${next_y}`] = new_cost;
                    frontier.push({ val: next, priority: new_cost });
                }
            }
        }

        for(let c of allowed_spaces) {
            c.highlight();
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
