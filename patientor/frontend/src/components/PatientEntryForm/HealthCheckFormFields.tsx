import BasePatientEntryFormFields from "./BasePatientEntryFormFields";
import { type HealthCheckFormInputProps } from "../../types";
import TextField from "@mui/material/TextField";

const HealthCheckFormFields = ({
  date,
  setDate,
  specialist,
  setSpecialist,
  description,
  setDescription,
  codeDiagnose,
  setCodeDiagnose,
  healthCheckRating,
  setHealthCheckRating,
}: HealthCheckFormInputProps) => {
  return (
    <>
      <BasePatientEntryFormFields
        date={date}
        setDate={setDate}
        specialist={specialist}
        setSpecialist={setSpecialist}
        description={description}
        setDescription={setDescription}
        codeDiagnose={codeDiagnose}
        setCodeDiagnose={setCodeDiagnose}
      />

      <TextField
        id="entry-health-check-rating"
        label="Health Check Rating (0-3)"
        variant="outlined"
        required
        value={healthCheckRating ?? ""}
        onChange={(event) => {
          const value = event.target.value;
          setHealthCheckRating(value === "" ? undefined : Number(value));
        }}
      />
    </>
  );
};

export default HealthCheckFormFields;
