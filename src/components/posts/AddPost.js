import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { addPost } from '../../redux/modules/posts/actions';
import { ToastContainer, toast } from 'react-toastify';

const theme = createTheme();
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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddPost() {
  const dispatch = useDispatch();
  let history = useHistory();

  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      body: text,
      title: title,
    };

    if (!text || !title) {
      toast.error('Please fill in the fields!');
    } else {
      axios
        .post('https://bloggy-api.herokuapp.com/posts', data)
        .then((resp) => {
          console.log(resp.data);
          dispatch(addPost(resp.data));
        })
        .catch((err) => {
          console.log(err);
        });
      toast.success('Post added successfully!');
      history.push('/');
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Add new Post
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='title'
            label='Title'
            name='email'
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
            Add new
          </Button>
        </form>
      </div>
      <ToastContainer />
    </Container>
  );
}
