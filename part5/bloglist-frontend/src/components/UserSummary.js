import { useSelector } from "react-redux";

const UserSummaries = () => {

  const users = useSelector(
    state => state.users.slice()
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Blogs Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          return (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          );
        })}
      </tbody>

    </table>
  );
};

export default UserSummaries;