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
import { CommentOutlined as CommentIcon, MoreVert } from '@material-ui/icons';
import moment from 'moment';

import TopBox from '../components/TopSection';

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
      id: 2,
      img_src:
        'https://pbs.twimg.com/media/E-XYCUXUYAMr1qT?format=png&name=large',
      createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
      comments: [],
    },
    {
      id: 1,
      img_src:
        'https://pbs.twimg.com/media/E-IFwmuWEAc3CKq?format=png&name=medium',
      createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
      comments: [
        {
          id: 11111,
          name: '테스터',
          comment: '테스트 댓글',
          createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
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
      {data.map((each, key) => (
        <Card
          key={each.id + key}
          sx={{ maxWidth: 750, margin: '0 auto 25px auto', padding: '0 10px' }}
          variant="outlined"
        >
          <CardHeader
            action={
              <>
                <Button
                  variant="outlined"
                  size="sm"
                  sx={{
                    maxHeight: '30px',
                    marginTop: '7px',
                    fontSize: '12px',
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                    color: 'rgba(0, 0, 0, 0.54)',
                    marginRight: '10px',
                  }}
                >
                  수정
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  sx={{
                    maxHeight: '30px',
                    marginTop: '7px',
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                    color: 'rgba(0, 0, 0, 0.54)',
                    fontSize: '12px',
                  }}
                >
                  삭제
                </Button>
              </>
            }
            title={`# ${each.id}`}
            subheader={each.createdAt}
          />
          <CardMedia component="img" image={each.img_src} alt="" />
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded.indexOf(each.id) !== -1 ? true : false}
              onClick={() => handleExpandClick(each.id)}
              aria-expanded={expanded.indexOf(each.id) !== -1 ? true : false}
              aria-label="comment more"
            >
              <CommentIcon />
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
