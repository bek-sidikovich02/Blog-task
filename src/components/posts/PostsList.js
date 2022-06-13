import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostsCard from './PostsCard';
import axios from 'axios';
import { setPostData, deletePost } from '../../redux/modules/posts/actions';
import { Button, Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import PostAddIcon from '@material-ui/icons/PostAdd';

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  home: {
    marginTop: 5,
  },
  cards: {
    marginTop: 10,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const PostsList = () => {
  const posts = useSelector((state) => state.postsReducer.data);
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    if (posts.length === 0) {
      axios
        .get('https://bloggy-api.herokuapp.com/posts')
        .then(({ data }) => {
          console.log(data);
          dispatch(setPostData(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // return () => dispatch(clearState());
  }, [dispatch, posts.length]);
  const handleDelete = (id) => {
    axios
      .delete(`https://bloggy-api.herokuapp.com/posts/${id}`)
      .then((resp) => dispatch(deletePost(id)))
      .catch((err) => console.log(err));
  };
  const classes = useStyles();

  const handleClick = (id) => {
    history.push(`/posts/${id}`);
  };
  return (
    <>
      <Container maxWidth='md' className={classes.home}>
        <div className={classes.root}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            className={classes.button}
            startIcon={<PostAddIcon />}
            onClick={() => {
              history.push('/add-post');
            }}
          >
            Add new post
          </Button>
          <Grid container spacing={7} margin='5' className={classes.cards}>
            {posts.map((card, index) => (
              <PostsCard
                key={`${index + 1}`}
                title={card.title}
                text={card.message}
                handleClick={handleClick}
                handleDelete={handleDelete}
                id={card.id}
              />
            ))}
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default PostsList;
