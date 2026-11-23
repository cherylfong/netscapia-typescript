import BasePatientEntryFormFields from "./BasePatientEntryFormFields";
import { type OccupationalHealthCareInputProp } from "../../types";
import TextField from "@mui/material/TextField";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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

const OccupationalHealthCareFormFields = ({
  date,
  setDate,
  specialist,
  setSpecialist,
  description,
  setDescription,
  codeDiagnose,
  setCodeDiagnose,
  employerName,
  setEmployerName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: OccupationalHealthCareInputProp) => {
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
        id="entry-employer-name"
        label="Employer Name"
        variant="outlined"
        required
        value={employerName}
        onChange={(event) => setEmployerName(event.target.value)}
      />

      <Item>
        Sick Leave
        <Grid container spacing={2} sx={{padding: "10px"}}>
          <Grid size={6}>
            {" "}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>{" "}
          </Grid>

          <Grid size={6}>
            {" "}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Item>
    </>
  );
};

export default OccupationalHealthCareFormFields;
