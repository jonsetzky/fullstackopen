import { useEffect, useState } from "react";
import { Diagnosis, EntryFormValues, Patient } from "../../types";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { Entry } from "./Entry";
import AddEntryModal from "./AddEntryModal";
import { Button } from "@mui/material";
import axios from "axios";

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

  const submitNewEntry = async (value: EntryFormValues) => {
    if (!patient) {
      setError("cannot create an entry because patient is undefined");
      return;
    }

    try {
      const entry = await patientService.createEntry(patient.id, value);
      setPatient({ ...patient, entries: patient.entries.concat(entry) });
      setModalOpen(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            "",
          );
          console.error(message);
          setError(message);
        } else if (
          e.status === 400 &&
          e.response &&
          "data" in e.response &&
          e.response.data.error === "zod validation error"
        ) {
          if (Array.isArray(e.response.data.issues)) {
            const firstIssue = e.response.data.issues[0];
            setError(`field "${firstIssue.path[0]}": ${firstIssue.message}`);
          } else {
            setError("Unrecognized zod validation error");
          }
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (params.id) {
        setPatient(await patientService.get(params.id));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
