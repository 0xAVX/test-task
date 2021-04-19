// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class DiffEll extends cc.Component {
  @property(cc.Node)
  pair: cc.Node = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_END, this.showDiff, this);
    this.node.opacity = 0;
  }

  showDiff() {
    const tween = () =>
      cc
        .tween()
        .parallel(
          cc.tween().to(0.2, { opacity: 255 }, { easing: cc.easeBounceInOut }),
          cc
            .tween()
            .repeat(
              3,
              cc.tween().to(0.15, { scale: 1.1 }).to(0.15, { scale: 1 })
            )
        );
    cc.tween(this.pair).then(tween()).start();
    cc.tween(this.node).then(tween()).start();
    cc.systemEvent.emit("DiffClicked", {
      t1: this.node.getWorldMatrix(cc.mat4()),
      t2: this.pair.getWorldMatrix(cc.mat4()),
    });
  }

  // start () {

  // }

  // update (dt) {}
}
