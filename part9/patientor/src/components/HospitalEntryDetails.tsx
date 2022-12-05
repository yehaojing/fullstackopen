import { HospitalEntry } from "../types";
import Card from '@mui/material/Card';
import { resolveEntryDetailsIcon } from "./EntryDetails";

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Card>
      <div>{entry.date} {resolveEntryDetailsIcon(entry)} </div>
      <i>{entry.description}</i>

      <div>diagnosed by {entry.specialist}</div>
    </Card>
  );
};

export default HospitalEntryDetails;
