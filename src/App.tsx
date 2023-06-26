import { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users/Users';

export const App = () => {
  const [users, setUsers] = useState([]);

  const [invites, setInvites] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [success, setSuccess] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const handleChangeSearchValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id: number) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSuccess(true);
  };

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <div className='App'>
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          handleChangeSearchValue={handleChangeSearchValue}
          searchValue={searchValue}
          users={users}
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
};
