// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

interface data {
    t1: cc.Mat4,
    t2: cc.Mat4
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class ParticleCtrl extends cc.Component {
  @property(cc.Vec3)
  target: cc.Vec3 = cc.v3();

  public fromDiffOne: cc.Vec3 = cc.v3();
  public fromDiffTwo: cc.Vec3 = cc.v3();

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.systemEvent.on("DiffClicked", this.emitFrom, this);
  }

  public emitFrom(data: data) {
    const [partOne, partTwo] = this.node.children;
    const partOnePos = this.node.convertToNodeSpaceAR(data.t1.getTranslation(cc.v3()));
    const partTwoPos = this.node.convertToNodeSpaceAR(data.t2.getTranslation(cc.v3()));
    partOne.position = partOnePos;
    partTwo.position = partTwoPos;
    partOne.active = partTwo.active = true;

    cc.tween(partOne)
      .bezierTo(
        1,
        partOnePos.multiplyScalar(-1.2),
        partOnePos.multiplyScalar(1.2),
        this.target
      )
      .start();
    cc.tween(partTwo)
      .bezierTo(
        1,
        partTwoPos.multiplyScalar(1.2),
        partTwoPos.multiplyScalar(-1.2),
        this.target
      ).call(() => {
        this.scheduleOnce(() => {
            partOne.active = partTwo.active = false;
        }, 0.4);
        cc.systemEvent.emit("AddProgress");
    })
    .start();
    
  }

  start() {}

  // update (dt) {}
}
