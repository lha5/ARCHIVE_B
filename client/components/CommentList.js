import React, { useState } from 'react';

import { styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Pagination,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
import moment from 'moment';

const DelBtn = styled('span')({
  fontSize: '12px',
  marginLeft: '10px',
  cursor: 'pointer',
});

const CommentList = ({ comments }) => {
  return (
    <CardContent
      sx={{
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      {comments.map((reply, key) => (
        <Typography
          paragraph
          key={reply.id + key}
          sx={{ marginBottom: '25px' }}
        >
          <Typography variant="subtitle2">
            {reply.name} {reply.createdAt} <DelBtn>삭제</DelBtn>
          </Typography>
          {reply.is_secret ? (
            <Typography
              variant="body2"
              sx={{ '&': { color: 'rgba(0, 0, 0, 0.3)' } }}
            >
              비밀글 입니다.
            </Typography>
          ) : (
            <Typography variant="body2">{reply.comment}</Typography>
          )}
        </Typography>
      ))}
    </CardContent>
  );
};

export default CommentList;
