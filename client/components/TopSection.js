import React from 'react';

import { styled } from '@material-ui/core/styles';

import {
  Box,
  Button,
} from '@material-ui/core';

const Uploader = styled('div')({
  '& input[type="file"]': {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    border: 0,
  },
  '& label': {
    display: 'inline-block',
    padding: '0.6em 0.75em',
    paddingTop: 'calc(0.6em - 1px)',
    paddingBottom: 'calc(0.6em - 1px)',
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: '13px',
    lineHeight: 'normal',
    verticalAlign: 'middle',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    border: '1px solid rgba(0, 0, 0, 0.8)',
    borderRadius: '0.25em',
    marginLeft: '10px',
  },
  '& .upload-name': {
    display: 'inline-block',
    padding: '0.6em 0.75em',
    fontSize: '13px',
    color: 'rgba(0, 0, 0, 0.52)',
    lineHeight: 'normal',
    verticalAlign: 'middle',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '0.25em',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
    appearance: 'none',
  },
});

const TopSection = () => {
  return (
    <Box sx={{ maxWidth: 750, margin: '0 auto 25px auto', textAlign: 'center', padding: '30px 0 20px 0' }}>
      <Uploader>
        <input className="upload-name" value="파일을 선택하세요" disabled />
        <label htmlFor="filename">파일 선택</label>
        <input type="file" id="filename" className="upload-hidden" />
      </Uploader>
      <Button variant="contained" disableElevation sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>업로드</Button>
    </Box>
  );
};

export default TopSection;
