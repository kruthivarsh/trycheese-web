"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { deleteAccountAction } from "@/app/(info)/delete-account/actions";
import { initialState, type DeleteError } from "@/app/(info)/delete-account/state";
import { SITE } from "@/lib/site";

/** Seconds "Send a new code" stays disabled after each code is sent (the API's own cooldown). */
const RESEND_WAIT_S = 30;

const mail = (
  <a className="underline decoration-alert/60 underline-offset-2 hover:decoration-alert" href={`mailto:${SITE.email}`}>
    {SITE.email}
  </a>
);

function message(error: DeleteError, attemptsLeft?: number): ReactNode {
  switch (error) {
    case "invalid_email":
      return "That doesn’t look like an email address.";
    case "invalid_code":
      return "Enter the 6 digits from the email.";
    case "otp_invalid":
      return typeof attemptsLeft === "number"
        ? `That code isn’t right. ${attemptsLeft} ${attemptsLeft === 1 ? "try" : "tries"} left.`
        : "That code isn’t right.";
    case "otp_expired":
      return "That code has expired. Send a new one.";
    case "otp_too_many_attempts":
      return "Too many tries. Send a new code.";
    case "rate_limited":
      return <>Too many requests from here. Try again in an hour, or email {mail}.</>;
    case "unavailable":
      return (
        <>
          Deleting accounts on the website isn&rsquo;t working right now. Try
          again later, delete it in the app, or email {mail} from the address on
          your account.
        </>
      );
  }
}

const headingClass = "display text-[clamp(1.85rem,3.5vw,2.4rem)]";
const labelClass = "mt-6 block text-[15px] font-semibold text-paper";
const inputClass =
  "mt-2 block w-full rounded-2xl border border-line bg-darkroom px-4 py-3 text-[16px] text-paper placeholder:text-grain";
const errorClass = "mt-2 text-[15px] leading-relaxed text-alert";
const pill =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-[15px] font-semibold text-darkroom transition-opacity disabled:cursor-not-allowed disabled:opacity-60";
const primaryClass = `${pill} bg-cheese`;
const destructiveClass = `${pill} bg-alert`;
const secondaryClass =
  "text-[15px] text-paper/80 underline decoration-cheese/50 underline-offset-4 hover:text-paper hover:decoration-cheese disabled:cursor-not-allowed disabled:text-grain disabled:no-underline";
const textClass = "mt-4 text-[16px] leading-relaxed text-paper/80";

/**
 * The /delete-account form: email, then the 6-digit code, then done. All three
 * steps post to deleteAccountAction, which reads only the submitted fields, so
 * the form also works before the page hydrates.
 */
