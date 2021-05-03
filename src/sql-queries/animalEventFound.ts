import { QueryConfig } from 'pg';

export const getAnimalFoundEventsQuery = (): QueryConfig => {
    const text = `
        SELECT
            id,
            street,
            house_no,
            municipality_id,
            date_time AS date,
            animal_id,
            comments
        FROM animal_event_found;`;

    return {
        text,
    };
};

interface CreateFoundEventInput {
    street: string
    houseNo: string
    municipalityId: number
    date: Date
    animalId: number
    comments: string
}

export const createFoundEventQuery = (
    input: CreateFoundEventInput
): QueryConfig => {
    const text = `
        INSERT INTO animal_event_found (
            street,
            house_no,
            municipality_id,
            date_time,
            animal_id,
            comments
            ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
            ) RETURNING
                id,
                street,
                house_no,
                municipality_id,
                date_time as date,
                animal_id,
                comments ;`
            ;
    return {
        text,
        values:[input.street, 
            input.houseNo, 
            input.municipalityId, 
            input.date, 
            input.animalId, 
            input.comments],
    };
};

