export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type Date = string;

export interface EntryBase {
  id: string;
  date: Date;
  specialist: string;
  diagnosisCodes: string[];
  description: string;
}
export interface HospitalEntry extends EntryBase {
  type: "Hospital";
  discharge: {
    date: Date;
    criteria: string;
  };
}
export interface OccupationalHealthcareEntry extends EntryBase {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: {
    startDate: Date;
    endDate: Date;
  };
}

export type Entry = OccupationalHealthcareEntry | HospitalEntry;
