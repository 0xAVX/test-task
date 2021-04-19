// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import prng from "./utils/prng";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DiffCtrl extends cc.Component {
  @property
  diffCount: number = 2;

  @property(cc.Node)
  hand: cc.Node = null;

  private clickedDiffs: number = 0;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.systemEvent.on("DiffClicked", this.checkClickedDiffs, this);
    this.showHand();
  }

  private checkClickedDiffs() {
    this.hand.active && (this.hand.active = false);
    this.clickedDiffs += 1;
    if (this.clickedDiffs === this.diffCount) {
      this.scheduleOnce(() => cc.systemEvent.emit("DiffFound"), 1.5);
    }
  }

  showHand() {
    const randomDiff = prng(0, 3);
    const diff: cc.Node = this.node.children[randomDiff];
    this.hand.position = cc.v3(
      diff.position.x + diff.width / 2 - Math.PI * 2,
      diff.position.y - diff.height / 2 - Math.PI * 2
    );
    this.hand.active = true;
    cc.tween(this.hand)
      .repeatForever(
        cc
          .tween()
          .to(0.65, {
            position: cc.v3(this.hand.position.x, this.hand.position.y - 5),
            scaleY: this.hand.scaleY - 0.01,
          })
          .to(0.65, {
            position: cc.v3(this.hand.position.x, this.hand.position.y),
            scaleY: this.hand.scaleY,
          })
      )
      .start();
  }

  //   start() {}

  // update (dt) {}
}
