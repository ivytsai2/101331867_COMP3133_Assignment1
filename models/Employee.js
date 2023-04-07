const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please enter first name'],
    trim: true,
    lowercase: true
  },
  lastname: {
    type: String,
    required: [true, 'Please enter last name'],
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: [true, "Duplicate Email Not allowed"],
    trim: true,
    lowercase: true,
    //Custom validation
    validate: [function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }, 'Please enter a valid email']
  },
  gender: {
    type: String,
    required: [true, 'Please select gender'],
    enum: ['male', 'female', 'other'],
    default: 'other',
    trim: true,
    lowercase: true
  },
  salary: {
    type: Number,
    required: [true, 'Please enter a value greater than or equal to zero'],
    default: 0.0,
    trim: true,
    validate(value) {
      if (value < 0.0){
         throw new Error("Negative Salary aren't real.");
      }
    }
  }
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;