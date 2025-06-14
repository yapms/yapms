import { fromThrowable } from "neverthrow";

export default fromThrowable(JSON.parse, (err) => err);
