import React from 'react';
// import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostsList from './components/posts/PostsList';
import PostDetail from './components/posts/PostDetail';
import AddPost from './components/posts/AddPost';
import CommentsComponent from './components/comments/CommentsComponent';
import AddComments from './components/comments/AddComments';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import Typography from '@mui/material/Typography';
import UpdatePost from './components/posts/UpdatePost';
import { ToastContainer } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'white',
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <>
      <Router>
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <Link to='/' underline='none' style={{ textDecoration: 'none' }}>
              <Typography variant='h6' className={classes.title}>
                Posts
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Toolbar id='back-to-top-anchor' />
        <Container>
          <Routes>
            <Route exact path='/' element={<PostsList />} />
            <Route path='/post/:id' element={<PostDetail />} />
            <Route path='/add-post' element={<AddPost />} />
            <Route path='/update-post' element={<UpdatePost />} />
            <Route path='/comments' element={<CommentsComponent />} />
            <Route path='/add-comments' elelemt={<AddComments />} />
          </Routes>
        </Container>
        <ScrollTop>
          <Fab color='secondary' size='small' aria-label='scroll back to top'>
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>{' '}
      </Router>
      <ToastContainer />
    </>
  );
};
export default App;

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
