import { THREE } from './Three'

export default class Camera {
    constructor() {
        //this.loc = { x: 0, y: 5, z: 0}
        this.loc = { x: 0, y: 3, z: 5 }

        this.camera = new THREE.PerspectiveCamera( 70, 750/500, 1, 1000);
        this.camera.position.x = this.loc.x;
        this.camera.position.y = this.loc.y;
        this.camera.position.z = this.loc.z;
        //this.camera.rotation.x = - Math.PI / 2;
        this.camera.rotation.x = - Math.PI / 2 / 4;
    }
}
