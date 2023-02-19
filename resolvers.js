const Employee = require('./models/Employee');
const User = require('./models/User');

exports.resolvers = { 
    Query: {
        login: async (parent, args) => {
            try {
                const user = await User.findOne({email: args.email, password: args.password})
                return {
                    status: true,
                    message: `Welcome back ${user.username}`,
                    user: user
                }
            } catch (e) {
                return {
                    status: false,
                    message: "Wrong email or password",
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
            try {
                const newUser = new User({
                    username: args.username,
                    email: args.email,
                    password: args.password 
                })
                await newUser.save()
                return {
                    status: true,
                    message: "New user created successfully",
                    user: newUser
                }
            } catch (e) {
                return {
                    status: false,
                    message: e.message,
                    user: null
                }
            }
        },
        addEmployee: async (parent, args) => {
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
                await Employee.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            firstname: args.firstname,
                            lastname: args.lastname,
                            email: args.email,
                            gender: args.gender,
                            salary: args.salary
                        }
                    }, {new: true}, (err, employee) => {
                        if (err)
                        {
                            return {
                                status: false,
                                message: `Sonething went wrong when updating employee id ${employee.id}`,
                                employee: null
                            }
                        } else 
                        {
                            return {
                                status: true,
                                message: `Employee id ${employee.id} info has been updated`,
                                employee: employee
                            }
                        }
                    }
                )
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
                return {
                    status: true,
                    message: `Employee ${emp.firstname} ${emp.lastname} deleted successfully`,
                    employee: emp
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