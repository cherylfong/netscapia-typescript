import { useState, useEffect } from "react";

import diagnosesService from "../../services/diagnoses";
import { Diagnosis } from "../../types";
import {type BaseFormInputProps} from "../../types";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import type { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import type { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}


const BasePatientEntryFormFields = ({
  date,
  setDate,
  specialist,
  setSpecialist,
  description,
  setDescription,
  codeDiagnose,
  setCodeDiagnose,
}: BaseFormInputProps) => {
  //   const [date, setDate] = useState<Dayjs | null>(null);

  const theme = useTheme();
  const [diagnosesCodes, setDiagnosesCodes] = useState<Diagnosis[]>([]);

  //   const [codeDiagnose, setCodeDiagnose] = useState<string[]>([]);

  useEffect(() => {
    const fetchDiagnosisCodes = async () => {
      const diagnosisCodes = await diagnosesService.getAll();
      setDiagnosesCodes(diagnosisCodes);
    };

    void fetchDiagnosisCodes();
  }, []);

  const handleDiagnosisCodeChange = (
    event: SelectChangeEvent<typeof codeDiagnose>,
  ) => {
    const {
      target: { value },
    } = event;
    setCodeDiagnose(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker value={date} onChange={(newValue) => setDate(newValue)} />
      </LocalizationProvider>

      <TextField
        id="entry-specialist"
        label="Specialist"
        variant="outlined"
        required
        value={specialist}
        onChange={(event) => setSpecialist(event.target.value)}
      />

      <TextField
        id="entry-description"
        label="Description"
        multiline
        maxRows={4}
        required
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel id="diagnosis-multiple-chip-label">
          Diagnosis Codes
        </InputLabel>
        <Select
          labelId="diagnosis-multiple-chip-label"
          id="entry-diagnosis-multiple-chip"
          multiple
          value={codeDiagnose}
          onChange={handleDiagnosisCodeChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Diagnosis Codes" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {diagnosesCodes.map((item) => (
            <MenuItem
              key={item.id}
              value={item.code}
              style={getStyles(item.name, codeDiagnose, theme)}
            >
              {item.code} - {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default BasePatientEntryFormFields;
