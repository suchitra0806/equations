import katex from "katex";
import type { EquationTerm } from "./types";

export function renderLatexToHtml(
  latex: string,
  displayMode: boolean = false,
): { html: string; error?: string } {
  try {
    const html = katex.renderToString(latex, {
      throwOnError: false,
      output: "html",
      displayMode,
    });
    return { html };
  } catch (error) {
    return {
      html: latex,
      error: (error as Error).message,
    };
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function decorateEquationHtml(
  html: string,
  terms: EquationTerm[],
): string {
  if (terms.length === 0 || html.length === 0) {
    return html;
  }

  let decorated = html;

  const sorted = [...terms].sort(
    (a, b) => b.latex.length - a.latex.length,
  );

  for (const term of sorted) {
    if (!term.latex) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const pattern = escapeRegExp(term.latex);
    const regex = new RegExp(`>(${pattern})<`, "g");
    const spanOpen = `<span data-term-id="${term.id}" class="term-${term.termType}">`;
    const spanClose = "</span>";

    decorated = decorated.replace(
      regex,
      `>${spanOpen}$1${spanClose}<`,
    );
  }

  return decorated;
}

