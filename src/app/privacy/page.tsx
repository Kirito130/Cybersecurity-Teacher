import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy and declarations",
  description:
    "How CyberXP stores account, learning, and support information, and what a certificate or badge means.",
};

export default function PrivacyPage() {
  return (
    <article className="sheet-paper">
      <section className="stage-fit stage">
        <div className="gutter stage-body py-[clamp(1.5rem,5vh,3.5rem)]">
          <h1 className="display max-w-[16ch]">Privacy and declarations.</h1>
          <p className="lede measure mt-6">
            This page describes the information the current CyberXP application
            is built to store. It is a product disclosure for learners. It has
            not had legal review, and it is not a binding privacy policy or
            terms of service until the operator approves final wording.
          </p>
        </div>
      </section>

      <section className="sheet-blush">
        <div className="gutter max-w-3xl space-y-10 py-[clamp(2rem,6vh,4rem)]">
          <section>
            <h2 className="kicker ink">Where records live</h2>
            <p className="mt-3">
              Signed-in accounts, learning records, and uploaded evidence are
              stored in the Supabase project configured for this deployment:
              authentication, Postgres, and a private storage bucket. The app
              does not include advertising or analytics scripts.
            </p>
          </section>
          <section>
            <h2 className="kicker ink">Account information</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Email address, used to sign in and confirm the account.</li>
              <li>
                Password, stored only as a hash by Supabase Auth. CyberXP does
                not keep the password itself.
              </li>
              <li>Display name, chosen at signup or edited on your profile.</li>
              <li>
                Optional profile photo (PNG, JPEG, or WebP, up to 2 MB), stored
                in a public avatars bucket so it can appear in the signed-in
                header.
              </li>
              <li>
                Session cookies that keep you signed in. They are set by the
                auth provider and are not used to track you across other sites.
              </li>
              <li>
                Optional profile fields: timezone and learning goal, plus a
                preferences object reserved for settings you save.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="kicker ink">Learning records</h2>
            <p className="mt-3">
              After you sign in, progress is tied to your account:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Topic, subtopic, and chapter progress, including timestamps.</li>
              <li>
                Chapter quiz and practical attempts, scores, and the answers
                or notes you submit.
              </li>
              <li>Earned badges, experience points, and activity events.</li>
              <li>
                Practical evidence notes and files (PNG, JPEG, WebP, PDF, plain
                text, or Markdown, up to 25 MB) in private storage.
              </li>
              <li>
                Certificates, including a verification code. Anyone with that
                code can check the title, issue time, revocation time, whether
                it is still valid, and the chapter slug. The public check
                does not return your email.
              </li>
              <li>In-app notifications created for your account.</li>
            </ul>
            <p className="mt-3">
              If organization features are used, the database can also store
              organization membership, cohorts, enrollments, and assignments
              linked to your account.
            </p>
          </section>
          <section>
            <h2 className="kicker ink">This browser</h2>
            <p className="mt-3">
              A copy of progress may be kept in this browser under the
              localStorage key <code>cyberxp-progress-v1</code> (completed
              topics, chapter quiz results, and badges). That copy stays on the
              device until you clear site data. Opening chapters, topics, and
              chapter quizzes requires an account, so new study records are
              written for a signed-in learner.
            </p>
          </section>
          <section>
            <h2 className="kicker ink">Help messages</h2>
            <p className="mt-3">
              The Help form stores your name, email, a category (question,
              issue, or account), and the message. If you are signed in, the
              row is also linked to your user id. Messages are saved for the
              team to read. The form does not send an automatic email reply. A
              retention period for these messages has not been set.
            </p>
          </section>
          <section>
            <h2 className="kicker ink">Why this information is kept</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>To create your account and keep the session signed in.</li>
              <li>
                To show your chapters, topics, badges, experience, and
                certificates.
              </li>
              <li>To answer questions and issue reports sent from Help.</li>
            </ul>
          </section>
          <section>
            <h2 className="kicker ink">How long, and how to change it</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Account and learning rows are removed when the auth user is
                deleted, because those tables cascade from the user record.
                Deleting an account from the product screens is not available
                yet. Use Help if you need your data removed.
              </li>
              <li>
                You can edit your display name on Profile, and timezone or
                learning goal in Settings. You can change your password while
                signed in. Logout ends the session in this browser.
              </li>
              <li>
                Guest data in localStorage remains until you clear site data for
                this origin.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="kicker ink">Declarations</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                CyberXP is a study product. A badge or a completed chapter quiz
                and practical is a record of practice inside this product. It is
                not a professional license or a certification issued by another
                organization.
              </li>
              <li>
                A certificate verification result means a matching record exists
                in this database and has not been revoked. It does not, by
                itself, prove identity to an employer.
              </li>
              <li>
                Lab work in the curriculum is for systems you are allowed to
                test. An account does not authorize activity against systems you
                do not own or have permission to test.
              </li>
              <li>
                Home, Roadmap, and Badges can be viewed without an account.
                Chapter and topic pages require you to sign in.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="kicker ink">Questions</h2>
            <p className="mt-3">
              Send questions about your data from the{" "}
              <Link href="/help" className="cite">
                Help
              </Link>{" "}
              page. Choose the Account category when the message is about access
              or deletion.
            </p>
          </section>
        </div>
      </section>
    </article>
  );
}
