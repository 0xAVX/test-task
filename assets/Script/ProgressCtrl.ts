// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class ProgressCtrl extends cc.Component {
  @property(cc.Node)
  progressBar: cc.Node = null;

  @property(cc.Node)
  goals: cc.Node = null;

  @property(cc.Node)
  maxScore: cc.Node = null;

  @property
  maxHeight: number = 550;

  private count: number = 0;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.systemEvent.on("AddProgress", this.increaseRatio, this);
  }

  increaseRatio() {
    this.count += 0.18;
    if (this.count > 1) {
      this.count = 1;
    }
    this.setProgress(this.count);
  }

  setProgress(ratio: number) {
    cc.tween(this.progressBar)
      .to(0.2, {
        position: cc.v3(this.progressBar.x, this.maxHeight * ratio),
      })
      .start();
    cc.tween(this.node)
      .to(0.2, { angle: 5 }, { easing: "sineIn" })
      .to(0.2, { angle: -5 }, { easing: "sineIn" })
      .to(0.2, { angle: 0 })
      .start();
    this.setGoal(ratio);
  }

  setGoal(ratio: number) {
    const goalsLights = this.goals.children.map(
      (child: cc.Node) => child.children[0]
    );
    goalsLights.forEach((goal) => (goal.opacity = 0));
    if (ratio < 0.3) {
      cc.tween(goalsLights[0])
        .repeat(3, cc.tween().to(0.1, { opacity: 120 }).to(0.1, { opacity: 0 }))
        .start();
      goalsLights[0].opacity = 120;
    } else if (ratio >= 0.3 && ratio < 0.6) {
      cc.tween(goalsLights[1])
        .repeat(3, cc.tween().to(0.1, { opacity: 120 }).to(0.1, { opacity: 0 }))
        .start();
      goalsLights[1].opacity = 120;
    } else if (ratio >= 0.6 && ratio <= 0.9) {
      cc.tween(goalsLights[2])
        .repeat(3, cc.tween().to(0.1, { opacity: 120 }).to(0.1, { opacity: 0 }))
        .start();
      goalsLights[2].opacity = 120;
    } else {
      cc.tween(this.maxScore)
        .repeat(3, cc.tween().to(0.1, { opacity: 120 }).to(0.1, { opacity: 0 }))
        .start();
      cc.systemEvent.emit("Over");
    }
  }

  start() {}

  // update (dt) {}
}
