import { OccupationalHealthcareEntry } from "../types";
import Card from '@mui/material/Card';
import { resolveEntryDetailsIcon } from "./EntryDetails";

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Card>
      <div>{entry.date} {resolveEntryDetailsIcon(entry)} {entry.employerName}</div>
      <i>{entry.description}</i>
      <div>diagnosed by {entry.specialist}</div>
    </Card>
  );
};

export default OccupationalHealthcareEntryDetails;
