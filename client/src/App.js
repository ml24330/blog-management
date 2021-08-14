import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PostsPage from './pages/PostsPage'
import AddAuthorPage from './pages/AddAuthorPage'
import AuthorsPage from './pages/AuthorsPage'
import AddPostPage from './pages/AddPostPage'
import PostPage from './pages/PostPage'
import AuthorPage from './pages/AuthorPage'
import NotFoundPage from './pages/NotFoundPage'
import ScrollToTop from './ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/posts/add" exact component={AddPostPage} />
          <Route path="/posts" exact component={PostsPage} />
          <Route path="/authors/add" exact component={AddAuthorPage} />
          <Route path="/authors" exact component={AuthorsPage} />
          <Route path="/post/:id" exact component={PostPage} />
          <Route path="/author/:id" exact component={AuthorPage} />
          <Route path="/" component={NotFoundPage} />
        </Switch> 
    </Router>
  );
}

export default App;
