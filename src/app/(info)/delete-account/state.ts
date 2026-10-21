/** What can go wrong on the /delete-account form. Each maps to one message in the form. */
export type DeleteError =
  | "invalid_email"
  | "invalid_code"
  | "otp_invalid"
  | "otp_expired"
  | "otp_too_many_attempts"
  | "rate_limited"
  | "unavailable";

/** The /delete-account form's state, returned by deleteAccountAction. */
export type DeleteState =
  | { step: "email"; error?: DeleteError }
  | { step: "code"; email: string; error?: DeleteError; attemptsLeft?: number; resent?: boolean }
  | { step: "done"; email: string };

export const initialState: DeleteState = { step: "email" };
