CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Junichi Masuda', 'https://www.gamefreak.co.jp/blog/dir_english/2007/12/index.html', 'No.118');
insert into blogs (author, url, title, likes) values ('Kunal Yada', 'https://medium.com/@kunalyadav/what-is-aws-and-what-can-you-do-with-it-395b585b03c', 'What is AWS and What can you do with it', 996);