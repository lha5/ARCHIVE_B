import React, { useState } from 'react';

import { styled } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

const Options = styled('div')({
  '&': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& label:nth-child(1)': {
    marginRight: '20px',
  },
  '& .MuiCheckbox-root': {
    paddingRight: '3px',
  },
  '& .MuiFormControlLabel-label': {
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.52)',
  },
});

const ImageUploader = styled('div')({
  '&': {
    marginTop: '10px',
    marginBottom: '10px',
  },
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
    padding: '0 0.75em',
    paddingTop: 'calc(0.6em - 1px)',
    color: 'rgba(0, 0, 0, 0.52)',
    fontSize: '8px',
    lineHeight: 'normal',
    verticalAlign: 'middle',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '0 0.25em 0.25em 0',
    marginLeft: '0',
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
    borderRight: '0',
    borderRadius: '0.25em 0 0 0.25em',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
    appearance: 'none',
    width: '162px',
  },
});

const InputWrapper = styled('div')({
  '&': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const TopSection = () => {
  const [selected, setSelected] = useState('image');

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const selectedImageOption = () => (
    <ImageUploader>
      <input className="upload-name" value="파일을 선택하세요" disabled />
      <label htmlFor="filename">
        <Search />
      </label>
      <input type="file" id="filename" className="upload-hidden" />
    </ImageUploader>
  );

  const selectedTextOption = () => (
    <TextField
      variant="outlined"
      multiline
      rows={2}
      sx={{
        width: '400px',
        height: 'auto',
        marginTop: '10px',
        marginBottom: '10px',
        '& fieldset': {
          borderColor: 'rgba(0, 0, 0, 0.12)',
        },
        '& input': { paddingY: '8px' },
        '& ::placeholder': { fontSize: '14px' },
      }}
      placeholder="글을 입력하세요."
    />
  );

  return (
    <Box
      sx={{
        maxWidth: 750,
        margin: '0 auto 25px auto',
        textAlign: 'center',
        padding: '30px 0 20px 0',
      }}
    >
      <Options>
        <FormControlLabel
          control={<Checkbox color="default" size="small" />}
          label="접기"
        />
        <FormControlLabel
          control={<Checkbox color="default" size="small" />}
          label="비밀글"
        />
        <Select
          defaultValue={selected}
          onChange={handleChange}
          sx={{
            maxHeight: '32px',
            fontSize: '14px',
            color: 'rgba(0, 0, 0, 0.52)',
            '& .MuiSelect-select': {
              padding: '10px 12px',
            },
          }}
        >
          <MenuItem value="image">이미지</MenuItem>
          <MenuItem value="text">텍스트</MenuItem>
        </Select>
      </Options>
      <InputWrapper>
      {selected === 'image' && selectedImageOption()}
      {selected === 'text' && selectedTextOption()}
      <Button
        variant="contained"
        disableElevation
        sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      >
        업로드
      </Button></InputWrapper>
    </Box>
  );
};

export default TopSection;
