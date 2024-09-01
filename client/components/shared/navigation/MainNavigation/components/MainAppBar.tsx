import { useState } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import { 
  Box,
  Toolbar, 
  Typography,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material/';

import {
  Menu as MenuIcon, 
  Adb as AdbIcon,
} from '@mui/icons-material/';

import { drawerWidth, projectName } from '@/global/Vars'; 

type OpenProp = {
  open: boolean;
}

type DrawerOpenProp = {
  handleDrawerOpen: () => void;
}

interface AppBarProps extends MuiAppBarProps, OpenProp {}
interface MainAppBarProps extends DrawerOpenProp, OpenProp {}

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

function MainAppBar({ handleDrawerOpen, open }: MainAppBarProps) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = (): void => setAnchorElUser(null);

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <Box sx={{ 
          flexGrow: 1, 
          display: 'inline-flex',
          alignItems: 'center',
        }}>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>

          <AdbIcon 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              mr: 1 
            }} 
          />

          <Typography
            variant="h6"
            noWrap
            component="span"
            onClick={() => router.push('/')}
            sx={{
              cursor: 'pointer',
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
            }}
          >
              {projectName}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar 
                src="/static/next.svg" 
                alt="Remy Sharp" 
                sx={{ backgroundColor: 'white' }} 
              />
            </IconButton>
          </Tooltip>
  
          <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
          >
            {settings.map(setting => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: 'center' }}>
                  {setting}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;
