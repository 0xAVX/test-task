// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScreenCtrl extends cc.Component {
  leftDoor: cc.Node = null;
  rightDoor: cc.Node = null;

  closePosition: cc.Vec3 = null;
  openPosition: cc.Vec3 = null;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.leftDoor = this.node.children[0];
    this.rightDoor = this.node.children[1];
    this.closePosition = this.rightDoor.position;
    this.openPosition = cc.v3(this.closePosition.x * 4, this.closePosition.y);
  }

//   start() {}

  public openDoor() {
    const tweens = this.createTweens(
      this.openPosition,
      cc.easing.smooth.name,
      0.25
    );
    tweens.forEach((tween: cc.Tween) => tween.start());
  }

  public closeDoor() {
    const tweens = this.createTweens(
      this.closePosition,
      cc.easing.backInOut.name,
      0.5
    );
    tweens.forEach((tween: cc.Tween) => tween.start());
  }

  private createTweens(pos: cc.Vec3, easing: string, time: number) {
    const getTween = (pos: cc.Vec3, easing: string, time: number) =>
      cc.tween().to(time, { position: { value: pos, easing } });

    const left = cc
      .tween(this.leftDoor)
      .then(getTween(cc.v3(-pos.x, pos.y), easing, time));
    const right = cc.tween(this.rightDoor).then(getTween(pos, easing, time));
    return [left, right];
  }

  // update (dt) {}
}
