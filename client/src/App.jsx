import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditNote from "./components/EditNote";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Note from "./components/Note";
import Notes from "./components/Notes";
import RGD from "./components/RGD";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route>
          <Route path="/" element={<Notes />} />
          <Route path="/rgd" element={<RGD />} />
          <Route path="/note/:_id" element={<Note />} />
          <Route path="/edit/:_id" element={<EditNote />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
