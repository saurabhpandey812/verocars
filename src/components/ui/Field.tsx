export function Field({
  id,
  label,
  error,
  hint,
  className = "",
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
        {props.required ? <span className="text-[#b3261e]"> *</span> : null}
      </label>
      <input
        id={id}
        name={id}
        className={`field ${error ? "!border-[#b3261e]" : ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${id}-err`} role="alert" className="err">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-mute">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
