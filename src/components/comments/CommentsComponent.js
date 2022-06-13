import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCommentData } from '../../redux/modules/comments/actions';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  block: {
    display: 'block',
  },
  email: {
    display: 'block',
    cursor: 'pointer',
  },
}));

const CommentsComponent = () => {
  const classes = useStyles();

  const comments = useSelector((state) => state.commentsReducer.data);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get('https://bloggy-api.herokuapp.com/comments')
      .then(({ data }) => {
        console.log(data);
        dispatch(setCommentData(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <List className={classes.root}>
        {comments.map((comment) => {
          return (
            <>
              <ListItem alignItems='flex-start' key={comment.id}>
                <ListItemAvatar>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.name}
                  secondary={
                    <>
                      <Typography
                        component='p'
                        variant='body2'
                        className={classes.block}
                        color='textPrimary'
                      >
                        {comment.postId}
                      </Typography>
                      <Typography
                        component='div'
                        variant='body2'
                        className={classes.email}
                        color='primary'
                      >
                        {comment.body}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider variant='inset' component='li' />
            </>
          );
        })}
      </List>
    </ThemeProvider>
  );
};

export default CommentsComponent;
