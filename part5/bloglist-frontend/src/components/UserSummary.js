import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Paper, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, Typography  } from "@mui/material";

const UserSummaries = () => {

  const users = useSelector(
    state => state.users.slice()
  );

  return (
    <>
      <Typography variant="h2">Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => {
              return (
                <TableRow key={user.username}>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                  </TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserSummaries;