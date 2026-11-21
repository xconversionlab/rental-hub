import { Camera, RefreshCw, X } from "lucide-react";
import { useRef, useState } from "react";
import { MAX_PHOTOS } from "@/domain/catalog";
import { cn } from "@/lib/cn";

async function compressImage(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) throw new Error("That image could not be read. Use a JPEG or PNG.");
  const max = 1280;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser could not prepare the photograph.");
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();
  return canvas.toDataURL("image/jpeg", 0.72);
}

export function PhotoPicker({
  photos,
  onChange,
  error,
}: {
  photos: string[];
  onChange: (photos: string[]) => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const [replaceAt, setReplaceAt] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  async function addFiles(files: FileList | null, index: number | null) {
    if (!files || files.length === 0) return;
    setMessage("");
    try {
      if (index !== null) {
        const next = photos.slice();
        next[index] = await compressImage(files[0]);
        onChange(next);
        return;
      }
      const room = MAX_PHOTOS - photos.length;
      if (room <= 0) {
        setMessage(`A property can include at most ${MAX_PHOTOS} photographs.`);
        return;
      }
      const chosen = Array.from(files).slice(0, room);
      if (files.length > room) {
        setMessage(`Only ${room} more photograph${room === 1 ? "" : "s"} can be added. The limit is ${MAX_PHOTOS}.`);
      }
      const encoded = [];
      for (const file of chosen) encoded.push(await compressImage(file));
      onChange([...photos, ...encoded]);
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "That image could not be added.");
    }
  }

  return (
    <div data-invalid={error ? "true" : undefined}>
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink">Photographs</p>
          <p className="mt-1 text-xs text-muted">
            Optional until a listing policy says otherwise. Up to {MAX_PHOTOS}. They stay with this property on this device.
          </p>
        </div>
        <p className="text-sm tabular-nums text-muted">
          {photos.length} of {MAX_PHOTOS}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((src, index) => (
          <div key={`${index}-${src.slice(0, 32)}`} className="overflow-hidden rounded-2xl border border-line bg-paper">
            <img src={src} alt={`Photograph ${index + 1} of this property`} className="aspect-[3/2] w-full object-cover" />
            <div className="grid grid-cols-2 border-t border-line">
              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center gap-1 text-xs font-medium text-ink"
                onClick={() => {
                  setReplaceAt(index);
                  replaceRef.current?.click();
                }}
              >
                <RefreshCw className="size-3.5" aria-hidden="true" />
                Replace
              </button>
              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center gap-1 border-l border-line text-xs font-medium text-danger"
                onClick={() => onChange(photos.filter((_, item) => item !== index))}
              >
                <X className="size-3.5" aria-hidden="true" />
                Remove
              </button>
            </div>
          </div>
        ))}
        {photos.length < MAX_PHOTOS ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex aspect-[3/2] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line bg-paper text-sm text-navy",
              "min-h-28",
            )}
          >
            <Camera className="size-5" aria-hidden="true" />
            Add from gallery
          </button>
        ) : null}
      </div>
      <input
        ref={inputRef}
        className="sr-only"
        type="file"
        accept="image/*"
        multiple
        onChange={(event) => {
          void addFiles(event.target.files, null);
          event.target.value = "";
        }}
      />
      <input
        ref={replaceRef}
        className="sr-only"
        type="file"
        accept="image/*"
        onChange={(event) => {
          void addFiles(event.target.files, replaceAt);
          event.target.value = "";
          setReplaceAt(null);
        }}
      />
      {message ? (
        <p role="alert" className="mt-2 text-xs text-danger">
          {message}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mt-2 text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
