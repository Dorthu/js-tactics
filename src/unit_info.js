export default class UnitInfo {
    constructor(scene) {
        this.scene = scene;

        this.element = document.getElementById('right-sidebar');
        let title = document.createElement('i');
        title.text = 'Unit Details';
        this.info_pane = document.createElement('div');

        this.element.appendChild(title);
        this.element.appendChild(this.info_pane);
    }

    update(unit=null) {
        if(!unit) { unit = this.scene.gamedata.grid.get_selected_unit(); }
        if(!unit) { this.info_pane.innerHTML = ''; return; } /// TODO - better empty profile?

        let info = `<img src="${unit.profile}"/><br/>`;
        info += `<b>Name:</b> ${unit.name}`;
        info += '<br/>';
        info += `<b>Move:</b> ${unit.move}`;
        info += '<br/>';
        info += `<b>Attack:</b> ${unit.attack}`;

        this.info_pane.innerHTML = info;
    }
}
