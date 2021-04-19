// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Final extends cc.Component {
  @property(cc.Node)
  back: cc.Node = null;

  @property(cc.Node)
  logo: cc.Node = null;

  @property(cc.Node)
  button: cc.Node = null;

  @property(cc.Vec3)
  logoPos: cc.Vec3 = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.tween(this.back)
      .to(0.25, { opacity: 255 }, { easing: cc.easeQuadraticActionIn })
      .start();
    cc.tween(this.logo)
      .to(0.85, { position: this.logoPos }, { easing: "elasticInOut" })
      .start();
    cc.tween(this.button)
      .to(0.55, { scale: 1 }, { easing: "quadIn" })
      .call(() => {
        cc.tween(this.button)
          .repeatForever(
            cc
              .tween()
              .to(1, { scale: { value: 1.05, easing: "quadIn" } })
              .to(1, { scale: { value: 1, easing: "quadOut" } })
          )
          .start();
      })
      .start();
  }

  start() {}

  // update (dt) {}
}
