import { fromThrowable } from 'neverthrow';

const safeJsonParse = fromThrowable(JSON.parse, (err) => err);

export { safeJsonParse };
