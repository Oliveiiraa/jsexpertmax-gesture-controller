export default class Controller {
  #view;
  #camera;
  #worker;
  #blinkCouter = 0;

  constructor({ view, service, worker, camera }) {
    this.#view = view;
    this.#camera = camera;
    this.#worker = this.#configureWorker(worker);

    this.#view.configureOnBtnClick(this.onBtnStart.bind(this));
  }

  static async initialize(deps) {
    const controller = new Controller(deps);
    controller.log("not yet detecting eye blink! click in the button to start");
    return controller.init();
  }

  #configureWorker(worker) {
    let ready = false;

    worker.onmessage = ({ data }) => {
      if ("READY" == data) {
        this.#view.enableButton();
        ready = true;
        return;
      }

      const blinked = data.blinked;
      this.#blinkCouter += blinked;
      this.#view.tooglePlayVideo();
    };

    return {
      send(msg) {
        if (!ready) return;
        worker.postMessage(msg);
      },
    };
  }

  async init() {
    console.log("init");
  }

  loop() {
    const video = this.#camera.video;
    const img = this.#view.getVideoFrame(video);
    this.#worker.send(img);
    this.log(`detecting eye blink...`);

    setTimeout(() => this.loop(), 100);
  }

  log(text) {
    const times = `       - blinked times: ${this.#blinkCouter}`;
    this.#view.log(`logger: ${text}`.concat(this.#blinkCouter ? times : ""));
  }

  onBtnStart() {
    this.log("initializing detection...");
    this.#blinkCouter = 0;
    this.loop();
  }
}
