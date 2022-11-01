const UserBlogList = ({ user }) => {
  if (!user) {
    return (
      <div>User Not Found!</div>
    );
  }

  if (user.blogs.length === 0) {
    return (
      <div>No blogs added...(yet)</div>
    );
  }

  return (
    <>
      <h1>
        {user.name}
      </h1>
      <ul>
        {user.blogs.map(blog => {
          return (<li key={blog.id}>{blog.title}</li>);
        })}
      </ul>
    </>

  );
};

export default UserBlogList;