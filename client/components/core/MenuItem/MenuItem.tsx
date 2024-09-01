import { useRouter } from 'next/router';
import { 
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material/';

import { MoveToInbox as InboxIcon } from '@mui/icons-material/';

interface MenuItemProps {
  href: string;  
  text: string;
}

function MenuItem({ href, text }: MenuItemProps) {
  const router = useRouter();

  return (
    <ListItem disablePadding onClick={() => router.push(href)}>
      <ListItemButton>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}

export default MenuItem;
