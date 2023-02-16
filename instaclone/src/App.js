import LandingPage from './LandingPage/landing_page';
import PostView from "./PostView/postview";
import PostForm from './PostForm/postform';

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="postview" element={<PostView />} />
        <Route path="postform" element={<PostForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
