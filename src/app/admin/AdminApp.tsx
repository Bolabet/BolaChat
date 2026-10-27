"use client";

import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { MarketCode, MarketCopy } from "@/types/market";
import { MAX_TERMS, type PowerPlay, type PowerPlayTerm, type PowerPlaysContent } from "@/types/powerplays";
import type { StagedImage } from "@/lib/admin/store";
import { BolaWordmark } from "@/components/ui/BolaWordmark";
import { cx } from "@/lib/utils";

export interface AdminMarket {
  code: MarketCode;
  name: string;
  comingSoon: boolean;
  example: MarketCopy["powerPlayExample"];
}

type Session = "loading" | "disabled" | "signed-out" | "signed-in";

/* ------------------------------------------------------------ helpers */

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw Object.assign(new Error(data.error || `Request failed (${response.status})`), {
      status: response.status,
    });
  }
  return data as T;
}

/**
 * Shrinks large photos before upload (max 2000px, JPEG) so they stay under
 * the upload limit and don't bloat the site.
 */
async function prepareImage(file: File): Promise<Blob> {
  const MAX_SIDE = 2000;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size <= 1.5 * 1024 * 1024) return file;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not process image"))),
      "image/jpeg",
      0.85
    )
  );
}

function newId(): string {
  return Math.random().toString(36).slice(2, 10);
}

const inputClass =
  "w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none";

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

function AdminButton({
  variant = "secondary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" }) {
  return (
    <button
      type="button"
      {...props}
      className={cx(
        "rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-accent text-accent-foreground hover:brightness-95",
        variant === "secondary" && "border border-foreground/20 bg-background hover:border-foreground/50",
        variant === "danger" && "border border-danger/50 text-danger hover:bg-danger/10",
        className
      )}
    />
  );
}

/* --------------------------------------------------------------- app */

export function AdminApp({ markets }: { markets: AdminMarket[] }) {
  const [session, setSession] = useState<Session>("loading");

  useEffect(() => {
    api<{ enabled: boolean; signedIn: boolean }>("/api/admin/session")
      .then((s) => setSession(!s.enabled ? "disabled" : s.signedIn ? "signed-in" : "signed-out"))
      .catch(() => setSession("signed-out"));
  }, []);

  async function signOut() {
    await api("/api/admin/session", { method: "DELETE" }).catch(() => {});
    setSession("signed-out");
  }

  return (
    <main className="flex-1 py-10">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <BolaWordmark className="text-base" />
            <h1 className="font-heading mt-1 text-2xl">PowerPlays admin</h1>
          </div>
          {session === "signed-in" && <AdminButton onClick={signOut}>Sign out</AdminButton>}
        </header>

        {session === "loading" && <p className="text-sm text-muted">Loading...</p>}
        {session === "disabled" && (
          <p className="rounded-md border border-border bg-background-elevated p-6 text-sm text-muted">
            The admin panel is switched off. Set <code>ADMIN_PASSWORD</code> (and{" "}
            <code>ADMIN_GITHUB_TOKEN</code>) in the hosting environment to enable it - see the README.
          </p>
        )}
        {session === "signed-out" && <SignIn onSignedIn={() => setSession("signed-in")} />}
        {session === "signed-in" && (
          <Editor markets={markets} onSignedOut={() => setSession("signed-out")} />
        )}
      </div>
    </main>
  );
}

function SignIn({ onSignedIn }: { onSignedIn: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      onSignedIn();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-sm space-y-4 rounded-md border border-border bg-background-elevated p-6"
    >
      <Field label="Password">
        <input
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />
      </Field>
      {error && <p className="text-sm text-danger">{error}</p>}
      <AdminButton type="submit" variant="primary" disabled={busy || !password}>
        {busy ? "Signing in..." : "Sign in"}
      </AdminButton>
    </form>
  );
}

/* ------------------------------------------------------------ editor */

