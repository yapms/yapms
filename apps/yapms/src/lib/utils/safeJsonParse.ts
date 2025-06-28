import { fromThrowable } from 'neverthrow';

const safeJsonParse = fromThrowable(JSON.parse, (err) => err);
const safeATOB = fromThrowable(atob, (err) => err);

export { safeJsonParse, safeATOB };
