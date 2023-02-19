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
    type empResponse {
        status: Boolean!
        message: String!
        employee: Employee
    },
    type userResponse {
        status: Boolean!
        message: String!
        user: User
    },
    type Query {
        login(email: String!, password: String!): userResponse
        getEmployees: [Employee]
        getEmployeeById(id: ID!): empResponse
    },
    type Mutation {
        signUp(
            username: String!
            email: String!
            password: String!): userResponse
        addEmployee(
            firstname: String!
            lastname: String!
            email: String!
            gender: String
            salary: Float
        ): empResponse
        updateEmployeeById(
            id: ID!
            firstname: String
            lastname: String
            email: String
            gender: String
            salary: Float): empResponse
        deleteEmployeeById(id: ID!): empResponse
    }
`