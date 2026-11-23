import BasePatientEntryFormFields from "./BasePatientEntryFormFields";
import {
  type HealthCheckFormInputProps,
  healthCheckRatingLabels,
} from "../../types";
import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
  const [open, setOpen] = useState(false);

  const handleRatingChange = (
    event: SelectChangeEvent<typeof healthCheckRating>,
  ) => {
    setHealthCheckRating(Number(event.target.value));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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

      <FormControl fullWidth>
        <InputLabel id="entry-health-check-rating-label">
          Health Check Rating *
        </InputLabel>
        <Select
          labelId="entry-health-check-rating-label"
          id="entry-health-check-rating"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={healthCheckRating}
          label="Health Check Rating"
          onChange={handleRatingChange}
          required
        >
          {Object.entries(healthCheckRatingLabels).map(([rating, label]) => (
            <MenuItem key={rating} value={Number(rating)}>
              {rating} - {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default HealthCheckFormFields;
