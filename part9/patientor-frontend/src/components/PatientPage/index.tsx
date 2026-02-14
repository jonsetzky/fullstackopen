import { useEffect, useState } from "react";
import { Diagnosis, EntryFormValues, Patient } from "../../types";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { Entry } from "./Entry";
import AddEntryModal from "./AddEntryModal";
import { Button } from "@mui/material";

const PatientPage = ({ diagnoses }: { diagnoses?: Diagnosis[] }) => {
  const params = useParams();
  const [patient, setPatient] = useState<Patient>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log("values", values);
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoses={diagnoses}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add Entry
      </Button>
      <div style={{ height: "1em" }}></div>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          <Entry entry={entry} diagnoses={diagnoses} />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
