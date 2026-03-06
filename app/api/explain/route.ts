import { NextResponse } from "next/server";
import type {
  DifficultyLevel,
  EquationExplanation,
  EquationTerm,
  TermType,
  AnimationHint,
} from "@/lib/types";
import { EQUATION_LIBRARY } from "@/lib/equation-library";

interface ExplainRequestBody {
  latex: string;
  difficulty: DifficultyLevel;
}

const OPERATOR_SYMBOLS = ["=", "+", "-", "*", "/", "^", "_", "∑", "∫"];

const GREEK_COMMANDS = new Set<string>([
  "\\alpha",
  "\\beta",
  "\\gamma",
  "\\delta",
  "\\epsilon",
  "\\zeta",
  "\\eta",
  "\\theta",
  "\\iota",
  "\\kappa",
  "\\lambda",
  "\\mu",
  "\\nu",
  "\\xi",
  "\\pi",
  "\\rho",
  "\\sigma",
  "\\tau",
  "\\upsilon",
  "\\phi",
  "\\chi",
  "\\psi",
  "\\omega",
]);

const FUNCTION_COMMANDS = new Set<string>([
  "\\sin",
  "\\cos",
  "\\tan",
  "\\log",
  "\\ln",
  "\\exp",
  "\\sqrt",
  "\\mathcal{F}",
]);

const OPERATOR_NAMES: Record<string, string> = {
  "=": "Equals sign",
  "+": "Plus sign",
  "-": "Minus sign",
  "*": "Multiplication",
  "/": "Division",
  "^": "Exponent",
  "_": "Subscript",
  "∑": "Summation",
  "\\sum": "Summation",
  "∫": "Integral",
  "\\int": "Integral",
};

const CONSTANT_SYMBOLS = new Set<string>(["e", "c", "G", "k_B", "\\pi", "\\hbar"]);

function isDifficultyLevel(value: string): value is DifficultyLevel {
  return value === "eli12" || value === "undergrad" || value === "expert";
}

function classifyCommand(command: string): TermType {
  if (GREEK_COMMANDS.has(command)) {
    return "greek";
  }
  if (FUNCTION_COMMANDS.has(command)) {
    return "function";
  }
  if (OPERATOR_NAMES[command]) {
    return "operator";
  }
  return "function";
}

function classifySymbol(symbol: string): TermType {
  if (OPERATOR_SYMBOLS.includes(symbol) || OPERATOR_NAMES[symbol]) {
    return "operator";
  }
  if (CONSTANT_SYMBOLS.has(symbol) || /^[0-9]+$/.test(symbol)) {
    return "constant";
  }
  if (/^[a-zA-Z]$/.test(symbol)) {
    return "variable";
  }
  if (symbol === "_") {
    return "subscript";
  }
  return "variable";
}

function animationForTermType(termType: TermType): AnimationHint {
  switch (termType) {
    case "function":
      return "area_under_curve";
    case "greek":
      return "oscillator";
    case "variable":
      return "vector_field";
    case "constant":
      return "probability_distribution";
    case "operator":
      return "matrix_transform";
    case "subscript":
      return "none";
    default:
      return "none";
  }
}

function friendlyNameForSymbol(symbol: string, termType: TermType): string {
  if (OPERATOR_NAMES[symbol]) {
    return OPERATOR_NAMES[symbol];
  }
  if (OPERATOR_NAMES[symbol.replace(/[{}]/g, "")]) {
    return OPERATOR_NAMES[symbol.replace(/[{}]/g, "")];
  }

  if (GREEK_COMMANDS.has(symbol)) {
    return `${symbol.replace("\\", "")} (Greek letter)`;
  }

  if (FUNCTION_COMMANDS.has(symbol)) {
    return `${symbol.replace("\\", "")} function`;
  }

  if (CONSTANT_SYMBOLS.has(symbol)) {
    return `${symbol.replace("\\", "")} constant`;
  }

  if (termType === "variable") {
    return `Variable ${symbol}`;
  }

  if (termType === "subscript") {
    return `Subscript ${symbol}`;
  }

  return `Symbol ${symbol}`;
}

