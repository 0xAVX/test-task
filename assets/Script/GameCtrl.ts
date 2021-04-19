// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ScreenCtrl from "./ScreenCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameCtrl extends cc.Component {
  @property(cc.Node)
  diffScreen: cc.Node = null;

  @property(ScreenCtrl)
  screenCtrl: ScreenCtrl = null;

  @property(cc.Node)
  progressNode: cc.Node = null;

  @property(cc.Node)
  finalPopup: cc.Node = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.systemEvent.on("DiffFound", this.closeCurrentScreen, this);
    cc.systemEvent.on("NextScreen", this.switchScreen, this);
    cc.systemEvent.on("Over", this.showFinal, this);
    this.scheduleOnce(() => this.closeCurrentScreen(), 0.2);
    this.scheduleOnce(() => this.switchScreen(), 2.5);
  }

  private showFinal() {
    this.progressNode.active = false;
    this.scheduleOnce(() => (this.finalPopup.active = true), 0.15);
  }

  private closeCurrentScreen() {
    this.hideDiffScreen();
    this.screenCtrl.openDoor();
  }

  private switchScreen() {
    this.showDiffScreen();
    this.screenCtrl.closeDoor();
  }

  private hideDiffScreen() {
    cc.tween(this.diffScreen)
      .to(0.35, { position: cc.v3(this.diffScreen.x, this.diffScreen.y * 4) })
      .start();
  }

  private showDiffScreen() {
    cc.tween(this.diffScreen)
      .to(0.35, { position: cc.v3(this.diffScreen.x, this.diffScreen.y / 4) })
      .start();
  }

  start() {}

  // update (dt) {}
}
