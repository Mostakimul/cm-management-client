import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../redux/features/auth/authSlice';
import { useAppSelector } from '../redux/hooks';
import { TUserPath } from '../types';
import { renderSidebarItems } from '../utils/renderSidebarItems';

const Sidebar = ({ paths }: { paths: TUserPath[] }) => {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  let content = null;

  if (!user) {
    navigate('/login');
  } else {
    content = paths.map((item) => renderSidebarItems(item, user?.role));
  }

  return <ul className="menu bg-base-200 w-56 h-full p-4 gap-2">{content}</ul>;
};

export default Sidebar;
