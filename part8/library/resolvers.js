const { UserInputError, AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = !args.author && !args.genre ? {} : { $and: [] };
      if (args.author) {
        const author = await Author.findOne({ name: args.author }, { _id: 1 });
        query.$and.push({ author: author._id });
      }
      if (args.genre) {
        query.$and.push({ genres: { $in: args.genre } });
      }
      return await Book.find(query).populate("author");
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      return (await Book.find({ author: root._id })).length;
    },
  },
  // Book: {
  //   author: (root) => {
  //     return authors.find((author) => author.name === root.author);
  //   },
  // },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      try {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = await new Author({ name: args.author }).save();
        }
        const book = await (
          await new Book({ ...args, author: author._id }).save()
        ).populate("author");
        pubsub.publish("BOOK_ADDED", { bookAdded: book });
        return book;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const author = await Author.findOne({ name: args.name });
      if (author) {
        author.born = args.setBornTo;
        return await author.save();
      } else {
        return null;
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        favouriteGenre: user.favouriteGenre,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator("BOOK_ADDED") },
  },
};

module.exports = resolvers;
