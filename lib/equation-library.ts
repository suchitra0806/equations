import type { LibraryEquation } from "./types";

export const EQUATION_LIBRARY: LibraryEquation[] = [
  {
    id: "einstein-energy-mass",
    name: "Mass–energy equivalence",
    latex: "E = mc^2",
    field: "Special Relativity",
    hook: "The equation that made nuclear weapons possible and Einstein famous",
  },
  {
    id: "schrodinger-equation-time-dependent",
    name: "Time-dependent Schrödinger equation",
    latex: "i\\\\hbar\\\\frac{\\\\partial}{\\\\partial t}\\\\Psi=\\\\hat{H}\\\\Psi",
    field: "Quantum Mechanics",
    hook: "The equation that governs everything quantum — and nobody fully understands it",
  },
  {
    id: "maxwell-gauss-law-electric",
    name: "Gauss's law for electricity",
    latex: "\\\\nabla \\\\cdot \\\\mathbf{E} = \\\\frac{\\\\rho}{\\\\epsilon_0}",
    field: "Electromagnetism",
    hook: "One of Maxwell's four equations that describe all of classical electromagnetism",
  },
  {
    id: "eulers-identity",
    name: "Euler's identity",
    latex: "e^{i\\\\pi} + 1 = 0",
    field: "Mathematics",
    hook: "Called the most beautiful equation in mathematics",
  },
  {
    id: "newton-second-law",
    name: "Newton's second law",
    latex: "F = ma",
    field: "Classical Mechanics",
    hook: "Newton's second law — the foundation of everything before quantum mechanics",
  },
  {
    id: "boltzmann-entropy",
    name: "Boltzmann entropy",
    latex: "S = k_B \\\\ln \\\\Omega",
    field: "Thermodynamics",
    hook: "Boltzmann's entropy equation — engraved on his tombstone",
  },
  {
    id: "navier-stokes",
    name: "Navier–Stokes equations",
    latex:
      "\\\\frac{\\\\partial u}{\\\\partial t}+(u\\\\cdot\\\\nabla)u=-\\\\nabla p+\\\\nu\\\\nabla^2 u",
    field: "Fluid Dynamics",
    hook: "Navier-Stokes — a $1M prize awaits anyone who proves solutions always exist",
  },
  {
    id: "bayes-theorem",
    name: "Bayes' theorem",
    latex: "P(A|B) = \\\\frac{P(B|A)P(A)}{P(B)}",
    field: "Probability",
    hook: "Bayes' theorem — the engine behind AI, spam filters, and medical testing",
  },
  {
    id: "time-independent-schrodinger",
    name: "Time-independent Schrödinger equation",
    latex: "\\\\hat{H}\\\\psi = E\\\\psi",
    field: "Quantum Mechanics",
    hook: "What electrons solve inside every atom",
  },
  {
    id: "minkowski-interval",
    name: "Spacetime interval",
    latex: "ds^2 = -c^2dt^2 + dx^2 + dy^2 + dz^2",
    field: "Special Relativity",
    hook: "The spacetime interval — the same for all observers no matter how fast they move",
  },
  {
    id: "einstein-field-equations",
    name: "Einstein field equations",
    latex: "G_{\\\\mu\\\\nu}+\\\\Lambda g_{\\\\mu\\\\nu}=\\\\frac{8\\\\pi G}{c^4}T_{\\\\mu\\\\nu}",
    field: "General Relativity",
    hook: "Einstein's field equations — gravity is curved spacetime",
  },
  {
    id: "euler-lagrange",
    name: "Euler–Lagrange equation",
    latex:
      "\\\\frac{d}{dt}\\\\frac{\\\\partial L}{\\\\partial \\\\dot{q}}-\\\\frac{\\\\partial L}{\\\\partial q}=0",
    field: "Classical Mechanics",
    hook: "A more powerful rewrite of Newton's laws using energy",
  },
  {
    id: "shannon-entropy",
    name: "Shannon entropy",
    latex: "H = -\\\\sum_i p_i \\\\log p_i",
    field: "Information Theory",
    hook: "Shannon entropy — defines how much information is in any message",
  },
  {
    id: "gaussian-integral",
    name: "Gaussian integral",
    latex: "\\\\int_{-\\\\infty}^{\\\\infty} e^{-x^2} dx = \\\\sqrt{\\\\pi}",
    field: "Mathematics",
    hook: "One of the most surprising results in math — connects e and pi through infinity",
  },
  {
    id: "wave-equation",
    name: "Wave equation",
    latex:
      "\\\\frac{\\\\partial^2 u}{\\\\partial t^2} = c^2\\\\frac{\\\\partial^2 u}{\\\\partial x^2}",
    field: "Physics",
    hook: "The wave equation — governs sound, light, water, and guitar strings",
  },
  {
    id: "sigmoid",
    name: "Sigmoid activation",
    latex: "y = \\\\frac{1}{1+e^{-x}}",
    field: "Machine Learning",
    hook: "The sigmoid — the activation function that made neural networks work",
  },
  {
    id: "debye-length",
    name: "Debye screening length",
    latex: "\\\\nabla^2\\\\phi=\\\\frac{\\\\phi}{l_D^2}",
    field: "Plasma Physics",
    hook: "Why plasmas can neutralize electric fields over very short distances",
  },
  {
    id: "velocity-definition",
    name: "Instantaneous velocity",
    latex: "v = \\\\frac{dx}{dt}",
    field: "Calculus",
    hook: "Newton and Leibniz's great invention — the definition of instantaneous velocity",
  },
  {
    id: "fourier-transform",
    name: "Fourier transform",
    latex:
      "\\\\mathcal{F}\\\\{f\\\\}(\\\\xi)=\\\\int_{-\\\\infty}^{\\\\infty}f(x)e^{-2\\\\pi ix\\\\xi}dx",
    field: "Signal Processing",
    hook: "The Fourier transform — how to hear individual notes inside any sound",
  },
  {
    id: "heisenberg-uncertainty",
    name: "Heisenberg uncertainty principle",
    latex: "\\\\Delta x \\\\Delta p \\\\geq \\\\frac{\\\\hbar}{2}",
    field: "Quantum Mechanics",
    hook: "Heisenberg's uncertainty principle — not an engineering limitation, a law of reality",
  },
];

