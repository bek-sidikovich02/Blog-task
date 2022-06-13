import React, { useEffect, useState } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  TextareaAutosize,
  createTheme,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { addPost, deletePost } from '../../redux/modules/posts/actions';
import { ToastContainer, toast } from 'react-toastify';

const theme = createTheme;
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UpdatePost() {
  const posts = useSelector((state) => state.postsReducer.data);
  const activeID = useSelector((state) => state.postsReducer.activeID);
  const dispatch = useDispatch();
  let history = useHistory();
  const [card, setCard] = useState({});
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const newData = posts.find((c) => c.id === Number(activeID));
    setCard(newData);
    setTitle(newData.title);

    setText(newData.body);
  }, [activeID, posts]);

  const classes = useStyles();

  const handleSubmit = (e) => {
    const data = {
      id: card.id,
      body: text,
      title: title,
    };
    e.preventDefault();
    if (!title || !text) {
      toast.error('pleace fill inputs');
    } else {
      axios
        .put(`https://bloggy-api.herokuapp.com/posts/${card.id}`, data)
        .then(({ data }) => {
          console.log(data);
          dispatch(deletePost(card.id));
          dispatch(addPost(data));
        })
        .catch((err) => {
          console.log(err);
        });
      history.push('/');
      toast.success('Post updated successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Update Post
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='title'
            label='Title'
            name='title'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextareaAutosize
            variant='outlined'
            className={classes.form}
            label='your text'
            aria-label='minimum height'
            rowsMin={8}
            placeholder='Pleace write your message here'
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            margin='normal'
            required
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </div>
      <ToastContainer />
    </Container>
  );
}
