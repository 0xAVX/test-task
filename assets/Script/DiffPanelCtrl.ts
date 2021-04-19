// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class DiffPanelCtrl extends cc.Component {

    private diffScreens: Array<cc.Node> = [];
    private nextChild: number = 0;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.diffScreens = this.node.children;
        cc.systemEvent.on('DiffFound', this.showNextDiffScreen, this);
        console.log(this.diffScreens);
    }

    showNextDiffScreen() {
        this.diffScreens[this.nextChild].active = false;
        this.nextChild += 1;
        if(this.nextChild === this.diffScreens.length) return;
        this.diffScreens[this.nextChild].active = true;
    }

    start () {

    }

    // update (dt) {}
}
