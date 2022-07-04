import { PostForm, HomePage, NotFoundPage } from "./pages";
import { Routes, Route } from 'react-router-dom'
import { PostProvider } from "./context/postContext";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <div className="flex items-center bg-neutral-800 min-h-screen">
      <div className="px-10 m-auto">
        <PostProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<PostForm />} />
          <Route path="/posts/:id" element={<PostForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster/>
        </PostProvider>
      </div>
    </div>
  );
}

export default App;
