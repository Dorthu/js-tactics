export default class TerrainInfo {
    constructor(scene) {
        this.scene = scene;

        this.element = document.getElementById('left-sidebar');
        let title = document.createElement('i');
        title.text = 'Unit Details';
        this.info_pane = document.createElement('div');

        this.element.appendChild(title);
        this.element.appendChild(this.info_pane);
    }

    update(space=null) {
        console.log(`Updating with ${space}`);
        if(!space) { space = this.scene.gamedata.grid.get_selected_terrain(); }
        console.log(`Now its ${space}`);
        if(!space) { return; } /// TODO

        let info = '';
        info += `<img src="${space.profile}"/><br/>`;
        info += `<b>Name:</b> ${space.name}`;
        info += '<br/>';
        info += `<b>Movement Speed:</b> ${space.movement ? space.movement : 'impassiable'}`;

        this.info_pane.innerHTML = info;
    }
}
