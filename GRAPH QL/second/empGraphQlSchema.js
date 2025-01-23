const { gql } = require('apollo-server-express');
const empModel = require('./models/empModel');

exports.typeDefs = gql`
type Employee {
    id: ID!
    Name: String!
    Designation: String!
    Salary: Float
    DateOfJoining: String
}

type Query {
    getEmployees: [Employee]
    getEmployeeById(id: ID!): Employee
}

type Mutation {
    addEmployee(Name: String!, Designation: String!, Salary: Float, DateOfJoining: String): Employee
    updateEmployee(id: ID!, Name: String, Designation: String, Salary: Float, DateOfJoining: String): Employee
    deleteEmployee(id: ID!): String
}
`;

exports.resolvers = {
    Query: {
        getEmployees: async () => {
            try {
                return await empModel.find();
            } catch (error) {
                console.error(`Error fetching employees: ${error}`);
                throw new Error("Error fetching employees.");
            }
        },
        getEmployeeById: async (_, agrs) => {
            try {
                return await empModel.findById(agrs.id);
            } catch (error) {
                console.error(`Error fetching employee: ${error}`);
                throw new Error("Error fetching employee.");
            }
        }
    },

    Mutation: {
        addEmployee: async (_, args) => {
            try {
                const employee = new empModel(args);
                return await employee.save();
            } catch (error) {
                console.error(`Error adding employee: ${error}`);
                throw new Error("Error adding employee.");
            }
        },
        updateEmployee: async (_, { id, ...updateData }) => {
            try {
                const updatedEmployee = await empModel.findByIdAndUpdate(
                    id,
                    updateData,
                    { new: true }
                );
                return updatedEmployee;
            } catch (error) {
                console.error(`Error updating employee: ${error}`);
                throw new Error("Error updating employee.");
            }
        },
        deleteEmployee: async (_, { id }) => {
            try {
                await empModel.findByIdAndDelete(id);
                return `Employee with ID ${id} deleted successfully.`;
            } catch (error) {
                console.error(`Error deleting employee: ${error}`);
                throw new Error("Error deleting employee.");
            }
        }
    }
};
