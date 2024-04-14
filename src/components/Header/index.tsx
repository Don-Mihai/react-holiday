import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import './style.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">M</div>
      <div className="header__profile">
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
