import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { Field, PageHeader, SelectInput, TextInput } from "@/components/fields";
import { Shell } from "@/components/shell";
import { CONTACT_METHODS, CONTACT_TIMES, PROVINCES } from "@/domain/catalog";
import { validateProfile, type Errors } from "@/domain/validate";
import { backendStatus } from "@/data/backend";
import { useHub } from "@/state/hub";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const profile = useHub((state) => state.profile);
  const hydrated = useHub((state) => state.hydrated);
  const updateProfile = useHub((state) => state.updateProfile);
  const resetRecords = useHub((state) => state.resetRecords);
  const eraseDevice = useHub((state) => state.eraseDevice);
  const navigate = useNavigate();
  const [draft, setDraft] = useState(profile);
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);
  const [confirmErase, setConfirmErase] = useState(false);
  const backend = backendStatus();

  useEffect(() => {
    if (hydrated) setDraft(profile);
  }, [hydrated, profile]);

  return (
    <Shell>
      <PageHeader
        kicker="Profile and settings"
        title="Your details on this device"
        lede="There is no account server. A display name, role, and contact preference are enough to use the desks."
      />
      <form
        className="space-y-4 rounded-3xl border border-line bg-card p-5 shadow-card"
        onSubmit={(event) => {
          event.preventDefault();
          const next = validateProfile(draft);
          setErrors(next);
          if (Object.keys(next).length) return;
          updateProfile(draft);
          setSaved(true);
        }}
      >
        <Field label="Display name" error={errors.displayName} hint="Shown on your own records. Not published as a legal name.">
          <TextInput value={draft.displayName} onChange={(event) => setDraft({ ...draft, displayName: event.target.value })} />
        </Field>
        <Field label="Role">
          <SelectInput
            value={draft.role}
            onChange={(event) => setDraft({ ...draft, role: event.target.value === "landlord" ? "landlord" : event.target.value === "tenant" ? "tenant" : "" })}
          >
            <option value="">Not chosen</option>
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
          </SelectInput>
        </Field>
        <Field label="Home province">
          <SelectInput value={draft.province} onChange={(event) => setDraft({ ...draft, province: event.target.value })}>
            {PROVINCES.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Preferred contact method" error={errors.contactMethod}>
          <SelectInput value={draft.contactMethod} onChange={(event) => setDraft({ ...draft, contactMethod: event.target.value })}>
            {CONTACT_METHODS.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Preferred contact time" error={errors.contactTime}>
          <SelectInput value={draft.contactTime} onChange={(event) => setDraft({ ...draft, contactTime: event.target.value })}>
            {CONTACT_TIMES.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Mobile" error={errors.mobile} hint="Optional. Stored only on this device. Not copied onto listings.">
          <TextInput value={draft.mobile} inputMode="tel" onChange={(event) => setDraft({ ...draft, mobile: event.target.value })} />
        </Field>
        <Field label="Email" error={errors.email} hint="Optional. Stored only on this device.">
          <TextInput value={draft.email} inputMode="email" onChange={(event) => setDraft({ ...draft, email: event.target.value })} />
        </Field>
        <Button type="submit">Save profile</Button>
        {saved ? <p className="text-sm text-ok">Saved on this device.</p> : null}
      </form>

      <section className="mt-6 rounded-3xl border border-line bg-card p-5">
        <h2 className="font-display text-2xl text-navy">Connection</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between gap-4"><dt className="text-muted">Records</dt><dd>{backend.provider}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-muted">Planned backend</dt><dd>{backend.planned}, not connected</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-muted">OTP</dt><dd>Not connected</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-muted">Photographs</dt><dd>On this device, five per listing</dd></div>
        </dl>
        <Link to="/legal" className="mt-4 inline-flex text-sm font-medium text-navy">
          Privacy, retention, and contact
        </Link>
      </section>

      <section className="mt-6 space-y-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            resetRecords();
            setSaved(false);
          }}
        >
          Restore sample marketplace data
        </Button>
        {confirmErase ? (
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              eraseDevice();
              void navigate({ to: "/welcome" });
            }}
          >
            Confirm erase
          </Button>
        ) : (
          <Button type="button" variant="danger" onClick={() => setConfirmErase(true)}>
            Erase everything on this device
          </Button>
        )}
        <p className="text-xs text-muted">
          Restoring samples removes requirements, listings, and questions you added. Erasing also clears your role and profile. Neither action deletes a server account, because there is no account.
        </p>
      </section>
    </Shell>
  );
}
