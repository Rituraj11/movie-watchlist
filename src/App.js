import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "./layout/Layout";
import store from './redux/store';

import FrontRoutes from "./routes";
import './assets/style.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
            <FrontRoutes />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
