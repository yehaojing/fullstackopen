import {
  Routes, Route, useMatch
} from "react-router-dom";
import { useSelector } from "react-redux";
import BlogList from "./BlogList";
import UserSummaries from "./UserSummary";
import UserBlogList from "./UserBlogList";
import BlogForm from "./BlogForm";
import Blog from "./Blog";

const Menu = () => {

  const usersMatch = useMatch("/users/:id");

  const users = useSelector(
    state => state.users.slice()
  );

  const user = usersMatch
    ? users.find(user => user.id === usersMatch.params.id)
    : null;

  return (
    <>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<UserSummaries />} />
        <Route path="/users/:id" element={<UserBlogList user={user}/>} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/create" element={<BlogForm />} />
      </Routes>
    </>
  );
};

export default Menu;