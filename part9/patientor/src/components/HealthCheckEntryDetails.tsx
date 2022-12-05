import { HealthCheckEntry } from "../types";
import Card from '@mui/material/Card';
import { resolveEntryDetailsIcon } from "./EntryDetails";
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Card>
      <div>{entry.date} {resolveEntryDetailsIcon(entry)}</div>
      <i>{entry.description}</i>
      <div>
        {resolveHealthCheckIcon(entry)}
      </div>
      <div>diagnosed by {entry.specialist}</div>
    </Card>
  );
};

export const resolveHealthCheckIcon = (entry: HealthCheckEntry) => {
  if (entry.healthCheckRating === 0) {
    return <FavoriteIcon style={{ color: 'green' }} />;
  } else if (entry.healthCheckRating === 1) {
    return <FavoriteIcon style={{ color: 'yellow' }} />;
  } else if (entry.healthCheckRating === 2) {
    return <FavoriteIcon style={{ color: 'orange' }} />;
  } else if (entry.healthCheckRating === 3) {
    return <FavoriteIcon style={{ color: 'red' }} />;
  }
};

export default HealthCheckEntryDetails;
