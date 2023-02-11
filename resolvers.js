const Employee = require('./models/Employee');
const User = require('./models/User');

exports.resolvers = { 
    Query: {
        login: async (parent, args) => {
            return User.find({ "email": args.email, "password": args.password })
        },
        getEmployees: async (parent, args) => {
            return Employee.find({})
        },
        getEmployeeById: async (parent, args) => {
            return Employee.findById(args.id)
        }
    },
    Mutation: {
        signUp: async (parent, args) => {
            console.log(args)
            let newUser = new User({
                username: args.username,
                email: args.email,
                password: args.password 
            })
            return newUser.save()
            /*try {
                await newUser.save()
                return JSON.stringify({
                    status: true,
                    message: "New user created successfully"
                })
            } catch (e) {
                return JSON.stringify({
                    status: false,
                    message: e
                });
            }*/
        },
        addEmployee: async (parent, args) => {
            console.log(args)
            let newEmp = new Employee({
                firstname: args.firstname,
                lastname: args.lastname,
                email: args.email,
                salary: args.salary 
            })
            return newEmp.save()
        },
        updateEmployeeById: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return
            }
            return await Employee.findByIdAndUpdate(
                args.id,
                {
                    $set: {
                        firstname: args.firstname,
                        lastname: args.lastname,
                        email: args.email,
                        salary: args.salary
                    }
                }, {new: true}, (err, employee) => {
                    if (err)
                    {
                        console.log('Sonething went wrong when updating the employee')
                    } else 
                    {
                        return employee
                    }
                }
            )
        },
        deleteEmployeeById: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return JSON.stringify({
                    status: false,
                    message: "No ID found to delete"
                })
            }
            return await Employee.findByIdAndDelete(args.id)
        }
    }
}