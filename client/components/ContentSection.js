import React, { useState } from 'react';

import { Box, Button, CardMedia, Collapse, Typography } from '@material-ui/core';

const ContentSection = ({ content }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const secretNotification = () => (
    <Box sx={{ margin: '20px 10px', textAlign: 'center', fontSize: '0.857rem' }}>
      비밀글 입니다.
    </Box>
  );

  const collapsibleButton = () => (
    <Box sx={{ margin: '10px', textAlign: 'center' }}>
      <Button
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-expanded={isCollapsed}
        aria-label="collapsed"
        sx={{ color: 'rgba(0, 0, 0, 0.8)' }}
      >
        {isCollapsed ? '접기' : '펼치기'}
      </Button>
    </Box>
  );

  const imageContent = () =>
    content.is_secret ? (
      secretNotification()
    ) : content.is_collapse ? (
      <>
        {collapsibleButton()}
        <Collapse
          in={isCollapsed}
          timeout="auto"
          unmountOnExit
        >
          <CardMedia
            component="img"
            image={content.content_value}
            alt=""
            sx={{ margin: '10px auto', width: '97%' }}
          />
        </Collapse>
      </>
    ) : (
      <CardMedia
        component="img"
        image={content.content_value}
        alt=""
        sx={{ margin: '10px auto', width: '97%' }}
      />
    );

  const textContent = () =>
    content.is_secret ? (
      secretNotification()
    ) : content.is_collapse ? (
      <>
        {collapsibleButton()}
        <Collapse
          in={isCollapsed}
          timeout="auto"
          unmountOnExit
        >
          <Box sx={{ margin: '20px 10px', textAlign: 'center' }}>
            <Typography variant="body2">{content.content_value}</Typography>
          </Box>
        </Collapse>
      </>
    ) : (
      <Box sx={{ margin: '20px 10px', textAlign: 'center' }}>
        <Typography variant="body2">{content.content_value}</Typography>
      </Box>
    );
  return content.type === 'image' ? imageContent() : textContent();
};

export default ContentSection;
