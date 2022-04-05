import { Icon, IconifyIcon } from '@iconify/react';
import { Box, SxProps } from '@mui/material';
import React from 'react';

type IconifyInput = {
  icon: IconifyIcon | string;
  sx?: SxProps;
};

export const Iconify = ({ icon, sx, ...other }: IconifyInput) => (
  <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />
);
