import React, { useState } from 'react';

import { styled } from '@material-ui/core/styles';
import {
  CardContent,
  Collapse,
  Typography,
} from '@material-ui/core';

const DelBtn = styled('span')({
  fontSize: '12px',
  marginLeft: '10px',
  cursor: 'pointer',
});

const CommentList = ({ comments }) => {
  const [collapsedComment, setCollapsedComment] = useState([]);

  const handleCollapsedCommentClick = (id) => {
    const currentIndex = collapsedComment.indexOf(id);
    const newExpanded = [...collapsedComment];

    if (currentIndex === -1) {
      newExpanded.push(id);
    } else {
      newExpanded.splice(currentIndex, 1);
    }
    setCollapsedComment(newExpanded);
  };

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
            reply.is_collapse ? (
              <>
              <span
                onClick={() => handleCollapsedCommentClick(reply.id)}
                aria-expanded={collapsedComment.indexOf(reply.id) !== -1 ? true : false}
                aria-label="collapsed"
                style={{ cursor: 'pointer', fontSize: '14px', color: 'rgba(0, 0, 0, 0.52)' }}
              >
                {collapsedComment.indexOf(reply.id) !== -1 ? '접기' : '펼치기'}
              </span>
                <Collapse
                  in={collapsedComment.indexOf(reply.id) !== -1 ? true : false}
                  timeout="auto"
                  unmountOnExit
                >
                  <Typography variant="body2">{reply.comment}</Typography>
                </Collapse>
              </>
            ) :(
              <Typography variant="body2">{reply.comment}</Typography>
            )
          )}
        </Typography>
      ))}
    </CardContent>
  );
};

export default CommentList;
