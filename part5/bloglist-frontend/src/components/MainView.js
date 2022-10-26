import {
  Routes, Route
} from "react-router-dom";
import BlogList from "./BlogList";
import UserSummaries from "./UserSummary";

const Menu = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<UserSummaries />} />
      </Routes>
    </>
  );
};

export default Menu;