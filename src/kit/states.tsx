import { StampLink } from "@/kit/controls";

export function EmptyNote({
  title,
  body,
  href,
  action,
}: {
  title: string;
  body: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="panel">
      <h2 className="kicker ink">{title}</h2>
      <p className="mt-3 measure lede">{body}</p>
      {href && action ? (
        <div className="mt-6">
          <StampLink href={href}>{action}</StampLink>
        </div>
      ) : null}
    </div>
  );
}

export function ErrorNote({
  title = "Something failed",
  body,
}: {
  title?: string;
  body: string;
}) {
  return (
    <div className="panel" role="alert">
      <h2 className="kicker ink">{title}</h2>
      <p className="mt-3 measure">{body}</p>
    </div>
  );
}

export function OfflineNote() {
  return (
    <p className="warn" role="status">
      The request did not go through. Check the connection and try again. Your typed
      answers are still here.
    </p>
  );
}