function buildPlainEnglish(
  symbol: string,
  termType: TermType,
  difficulty: DifficultyLevel,
): string {
  const base =
    termType === "operator"
      ? `This symbol tells you how the pieces of the equation relate: ${symbol}.`
      : `This ${termType} is written as ${symbol}.`;

  if (difficulty === "eli12") {
    return `${base} Think of it as a labeled part of the equation that helps the whole story make sense.`;
  }

  if (difficulty === "undergrad") {
    return `${base} It plays a specific role in how the quantity is computed or related to the others.`;
  }

  return `${base} Its precise role depends on the context of the equation, but it participates in the overall structure of the relation.`;
}

function buildPhysicalMeaning(
  termType: TermType,
  difficulty: DifficultyLevel,
): string {
  if (termType === "operator") {
    return "Defines how the quantities on either side of it are connected or combined.";
  }

  if (difficulty === "eli12") {
    return "Represents one 'piece' of the equation that changes or influences the others.";
  }

  if (difficulty === "undergrad") {
    return "Represents a quantity or symbol that participates in the relationship expressed by the equation.";
  }

  return "Acts as a symbol in the formal relationship; its exact physical interpretation depends on the specific model or field.";
}

function buildAnalogy(
  symbol: string,
  termType: TermType,
  difficulty: DifficultyLevel,
): string {
  if (difficulty === "eli12") {
    if (termType === "operator") {
      return "You can imagine it like punctuation in a sentence: it tells the different parts how to work together to make sense.";
    }
    return "Imagine each symbol as a character in a story; this one is a main character that helps decide how the plot turns out.";
  }

  if (difficulty === "undergrad") {
    return `You can think of ${symbol} as playing a well-defined 'role' in the equation’s script, similar to a node inside a circuit or a variable in a program.`;
  }

  return `${symbol} functions as a named object in the formalism, analogous to a typed variable in code or a labeled edge in a graph.`;
}

function guessFieldFromLatex(latex: string): string {
  if (latex.includes("\\nabla") || latex.includes("\\mathbf{E}")) {
    return "Electromagnetism";
  }
  if (latex.includes("\\hat{H}") || latex.includes("\\Psi")) {
    return "Quantum Mechanics";
  }
  if (latex.includes("\\int") || latex.includes("\\sum")) {
    return "Mathematics";
  }
  if (latex.includes("c^2") || latex.includes("ds^2")) {
    return "Relativity";
  }
  return "Mathematics / Physics";
}

function buildSummary(
  equationLatex: string,
  difficulty: DifficultyLevel,
): string {
  if (difficulty === "eli12") {
    return `This equation shows how different pieces fit together to describe a single idea in math or science. Each symbol in ${equationLatex} has a specific job, like characters working together in a story.`;
  }

  if (difficulty === "undergrad") {
    return `The equation ${equationLatex} expresses a relationship between several quantities. Each symbol tracks either a variable, a constant, or an operator that shapes how the overall quantity is computed.`;
  }

  return `The expression ${equationLatex} encodes a structured relationship between variables and constants using standard mathematical operators. Each symbol participates in the formal statement of this relation.`;
}

function buildAnalogyParagraph(
  difficulty: DifficultyLevel,
): string {
  if (difficulty === "eli12") {
    return "You can imagine the equation as a recipe: every symbol is an ingredient or instruction, and if you follow them in the right order, you always get the same final dish.";
  }

  if (difficulty === "undergrad") {
    return "A helpful analogy is to think of the equation as a circuit diagram: each symbol is a component, and the way they are connected determines how information or energy flows through the system.";
  }

  return "You can view the equation as a compact program: each symbol corresponds to a typed variable, operator, or function, and the whole expression is the source code for a specific physical or mathematical process.";
}

