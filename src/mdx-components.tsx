import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: ComponentProps<"h1">) => (
      <h1 {...props} className="mt-8 text-3xl font-semibold" />
    ),
    h2: (props: ComponentProps<"h2">) => (
      <h2 {...props} className="mt-6 text-2xl font-semibold" />
    ),
    h3: (props: ComponentProps<"h3">) => (
      <h3 {...props} className="mt-5 text-xl font-semibold" />
    ),
    p: (props: ComponentProps<"p">) => (
      <p {...props} className="mt-4 text-platinum-200" />
    ),
    ul: (props: ComponentProps<"ul">) => (
      <ul {...props} className="mt-4 list-disc pl-6 space-y-1" />
    ),
    ol: (props: ComponentProps<"ol">) => (
      <ol {...props} className="mt-4 list-decimal pl-6 space-y-1" />
    ),
    pre: (props: ComponentProps<"pre">) => (
      <pre
        {...props}
        className="mt-4 rounded-2xl bg-black/60 p-4 overflow-x-auto"
      />
    ),
    code: (props: ComponentProps<"code">) => (
      <code {...props} className="rounded bg-white/10 px-1 py-0.5" />
    ),
    a: (props: ComponentProps<"a">) => (
      <a {...props} className="text-aqua underline-offset-2 hover:underline" />
    ),
    ...components,
  };
}
