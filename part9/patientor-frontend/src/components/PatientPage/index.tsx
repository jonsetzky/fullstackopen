import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";

const PatientPage = () => {
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
    </div>
  );
};

export default PatientPage;
