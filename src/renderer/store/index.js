import { configureStore as DevConfigureStore } from 'renderer/store/Store.dev';
import { configureStore as ProdConfigureStore } from 'renderer/store/Store.prod';

let configureStore = ProdConfigureStore;
if (process.env.NODE_ENV === 'development') {
  configureStore = DevConfigureStore;
}

export { configureStore };
