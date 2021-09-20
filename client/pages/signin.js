import React from 'react';
import { useDispatch } from 'react-redux';

import { Box, Button, Container, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { signInAction } from '../reducers/user';

const CustomContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98vh;
  border: 1px hidden;
`;

const Login = () => {
  const { register, handleSubmit } = useForm({
    mode: 'onSubmit',
    shouldFocusError: true,
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const dataToSubmit = { ...data };

    dispatch(signInAction(dataToSubmit));
  };

  return (
    <CustomContainer maxWidth="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '320px',
            height: '300px',
            padding: '0 20px',
          }}
        >
          <TextField
            label="아이디"
            size="small"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            {...register('id', { required: '아이디는 필수 입력 사항입니다.' })}
          />
          <TextField
            label="비밀번호"
            type="password"
            size="small"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            {...register('password', { required: '비밀번호는 필수 입력 사항입니다.' })}
          />
          <br />
          <Button type="submit" variant="contained" disableElevation sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>로그인</Button>
      </Box>
      </form>
    </CustomContainer>
  );
};

export default Login;
