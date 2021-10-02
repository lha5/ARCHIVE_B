import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { styled } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
import moment from 'moment';
import Swal from 'sweetalert2';

import TopSection from '../components/contents/TopSection';
import ContentSection from '../components/contents/ContentSection';
import CommentList from '../components/contents/CommentList';
import CommentSection from '../components/contents/CommentSection';

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

const Index = () => {
  const { isAuth, id } = useSelector(state => state.user);

  const [data, setData] = useState([
    {
      _id: 'uiouio12354',
      type: 'text',
      content_value: '뒤늦은 자덕질, 너무 재미있다',
      createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
      is_collapse: false,
      is_secret: false,
      comments: [
        {
          _id: 'c3331',
          name: '테스터3',
          comment: '테스트 댓글3-1',
          createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
          is_collapse: false,
          is_secret: false,
        },
      ],
    },
    {
      _id: 'cxzvxvxc78',
      type: 'image',
      content_value:
        'https://pbs.twimg.com/media/E-2jtPpUYAAu4ml?format=jpg&name=large',
      createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
      is_collapse: false,
      is_secret: true,
      comments: [
        {
          _id: 'b2221',
          name: '테스터2',
          comment: '테스트 댓글2-1',
          createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
          is_collapse: false,
          is_secret: true,
        },
        {
          _id: 'b2222',
          name: '테스터2',
          comment: '테스트 댓글2-2',
          createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
          is_collapse: true,
          is_secret: false,
        },
      ],
    },
    {
      _id: 'kgj7h84135',
      type: 'image',
      content_value:
        'https://pbs.twimg.com/media/E-XYCUXUYAMr1qT?format=png&name=large',
      createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
      is_collapse: true,
      is_secret: false,
      comments: [],
    },
    {
      _id: 'afsd5ds455',
      type: 'image',
      content_value:
        'https://pbs.twimg.com/media/E-IFwmuWEAc3CKq?format=png&name=medium',
      createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
      is_collapse: false,
      is_secret: false,
      comments: [
        {
          _id: 'a1111',
          name: '테스터1',
          comment: '테스트 댓글1',
          createdAt: moment().format('YYYY[.]MM[.]DD hh[:]mm[:]ss'),
          is_collapse: false,
          is_secret: false,
        },
        {
          _id: 'a1112',
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

  const handleDeletePost = async (id) => {
    const { value: password } = await Swal.fire({
      title: '삭제 하시겠습니까?',
      icon: 'warning',
      input: 'password',
      inputPlaceholder: '비밀번호를 입력하세요.',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off'
      },
    })

    // if (password) {}
  };

  return (
    <Wrapper>
      <TopSection isAuth={isAuth} userId={id} />
      {data.map((each, idx) => (
        <Card
          key={each._id}
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
                onClick={() => handleDeletePost(each._id)}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            }
            title={<Typography variant="h6"># {data.length - idx}</Typography>}
            subheader={<Typography variant="body2">{each.createdAt}</Typography>}
            sx={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          />
          <ContentSection content={each} />
          <CommentList comments={each.comments} />
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded.indexOf(each._id) !== -1 ? true : false}
              onClick={() => handleExpandClick(each._id)}
              aria-expanded={expanded.indexOf(each._id) !== -1 ? true : false}
              aria-label="to comment"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse
            in={expanded.indexOf(each._id) !== -1 ? true : false}
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
