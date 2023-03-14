import HandGestureController from "../controllers/handGestureController";
import HandGestureService from "../services/handGestureService";
import HandGestureView from "../views/handGestureView";

const [rootPath] = window.location.href.split("/pages/");

const factory = {
  async initialize() {
    return HandGestureController.initialize({
      view: new HandGestureView(),
      service: new HandGestureService(),
    });
  },
};

export default factory;
