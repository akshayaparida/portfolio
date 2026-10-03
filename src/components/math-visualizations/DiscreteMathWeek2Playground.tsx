"use client";

import React, { useState, useMemo } from "react";
import katex from "katex";

// Math Formula KaTeX renderer helper
function MathFormula({
  latex,
  display = true,
}: {
  latex: string;
  display?: boolean;
}) {
  const renderedHtml = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode: display,
      });
    } catch {
      return latex;
    }
  }, [latex, display]);

  return (
    <span
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
      style={{ display: display ? "block" : "inline-block", overflowX: "auto" }}
    />
  );
}

// Factorial helper using BigInt
function fact(n: number): bigint {
  if (n < 0) return BigInt(0);
  let res = BigInt(1);
  for (let i = 2; i <= n; i++) {
    res *= BigInt(i);
  }
  return res;
}

// Permutations P(n, r)
function calcPerm(n: number, r: number): bigint {
  if (r < 0 || r > n) return BigInt(0);
  return fact(n) / fact(n - r);
}

// Combinations C(n, r)
function calcComb(n: number, r: number): bigint {
  if (r < 0 || r > n) return BigInt(0);
  return fact(n) / (fact(r) * fact(n - r));
}

export default function DiscreteMathWeek2Playground() {
  const [activeTab, setActiveTab] = useState<
    "venn" | "pie" | "powerset" | "selection"
  >("venn");

  // --- TAB 1: VENN DIAGRAM STATE ---
  const [operation2, setOperation2] = useState<string>("union");
  const [setAInput, setSetAInput] = useState<string>("1, 2, 3, 4, 5");
  const [setBInput, setSetBInput] = useState<string>("4, 5, 6, 7");
  const [universeInput, setUniverseInput] = useState<string>(
    "1, 2, 3, 4, 5, 6, 7, 8, 9, 10",
  );

  const parsedSets = useMemo(() => {
    const parse = (str: string) =>
      new Set(
        str
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      );
    const A = parse(setAInput);
    const B = parse(setBInput);
    const U = parse(universeInput);

    const union = new Set([...A, ...B]);
    const inter = new Set([...A].filter((x) => B.has(x)));
    const diffA = new Set([...A].filter((x) => !B.has(x)));
    const diffB = new Set([...B].filter((x) => !A.has(x)));
    const symm = new Set([...diffA, ...diffB]);
    const compA = new Set([...U].filter((x) => !A.has(x)));
    const compB = new Set([...U].filter((x) => !B.has(x)));
    const compUnion = new Set([...U].filter((x) => !union.has(x)));
    const compInter = new Set([...U].filter((x) => !inter.has(x)));

    return {
      A,
      B,
      U,
      union,
      inter,
      diffA,
      diffB,
      symm,
      compA,
      compB,
      compUnion,
      compInter,
    };
  }, [setAInput, setBInput, universeInput]);

  const activeResult = useMemo(() => {
    switch (operation2) {
      case "union":
        return {
          title: "Union: A ∪ B",
          formula: "A \\cup B = \\{x \\mid x \\in A \\lor x \\in B\\}",
          elements: Array.from(parsedSets.union),
          shadeA: true,
          shadeInter: true,
          shadeB: true,
          shadeOutside: false,
        };
      case "inter":
        return {
          title: "Intersection: A ∩ B",
          formula: "A \\cap B = \\{x \\mid x \\in A \\land x \\in B\\}",
          elements: Array.from(parsedSets.inter),
          shadeA: false,
          shadeInter: true,
          shadeB: false,
          shadeOutside: false,
        };
      case "diffA":
        return {
          title: "Set Difference: A — B",
          formula:
            "A - B = \\{x \\mid x \\in A \\land x \\notin B\\} = A \\cap B'",
          elements: Array.from(parsedSets.diffA),
          shadeA: true,
          shadeInter: false,
          shadeB: false,
          shadeOutside: false,
        };
      case "diffB":
        return {
          title: "Set Difference: B — A",
          formula:
            "B - A = \\{x \\mid x \\in B \\land x \\notin A\\} = B \\cap A'",
          elements: Array.from(parsedSets.diffB),
          shadeA: false,
          shadeInter: false,
          shadeB: true,
          shadeOutside: false,
        };
      case "symm":
        return {
          title: "Symmetric Difference: A △ B",
          formula:
            "A \\bigtriangleup B = (A - B) \\cup (B - A) = (A \\cup B) - (A \\cap B)",
          elements: Array.from(parsedSets.symm),
          shadeA: true,
          shadeInter: false,
          shadeB: true,
          shadeOutside: false,
        };
      case "compA":
        return {
          title: "Complement of A: A'",
          formula: "A' = U - A = \\{x \\in U \\mid x \\notin A\\}",
          elements: Array.from(parsedSets.compA),
          shadeA: false,
          shadeInter: false,
          shadeB: true,
          shadeOutside: true,
        };
      case "compUnion":
        return {
          title: "De Morgan: (A ∪ B)' = A' ∩ B'",
          formula:
            "(A \\cup B)' = A' \\cap B' = \\{x \\in U \\mid x \\notin A \\land x \\notin B\\}",
          elements: Array.from(parsedSets.compUnion),
          shadeA: false,
          shadeInter: false,
          shadeB: false,
          shadeOutside: true,
        };
      default:
        return {
          title: "Union: A ∪ B",
          formula: "A \\cup B",
          elements: Array.from(parsedSets.union),
          shadeA: true,
          shadeInter: true,
          shadeB: true,
          shadeOutside: false,
        };
    }
  }, [operation2, parsedSets]);

  // --- TAB 2: PIE & SPECIFIC SET COUNTER STATE ---
  const [pieA, setPieA] = useState<number>(65);
  const [pieB, setPieB] = useState<number>(50);
  const [pieC, setPieC] = useState<number>(45);
  const [pieAB, setPieAB] = useState<number>(25);
  const [pieBC, setPieBC] = useState<number>(15);
  const [pieAC, setPieAC] = useState<number>(20);
  const [pieABC, setPieABC] = useState<number>(10);
  const [pieTotal, setPieTotal] = useState<number>(120);

  const pieCalculations = useMemo(() => {
    const union = pieA + pieB + pieC - (pieAB + pieBC + pieAC) + pieABC;
    const exactlyOne =
      pieA + pieB + pieC - 2 * (pieAB + pieBC + pieAC) + 3 * pieABC;
    const exactlyTwo = pieAB + pieBC + pieAC - 3 * pieABC;
    const onlyA = pieA - pieAB - pieAC + pieABC;
    const onlyB = pieB - pieAB - pieBC + pieABC;
    const onlyC = pieC - pieAC - pieBC + pieABC;
    const neither = Math.max(0, pieTotal - union);

    return {
      union,
      exactlyOne,
      exactlyTwo,
      onlyA,
      onlyB,
      onlyC,
      neither,
    };
  }, [pieA, pieB, pieC, pieAB, pieBC, pieAC, pieABC, pieTotal]);

  // --- TAB 3: POWER SET STATE ---
  const [powerSetInput, setPowerSetInput] = useState<string>("a, b, c");

  const powerSetData = useMemo(() => {
    const raw = powerSetInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const elements = Array.from(new Set(raw)).slice(0, 5); // limit to 5 elements for UI
    const n = elements.length;
    const totalSubsets = 2 ** n;
    const subsets: { mask: string; items: string[] }[] = [];

    for (let i = 0; i < totalSubsets; i++) {
      const items: string[] = [];
      const binaryStr = i.toString(2).padStart(n, "0");
      for (let bit = 0; bit < n; bit++) {
        if ((i >> bit) & 1) {
          items.push(elements[bit]);
        }
      }
      subsets.push({ mask: binaryStr, items });
    }

    return {
      elements,
      n,
      totalSubsets,
      nonEmptySubsets: Math.max(0, totalSubsets - 1),
      properNonEmpty: Math.max(0, totalSubsets - 2),
      subsets,
    };
  }, [powerSetInput]);

  // --- TAB 4: COMMITTEE & PERMUTATION STATE ---
  const [permN, setPermN] = useState<number>(8);
  const [permR, setPermR] = useState<number>(3);
  const [menCount, setMenCount] = useState<number>(7);
  const [womenCount, setWomenCount] = useState<number>(4);
  const [committeeSize, setCommitteeSize] = useState<number>(5);

  const selectionCalcs = useMemo(() => {
    const p = calcPerm(permN, permR).toString();
    const c = calcComb(permN, permR).toString();

    // Committee Selection
    const totalPool = menCount + womenCount;
    const totalWays = calcComb(totalPool, committeeSize);
    const zeroWomen =
      menCount >= committeeSize ? calcComb(menCount, committeeSize) : BigInt(0);
    const atLeastOneWoman = totalWays - zeroWomen;

    return {
      p,
      c,
      totalPool,
      totalWays: totalWays.toString(),
      zeroWomen: zeroWomen.toString(),
      atLeastOneWoman: atLeastOneWoman.toString(),
    };
  }, [permN, permR, menCount, womenCount, committeeSize]);

  return (
    <div className="discrete-math-playground">
      {/* Tab Navigation */}
      <div className="dmp-tab-bar" role="tablist">
        <button
          className={`dmp-tab-btn ${activeTab === "venn" ? "active" : ""}`}
          onClick={() => setActiveTab("venn")}
          role="tab"
          aria-selected={activeTab === "venn"}
        >
          <i className="fa-solid fa-shapes"></i> Venn Diagram & Set Ops
        </button>
        <button
          className={`dmp-tab-btn ${activeTab === "pie" ? "active" : ""}`}
          onClick={() => setActiveTab("pie")}
          role="tab"
          aria-selected={activeTab === "pie"}
        >
          <i className="fa-solid fa-calculator"></i> PIE & Single/Double Set
          Counting
        </button>
        <button
          className={`dmp-tab-btn ${activeTab === "powerset" ? "active" : ""}`}
          onClick={() => setActiveTab("powerset")}
          role="tab"
          aria-selected={activeTab === "powerset"}
        >
          <i className="fa-solid fa-layer-group"></i> Power Set & Non-Empty
          Subsets
        </button>
        <button
          className={`dmp-tab-btn ${activeTab === "selection" ? "active" : ""}`}
          onClick={() => setActiveTab("selection")}
          role="tab"
          aria-selected={activeTab === "selection"}
        >
          <i className="fa-solid fa-users"></i> Permutations & Committee
          Selection
        </button>
      </div>

      {/* TAB 1: VENN DIAGRAM & SET OPERATIONS */}
      {activeTab === "venn" && (
        <div className="dmp-card">
          <div className="dmp-header-row">
            <div>
              <h4 className="dmp-card-title">
                Interactive Venn Diagram & Set Shading
              </h4>
              <p className="dmp-card-subtitle">
                Select a set operation below to visualize exact shaded regions
                and verify calculated members.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "1rem",
            }}
          >
            {[
              { id: "union", label: "Union (A ∪ B)" },
              { id: "inter", label: "Intersection (A ∩ B)" },
              { id: "diffA", label: "Difference (A — B)" },
              { id: "diffB", label: "Difference (B — A)" },
              { id: "symm", label: "Symmetric Diff (A △ B)" },
              { id: "compA", label: "Complement (A')" },
              { id: "compUnion", label: "De Morgan ((A ∪ B)')" },
            ].map((op) => (
              <button
                key={op.id}
                onClick={() => setOperation2(op.id)}
                style={{
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background:
                    operation2 === op.id ? "#3b82f6" : "var(--surface)",
                  color:
                    operation2 === op.id ? "#ffffff" : "var(--text-secondary)",
                  cursor: "pointer",
                }}
              >
                {op.label}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              alignItems: "center",
            }}
          >
            {/* SVG Venn Diagram */}
            <div
              style={{
                background: "rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <svg
                viewBox="0 0 320 200"
                style={{ width: "100%", maxWidth: "340px", height: "auto" }}
              >
                {/* Universe Box */}
                <rect
                  x="5"
                  y="5"
                  width="310"
                  height="190"
                  rx="8"
                  fill={
                    activeResult.shadeOutside
                      ? "rgba(59, 130, 246, 0.35)"
                      : "rgba(255, 255, 255, 0.02)"
                  }
                  stroke="var(--border)"
                  strokeWidth="2"
                />
                <text
                  x="18"
                  y="28"
                  fill="var(--text-muted)"
                  fontSize="13"
                  fontWeight="bold"
                >
                  U (Universal Set)
                </text>

                {/* Circle A */}
                <circle
                  cx="120"
                  cy="105"
                  r="65"
                  fill={
                    activeResult.shadeA
                      ? "rgba(59, 130, 246, 0.45)"
                      : "rgba(255, 255, 255, 0.05)"
                  }
                  stroke="#3b82f6"
                  strokeWidth="2"
                />
                <text
                  x="85"
                  y="110"
                  fill="#ffffff"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  Set A
                </text>

                {/* Circle B */}
                <circle
                  cx="200"
                  cy="105"
                  r="65"
                  fill={
                    activeResult.shadeB
                      ? "rgba(16, 185, 129, 0.45)"
                      : "rgba(255, 255, 255, 0.05)"
                  }
                  stroke="#10b981"
                  strokeWidth="2"
                />
                <text
                  x="235"
                  y="110"
                  fill="#ffffff"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  Set B
                </text>

                {/* Overlap region shading override if inter is active */}
                {activeResult.shadeInter && (
                  <path
                    d="M 160 52 A 65 65 0 0 1 160 158 A 65 65 0 0 1 160 52"
                    fill="rgba(168, 85, 247, 0.65)"
                  />
                )}
                <text
                  x="160"
                  y="110"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  A ∩ B
                </text>
              </svg>

              <div
                style={{
                  marginTop: "0.75rem",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  textAlign: "center",
                }}
              >
                Purple = Overlap (A ∩ B) | Blue = Set A | Green = Set B
              </div>
            </div>

            {/* Live Set Computation Output */}
            <div>
              <div
                style={{
                  padding: "0.75rem 1rem",
                  background: "var(--surface)",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--heading-color)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {activeResult.title}
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <MathFormula latex={activeResult.formula} display={false} />
                </div>
                <div
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-primary)",
                    background: "rgba(0, 0, 0, 0.3)",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "6px",
                  }}
                >
                  <strong>Result Elements:</strong>{" "}
                  {activeResult.elements.length > 0
                    ? `{ ${activeResult.elements.join(", ")} }`
                    : "∅ (Empty Set)"}
                  <span
                    style={{
                      marginLeft: "0.75rem",
                      fontSize: "0.8rem",
                      color: "#3b82f6",
                    }}
                  >
                    (Cardinality: {activeResult.elements.length})
                  </span>
                </div>
              </div>

              {/* Input Custom Elements */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Set A elements (comma separated):
                  </label>
                  <input
                    type="text"
                    value={setAInput}
                    onChange={(e) => setSetAInput(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.4rem 0.6rem",
                      borderRadius: "6px",
                      border: "1px solid var(--border)",
                      background: "var(--surface)",
                      color: "var(--text-primary)",
                      fontSize: "0.85rem",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Set B elements (comma separated):
                  </label>
                  <input
                    type="text"
                    value={setBInput}
                    onChange={(e) => setSetBInput(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.4rem 0.6rem",
                      borderRadius: "6px",
                      border: "1px solid var(--border)",
                      background: "var(--surface)",
                      color: "var(--text-primary)",
                      fontSize: "0.85rem",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Universal Set U:
                  </label>
                  <input
                    type="text"
                    value={universeInput}
                    onChange={(e) => setUniverseInput(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.4rem 0.6rem",
                      borderRadius: "6px",
                      border: "1px solid var(--border)",
                      background: "var(--surface)",
                      color: "var(--text-primary)",
                      fontSize: "0.85rem",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PIE & SINGLE/DOUBLE SET COUNTING */}
      {activeTab === "pie" && (
        <div className="dmp-card">
          <div className="dmp-header-row">
            <div>
              <h4 className="dmp-card-title">
                Principle of Inclusion-Exclusion & Exact Set Calculator
              </h4>
              <p className="dmp-card-subtitle">
                Enter your problem values to automatically solve 3-set union,
                &ldquo;Exactly One Set&rdquo;, &ldquo;Exactly Two Sets&rdquo;,
                and &ldquo;Only Set A&rdquo;.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "0.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <div>
              <label
                style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
              >
                |A| (Set A):
              </label>
              <input
                type="number"
                value={pieA}
                onChange={(e) => setPieA(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.4rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div>
              <label
                style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
              >
                |B| (Set B):
              </label>
              <input
                type="number"
                value={pieB}
                onChange={(e) => setPieB(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.4rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div>
              <label
                style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
              >
                |C| (Set C):
              </label>
              <input
                type="number"
                value={pieC}
                onChange={(e) => setPieC(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.4rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div>
              <label
                style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
              >
                |A ∩ B|:
              </label>
              <input
                type="number"
                value={pieAB}
                onChange={(e) => setPieAB(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.4rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div>
              <label
                style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
              >
                |B ∩ C|:
              </label>
              <input
                type="number"
                value={pieBC}
                onChange={(e) => setPieBC(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.4rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div>
              <label
                style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
              >
                |A ∩ C|:
              </label>
              <input
                type="number"
                value={pieAC}
                onChange={(e) => setPieAC(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.4rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div>
              <label
                style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
              >
                |A ∩ B ∩ C|:
              </label>
              <input
                type="number"
                value={pieABC}
                onChange={(e) => setPieABC(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.4rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div>
              <label
                style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
              >
                Total Batch |U|:
              </label>
              <input
                type="number"
                value={pieTotal}
                onChange={(e) => setPieTotal(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.4rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            <div
              style={{
                background: "var(--surface)",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Total Union |A ∪ B ∪ C|
              </div>
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "#3b82f6",
                  margin: "0.3rem 0",
                }}
              >
                {pieCalculations.union}
              </div>
              <div
                style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
              >
                Formula: ∑|A| - ∑|A∩B| + |A∩B∩C|
              </div>
            </div>

            <div
              style={{
                background: "var(--surface)",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Topic 11: Exactly ONE Set
              </div>
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "#10b981",
                  margin: "0.3rem 0",
                }}
              >
                {pieCalculations.exactlyOne}
              </div>
              <div
                style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
              >
                Formula: ∑|A| - 2∑|A∩B| + 3|A∩B∩C|
              </div>
            </div>

            <div
              style={{
                background: "var(--surface)",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Topic 12: Exactly TWO Sets
              </div>
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "#f59e0b",
                  margin: "0.3rem 0",
                }}
              >
                {pieCalculations.exactlyTwo}
              </div>
              <div
                style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
              >
                Formula: ∑|A∩B| - 3|A∩B∩C|
              </div>
            </div>

            <div
              style={{
                background: "var(--surface)",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Topic 13: Only Set A
              </div>
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "#a855f7",
                  margin: "0.3rem 0",
                }}
              >
                {pieCalculations.onlyA}
              </div>
              <div
                style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
              >
                Only B: {pieCalculations.onlyB} | Only C:{" "}
                {pieCalculations.onlyC}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: POWER SET & SUBSET EXPLORER */}
      {activeTab === "powerset" && (
        <div className="dmp-card">
          <div className="dmp-header-row">
            <div>
              <h4 className="dmp-card-title">
                Power Set & Binary Bitmask Explorer
              </h4>
              <p className="dmp-card-subtitle">
                Demonstrates how every subset corresponds to an n-bit binary
                characteristic vector.
              </p>
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                marginBottom: "0.3rem",
              }}
            >
              Enter elements (comma separated, up to 5 elements):
            </label>
            <input
              type="text"
              value={powerSetInput}
              onChange={(e) => setPowerSetInput(e.target.value)}
              style={{
                maxWidth: "350px",
                width: "100%",
                padding: "0.4rem 0.6rem",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
              marginBottom: "1.25rem",
            }}
          >
            <div
              style={{
                background: "var(--surface)",
                padding: "0.85rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Total Subsets |P(A)|
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#3b82f6",
                }}
              >
                2^{powerSetData.n} = {powerSetData.totalSubsets}
              </div>
            </div>
            <div
              style={{
                background: "var(--surface)",
                padding: "0.85rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Topic 15: Non-Empty Subsets
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#10b981",
                }}
              >
                2^{powerSetData.n} - 1 = {powerSetData.nonEmptySubsets}
              </div>
            </div>
            <div
              style={{
                background: "var(--surface)",
                padding: "0.85rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Proper Non-Empty Subsets
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#f59e0b",
                }}
              >
                2^{powerSetData.n} - 2 = {powerSetData.properNonEmpty}
              </div>
            </div>
          </div>

          {/* Subsets Table */}
          <div style={{ maxHeight: "280px", overflowY: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.85rem",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid var(--border)",
                    textAlign: "left",
                  }}
                >
                  <th style={{ padding: "0.4rem" }}>#</th>
                  <th style={{ padding: "0.4rem" }}>Bitmask</th>
                  <th style={{ padding: "0.4rem" }}>Subset Content</th>
                  <th style={{ padding: "0.4rem" }}>Type</th>
                </tr>
              </thead>
              <tbody>
                {powerSetData.subsets.map((sub, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <td
                      style={{ padding: "0.35rem", color: "var(--text-muted)" }}
                    >
                      {idx + 1}
                    </td>
                    <td
                      style={{
                        padding: "0.35rem",
                        fontFamily: "monospace",
                        color: "#3b82f6",
                      }}
                    >
                      {sub.mask}
                    </td>
                    <td style={{ padding: "0.35rem" }}>
                      {sub.items.length === 0
                        ? "∅ (Empty set)"
                        : `{ ${sub.items.join(", ")} }`}
                    </td>
                    <td style={{ padding: "0.35rem", fontSize: "0.75rem" }}>
                      {sub.items.length === 0 ? (
                        <span style={{ color: "var(--text-muted)" }}>
                          Empty
                        </span>
                      ) : sub.items.length === powerSetData.n ? (
                        <span style={{ color: "#f59e0b" }}>
                          Improper Subset (A)
                        </span>
                      ) : (
                        <span style={{ color: "#10b981" }}>
                          Proper Non-empty
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PERMUTATIONS & COMMITTEE SELECTION */}
      {activeTab === "selection" && (
        <div className="dmp-card">
          <div className="dmp-header-row">
            <div>
              <h4 className="dmp-card-title">
                Permutations, Combinations & Committee Selection
              </h4>
              <p className="dmp-card-subtitle">
                Solve ordered arrangements, subset selections, and constrained
                group selections.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* Permutation / Combination Calculator */}
            <div
              style={{
                background: "var(--surface)",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
              }}
            >
              <h5
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--heading-color)",
                  marginBottom: "0.75rem",
                }}
              >
                P(n, r) and C(n, r) Calculator
              </h5>
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <label
                    style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                  >
                    n (total):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={permN}
                    onChange={(e) => setPermN(Number(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "0.4rem",
                      borderRadius: "6px",
                      border: "1px solid var(--border)",
                      background: "var(--bg-light)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                  >
                    r (choose):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={permN}
                    value={permR}
                    onChange={(e) => setPermR(Number(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "0.4rem",
                      borderRadius: "6px",
                      border: "1px solid var(--border)",
                      background: "var(--bg-light)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    padding: "0.6rem",
                    borderRadius: "6px",
                    background: "rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <span
                    style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                  >
                    Topic 17: Permutation P({permN}, {permR}):
                  </span>
                  <div
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#3b82f6",
                    }}
                  >
                    {selectionCalcs.p}
                  </div>
                </div>
                <div
                  style={{
                    padding: "0.6rem",
                    borderRadius: "6px",
                    background: "rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <span
                    style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                  >
                    Topic 18: Combination C({permN}, {permR}):
                  </span>
                  <div
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#10b981",
                    }}
                  >
                    {selectionCalcs.c}
                  </div>
                </div>
              </div>
            </div>

            {/* Committee Selection Simulator */}
            <div
              style={{
                background: "var(--surface)",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
              }}
            >
              <h5
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--heading-color)",
                  marginBottom: "0.75rem",
                }}
              >
                Topic 19: Committee Selection
              </h5>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "0.5rem",
                  marginBottom: "0.85rem",
                }}
              >
                <div>
                  <label
                    style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                  >
                    Men (M):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={menCount}
                    onChange={(e) => setMenCount(Number(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "0.4rem",
                      borderRadius: "6px",
                      border: "1px solid var(--border)",
                      background: "var(--bg-light)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                  >
                    Women (W):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={womenCount}
                    onChange={(e) => setWomenCount(Number(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "0.4rem",
                      borderRadius: "6px",
                      border: "1px solid var(--border)",
                      background: "var(--bg-light)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                  >
                    Size (r):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={menCount + womenCount}
                    value={committeeSize}
                    onChange={(e) => setCommitteeSize(Number(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "0.4rem",
                      borderRadius: "6px",
                      border: "1px solid var(--border)",
                      background: "var(--bg-light)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  fontSize: "0.82rem",
                  lineHeight: "1.5",
                  color: "var(--text-secondary)",
                }}
              >
                <div>
                  <strong>Total Unrestricted:</strong> C(
                  {selectionCalcs.totalPool}, {committeeSize}) ={" "}
                  <span style={{ color: "#3b82f6", fontWeight: 700 }}>
                    {selectionCalcs.totalWays}
                  </span>
                </div>
                <div>
                  <strong>Zero Women (All Men):</strong> C({menCount},{" "}
                  {committeeSize}) ={" "}
                  <span style={{ color: "#ef4444", fontWeight: 700 }}>
                    {selectionCalcs.zeroWomen}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "0.5rem",
                    padding: "0.5rem",
                    background: "rgba(16, 185, 129, 0.1)",
                    borderRadius: "6px",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <strong style={{ color: "#10b981" }}>
                    At Least 1 Woman:
                  </strong>{" "}
                  Total - Zero Women ={" "}
                  <span style={{ fontSize: "1.05rem", fontWeight: 800 }}>
                    {selectionCalcs.atLeastOneWoman}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
