import clsx from "clsx";

export function Prose({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "prose prose-invert max-w-none",
        // загальний твік під наш стиль
        "[&_.lead]:text-platinum-200/90",
        "prose-headings:scroll-mt-24 prose-h1:mb-6 prose-h2:mt-10 prose-h2:mb-4",
        "prose-a:underline-offset-4 prose-a:decoration-white/20 hover:prose-a:decoration-aqua/60",
        "prose-blockquote:border-l-aqua/50 prose-blockquote:bg-white/5 prose-blockquote:px-4 prose-blockquote:py-2",
        "prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
        className
      )}
    >
      {children}
    </div>
  );
}
