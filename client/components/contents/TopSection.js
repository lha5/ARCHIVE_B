import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { styled } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  TextField,
  Pagination,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Options = styled('div')({
  '&': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& label:first-of-type': {
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
  '& .btn-section': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const TopSection = ({ isAuth, userId }) => {
  const [selected, setSelected] = useState('image');

  const [image, setImage] = useState();
  const [imageFileName, setImageFileName] = useState('????????? ???????????????');

  const { register, handleSubmit } = useForm({
    mode: 'onSubmit',
    shouldFocusError: true,
  });

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const handleImageFile = (event) => {
    const imageFileInfo = event.target.files[0];
    if (imageFileInfo) {
      setImage(imageFileInfo);
      setImageFileName(imageFileInfo.name);
    }
  };

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const dataToSubmit = { ...data };
    dataToSubmit.type = selected;

    if (selected === 'image') {
      const formData = new FormData();
      formData.append('image', image);

      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}${process.env.NEXT_PUBLIC_POST_API}/upload-image`, formData)
        .then(response => {
          if (response.data.success) {
            dataToSubmit.content_value = response.data.result.path;
          }
        })
        .catch(error => console.error('error occured in onSubmit() - upload image. \n', error));
    }
  };

  const selectedImageOption = () => (
    <ImageUploader>
      <input className="upload-name" value={imageFileName} disabled />
      <label htmlFor="filename">
        <Search />
      </label>
      <input type="file" id="filename" className="upload-hidden" onChange={handleImageFile} />
    </ImageUploader>
  );

  const selectedTextOption = () => (
    <TextField
      variant="outlined"
      multiline
      rows={2}
      sx={{
        width: '220px',
        maxWidth: '220px',
        height: 'auto',
        marginTop: '10px',
        marginBottom: '10px',
        '& fieldset': {
          borderColor: 'rgba(0, 0, 0, 0.12)',
        },
        '& input': { paddingY: '8px' },
        '& ::placeholder': { fontSize: '14px' },
      }}
      placeholder="?????? ???????????????."
      {...register('content_value', { required: true })}
    />
  );

  const handleLogout = () => {
    Swal.fire({
      title: '???????????? ???????????????????',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '????????????',
      cancelButtonText: '??????',
    })
      .then(value => {
        if (value.isConfirmed) {
          console.log('id?? ', userId);
        } else {
          Swal.close();
        }
      });
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: 750,
          margin: '0 auto 25px auto',
          textAlign: 'center',
          padding: '30px 0 20px 0',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Options>
            <FormControlLabel
              control={<Checkbox color="default" size="small" />}
              label="??????"
              {...register('is_collapse')}
            />
            <FormControlLabel
              control={<Checkbox color="default" size="small" />}
              label="?????????"
              {...register('is_secret')}
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
              <MenuItem value="image">?????????</MenuItem>
              <MenuItem value="text">?????????</MenuItem>
            </Select>
          </Options>
          <InputWrapper>
            {selected === 'image' && selectedImageOption()}
            {selected === 'text' && selectedTextOption()}
            <div className="btn-section">
              <TextField
                type="password"
                variant="outlined"
                size="small"
                sx={{
                  maxWidth: '90px',
                  maxHeight: '32px',
                  fontSize: '14px',
                  color: 'rgba(0, 0, 0, 0.52)',
                  '& ::placeholder': { fontSize: '13px' },
                  '& input': {
                    padding: '5px',
                  },
                  marginRight: '10px',
                }}
                placeholder="????????????"
                {...register('password', { required: true })}
              />
              <Button
                variant="contained"
                type="submit"
                disableElevation
                sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
              >
                ?????????
              </Button>
            </div>
          </InputWrapper>
        </form>
      </Box>
      {isAuth && (
        <Button
          variant="contained"
          disableElevation
          sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          onClick={handleLogout}
        >
          ????????????
        </Button>
      )}
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
    </>
  );
};

export default TopSection;
