import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  EntryTypeLiterals,
  type HealthCheckRating,
  type Entry,
} from "../../types";

import HealthCheckFormFields from "./HealthCheckFormFields";
import HospitalFormFields from "./HospitalFormFields";
import OccupationalHealthCareFormFields from "./OccupationalHealthCareFormFields";
import patientsService from "../../services/patients";
import axios from "axios";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";
import type { Dayjs } from "dayjs";
import Alert from "@mui/material/Alert";

interface Props {
  patients: Patient[];
}

export const PatientEntryForm = ({ patients }: Props) => {
  const patientId: string | undefined = useParams().id;

  const [notify, setNotify] = useState("");
  const [submitState, setSubmitState] = useState<boolean>(false);

  const [entryType, setEntryType] = useState<EntryTypeLiterals | "">("");

  // Base form inputs
  const [date, setDate] = useState<Dayjs | null>(null);
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [codeDiagnose, setCodeDiagnose] = useState<string[]>([]);

  // HealthCheck form inputs
  const [healthCheckRating, setHealthCheckRating] = useState<
    HealthCheckRating | undefined
  >(undefined);

  // Hospital form inputs

  // OccupationalHealthCare form inputs
  const dummy: string = "dummy";

  const handleEntryTypeSelection = (event: SelectChangeEvent) => {
    setEntryType(event.target.value as EntryTypeLiterals | "");
  };

  const renderEntryFormFields = () => {
    switch (entryType) {
      case EntryTypeLiterals.HealthCheck:
        return (
          <HealthCheckFormFields
            date={date}
            setDate={setDate}
            specialist={specialist}
            setSpecialist={setSpecialist}
            description={description}
            setDescription={setDescription}
            codeDiagnose={codeDiagnose}
            setCodeDiagnose={setCodeDiagnose}
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating}
          />
        );

      case EntryTypeLiterals.Hospital:
        return (
          <HospitalFormFields
            date={date}
            setDate={setDate}
            specialist={specialist}
            setSpecialist={setSpecialist}
            description={description}
            setDescription={setDescription}
            codeDiagnose={codeDiagnose}
            setCodeDiagnose={setCodeDiagnose}
            dummy={dummy}
          />
        );

      case EntryTypeLiterals.OccupationalHealthcare:
        return (
          <OccupationalHealthCareFormFields
            date={date}
            setDate={setDate}
            specialist={specialist}
            setSpecialist={setSpecialist}
            description={description}
            setDescription={setDescription}
            codeDiagnose={codeDiagnose}
            setCodeDiagnose={setCodeDiagnose}
            dummy={dummy}
          />
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotify("");

    const newPatientEntryBase = {
      date: date?.format("YYYY-MM-DD") ?? "",
      specialist: specialist,
      description: description,
      diagnosisCodes: codeDiagnose,
    };

    let newPatientCompleteEntry: Entry | null = null;

    switch (entryType) {
      case EntryTypeLiterals.HealthCheck:
        newPatientCompleteEntry = {
          ...newPatientEntryBase,
          type: "HealthCheck",
          healthCheckRating,
        };
        break;

      case "Hospital":
        // newPatientCompleteEntry = {
        //   ...newPatientEntryBase,
        //   type: "Hospital",
        //   // discharge: { date, criteria}
        // };
        setNotify("Only Health Check submissions are enabled for testing.");
        return;

      case "Occupational Healthcare":
        // newPatientCompleteEntry = {
        //   ...newPatientEntryBase,
        //   type: "OccupationalHealthcare",
        //   // employerName:
        //   // sickLeave: {startDate, endDate}
        // };
        setNotify("Only Health Check submissions are enabled for testing.");
        return;

      default:
        setNotify("Invalid patient entry form type!");
        setSubmitState(false);
        return;
    }

    try {
      if (!newPatientCompleteEntry) {
        throw new Error("Form submission failed");
      }
      if (!patientId) {
        throw new Error("Patient ID is invalid");
      }

      await patientsService.savePatientEntryLog(
        patientId,
        newPatientCompleteEntry,
      );
      setNotify("Health Check entry saved successfully.");
      setSubmitState(true);
    } catch (error: unknown) {
      if (axios.isAxiosError<{ error?: unknown } | string>(error)) {
        const data = error.response?.data;
        const details = typeof data === "string" ? data : data?.error;

        if (Array.isArray(details)) {
          setNotify(
            details
              .map((issue: unknown) => {
                if (
                  // checks establish that the issue is a non-null object with a message property.
                  // the explicit null check is needed because typeof null is "object"
                  typeof issue === "object" &&
                  issue !== null &&
                  "message" in issue
                ) {

                  // if issue contains path array, join its parts with dots, such as,
                  // ["discharge", "date"] becomes "discharge.date"
                  const field =
                    "path" in issue && Array.isArray(issue.path)
                      ? issue.path.join(".")
                      : "";

                  // if a field name exists, put it before the message, such, as,
                  // healthCheckRating: Invalid input
                  return `${field ? `${field}: ` : ""}${String(issue.message)}`;
                }
                // if issue doesn’t have the expected structure, fallback is to represent message as JSON
                return JSON.stringify(issue);
              })
              .join("; "),
              // example output is 
              // date: Invalid ISO date; healthCheckRating: Invalid input
          );
        } else {
          setNotify(typeof details === "string" ? details : error.message);
        }
      } else if (error instanceof Error) {
        setNotify(error.message);
      } else {
        setNotify("Could not save the patient entry.");
      }
      setSubmitState(false);
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ minWidth: 120, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {notify && (
          <Alert severity={submitState ? "success" : "error"}>{notify}</Alert>
        )}

        <FormControl fullWidth>
          <InputLabel id="entry-type-label">Entry type</InputLabel>
          <Select
            labelId="entry-type-label"
            id="entry-type-select"
            value={entryType}
            label="Entry type"
            onChange={handleEntryTypeSelection}
          >
            {Object.entries(EntryTypeLiterals).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {renderEntryFormFields()}

        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </>
  );
};
