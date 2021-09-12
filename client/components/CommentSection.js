import React from 'react';

import { styled } from '@material-ui/core/styles';
import {
  Button,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@material-ui/core';

const TopSection = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const BottomSection = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

const CssTextField = styled(TextField)({
  '& input': {
    height: '20px',
    padding: '7px 12px',
  },
  '& input::placeholder': {
    fontSize: '13px',
  },
});

const OptionsBox = styled('div')({
  '&': {
    display: 'inline-block',
  },
});

const CommentSection = () => {
  return (
    <CardContent
      noValidate
      autoComplete="off"
      sx={{ display: 'grid', rowGap: '10px' }}
    >
      <TopSection>
        <CssTextField
          type="text"
          variant="outlined"
          size="small"
          placeholder="닉네임"
          sx={{ maxWidth: '100px', marginRight: '10px' }}
        />
        <CssTextField
          type="password"
          variant="outlined"
          size="small"
          placeholder="비밀번호"
          sx={{ maxWidth: '88px', marginRight: '16px' }}
        />
        <OptionsBox>
          <FormControlLabel
            control={<Checkbox color="default" size="small" />}
            label="접기"
            sx={{ '& span:last-child': { fontWeight: 300, fontSize: '14px' } }}
          />
          <FormControlLabel
            control={<Checkbox color="default" size="small" />}
            label="비밀글"
            sx={{ '& span:last-child': { fontWeight: 300, fontSize: '14px' } }}
          />
        </OptionsBox>
      </TopSection>
      <BottomSection>
        <TextField multiline rows={3} fullWidth />
        <Button
          variant="contained"
          disableElevation
          sx={{
            minWidth: '120px',
            marginLeft: '15px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}
        >
          댓글 달기
        </Button>
      </BottomSection>
    </CardContent>
  );
};

export default CommentSection;
