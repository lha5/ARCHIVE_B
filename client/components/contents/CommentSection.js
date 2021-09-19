import React from 'react';

import { styled } from '@material-ui/core/styles';
import {
  Button,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

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
  const { register, handleSubmit } = useForm({
    mode: 'onSubmit',
    shouldFocusError: true,
  });

  const onSubmit = (data) => {
    const dataToSubmit = { ...data };
    console.log('data? ', dataToSubmit);
  };

  return (
    <CardContent
      noValidate
      autoComplete="off"
      sx={{ display: 'grid', rowGap: '10px' }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TopSection>
          <CssTextField
            type="text"
            variant="outlined"
            size="small"
            placeholder="닉네임"
            sx={{ maxWidth: '100px', marginRight: '10px' }}
            {...register('name', { required: true })}
          />
          <CssTextField
            type="password"
            variant="outlined"
            size="small"
            placeholder="비밀번호"
            sx={{ maxWidth: '88px', marginRight: '16px' }}
            {...register('password', { required: true })}
          />
          <OptionsBox>
            <FormControlLabel
              control={<Checkbox color="default" size="small" />}
              label="접기"
              sx={{ '& span:first-child': { paddingRight: '3px' }, '& span:last-child': { fontWeight: 300, fontSize: '14px' } }}
              {...register('is_collapse')}
            />
            <FormControlLabel
              control={<Checkbox color="default" size="small" />}
              label="비밀글"
              sx={{ '& span:first-child': { paddingRight: '3px' }, '& span:last-child': { fontWeight: 300, fontSize: '14px' } }}
              {...register('is_secret')}
            />
          </OptionsBox>
        </TopSection>
        <BottomSection>
          <TextField multiline rows={3} fullWidth {...register('comment', { required: true })} />
          <Button
            variant="contained"
            type="submit"
            disableElevation
            sx={{
              width: '120px',
              maxWidth: '120px',
              marginLeft: '15px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }}
          >
            댓글 달기
          </Button>
        </BottomSection>
      </form>
    </CardContent>
  );
};

export default CommentSection;
