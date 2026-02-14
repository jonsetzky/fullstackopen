import z from "zod";
import { Gender } from "../types";

const dateSchema = () => z.string().regex(/\d{4}\-\d{2}-\d{2}/);

const baseEntrySchema = () => ({
  date: dateSchema(),
  type: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()),
  description: z.string(),
});

const newHospitalEntrySchema = z.object({
  ...baseEntrySchema(),
  discharge: z.object({
    date: dateSchema(),
    criteria: z.string(),
  }),
});
export type NewHospitalEntry = z.infer<typeof newHospitalEntrySchema>;

const newOccupationalHealthcareEntrySchema = z.object({
  ...baseEntrySchema(),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: dateSchema(),
    endDate: dateSchema(),
  }),
});
export type NewOccupationalHealthCareEntry = z.infer<
  typeof newOccupationalHealthcareEntrySchema
>;

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: dateSchema(),
  ssn: z.string().regex(/\d{6}-[A-Z0-9]{3,4}/),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type NewPatient = z.infer<typeof newPatientSchema>;

export const toNewPatient = (object: unknown): NewPatient =>
  newPatientSchema.parse(object);

export const toNewEntry = (object: object) => {
  if (!("type" in object)) {
    throw new z.ZodError([
      {
        code: "custom",
        message: "missing",
        path: ["type"],
      },
    ]);
  }
  switch (object.type) {
    case "Hospital":
      return { ...newHospitalEntrySchema.parse(object), type: object.type };
    case "OccupationalHealthcare":
      return {
        ...newOccupationalHealthcareEntrySchema.parse(object),
        type: object.type,
      };
    default:
      throw new z.ZodError([
        {
          code: "custom",
          message: "unknown type",
          path: ["type"],
        },
      ]);
  }
};
