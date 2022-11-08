const { ApolloServer, gql } = require("apollo-server");
const config = require("./utils/config");
const mongoose = require("mongoose");
mongoose.connect(config.MONGODB_URI);

const Author = require("./models/author");
const Book = require("./models/book");

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    genres: [String!]!
    author: Author!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = (!args.author && !args.genre) ? {} : { $and: [] };
      if (args.author) {
        const author = await Author.findOne({ name: args.author }, { _id: 1 });
        query.$and.push({ author: author._id });
      }
      if (args.genre) {
        query.$and.push({ genres: { $in: args.genre } });
      }
      return await Book.find(query).populate("author");
    },
    allAuthors: async () => Author.find({})
  },
  // Author: {
  //   bookCount: (root) => {
  //     return books.filter((book) => book.author === root.name).length;
  //   },
  // },
  // Book: {
  //   author: (root) => {
  //     return authors.find((author) => author.name === root.author);
  //   },
  // },
  Mutation: {
    addBook: async (root, args) => {
      let author = (await Author.findOne({ name: args.author }));
      if (!author) {
        author = await (new Author({ name: args.author })).save();
      }
      const book = await (await (new Book({ ...args, author: author._id })).save()).populate("author");
      return book;
    }
  }
  //   editAuthor: (root, args) => {
  //     const author = authors.find((author) => author.name === args.name);
  //     if (author) {
  //       author.born = args.setBornTo;
  //       return author;
  //     } else {
  //       return null;
  //     }
  //   },
  // },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