export function DeleteAccountForm() {
  const [state, formAction, isPending] = useActionState(deleteAccountAction, initialState);
  const [email, setEmail] = useState(state.step === "email" ? "" : state.email);
  const [intent, setIntent] = useState<string | null>(null);

  // Every code sent (a code step without an error) restarts the resend countdown.
  const [seen, setSeen] = useState(state);
  const [sends, setSends] = useState(0);
  if (state !== seen) {
    setSeen(state);
    if (state.step === "code" && !state.error) setSends((n) => n + 1);
  }

  // When the step changes, focus moves to its heading.
  const heading = useRef<HTMLHeadingElement>(null);
  const shownStep = useRef(state.step);
  useEffect(() => {
    if (shownStep.current === state.step) return;
    shownStep.current = state.step;
    heading.current?.focus();
  }, [state.step]);

  const error = state.step === "done" ? undefined : state.error;

  return (
    <form action={formAction}>
      {state.step === "email" && (
        <>
          <h2 ref={heading} tabIndex={-1} className={headingClass}>
            enter your <span className="accent">email.</span>
          </h2>
          <label htmlFor="delete-email" className={labelClass}>
            Email address on your account
          </label>
          <input
            id="delete-email"
            type="email"
            name="email"
            autoComplete="email"
            spellCheck={false}
            required
            maxLength={254}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error === "invalid_email" || undefined}
            aria-describedby={error ? "delete-email-error" : undefined}
            className={inputClass}
          />
          {error && (
            <p role="alert" id="delete-email-error" className={errorClass}>
              {message(error)}
            </p>
          )}
          <button
            type="submit"
            name="intent"
            value="request"
            disabled={isPending}
            onClick={() => setIntent("request")}
            className={`mt-6 ${primaryClass}`}
          >
            {isPending ? "Sending code" : "Email me a code"}
          </button>
          <p className="mt-5 text-[14px] leading-relaxed text-paper/60">
            We send a code whether or not this address has an account, so this
            page can&rsquo;t be used to check who uses trycheese.
          </p>
        </>
      )}

      {state.step === "code" && (
        <>
          <h2 ref={heading} tabIndex={-1} className={headingClass}>
            check your <span className="accent">email.</span>
          </h2>
          <p className={textClass}>
            If you can read mail at <strong className="font-semibold text-paper">{state.email}</strong>, a
            6-digit code is on its way. It works for 10 minutes.
          </p>
          {state.resent && !error && (
            <p role="status" className="mt-3 text-[15px] font-medium text-cheese">
              If this address can get another code now, it&rsquo;s on its way.
              An address gets at most 5 codes an hour.
            </p>
          )}
          <input type="hidden" name="email" value={state.email} />
          <label htmlFor="delete-code" className={labelClass}>
            6-digit code
          </label>
          <input
            id="delete-code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d{6}"
            maxLength={6}
            required
            aria-invalid={(error && error !== "rate_limited" && error !== "unavailable") || undefined}
            aria-describedby={error ? "delete-code-error" : undefined}
            className={`${inputClass} max-w-[16rem] font-semibold tracking-[0.3em] tabular-nums`}
          />
          {error && (
            <p role="alert" id="delete-code-error" className={errorClass}>
              {message(error, state.attemptsLeft)}
            </p>
          )}
          <button
            type="submit"
            name="intent"
            value="confirm"
            disabled={isPending}
            onClick={() => setIntent("confirm")}
            className={`mt-6 ${destructiveClass}`}
          >
            {isPending && intent === "confirm" ? "Deleting" : "Delete my account"}
          </button>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            <ResendButton key={sends} wait={sends > 0} pending={isPending} onClick={() => setIntent("resend")} />
            <button
              type="submit"
              name="intent"
              value="restart"
              formNoValidate
              disabled={isPending}
              onClick={() => setIntent("restart")}
              className={secondaryClass}
            >
              Use a different email
            </button>
          </div>
        </>
      )}

      {state.step === "done" && (
        <>
          <h2 ref={heading} tabIndex={-1} className={headingClass}>
            request <span className="accent">received.</span>
          </h2>
          <p className={textClass}>
            If <strong className="font-semibold text-paper">{state.email}</strong> belongs to a trycheese
            account, it&rsquo;s now switched off and will be deleted for good
            30 days after it was first asked for. We&rsquo;ve emailed the date,
            and what to do if you change your mind, to that address.
          </p>
          <p className={textClass}>
            <Link
              className="text-paper underline decoration-cheese/50 underline-offset-4 hover:decoration-cheese"
              href="/support#delete-your-account"
            >
              More about deleting your account
            </Link>
          </p>
          <button
            type="submit"
            name="intent"
            value="restart"
            formNoValidate
            disabled={isPending}
            onClick={() => setIntent("restart")}
            className={`mt-6 ${secondaryClass}`}
          >
            Start over
          </button>
        </>
      )}
    </form>
  );
}

/**
 * "Send a new code". Remounted (by key) for every code sent; when [wait] it
 * counts down from RESEND_WAIT_S first. Without JavaScript it is never disabled,
 * and the API's own cooldown applies.
 */
function ResendButton({ wait, pending, onClick }: { wait: boolean; pending: boolean; onClick: () => void }) {
  const [left, setLeft] = useState(wait ? RESEND_WAIT_S : 0);
  useEffect(() => {
    if (!wait) return;
    const until = Date.now() + RESEND_WAIT_S * 1000;
    const id = setInterval(() => {
      const s = Math.max(0, Math.ceil((until - Date.now()) / 1000));
      setLeft(s);
      if (s === 0) clearInterval(id);
    }, 500);
    return () => clearInterval(id);
  }, [wait]);

  return (
    <button
      type="submit"
      name="intent"
      value="resend"
      formNoValidate
      disabled={pending || left > 0}
      onClick={onClick}
      className={secondaryClass}
    >
      {left > 0 ? `Send a new code in ${left}s` : "Send a new code"}
    </button>
  );
}
