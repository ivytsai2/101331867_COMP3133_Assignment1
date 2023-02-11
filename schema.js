const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
    type Employee {
        id: ID!
        firstname: String!
        lastname: String!
        email: String!
        gender: String!
        salary: Float!
    },
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
    },
    type Query {
        login(email: String!, password: String!): User
        getEmployees: [Employee]
        getEmployeeById(id: ID!): Employee
    },
    type Mutation {
        signUp(
            username: String!
            email: String!
            password: String!): User 
        addEmployee(
            firstname: String!
            lastname: String!
            email: String!
            gender: String!
            salary: Float!): Employee
        updateEmployeeById(
            id: ID!
            firstname: String!
            lastname: String!
            email: String!
            gender: String!
            salary: Float!): Employee
        deleteEmployeeById(id: ID!): Employee
    }
`