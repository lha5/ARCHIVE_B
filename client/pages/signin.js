import React from 'react';
import { Box, Button, Container, TextField } from '@material-ui/core';
import styled from 'styled-components';

const CustomContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98vh;
  border: 1px hidden;
`;

const Login = () => {
  const onSubmit = event => {
    event.preventDefault();
  };

  return (
    <CustomContainer maxWidth="md">
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
        />
        <br />
        <Button type="submit" variant="contained" disableElevation sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>로그인</Button>
      </Box>
    </CustomContainer>
  );
};

export default Login;
