import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogState from './Context/BlogState';
import Compose from './components/Compose';
import MyBlogs from './components/MyBlogs';
import Register from './components/Register';
import Login from './components/Login';
import Error from './components/Error';
import Alert from './components/Alert';
import ViewBlog from './components/ViewBlog';
import ThemeState from './Context/ThemeState';

const App = () => {
  return (
    <Router>
      <ThemeState>
        <BlogState>
          <Navbar />
          <Alert />
          <div className="container main">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/my-blogs" element={<MyBlogs />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/edit-blog" element={<Compose />} />
              <Route exact path="/compose" element={<Compose />} />
              <Route exact path="/posts/:param" element={<ViewBlog />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
          <Footer />
        </BlogState>
      </ThemeState>
    </Router>
  );
}

export default App;
