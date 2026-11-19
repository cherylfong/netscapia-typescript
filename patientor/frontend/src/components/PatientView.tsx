import { useParams } from "react-router-dom";
import { type Patient, Gender, type Entry } from "../types";
import patientService from "../services/patients";
import axios from "axios";
import { useEffect, useState } from "react";

import TransgenderIcon from "@mui/icons-material/Transgender";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import RateReviewIcon from "@mui/icons-material/RateReview";

export const PatientView = () => {
  const patientId: string | undefined = useParams().id;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // tracks if effect should update component
    let active = true;

    // fetchPatient function definition
    const fetchPatient = async () => {
      // reset patient data and error
      // set component to loading state
      setPatient(null);
      setError(null);

      try {
        // pause fetchPatient until promise is returned
        // React continues rendering and responding to input while request is pending
        const data = await patientService.getById(patientId);

        if (active) setPatient(data);
      } catch (e: unknown) {
        if (!active) return;

        if (axios.isAxiosError(e) && e.response?.status === 404) {
          setError("patient does not exists");
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

  const printPatientLogEntries = (entry: Entry, idx: number) => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <div key={idx}>
            <p>{entry.date}</p>
            <p>
              <i>{entry.description}</i>
            </p>
            <p>{entry.healthCheckRating}</p>
            <p>
              <RateReviewIcon fontSize="medium" />
              diagnosed by {entry.specialist}
            </p>
          </div>
        );
      case "Hospital":
        return (
          <div key={idx}>
            <p>{entry.date}</p>
            <p>
              <i>{entry.description}</i>
            </p>
            <ul>
              {entry.diagnosisCodes?.map((code: string) => (
                <li>{code}</li>
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
          <div key={idx}>
            <p>
              {entry.date} {entry.employerName}
            </p>
            <p>
              <i>{entry.description}</i>
            </p>

            <ul>
              {entry.diagnosisCodes?.map((code: string) => (
                <li>{code}</li>
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
