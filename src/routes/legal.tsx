import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/button";
import { Field, PageHeader, SelectInput, TextArea, TextInput } from "@/components/fields";
import { Shell } from "@/components/shell";
import { INQUIRY_TOPICS } from "@/domain/catalog";
import { formatLong } from "@/domain/format";
import { validateInquiry, type Errors } from "@/domain/validate";
import { backendStatus } from "@/data/backend";
import { useHub } from "@/state/hub";

export const Route = createFileRoute("/legal")({ component: LegalPage });

function LegalPage() {
  const addInquiry = useHub((state) => state.addInquiry);
  const inquiries = useHub((state) => state.inquiries);
  const deleteInquiry = useHub((state) => state.deleteInquiry);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [otpChannel, setOtpChannel] = useState<"mobile" | "email">("mobile");
  const [otpTarget, setOtpTarget] = useState("");
  const [otpNote, setOtpNote] = useState("");
  const [saved, setSaved] = useState(false);
  const backend = backendStatus();

  return (
    <Shell>
      <PageHeader
        kicker="Trust"
        title="Contact and privacy"
        lede="Draft for product review. This is not legal advice, and this preview does not run a live privacy program."
      />

      <article className="space-y-4 rounded-3xl border border-line bg-card p-5 shadow-card">
        <h2 className="font-display text-2xl text-navy">Privacy</h2>
        <p className="text-sm text-pretty text-muted">
          Rental Hub is a Canadian rental marketplace for residential and commercial space, priced in Canadian dollars. In this foundation, records stay in this browser. They are not sent to Supabase, an OTP provider, or a photo host. {backend.provider} is the only store. {backend.planned} is prepared and not connected.
        </p>
        <p className="text-sm text-pretty text-muted">
          Do not put government identity numbers, full credit reports, or banking details into notes. Credit is collected only as a category you choose. Residential requirements store a contact method and time, not a phone number or email. Commercial contact details are optional and shown only on your own requirement.
        </p>
        <h2 className="font-display text-2xl text-navy">Data retention</h2>
        <p className="text-sm text-pretty text-muted">
          Every tenant requirement and landlord listing has a created date and an expiration date. The default life is 60 days. When that date passes, the record is marked expired and treated as unavailable. This foundation does not delete those rows. The data model is ready for a backend job to delete expired marketplace records after you approve that behaviour.
        </p>
        <p className="text-sm text-pretty text-muted">
          Profile details, contact preferences, enquiries, and any future verification information are not on that 60-day clock. They are not deleted automatically. They should not be deleted without an explicit, approved retention policy.
        </p>
        <p className="text-sm text-muted">You can remove your own records, or erase everything on this device, from Profile.</p>
      </article>

      <section className="mt-6 rounded-3xl border border-line bg-card p-5 shadow-card">
        <h2 className="font-display text-2xl text-navy">Verification</h2>
        <p className="mt-2 text-sm text-muted">
          Mobile and email one-time codes are not connected. Requesting a code does not send a message and cannot be checked.
        </p>
        <div className="mt-4 flex gap-2">
          <button type="button" className={otpChannel === "mobile" ? tabOn : tabOff} onClick={() => setOtpChannel("mobile")}>
            Mobile number
          </button>
          <button type="button" className={otpChannel === "email" ? tabOn : tabOff} onClick={() => setOtpChannel("email")}>
            Email
          </button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
          <TextInput
            aria-label={otpChannel === "mobile" ? "Mobile number" : "Email"}
            value={otpTarget}
            onChange={(event) => setOtpTarget(event.target.value)}
            placeholder={otpChannel === "mobile" ? "Mobile number" : "Email"}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOtpNote("No verification service is connected. A code was not sent, and nothing was stored from this field.")}
          >
            Send code
          </Button>
        </div>
        <Field label="Code" hint="Disabled until a real OTP provider is connected and tested.">
          <TextInput disabled placeholder="------" />
        </Field>
        {otpNote ? <p className="text-sm text-danger">{otpNote}</p> : null}
      </section>

      <section className="mt-6 rounded-3xl border border-line bg-card p-5 shadow-card">
        <h2 className="font-display text-2xl text-navy">Contact</h2>
        <p className="mt-2 text-sm text-muted">Questions stay on this device. They are not emailed.</p>
        <form
          className="mt-4 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            const next = validateInquiry({ name, email, topic, message, captcha });
            setErrors(next);
            if (Object.keys(next).length) return;
            addInquiry({
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              name: name.trim(),
              email: email.trim(),
              topic,
              message: message.trim(),
            });
            setName("");
            setEmail("");
            setTopic("");
            setMessage("");
            setCaptcha(false);
            setSaved(true);
          }}
        >
          <Field label="Name" error={errors.name}>
            <TextInput value={name} onChange={(event) => setName(event.target.value)} />
          </Field>
          <Field label="Email" error={errors.email} hint="Optional. Not required to store the question.">
            <TextInput value={email} onChange={(event) => setEmail(event.target.value)} inputMode="email" />
          </Field>
          <Field label="Topic" error={errors.topic}>
            <SelectInput value={topic} onChange={(event) => setTopic(event.target.value)}>
              <option value="">Select</option>
              {INQUIRY_TOPICS.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Message" error={errors.message}>
            <TextArea value={message} onChange={(event) => setMessage(event.target.value)} />
          </Field>
          <label className="flex min-h-11 items-start gap-3 rounded-2xl border border-dashed border-line bg-paper px-3 py-3" data-invalid={errors.captcha ? "true" : undefined}>
            <input type="checkbox" className="mt-1 size-4 accent-navy" checked={captcha} onChange={(event) => setCaptcha(event.target.checked)} />
            <span>
              <span className="block text-sm font-medium">CAPTCHA placeholder</span>
              <span className="block text-xs text-muted">This box does not contact a CAPTCHA provider. It only marks that you meant to save the question on this device.</span>
              {errors.captcha ? <span className="mt-1 block text-xs text-danger">{errors.captcha}</span> : null}
            </span>
          </label>
          <Button type="submit">Save question on this device</Button>
          {saved ? <p className="text-sm text-ok">Saved on this device. It was not sent anywhere.</p> : null}
        </form>
        {inquiries.length ? (
          <ul className="mt-6 space-y-3">
            {inquiries.map((item) => (
              <li key={item.id} className="rounded-2xl border border-line px-3 py-3 text-sm">
                <p className="font-medium text-ink">{item.name} · {formatLong(item.createdAt)}</p>
                <p className="text-muted">{item.message}</p>
                <button type="button" className="mt-2 text-xs font-medium text-danger" onClick={() => deleteInquiry(item.id)}>
                  Delete question
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </Shell>
  );
}

const tabOn = "min-h-11 rounded-full bg-navy px-4 text-sm text-on-navy";
const tabOff = "min-h-11 rounded-full border border-line px-4 text-sm text-navy";
