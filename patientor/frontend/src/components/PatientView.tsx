import { useParams } from "react-router-dom";
import {
  type Patient,
  Gender,
  type Entry,
  type Diagnosis,
  healthCheckRatingLabels,
  HealthCheckRating,
} from "../types";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";
import axios from "axios";
import { useEffect, useState } from "react";

import TransgenderIcon from "@mui/icons-material/Transgender";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import RateReviewIcon from "@mui/icons-material/RateReview";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AirlineSeatFlatIcon from "@mui/icons-material/AirlineSeatFlat";

export const PatientView = () => {
  const patientId: string | undefined = useParams().id;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [diagnoses, setDiagnoses] = useState<Array<Diagnosis> | null>(null);

  useEffect(() => {
    // tracks if effect should update component
    let active = true;

    // fetchPatient function definition
    const fetchPatient = async () => {
      // reset patient data and error
      // set component to loading state
      setPatient(null);
      setError(null);
      setDiagnoses(null);

      try {
        // pause fetchPatient until promise is returned
        // React continues rendering and responding to input while request is pending
        const data = await patientService.getById(patientId);

        if (active) setPatient(data);

        const dataDiagnoses: Array<Diagnosis> = [];

        for (const entry of data.entries) {
          // ?? [] supplies an empty array when diagnosisCodes is undefined.
          for (const code of entry.diagnosisCodes ?? []) {
            const diagnosis = await diagnosesService.getByCode(code);
            dataDiagnoses.push(diagnosis);
          }
        }

        if (active) setDiagnoses(dataDiagnoses);
      } catch (e: unknown) {
        if (!active) return;

        if (axios.isAxiosError(e) && e.response?.status === 404) {
          setError("patient or diagnosis does not exists");
        } else {
          setError("Could not load patient");
        }
      }
    };

    // called after definition
    void fetchPatient();

    // effect’s cleanup
    return () => {
      active = false;
    };
  }, [patientId]);
  // dependency array
  // effect runs on mount and again whenever patientId change

  if (error) return <p>{error}</p>;
  if (!patient) return <p>Loading...</p>;

  const genderSymbol = (gender: Gender) => {
    switch (gender) {
      case Gender.Female:
        // return "♀️";
        return <FemaleIcon fontSize="large" />;
      case Gender.Male:
        // return "♂️";
        return <MaleIcon fontSize="large" />;
      case Gender.Other:
        // return "⚧️";
        return <TransgenderIcon fontSize="large" />;
      default:
        return "gender unknown";
    }
  };

  const healthCheckRatingSymbol = (rating: HealthCheckRating | undefined) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return (
          <p>
            <FavoriteIcon fontSize="medium" sx={{ color: "#2ad590" }} />{" "}
            {healthCheckRatingLabels[rating]}
          </p>
        );

      case HealthCheckRating.LowRisk:
        return (
          <p>
            <FavoriteIcon fontSize="medium" sx={{ color: "#9c56a9" }} />{" "}
            {healthCheckRatingLabels[rating]}
          </p>
        );

      case HealthCheckRating.HighRisk:
        return (
          <p>
            <FavoriteIcon fontSize="medium" sx={{ color: "#d95d26" }} />{" "}
            {healthCheckRatingLabels[rating]}
          </p>
        );

      case HealthCheckRating.CriticalRisk:
        return (
          <p>
            <FavoriteIcon fontSize="medium" sx={{ color: "#e61949" }} />{" "}
            {healthCheckRatingLabels[rating]}
          </p>
        );

      default:
        return (
          <p>
            <FavoriteBorderIcon fontSize="medium" sx={{ color: "#70828f" }} />{" "}
            Empty health check rating.
          </p>
        );
    }
  };

  const getDiagnosisCodeDescription = (code: string) => {
    const result = diagnoses?.find((d) => d.code === code);
    return result?.name;
  };

  const patientEntryStyle = {
    border: "2px solid black",
    marginTop: "10px",
    marginBottom: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    borderRadius: "12px",
  };
  const printPatientLogEntries = (entry: Entry, idx: number) => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <div key={idx} style={patientEntryStyle}>
            <p>
              {entry.date} <MedicalServicesIcon />
            </p>
            <p>
              <i>{entry.description}</i>
            </p>
            {healthCheckRatingSymbol(entry.healthCheckRating)}
            <p>
              <RateReviewIcon fontSize="medium" />
              diagnosed by {entry.specialist}
            </p>
          </div>
        );
      case "Hospital":
        return (
          <div key={idx} style={patientEntryStyle}>
            <p>
              {entry.date} <AirlineSeatFlatIcon />
            </p>
            <p>
              <i>{entry.description}</i>
            </p>
            <ul>
              {entry.diagnosisCodes?.map((code: string, idx: number) => (
                <li key={idx}>
                  {code} {getDiagnosisCodeDescription(code)}
                </li>
              ))}
            </ul>
            <p>
              <RateReviewIcon fontSize="medium" />
              diagnosed by {entry.specialist}
            </p>
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <div key={idx} style={patientEntryStyle}>
            <p>
              {entry.date} <WorkIcon /> {entry.employerName}
            </p>
            <p>
              <i>{entry.description}</i>
            </p>

            <ul>
              {entry.diagnosisCodes?.map((code: string, idx: number) => (
                <li key={idx}>
                  {code} {getDiagnosisCodeDescription(code)}
                </li>
              ))}
            </ul>
            <p>
              <RateReviewIcon fontSize="medium" />
              diagnosed by {entry.specialist}
            </p>
          </div>
        );
      default:
        return <p>Patient has no entries</p>;
    }
  };

  return (
    <>
      <h2>
        {patient.name} {genderSymbol(patient.gender)}
      </h2>
      <p>ssn: {patient.ssn} </p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
      <h3>entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries.</p>
      ) : (
        patient.entries.map((entry: Entry, idx: number) =>
          printPatientLogEntries(entry, idx),
        )
      )}
    </>
  );
};
