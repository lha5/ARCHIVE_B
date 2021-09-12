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

import TopBox from '../components/TopSection';
import CommentSection from '../components/CommentSection';

const Wrapper = styled('div')({
  margin: '0',
  '.MuiTypography-subtitle2': {
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.5)',
    marginBottom: '5px',
  },
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const DelBtn = styled('span')({
  fontSize: '12px',
  marginLeft: '10px',
  cursor: 'pointer',
});

const Index = () => {
  const [data, setData] = useState([
    {
      id: 4,
      type: 'text',
      content_value: '뒤늦은 자덕질, 너무 재미있다',
      createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
      is_collapse: false,
      is_secret: false,
      comments: [
        {
          id: 3331,
          name: '테스터3',
          comment: '테스트 댓글3-1',
          createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
          is_collapse: false,
          is_secret: false,
        },
      ],
    },
    {
      id: 3,
      type: 'image',
      content_value:
        'https://pbs.twimg.com/media/E-2jtPpUYAAu4ml?format=jpg&name=large',
      createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
      is_collapse: false,
      is_secret: true,
      comments: [
        {
          id: 2221,
          name: '테스터2',
          comment: '테스트 댓글2-1',
          createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
          is_collapse: false,
          is_secret: true,
        },
        {
          id: 2222,
          name: '테스터2',
          comment: '테스트 댓글2-2',
          createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
          is_collapse: true,
          is_secret: false,
        },
      ],
    },
    {
      id: 2,
      type: 'image',
      content_value:
        'https://pbs.twimg.com/media/E-XYCUXUYAMr1qT?format=png&name=large',
      createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
      is_collapse: true,
      is_secret: false,
      comments: [],
    },
    {
      id: 1,
      type: 'image',
      content_value:
        'https://pbs.twimg.com/media/E-IFwmuWEAc3CKq?format=png&name=medium',
      createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
      is_collapse: false,
      is_secret: false,
      comments: [
        {
          id: 1111,
          name: '테스터1',
          comment: '테스트 댓글1',
          createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
          is_collapse: false,
          is_secret: false,
        },
        {
          id: 1112,
          name: '테스터1',
          comment: '테스트 댓글2',
          createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
          is_collapse: true,
          is_secret: false,
        },
      ],
    },
  ]);
  const [expanded, setExpanded] = useState([]);

  const handleExpandClick = (id) => {
    const currentIndex = expanded.indexOf(id);
    const newExpanded = [...expanded];

    if (currentIndex === -1) {
      newExpanded.push(id);
    } else {
      newExpanded.splice(currentIndex, 1);
    }
    setExpanded(newExpanded);
  };

  return (
    <Wrapper>
      <TopBox />
      <Pagination
        count={5}
        sx={{
          '& ul': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: '5px',
          },
        }}
      />
      {data.map((each, key) => (
        <Card
          key={each.id + key}
          sx={{ maxWidth: 750, margin: '0 auto 25px auto' }}
          variant="outlined"
        >
          <CardHeader
            action={
              <IconButton
                size="small"
                sx={{
                  maxHeight: '30px',
                  marginTop: '17px',
                  color: 'rgba(0, 0, 0, 0.52)',
                }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            }
            title={`# ${each.id}`}
            subheader={each.createdAt}
            sx={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              // marginBottom: '10px',
            }}
          />
          {each.type === 'image' && (
            <CardMedia
              component="img"
              image={each.content_value}
              alt=""
              sx={{ margin: '10px auto', width: '97%' }}
            />
          )}
          {each.type === 'text' && (
            <Box sx={{ margin: '20px 10px', textAlign: 'center' }}>
              {each.content_value}
            </Box>
          )}
          <CardContent
            sx={{
              borderTop: '1px solid rgba(0, 0, 0, 0.12)',
              // marginTop: '10px',
            }}
          >
            {each.comments.map((reply, key) => (
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
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded.indexOf(each.id) !== -1 ? true : false}
              onClick={() => handleExpandClick(each.id)}
              aria-expanded={expanded.indexOf(each.id) !== -1 ? true : false}
              aria-label="comment more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse
            in={expanded.indexOf(each.id) !== -1 ? true : false}
            timeout="auto"
            unmountOnExit
          >
            <CommentSection />
          </Collapse>
        </Card>
      ))}
    </Wrapper>
  );
};

export default Index;
