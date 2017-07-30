class UnitInfo {
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
        console.log(`Updating with ${unit}`);
        if(!unit) { unit = this.scene.gamedata.grid.get_selected_unit(); }
        console.log(`Now its ${unit}`);
        if(!unit) { return; } /// TODO

        let info = `<b>Name:</b> ${unit.name}`;
        info += '<br/>';
        info += `<b>Move:</b> ${unit.move}`;
        info += '<br/>';
        info += `<b>Attack:</b> ${unit.attack}`;

        this.info_pane.innerHTML = info;
    }
}

export default UnitInfo;
