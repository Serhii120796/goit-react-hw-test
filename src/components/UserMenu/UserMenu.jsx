import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { useAuth } from 'hooks';
import { Wrapper, UserName } from './UserMenu.styled';
import { Button } from 'components/ContactItem/ContactItem.styled';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <Wrapper >
      <UserName>Welcome, {user.name}</UserName>
          <Button type="button"
            onClick={() => dispatch(logOut())}
          >
        Logout
      </Button>
    </Wrapper>
  );
};
