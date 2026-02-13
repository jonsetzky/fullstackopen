import z from "zod";
import { Gender } from "../data/patients";

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().regex(/\d{4}\-\d{2}-\d{2}/),
  ssn: z.string().regex(/\d{6}-[A-Z0-9]{3,4}/),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type NewPatient = z.infer<typeof newPatientSchema>;

export const toNewPatient = (object: unknown): NewPatient =>
  newPatientSchema.parse(object);
