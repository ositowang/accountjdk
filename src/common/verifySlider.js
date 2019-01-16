const render = Symbol('render');
const event = Symbol('event');
const style = `<style>
    .vs-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .vs-moved-bg {
        background: green;
        width: 0;
        position: absolute;
        z-index: 999;
        height: 100%;
    }

    .vs-unmoved-bg {
        background: gray;
        width: 100%;
        position:absolute
        z-index: 998;
        height: 100%;
    }

    .vs-text {
        position: absolute;
        width: 100%;
        top: 0;
        z-index: 1000;
        backgound: rgba(0,0,0,0);
        text-align: center;
    }

    .vs-move-btn {
        height: 100%;
        width: 30px;
        background: #333333;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1001;
    }
</style>`;

class Slider {
  constructor(opts) {
    this.opts = opts;
    if (!opts.container) {
      throw 'Please configure the container for this slider';
    } else {
      this[render](opts);
      this[event](opts);
    }
  }

  [render](opts) {
    const unsuccessTip = opts.unsuccessTip || 'Please toggle to the Right';
    const tpl =
      style +
      `
            <div id="vs-wrapper" class="vs-wrapper">
                <div id="vs-moved-bg" class="vs-moved-bg"></div>
                <span id="vs-move-btn" class="vs-move-btn"></span>
                <div id="vs-unmoved-bg" class="vs-unmoved-bg"></div>
                <span id="vs-text" class="vs-text" ondrag="return false;">${unsuccessTip}</span>
            </div>
        `;
    opts.container.innerHTML = tpl;
  }

  [event](opts) {
    const $btn = document.getElementById('vs-move-btn');
    const $moved = document.getElementById('vs-moved-bg');
    const $wrapper = document.getElementById('vs-wrapper');
    const $text = document.getElementById('vs-text');
    const reset = () => {
      this.startX = 0;
      this.start = false;
      this.end = false;
      $btn.style.left = '0px';
      $moved.style.width = '0px';
      this.offsetRecord = [];
      this.startY = 0;
    };

    window.onmousemove = (e) => {
      if (this.start && !this.end) {
        let offsetX = e.pageX - this.startX;
        let offsetY = e.pageY - this.startY;
        this.offsetRecord.push(offsetX + ',' + offsetY);
        $btn.style.left = offsetX + 'px';
        $moved.style.width = offsetX + 'px';
        let movedLength =
          $moved.offsetLeft + parseInt(window.getComputedStyle($moved).width);
        let totalLength =
          parseInt(window.getComputedStyle($wrapper).width) -
          parseInt(window.getComputedStyle($btn).width);
        if (movedLength >= totalLength) {
          this.end = true;
          this.start = false;
          //in case the user move the block out of the scope.
          $btn.style.left = totalLength + 'px';
          $moved.style.width = totalLength + 'px';
          //success callback
          if (opts.success) {
            opts.success($wrapper, $text, this.offsetRecord);
          }
        }
      }
    };

    window.onmouseup = () => {
      if (!this.end) {
        reset();
      }
    };

    // record the initial place when mouse down
    $btn.onmousedown = (e) => {
      this.start = true;
      this.startX = e.pageX;
      this.startY = e.pageY;
      this.offsetRecord = [];
    };
  }

  reset() {
    this[render](this.opts);
    this[event](this.opts);
  }
}

export default Slider;