function Editor({ markets, onSignedOut }: { markets: AdminMarket[]; onSignedOut: () => void }) {
  const [code, setCode] = useState<MarketCode>(markets.find((m) => !m.comingSoon)?.code ?? markets[0].code);
  // Bumped to throw away unsaved edits and reload from the server.
  const [revision, setRevision] = useState(0);
  const [dirty, setDirty] = useState(false);

  function discardAnd(action: () => void) {
    if (dirty && !window.confirm("You have unsaved changes. Discard them?")) return;
    setDirty(false);
    action();
  }

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  return (
    <div className="space-y-8">
      <nav className="flex flex-wrap gap-2" aria-label="Market">
        {markets.map((m) => (
          <button
            key={m.code}
            type="button"
            onClick={() => m.code !== code && discardAnd(() => setCode(m.code))}
            aria-current={m.code === code ? "page" : undefined}
            className={cx(
              "rounded-md border px-4 py-2 text-sm font-semibold transition-colors",
              m.code === code
                ? "border-accent text-accent"
                : "border-border text-muted hover:text-foreground"
            )}
          >
            {m.name}
            {m.comingSoon && <span className="ml-1 font-normal">(coming soon)</span>}
          </button>
        ))}
      </nav>

      <MarketEditor
        key={`${code}-${revision}`}
        market={markets.find((m) => m.code === code)!}
        dirty={dirty}
        setDirty={setDirty}
        onDiscard={() => discardAnd(() => setRevision((r) => r + 1))}
        onSignedOut={onSignedOut}
      />
    </div>
  );
}

