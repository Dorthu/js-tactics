import { THREE } from './Three'

export default class Camera {
    constructor(camera_type=0) {
        this.position(camera_type);
    }

    position(camera_type=0) {
        //if ( camera_type == 0 )
        //    this.loc = { x: 0, y: 5, z: 0};
        //else if (camera_type == 1 )
        //    this.loc = { x: 0, y: 3, z: 5 };
        //else
        //    this.loc = { x: 5, y: 1, z: 5 };

        if ( camera_type == 0 )
            this.loc = { x: 0, y: 5, z: 0};
        else if (camera_type == 1 )
            this.loc = { x: 0, y: 3, z: 5 };
        else
            this.loc = { x: 5, y: 1, z: 5 };

//        this.camera = new THREE.PerspectiveCamera( 70, 750/500, 1, 1000);
        this.camera = new THREE.OrthographicCamera(750 / - 2, 750 / 2, 500 / 2, 500 / - 2, 1, 1000 );
        this.camera.zoom = 80;
        this.camera.updateProjectionMatrix();

        this.camera.position.x = this.loc.x;
        this.camera.position.y = this.loc.y;
        this.camera.position.z = this.loc.z;
        if ( camera_type == 0 )
            this.camera.rotation.x = - Math.PI / 2;
        else if ( camera_type == 1)
            this.camera.rotation.x = - Math.PI / 2 / 4;
        else {
            this.camera.eulerOrder='ZYX';
            this.camera.rotation.y = 45 * (Math.PI / 180) ;
            this.camera.rotation.x = -13 * (Math.PI / 180);
        }
    }
}
