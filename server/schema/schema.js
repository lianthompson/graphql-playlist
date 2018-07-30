const graphql = require("graphql");
const _= require("lodash");

const{ GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

// dummy data
var books = [
    {name: "Harry Potter", genre: "Fantasy", id: "1"},
    {name: "Lord of The Rings", genre: "Fantasy", id: "2"},
    {name: "Cloud Atlas", genre: "Sci-Fi", id: "3"}
];

var authors = [
    {name: "J.K. Rowling", age: 44, id: "1"},
    {name: "J.R.R. Tolkien", age: 90, id: "2"},
    {name: "George R. Martin", age: 60, id: "3"}
];

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from db / other source
                console.log(typeof(args.id));
                return_.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return_.find(authors, {id:args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});