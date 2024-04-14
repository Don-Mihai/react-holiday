import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import './style.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/auth');
  };

  return (
    <div className="header">
      <div className="header__logo">M</div>
      <div className="header__profile">
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu id="long-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleLogout}>Выйти</MenuItem>
          <MenuItem onClick={handleClose}>Профиль</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
