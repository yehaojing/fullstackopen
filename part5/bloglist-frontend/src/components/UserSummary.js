import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          );
        })}
      </tbody>

    </table>
  );
};

export default UserSummaries;