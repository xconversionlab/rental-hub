import { ChevronDown } from "lucide-react";
import { useId } from "react";
import { CITIES, PROVINCES } from "@/domain/catalog";
import { cn } from "@/lib/cn";

export const controlClass =
  "min-h-11 w-full rounded-2xl border border-line bg-card px-3 py-2.5 text-base text-ink outline-none transition-colors focus:border-navy disabled:cursor-not-allowed disabled:opacity-60";

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block" data-invalid={error ? "true" : undefined}>
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {hint ? <span className="mt-1.5 block text-xs text-muted">{hint}</span> : null}
      {error ? (
        <span role="alert" className="mt-1.5 block text-xs text-danger">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(controlClass, props.className)} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(controlClass, "min-h-28 resize-y", props.className)} />;
}

export function SelectInput({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} className={cn(controlClass, "appearance-none pr-10", props.className)}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
    </div>
  );
}

export function ChipSelect({
  label,
  value,
  onChange,
  options,
  error,
  hint,
}: {
  label: string;
  value: string;
  onChange: (id: string) => void;
  options: { id: string; label: string }[];
  error?: string;
  hint?: string;
}) {
  return (
    <fieldset data-invalid={error ? "true" : undefined}>
      <legend className="mb-2 text-sm font-medium text-ink">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.id)}
              className={cn(
                "min-h-11 rounded-full border px-3 py-2 text-sm transition-colors",
                selected ? "border-navy bg-navy text-on-navy" : "border-line bg-card text-ink hover:border-navy",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {hint ? <p className="mt-1.5 text-xs text-muted">{hint}</p> : null}
      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function MultiCheck({
  label,
  values,
  onChange,
  options,
  hint,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: { id: string; label: string }[];
  hint?: string;
}) {
  const selected = new Set(values);
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-ink">{label}</legend>
      {hint ? <p className="mb-2 text-xs text-muted">{hint}</p> : null}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const on = selected.has(option.id);
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={on}
              onClick={() => {
                const next = new Set(selected);
                if (on) next.delete(option.id);
                else next.add(option.id);
                onChange(options.filter((item) => next.has(item.id)).map((item) => item.id));
              }}
              className={cn(
                "min-h-11 rounded-full border px-3 py-2 text-left text-sm transition-colors",
                on ? "border-navy bg-navy text-on-navy" : "border-line bg-card text-ink hover:border-navy",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ToggleRow({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string;
}) {
  return (
    <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-2xl border border-line bg-paper px-3 py-3">
      <input
        type="checkbox"
        className="mt-1 size-4 accent-navy"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        {hint ? <span className="mt-0.5 block text-xs text-muted">{hint}</span> : null}
      </span>
    </label>
  );
}

export function ProvinceCity({
  province,
  city,
  onProvince,
  onCity,
  provinceError,
  cityError,
}: {
  province: string;
  city: string;
  onProvince: (province: string) => void;
  onCity: (city: string) => void;
  provinceError?: string;
  cityError?: string;
}) {
  const listId = useId();
  const cities = CITIES[province] ?? [];
  const known = cities.includes(city);
  const selectValue = !city ? "" : known ? city : "__other";

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Province or territory" error={provinceError}>
        <SelectInput
          value={province}
          onChange={(event) => {
            onProvince(event.target.value);
            onCity("");
          }}
        >
          <option value="">Select</option>
          {PROVINCES.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="City" error={cityError} hint="Choose Other if your city is not in the list.">
        <SelectInput
          value={selectValue}
          disabled={!province}
          onChange={(event) => {
            const next = event.target.value;
            onCity(next === "__other" ? "" : next);
          }}
        >
          <option value="">{province ? "Select" : "Choose a province first"}</option>
          {cities.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
          <option value="__other">Other city</option>
        </SelectInput>
        {selectValue === "__other" ? (
          <TextInput
            className="mt-2"
            aria-label="City name"
            list={listId}
            value={city}
            placeholder="Type the city"
            onChange={(event) => onCity(event.target.value)}
          />
        ) : null}
      </Field>
    </div>
  );
}

export function Section({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-3xl border border-line bg-card p-4 shadow-card sm:p-6">
      <div>
        <p className="text-xs font-medium tracking-widest text-brass uppercase">{kicker}</p>
        <h2 className="font-display text-2xl text-balance text-navy">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker?: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="mb-6 max-w-2xl">
      {kicker ? <p className="text-xs font-medium tracking-widest text-brass uppercase">{kicker}</p> : null}
      <h1 className="font-display text-3xl text-balance text-navy sm:text-4xl">{title}</h1>
      {lede ? <p className="mt-2 text-pretty text-muted">{lede}</p> : null}
    </header>
  );
}
