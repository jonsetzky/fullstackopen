import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import { Diagnosis, EntryFormValues } from "../../../types";
import EntryForm from "./EntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  error?: string;
  diagnoses?: Diagnosis[];
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  setError,
  diagnoses,
}: Props) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <EntryForm
          setError={setError}
          onSubmit={onSubmit}
          onCancel={onClose}
          diagnoses={diagnoses}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
