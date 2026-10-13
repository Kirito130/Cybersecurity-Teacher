"use client";

import { useState, type FormEvent } from "react";
import { AreaSlot, Field, SelectSlot, Stamp, TextSlot } from "@/kit/controls";
import { ErrorNote } from "@/kit/states";

const categories = [
  { value: "question", label: "Question" },
  { value: "issue", label: "Issue" },
  { value: "account", label: "Account" },
] as const;

export function HelpView({
  supportEmail,
  inboxReady,
}: {
  supportEmail: string | null;
  inboxReady: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]["value"]>("question");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!inboxReady) return;
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, category, message }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "The message could not be saved.");
        return;
      }
      setDone(true);
      setMessage("");
    } catch {
      setError("The request did not go through. Check the connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <article className="sheet-paper">
      <section className="stage-fit stage">
        <div className="gutter stage-body py-[clamp(1.5rem,5vh,3.5rem)]">
          <h1 className="display">Help.</h1>
          <p className="lede measure mt-6">
            Send a question or an issue report. This page is public. Chapter and
            topic pages stay behind the account.
          </p>
          {supportEmail ? (
            <p className="mt-4 fine">
              Direct email:{" "}
              <a className="cite" href={`mailto:${supportEmail}`}>
                {supportEmail}
              </a>
            </p>
          ) : null}
        </div>
      </section>
      <section className="sheet-blush">
        <div className="gutter max-w-xl py-[clamp(2rem,6vh,4rem)]">
          {!inboxReady ? (
            <ErrorNote body="The inbox is not available in this environment. The form is closed until the server key is configured." />
          ) : done ? (
            <p className="kicker" role="status">
              Saved. The team can read it from the inbox. There is no automatic
              reply.
            </p>
          ) : (
            <form className="space-y-5" onSubmit={(event) => void onSubmit(event)}>
              <Field id="help-name" label="Name">
                <TextSlot
                  id="help-name"
                  required
                  maxLength={80}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Field>
              <Field id="help-email" label="Email">
                <TextSlot
                  id="help-email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Field>
              <Field id="help-category" label="Category">
                <SelectSlot
                  id="help-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value as (typeof categories)[number]["value"])
                  }
                >
                  {categories.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </SelectSlot>
              </Field>
              <Field id="help-message" label="Message" hint="At least 10 characters. 4000 at most.">
                <AreaSlot
                  id="help-message"
                  required
                  minLength={10}
                  maxLength={4000}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </Field>
              {error ? <p className="warn" role="alert">{error}</p> : null}
              <Stamp type="submit" disabled={pending}>
                {pending ? "Sending…" : "Send message"}
              </Stamp>
            </form>
          )}
        </div>
      </section>
    </article>
  );
}
