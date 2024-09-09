"use client"

import { Fragment, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';

import { 
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Divider,
  List,
} from '@mui/material/';

import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material/';

import { drawerWidth } from '@/global/Vars';
import MenuItem from '@/components/core/MenuItem/MenuItem';
import MainAppBar from './components/MainAppBar';

const menuItems = [{
  text: 'Main',
  href: '/',
}, {
  text: 'Tasks',
  href: '/tasks',
}, {
  text: 'About us',
  href: '/about',
  separated: true,
}];

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function MainNavigation() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = (): void => setOpen(true);
  const handleDrawerClose = (): void => setOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MainAppBar
          handleDrawerOpen={handleDrawerOpen}
          open={open}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map(({ separated, href, text }) => (
            <Fragment key={href}>
              {separated && <Divider />}
              <MenuItem href={href} text={text} />
            </Fragment>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default MainNavigation;
