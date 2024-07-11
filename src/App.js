import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";

import FrontRoutes from "./routes";
import './assets/style.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
          <FrontRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