function MarketEditor({
  market,
  dirty,
  setDirty,
  onDiscard,
  onSignedOut,
}: {
  market: AdminMarket;
  dirty: boolean;
  setDirty: (dirty: boolean) => void;
  onDiscard: () => void;
  onSignedOut: () => void;
}) {
  const { code } = market;
  const [content, setContent] = useState<PowerPlaysContent | null>(null);
  const [sha, setSha] = useState("");
  const [staged, setStaged] = useState<StagedImage[]>([]);
  // Local previews for images uploaded this session (not deployed yet).
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  const handleError = useCallback(
    (error: unknown) => {
      if ((error as { status?: number }).status === 401) return onSignedOut();
      setStatus({ kind: "error", text: (error as Error).message });
    },
    [onSignedOut]
  );

  useEffect(() => {
    api<{ content: PowerPlaysContent; sha: string }>(`/api/admin/powerplays?market=${code}`)
      .then((data) => {
        setContent(data.content);
        setSha(data.sha);
      })
      .catch(handleError);
  }, [code, handleError]);

  function update(next: PowerPlaysContent) {
    setContent(next);
    setDirty(true);
    setStatus(null);
  }

  function updateItem(index: number, patch: Partial<PowerPlay>) {
    if (!content) return;
    update({
      ...content,
      items: content.items.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    });
  }

  function moveItem(index: number, delta: number) {
    if (!content) return;
    const items = [...content.items];
    const [item] = items.splice(index, 1);
    items.splice(index + delta, 0, item);
    update({ ...content, items });
  }

  function addItem() {
    if (!content) return;
    update({ ...content, items: [...content.items, { id: newId(), title: "", kickoff: "" }] });
  }

  async function upload(file: File): Promise<string | null> {
    setStatus(null);
    try {
      const form = new FormData();
      const blob = await prepareImage(file);
      form.append("file", blob, file.name);
      const result = await api<{ path: string; staged: StagedImage }>(
        `/api/admin/images?market=${code}`,
        { method: "POST", body: form }
      );
      setStaged((list) => [...list, result.staged]);
      setPreviews((map) => ({ ...map, [result.path]: URL.createObjectURL(blob) }));
      return result.path;
    } catch (error) {
      handleError(error);
      return null;
    }
  }

  async function save() {
    if (!content) return;
    setBusy(true);
    setStatus(null);
    try {
      const data = await api<{ content: PowerPlaysContent; sha: string }>(
        `/api/admin/powerplays?market=${code}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content, sha, images: staged }),
        }
      );
      setContent(data.content);
      setSha(data.sha);
      setStaged([]);
      setDirty(false);
      setStatus({
        kind: "ok",
        text: "Saved. The live site updates in a couple of minutes, once the new deploy finishes.",
      });
    } catch (error) {
      handleError(error);
    } finally {
      setBusy(false);
    }
  }

  const preview = (path?: string) => (path ? previews[path] ?? path : undefined);

  return (
    <>
      {!content ? (
        !status && <p className="text-sm text-muted">Loading {market.name}...</p>
      ) : (
        <>
          {market.comingSoon && (
            <p className="rounded-md border border-border bg-background-elevated p-4 text-sm text-muted">
              {market.name} shows the coming-soon page, so these PowerPlays won&apos;t appear until
              the market launches.
            </p>
          )}

          <section className="rounded-md border border-border bg-background-elevated p-6">
            <h2 className="font-heading text-lg">Section background</h2>
            <div className="mt-4">
              <ImagePicker
                src={preview(content.backgroundImage)}
                onUpload={upload}
                onChange={(path) => path && update({ ...content, backgroundImage: path })}
                wide
              />
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-heading text-lg">This week&apos;s PowerPlays</h2>
                <p className="mt-1 text-sm text-muted">
                  {content.items.length
                    ? `${content.items.length} listed, shown in this order.`
                    : "None listed - the site shows the example card until you add one."}
                </p>
              </div>
              <AdminButton onClick={addItem}>+ Add PowerPlay</AdminButton>
            </div>

            {content.items.map((item, index) => (
              <PowerPlayEditor
                key={item.id}
                item={item}
                index={index}
                count={content.items.length}
                example={market.example}
                imageSrc={preview(item.image)}
                onChange={(patch) => updateItem(index, patch)}
                onMove={(delta) => moveItem(index, delta)}
                onRemove={() => {
                  if (window.confirm(`Remove "${item.title || "this PowerPlay"}"?`)) {
                    update({ ...content, items: content.items.filter((_, i) => i !== index) });
                  }
                }}
                onUpload={upload}
              />
            ))}
          </section>
        </>
      )}

      <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center gap-4 border-t border-border bg-background/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
        <AdminButton variant="primary" onClick={save} disabled={!content || !dirty || busy}>
          {busy ? "Publishing..." : "Save & publish"}
        </AdminButton>
        {dirty && !busy && <AdminButton onClick={onDiscard}>Discard changes</AdminButton>}
        {status && (
          <p className={cx("text-sm", status.kind === "ok" ? "text-success" : "text-danger")} role="status">
            {status.text}
          </p>
        )}
        {!status && dirty && <p className="text-sm text-muted">Unsaved changes</p>}
      </div>
    </>
  );
}

function TextInput({
  label,
  value,
  placeholder,
  hint,
  onChange,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  hint?: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label} hint={hint}>
      <input
        className={inputClass}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

function PowerPlayEditor({
  item,
  index,
  count,
  example,
  imageSrc,
  onChange,
  onMove,
  onRemove,
  onUpload,
}: {
  item: PowerPlay;
  index: number;
  count: number;
  example: AdminMarket["example"];
  imageSrc?: string;
  onChange: (patch: Partial<PowerPlay>) => void;
  onMove: (delta: number) => void;
  onRemove: () => void;
  onUpload: (file: File) => Promise<string | null>;
}) {
  const terms = item.terms ?? [];
  const termRows = Array.from({ length: MAX_TERMS }, (_, i) => terms[i] ?? { label: "", value: "" });

  function setTerm(i: number, patch: Partial<PowerPlayTerm>) {
    const next = termRows.map((term, j) => (j === i ? { ...term, ...patch } : term));
    onChange({ terms: next });
  }

  return (
    <article className="rounded-md border border-border bg-background-elevated p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          PowerPlay {index + 1}
        </p>
        <div className="flex gap-2">
          <AdminButton onClick={() => onMove(-1)} disabled={index === 0} aria-label="Move up">
            &uarr;
          </AdminButton>
          <AdminButton onClick={() => onMove(1)} disabled={index === count - 1} aria-label="Move down">
            &darr;
          </AdminButton>
          <AdminButton variant="danger" onClick={onRemove}>
            Remove
          </AdminButton>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput label="Match or parlay *" value={item.title} placeholder={example.fixture}
          onChange={(title) => onChange({ title })} />
        <TextInput label="When *" value={item.kickoff} placeholder={example.kickoff}
          onChange={(kickoff) => onChange({ kickoff })} />
        <TextInput label="Promo name" value={item.name} placeholder="Weekend Special"
          hint="Optional - shown next to POWERPLAY in the card header."
          onChange={(name) => onChange({ name })} />
        <div className="grid grid-cols-2 gap-4">
          <TextInput label="Pick" value={item.market} placeholder={example.market}
            onChange={(market) => onChange({ market })} />
          <TextInput label="Odds" value={item.odds} placeholder={example.odds}
            onChange={(odds) => onChange({ odds })} />
        </div>
        <TextInput label="Minimum stake" value={item.minStake} placeholder={example.minStake}
          hint="With a bonus, shows &quot;Play X or more and get Y back&quot;."
          onChange={(minStake) => onChange({ minStake })} />
        <TextInput label="Bonus back" value={item.bonusPercent} placeholder={example.bonusPercent}
          onChange={(bonusPercent) => onChange({ bonusPercent })} />

        <fieldset className="sm:col-span-2">
          <legend className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
            Highlights (optional)
          </legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {termRows.map((term, i) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <input className={inputClass} aria-label={`Highlight ${i + 1} label`}
                  placeholder={["Stake", "You get", "Min legs"][i]} value={term.label}
                  onChange={(e) => setTerm(i, { label: e.target.value })} />
                <input className={inputClass} aria-label={`Highlight ${i + 1} value`}
                  placeholder={["$1", "$1 freebet", "5"][i]} value={term.value}
                  onChange={(e) => setTerm(i, { value: e.target.value })} />
              </div>
            ))}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <Field label="Parlay legs / details (optional)" hint="One line each.">
            <textarea
              className={cx(inputClass, "min-h-20")}
              value={(item.legs ?? []).join("\n")}
              placeholder={"Arsenal to win\nMan City to win\nLiverpool to win"}
              onChange={(e) => onChange({ legs: e.target.value.split("\n") })}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Description (optional)">
            <textarea
              className={cx(inputClass, "min-h-16")}
              value={item.description ?? ""}
              placeholder="Bet $1 on a BolaChat combo and get $1 in freebets."
              onChange={(e) => onChange({ description: e.target.value })}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
            Card image (optional)
          </span>
          <ImagePicker
            src={imageSrc}
            onUpload={onUpload}
            onChange={(path) => onChange({ image: path ?? undefined })}
            removable
          />
        </div>
      </div>
    </article>
  );
}

function ImagePicker({
  src,
  onUpload,
  onChange,
  removable = false,
  wide = false,
}: {
  src?: string;
  onUpload: (file: File) => Promise<string | null>;
  onChange: (path: string | null) => void;
  removable?: boolean;
  wide?: boolean;
}) {
  const [uploading, setUploading] = useState(false);

  async function pick(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    const path = await onUpload(file);
    setUploading(false);
    if (path) onChange(path);
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div
        className={cx(
          "flex items-center justify-center overflow-hidden rounded-sm border border-border bg-background text-xs text-muted",
          wide ? "aspect-[21/9] w-full sm:w-96" : "aspect-[16/9] w-48"
        )}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element -- admin preview, may be a local blob: URL
          <img src={src} alt="" className="h-full w-full object-cover" />
        ) : (
          "No image"
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="cursor-pointer rounded-md border border-foreground/20 bg-background px-4 py-2 text-center text-sm font-semibold transition hover:border-foreground/40">
          {uploading ? "Uploading..." : src ? "Replace image" : "Upload image"}
          <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only"
            onChange={pick} disabled={uploading} />
        </label>
        {removable && src && (
          <AdminButton variant="danger" onClick={() => onChange(null)}>
            Remove image
          </AdminButton>
        )}
        <span className="text-xs text-muted">JPG, PNG or WebP. Large photos are resized.</span>
      </div>
    </div>
  );
}
