export class AutoResizer {

  constructor(sdk) {
    this.sdk = sdk;
    this.animFrameBound = this.animFrame.bind(this);

    requestAnimationFrame(this.animFrameBound);
  }

  animFrame() {
    const height = this.sdk.frame.getHeight();

    if (height && height !== this.lastSize) {
      this.lastSize = height;
      this.sdk.frame.setHeight(height);
    }

    if (this.active) {
      requestAnimationFrame(this.animFrameBound);
    }
  }

  dispose() {
    this.active = false;
  }
}