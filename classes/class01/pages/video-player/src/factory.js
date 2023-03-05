import Camera from "../../../lib/shared/camera.js";
import { supportsWorkerType } from "../../../lib/shared/util.js";
import Controller from "./controller.js";
import Service from "./service.js";
import View from "./view.js";

async function getWorker() {
  if (supportsWorkerType()) {
    console.log("initializing esm workers");
    const worker = new Worker("./src/worker.js", { type: "module" });
    return worker;
  }
  console.warn(`Your browser doesn't support esm modules on webworkers!`);

  const workerMock = {
    async postMessage() {},
    onmessage(msg) {},
  };

  console.log("não suporta");
  return workerMock;
}

const worker = await getWorker();

const [rootPath] = window.location.href.split("/pages/");
const camera = await Camera.init();

const factory = {
  async initialize() {
    return Controller.initialize({
      view: new View({}),
      worker,
      camera,
    });
  },
};

export default factory;
