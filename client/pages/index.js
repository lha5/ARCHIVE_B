import React, { useState } from 'react';

import { styled } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon, MoreVert } from '@material-ui/icons';
import moment from 'moment';

const Wrapper = styled('div')({
  margin: '0',
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

const TopSection = styled('div')({});

const BottomSection = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

const Index = () => {
  const [data, setData] = useState([
    {
      id: 1,
      title: '테스트 제목',
      img_src:
        'https://pbs.twimg.com/media/E-IFwmuWEAc3CKq?format=png&name=medium',
      createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
      content: '테스트 내용',
      comments: [
        {
          id: 11111,
          name: '테스터',
          comment: '테스트 댓글',
          createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
        },
      ],
    },
    {
      id: 2,
      title: '테스트 제목',
      img_src:
        'https://pbs.twimg.com/media/E-IFwmuWEAc3CKq?format=png&name=medium',
      createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
      content: '테스트 내용',
      comments: [],
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
      {data.map((each, key) => (
        <Card
          key={each.id + key}
          sx={{ maxWidth: 750, margin: '0 auto 25px auto' }}
          variant="outlined"
        >
          <CardHeader
            action={
              <IconButton>
                <MoreVert />
              </IconButton>
            }
            title={each.title}
            subheader={each.createdAt}
          />
          <CardMedia component="img" image={each.img_src} alt="" />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              {each.content}
            </Typography>
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
            <CardContent>
              {each.comments.map((reply, key) => (
                <Typography paragraph key={reply.id + key}>
                  <Typography variant="subtitle2">
                    {reply.name} {reply.createdAt}
                  </Typography>
                  <Typography variant="body2">{reply.comment}</Typography>
                </Typography>
              ))}
            </CardContent>
            <CardContent
              noValidate
              autoComplete="off"
              sx={{ display: 'grid', rowGap: '10px' }}
            >
              <TopSection>
                <TextField
                  type="password"
                  variant="standard"
                  size="small"
                  placeholder="비밀번호(선택)"
                />
              </TopSection>
              <BottomSection>
                <TextField multiline rows={4} fullWidth />
                <Button
                  variant="outlined"
                  disableElevation
                  sx={{ minWidth: '120px', marginLeft: '15px' }}
                >
                  댓글 달기
                </Button>
              </BottomSection>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </Wrapper>
  );
};

export default Index;