function buildRealWorldParagraph(
  field: string,
  difficulty: DifficultyLevel,
): string {
  if (difficulty === "eli12") {
    return `Equations like this show up whenever we try to predict how things move, change, or spread in the real world, from planets and light to sound and probability.`;
  }

  if (difficulty === "undergrad") {
    return `Equations of this form appear across ${field}, where they capture how measured quantities depend on one another and let you make quantitative predictions.`;
  }

  return `In ${field}, relationships of this style are used to derive measurable predictions, fit models to data, and reason about how idealized systems behave under different assumptions.`;
}

function buildLocalExplanation(
  latex: string,
  difficulty: DifficultyLevel,
): EquationExplanation {
  const trimmedLatex = latex.trim();

  const fromLibrary = EQUATION_LIBRARY.find(
    (entry) => entry.latex === trimmedLatex,
  );

  const equationName =
    fromLibrary?.name ?? "Custom equation";
  const field =
    fromLibrary?.field ?? guessFieldFromLatex(trimmedLatex);

  const seen = new Set<string>();
  const terms: EquationTerm[] = [];

  const commandRegex = /\\[a-zA-Z]+/g;
  const commands = trimmedLatex.match(commandRegex) ?? [];
  for (const command of commands) {
    if (seen.has(command)) {
      continue;
    }
    seen.add(command);
    const termType = classifyCommand(command);
    const name = friendlyNameForSymbol(command, termType);
    const animationHint = animationForTermType(termType);

    terms.push({
      id: `term-${terms.length}`,
      latex: command,
      symbol: command,
      name,
      termType,
      plainEnglish: buildPlainEnglish(command, termType, difficulty),
      units: undefined,
      physicalMeaning: buildPhysicalMeaning(termType, difficulty),
      analogy: buildAnalogy(command, termType, difficulty),
      animationHint,
      animationParams: {},
    });
  }

  for (const char of trimmedLatex) {
    if (char === "\\" || char === " " || char === "{" || char === "}") {
      continue;
    }
    if (seen.has(char)) {
      continue;
    }

    if (
      OPERATOR_SYMBOLS.includes(char) ||
      /^[a-zA-Z0-9]$/.test(char)
    ) {
      seen.add(char);
      const termType = classifySymbol(char);
      const name = friendlyNameForSymbol(char, termType);
      const animationHint = animationForTermType(termType);

      terms.push({
        id: `term-${terms.length}`,
        latex: char,
        symbol: char,
        name,
        termType,
        plainEnglish: buildPlainEnglish(char, termType, difficulty),
        units: undefined,
        physicalMeaning: buildPhysicalMeaning(termType, difficulty),
        analogy: buildAnalogy(char, termType, difficulty),
        animationHint,
        animationParams: {},
      });
    }
  }

  const summary = buildSummary(trimmedLatex, difficulty);
  const analogy = buildAnalogyParagraph(difficulty);
  const realWorldApplication = buildRealWorldParagraph(field, difficulty);

  const explanation: EquationExplanation = {
    equationName,
    equationLatex: trimmedLatex,
    field,
    difficulty,
    summary,
    terms,
    analogy,
    realWorldApplication,
    famousUse: fromLibrary?.hook,
  };

  return explanation;
}

export async function POST(request: Request) {
  let body: ExplainRequestBody;

  try {
    const json = (await request.json()) as ExplainRequestBody;

    if (typeof json.latex !== "string" || json.latex.trim().length === 0) {
      return NextResponse.json(
        { message: "latex is required and must be a non-empty string." },
        { status: 400 },
      );
    }

    if (!isDifficultyLevel(json.difficulty)) {
      return NextResponse.json(
        { message: "difficulty must be one of eli12, undergrad, expert." },
        { status: 400 },
      );
    }

    body = json;
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid JSON body.", error: (error as Error).message },
      { status: 400 },
    );
  }

  const explanation = buildLocalExplanation(body.latex, body.difficulty);
  return NextResponse.json(explanation);
}


