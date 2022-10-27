import {
  Routes, Route, useMatch
} from "react-router-dom";
import { useSelector } from "react-redux";
import BlogList from "./BlogList";
import UserSummaries from "./UserSummary";
import UserBlogList from "./UserBlogList";

const Menu = () => {

  const match = useMatch("/users/:id");

  const users = useSelector(
    state => state.users.slice()
  );

  const user = match
    ? users.find(user => user.id === match.params.id)
    : null;

  return (
    <>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<UserSummaries />} />
        <Route path="/users/:id" element={<UserBlogList user={user}/>} />
      </Routes>
    </>
  );
};

export default Menu;