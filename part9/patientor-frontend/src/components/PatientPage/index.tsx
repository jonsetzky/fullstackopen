import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { Entry } from "./Entry";

const PatientPage = ({ diagnoses }: { diagnoses?: Diagnosis[] }) => {
  const params = useParams();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    (async () => {
      if (params.id) {
        setPatient(await patientService.get(params.id));
      }
    })();
  }, []);

  if (!patient) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>{patient.name}</h1>
      <table>
        <tbody>
          <tr>
            <td>gender</td>
            <td>{patient.gender}</td>
          </tr>
          <tr>
            <td>ssn</td>
            <td>{patient.ssn}</td>
          </tr>
          <tr>
            <td>occupation</td>
            <td>{patient.occupation}</td>
          </tr>
        </tbody>
      </table>
      <h3>entries</h3>

      {patient.entries.map((entry) => (
        <>
          <Entry key={entry.id} entry={entry} diagnoses={diagnoses} />
          <hr />
        </>
      ))}
    </div>
  );
};

export default PatientPage;
