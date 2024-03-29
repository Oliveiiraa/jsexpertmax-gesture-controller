export default class HandGestureController {
  #view;
  #service;
  constructor({ view, service }) {
    this.#view = view;
    this.#service = service;
  }

  async init() {}

  static async initialize(deps) {
    const controller = new HandGestureController(deps);
    return controller.init();
  }
}
