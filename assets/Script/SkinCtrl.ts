// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Skin extends cc.Component {
  @property(cc.Node)
  top: cc.Node = null;

  @property(cc.Node)
  bottom: cc.Node = null;

  @property(cc.ParticleSystem)
  fade: cc.ParticleSystem = null;

  private counSwitch: number = 0;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.systemEvent.on("DiffFound", this.switchSkin, this);
    this.counSwitch = this.top.children.length - 1;
  }

  switchSkin() {
    this.top.children[this.counSwitch].active = false;
    this.bottom.children[this.counSwitch].active = false;

    this.counSwitch -= 1;

    if (this.counSwitch < 0) return;
    this.scheduleOnce(() => cc.systemEvent.emit("NextScreen"), 2.5);

    this.top.children[this.counSwitch].active = true;
    this.bottom.children[this.counSwitch].active = true;

    this.fade.resetSystem();
  }

  start() {}

  // update (dt) {}
}
