import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { resetNewSubmition } from '../store/formSlice';

const MainPage: FC = () => {
  const users = useSelector((state: RootState) => state.form.users);
  const newSubmitionId = useSelector(
    (state: RootState) => state.form.newSubmissionId
  );
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState<string | null>(null);

  useEffect(() => {
    if (newSubmitionId) {
      setTimeout(() => dispatch(resetNewSubmition()), 5000);
    }
  }, [newSubmitionId, dispatch]);

  const handlePasswordToggle = (id: string) => {
    setShowPassword((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2">Registered Users</h1>
      {users.length === 0 ? (
        <p className="text-amber-500">No registered users yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Country</th>
              <th>Password</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`transition-all ${
                  newSubmitionId === user.id ? 'bg-amber-500 animate-pulse' : ''
                }`}
              >
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.country}</td>
                <td
                  className="cursor-pointer"
                  onClick={() => handlePasswordToggle(user.id)}
                >
                  {showPassword === user.id ? (
                    <span>{user.password}</span>
                  ) : (
                    <span>
                      {Array.from({ length: user.password?.length || 0 }).map(
                        (_, index) => (
                          <span key={index}>●</span>
                        )
                      )}
                    </span>
                  )}
                </td>
                <td>
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-16 h-16 rounded-md"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MainPage;
