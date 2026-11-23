import BasePatientEntryFormFields from "./BasePatientEntryFormFields";
import { type HospitalFormInputProps } from "../../types";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const HospitalFormFields = ({
  date,
  setDate,
  specialist,
  setSpecialist,
  description,
  setDescription,
  codeDiagnose,
  setCodeDiagnose,
  dischargeDate,
  setDischargeDate,
  dischargeCriteria,
  setDischargeCriteria,
}: HospitalFormInputProps) => {
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

      <Item>
        Sick Leave
        <Grid container spacing={2} sx={{ padding: "10px" }}>
          <Grid size={6}>
            {" "}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Discharge Date"
                value={dischargeDate}
                onChange={(newValue) => setDischargeDate(newValue)}
                slotProps={{ textField: { fullWidth: true, required: true } }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid size={6}>
            {" "}
            <TextField
              id="entry-employer-name"
              label="Discharge Criteria"
              variant="outlined"
              value={dischargeCriteria}
              onChange={(event) => setDischargeCriteria(event.target.value)}
              required
              fullWidth
            />
          </Grid>
        </Grid>
      </Item>
    </>
  );
};

export default HospitalFormFields;
