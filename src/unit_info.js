class UnitInfo {
    constructor() {
        self.element = document.getElementById('right-sidebar');
        let title = document.createElement('i');
        title.text = 'Unit Details';
        self.info_pane = document.createElement('div');

        self.element.appendChild(title);
        self.element.appendChild(info_pane);
    }

    update(unit) {
        let info = `<b>Name:</b> ${unit.name}`;
        info += '<br/>';
        info += `<b>Move:</b> ${unit.move}`;
        info += '<br/>';
        info += `<b>Attack:</b> ${unit.attack}`;

        info_pane.innerHTML = info;
    }
}

export default UnitInfo;
