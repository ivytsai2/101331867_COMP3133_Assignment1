const Employee = require('../models/Employee');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { ApolloError } = require('apollo-server-errors');

exports.resolvers = { 
    Query: {
        login: async (parent, args) => {
            try {
                const user = await User.findOne({email: args.email})
                // decrpyt password and check if password is correct 
                if (!user) {
                    return {
                        status: false,
                        message: "Email doesn't exist. Please sign up!",
                        user: null
                    }
                }
                else if (user && (await bcrypt.compare(args.password, user.password))) {
                    // Create token with the username in the payload and expires after 2hrs
                    const jwtKey = "my_secret_key";
                    myToken = jwt.sign(
                        { user: args.username },
                        jwtKey,
                        { expiresIn: "2h" }
                    );
                    return {
                        status: true,
                        message: `Welcome back ${user.username}`,
                        user: user,
                        token: myToken
                    }
                } else {
                        return {
                            status: false,
                            message: "Wrong password",
                            user: null
                        }
                    }
            } catch (e) {
                return {
                    status: false,
                    message: e.message,
                    user: null
                }
            }
        },
        getEmployees: async (parent, args) => {
            return await Employee.find()
        },
        getEmployeeById: async (parent, args) => {
            try {
                const emp = await Employee.findById(args.id)
                return {
                    status: true,
                    message: `Employee id ${emp.id} is ${emp.firstname} ${emp.lastname}`,
                    employee: emp
                }
            } catch (e) {
                return {
                    status: false,
                    message: `Employee id ${args.id} not found`,
                    employee: null
                }
            }
        }
    },
    Mutation: {
        signUp: async (parent, args) => {
            // check if user already exist
            const oldUsername = await User.findOne({username: args.username});
            if (oldUsername) {
                throw new ApolloError('Sorry! This username is already taken', 'USERNAME_ALREADY_EXISTS')
            }
            // check if user already exist
            const oldUser = await User.findOne({email: args.email});
            if (oldUser) {
                throw new ApolloError('This email is already registered, please login', 'USER_ALREADY_EXISTS')
            }
            // encrpyt password
            const encryptedPassword = await bcrypt.hash(args.password, 10);
            const newUser = new User({
                username: args.username,
                email: args.email,
                password: encryptedPassword 
            })
            await newUser.save()
            return {
                status: true,
                message: "New user created successfully",
                user: newUser
            }
        },
        addEmployee: async (parent, args) => {
            const oldEmp = await Employee.findOne({email: args.email});
            if (oldEmp) {
                throw new ApolloError('This email is already registered', 'EMAIL_ALREADY_EXISTS')
            }
            try {
                const newEmp = new Employee({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    gender: args.gender,
                    salary: args.salary 
                })
                await newEmp.save()
                return {
                    status: true,
                    message: "New employee added successfully",
                    employee: newEmp
                }
            } catch (e) {
                return {
                    status: false,
                    message: e.message,
                    employee: null
                }
            }
        },
        updateEmployeeById: async (parent, args) => {
            try {
                const emp = await Employee.findById(args.id)
                if (args.email) {
                    if (emp.email != args.email) {
                        const oldEmail = await Employee.findOne({email: args.email})
                        if (oldEmail) {
                            throw new ApolloError('This email is already registered', 'EMAIL_ALREADY_EXISTS')
                        }
                    }
                }
                if (args.firstname) {
                    emp.firstname = args.firstname
                }
                if (args.lastname) {
                    emp.lastname = args.lastname
                }
                if (args.gender) {
                    emp.gender = args.gender
                }
                if (args.salary) {
                    emp.salary = args.salary
                }
                await emp.save()
                return {
                    status: true,
                    message: `Employee id ${emp.id} has been updated`,
                    employee: emp
                }
            } catch (e) {
                return {
                    status: false,
                    message: e.message,
                    employee: null
                }
            }
        },
        deleteEmployeeById: async (parent, args) => {
            try {
                const emp = await Employee.findByIdAndDelete(args.id)
                if (emp) {
                    return {
                        status: true,
                        message: `Employee id ${args.id} is deleted`,
                        employee: emp
                    }
                 } else {
                    return {
                        status: false,
                        message: `Cannot delete employee, check if employee id ${args.id} exists`,
                        employee: null
                    }
                }
            } catch (e) {
                return {
                    status: false,
                    message: `Cannot delete employee, check if employee id ${args.id} exists`,
                    employee: null
                }
            }
        }
    }
}