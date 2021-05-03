import { IResolvers } from 'graphql-tools';
import {Validator} from 'node-input-validator';
import {getAnimalFoundEventsQuery, createFoundEventQuery} from '../../sql-queries/animalEventFound';

const resolvers: IResolvers = {
    Query: {
        foundEvents: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getAnimalFoundEventsQuery()
            );
            return dbResponse.rows;
        },
    },
    Mutation: {
        // from types
        createFoundEvent: async (_, { input }, { pgClient }) => {

            const createFoundEventValidator = new Validator(input, {
                street: 'maxLength:255',
                houseNo: 'integer|min:8',
                date: 'date|dateBeforeToday:0,days'
            });

            const iscreateFoundEventInputValid = await 
            createFoundEventValidator.check();

            if (!iscreateFoundEventInputValid) {
                throw new Error(
                    JSON.stringify(createFoundEventValidator.errors)
                );
            }

            const dbResponse = await pgClient.query(
                // from querys
                createFoundEventQuery(input)
            );
            return dbResponse.rows[0];
        },
    },
};

export default resolvers;
