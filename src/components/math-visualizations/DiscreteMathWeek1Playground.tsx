"use client";

import React, { useState, useMemo } from "react";
import katex from "katex";

// Factorial helper
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

// Catalan number C_n
function calcCatalan(n: number): bigint {
  if (n < 0) return BigInt(0);
  return fact(2 * n) / (fact(n + 1) * fact(n));
}

// Check if a permutation of 1..n can be generated via a stack (LIFO)
function simulateStackPermutation(target: number[]): {
  valid: boolean;
  steps: { action: "push" | "pop"; value: number; stackState: number[] }[];
  violatingPattern?: [number, number, number];
  reason?: string;
} {
  const n = target.length;
  const stack: number[] = [];
  const steps: {
    action: "push" | "pop";
    value: number;
    stackState: number[];
  }[] = [];
  let nextToPush = 1;
  let targetIdx = 0;

  while (targetIdx < n) {
    const want = target[targetIdx];
    if (stack.length > 0 && stack[stack.length - 1] === want) {
      stack.pop();
      steps.push({ action: "pop", value: want, stackState: [...stack] });
      targetIdx++;
    } else if (nextToPush <= n) {
      stack.push(nextToPush);
      steps.push({ action: "push", value: nextToPush, stackState: [...stack] });
      nextToPush++;
    } else {
      break;
    }
  }

  const valid = targetIdx === n && stack.length === 0;

  let violatingPattern: [number, number, number] | undefined;
  let reason: string | undefined;

  if (!valid) {
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        for (let k = j + 1; k < n; k++) {
          const a = target[i];
          const b = target[j];
          const c = target[k];
          // 231 pattern: c < a < b
          if (c < a && a < b) {
            violatingPattern = [a, b, c];
            reason = `Contains forbidden 231-pattern: [${a}, ${b}, ${c}] at positions (${i + 1}, ${j + 1}, ${k + 1}). When '${b}' is pushed, '${a}' is trapped beneath it in the LIFO stack, so '${c}' cannot exit before '${a}' unless '${b}' has already exited.`;
            break;
          }
        }
        if (violatingPattern) break;
      }
      if (violatingPattern) break;
    }
  }

  return { valid, steps, violatingPattern, reason };
}

// Generate all Dyck words (balanced parentheses) for n
function generateDyckWords(n: number): string[] {
  const results: string[] = [];
  function backtrack(current: string, open: number, close: number) {
    if (current.length === 2 * n) {
      results.push(current);
      return;
    }
    if (open < n) {
      backtrack(current + "(", open + 1, close);
    }
    if (close < open) {
      backtrack(current + ")", open, close + 1);
    }
  }
  backtrack("", 0, 0);
  return results;
}

// Math Formula KaTeX renderer component
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
    <div
      className="math-formula-rendered"
      style={{ overflowX: "auto", margin: "0.25rem 0" }}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}

export default function DiscreteMathWeek1Playground() {
  const [activeTab, setActiveTab] = useState<
    "calc" | "stack" | "growth" | "dyck"
  >("calc");

  // Calculator states
  const [calcMode, setCalcMode] = useState<
    | "catalan"
    | "perm"
    | "comb"
    | "grid"
    | "polygon"
    | "adjacent"
    | "nonAdjacent"
    | "circular"
  >("catalan");
  const [nVal, setNVal] = useState<number>(5);
  const [rVal, setRVal] = useState<number>(3);
  const [mVal, setMVal] = useState<number>(3);

  // Stack simulator state
  const [stackInput, setStackInput] = useState<string>("3, 1, 2");

  // Growth rate n
  const [growthN, setGrowthN] = useState<number>(5);

  // Dyck paths n
  const [dyckN, setDyckN] = useState<number>(3);
  const [selectedDyckIndex, setSelectedDyckIndex] = useState<number>(0);

  // Stack calculation
  const parsedStackArray = useMemo(() => {
    return stackInput
      .split(/[,\s]+/)
      .map((s) => parseInt(s.trim(), 10))
      .filter((num) => !isNaN(num));
  }, [stackInput]);

  const stackResult = useMemo(() => {
    if (parsedStackArray.length === 0) return null;
    return simulateStackPermutation(parsedStackArray);
  }, [parsedStackArray]);

  // Dyck words
  const dyckWords = useMemo(() => {
    return generateDyckWords(dyckN);
  }, [dyckN]);

  const activeDyckWord = dyckWords[selectedDyckIndex] || dyckWords[0] || "";

  // Dynamic calculation display
  const calcResult = useMemo(() => {
    const n = Math.max(0, nVal);
    const r = Math.max(0, rVal);
    const m = Math.max(0, mVal);

    switch (calcMode) {
      case "perm": {
        const p = calcPerm(n, r);
        return {
          formula: `^${n}P_{${r}} = \\frac{${n}!}{( ${n} - ${r} )!} = \\frac{${fact(n)}}{${fact(Math.max(0, n - r))}} = ${p}`,
          result: p.toString(),
          explanation: `Number of ways to arrange ${r} distinct items from ${n} distinct items when ORDER MATTERS.`,
        };
      }
      case "comb": {
        const c = calcComb(n, r);
        return {
          formula: `^${n}C_{${r}} = \\binom{${n}}{${r}} = \\frac{${n}!}{${r}! \\times ( ${n} - ${r} )!} = \\frac{${fact(n)}}{${fact(r)} \\times ${fact(Math.max(0, n - r))}} = ${c}`,
          result: c.toString(),
          explanation: `Number of ways to choose a subset of ${r} items from ${n} items when ORDER DOES NOT MATTER.`,
        };
      }
      case "catalan": {
        const cat = calcCatalan(n);
        const comb2n_n = calcComb(2 * n, n);
        return {
          formula: `C_{${n}} = \\frac{1}{${n} + 1}\\binom{${2 * n}}{${n}} = \\frac{1}{${n + 1}} \\times ${comb2n_n} = ${cat}`,
          result: cat.toString(),
          explanation: `The ${n}-th Catalan number. Counts valid parentheses pairs, Dyck paths, non-crossing circle chords, stack permutations, and binary trees with ${n} internal nodes.`,
        };
      }
      case "grid": {
        const totalSteps = m + n;
        const paths = calcComb(totalSteps, n);
        return {
          formula: `\\binom{${m} + ${n}}{${n}} = \\binom{${totalSteps}}{${n}} = \\frac{${totalSteps}!}{${m}! \\, ${n}!} = ${paths}`,
          result: paths.toString(),
          explanation: `Number of monotonic lattice paths from (0,0) to (${m},${n}) moving only Right and Up. For an ${n}×${n} square grid, this is \\binom{2n}{n} = ${calcComb(2 * n, n)}.`,
        };
      }
      case "polygon": {
        const cat = n >= 3 ? calcCatalan(n - 2) : BigInt(0);
        return {
          formula: `C_{${n} - 2} = C_{${Math.max(0, n - 2)}} = \\frac{1}{${Math.max(1, n - 1)}}\\binom{${2 * Math.max(0, n - 2)}}{${Math.max(0, n - 2)}} = ${cat}`,
          result: cat.toString(),
          explanation: `Number of ways to triangulate a convex ${n}-sided polygon (${n}-gon) using ${Math.max(0, n - 3)} non-intersecting internal diagonals into ${Math.max(0, n - 2)} triangles.`,
        };
      }
      case "adjacent": {
        const ways = n >= 2 ? BigInt(2) * fact(n - 1) : fact(n);
        return {
          formula: `2 \\times (${n} - 1)! = 2 \\times ${fact(Math.max(0, n - 1))} = ${ways}`,
          result: ways.toString(),
          explanation: `Arrangements of ${n} distinct objects where 2 specified objects MUST stay together (treat the pair as 1 unified super-block with 2! internal orderings).`,
        };
      }
      case "nonAdjacent": {
        const total = fact(n);
        const together = n >= 2 ? BigInt(2) * fact(n - 1) : BigInt(0);
        const nonAdj = total - together;
        return {
          formula: `${n}! - 2(${n} - 1)! = ${total} - ${together} = ${nonAdj}`,
          result: nonAdj.toString(),
          explanation: `Arrangements of ${n} distinct objects where 2 specified objects are NEVER together (Total - Together complement rule).`,
        };
      }
      case "circular": {
        const normalCirc = n >= 1 ? fact(n - 1) : BigInt(1);
        const necklace = n >= 3 ? normalCirc / BigInt(2) : normalCirc;
        return {
          formula: `(n - 1)! = (${n} - 1)! = ${normalCirc} \\quad \\left[\\text{Necklace / Keyring}: \\frac{(${n} - 1)!}{2} = ${necklace}\\right]`,
          result: `${normalCirc} (Round Table) / ${necklace} (Necklace)`,
          explanation: `Circular arrangements fix 1 anchor object to break rotational symmetry, yielding (n-1)!. If reversible in 3D (like beads on a necklace), divide by 2.`,
        };
      }
    }
  }, [calcMode, nVal, rVal, mVal]);

  return (
    <div className="discrete-math-playground">
      {/* Top Tab Navigation */}
      <div className="dmp-tab-bar">
        {[
          { id: "calc", label: "Formula Calculator", icon: "fa-calculator" },
          {
            id: "stack",
            label: "Stack (LIFO) Validator",
            icon: "fa-layer-group",
          },
          {
            id: "growth",
            label: "Growth Rates (n! vs 2ⁿ)",
            icon: "fa-chart-line",
          },
          { id: "dyck", label: "Dyck Paths & Parentheses", icon: "fa-route" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`dmp-tab-btn ${activeTab === tab.id ? "active" : ""}`}
          >
            <i className={`fa-solid ${tab.icon}`} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: FORMULA CALCULATOR */}
      {activeTab === "calc" && (
        <div className="dmp-panel">
          <div className="dmp-section">
            <span className="dmp-section-label">Select Topic / Formula:</span>
            <div className="dmp-chip-row">
              {[
                { id: "catalan", label: "Catalan (Cₙ)" },
                { id: "perm", label: "Permutations (ⁿPᵣ)" },
                { id: "comb", label: "Combinations (ⁿCᵣ)" },
                { id: "grid", label: "Grid Paths" },
                { id: "polygon", label: "Polygon Triangulation (Cₙ₋₂)" },
                { id: "adjacent", label: "Adjacent (2(n-1)!)" },
                { id: "nonAdjacent", label: "Non-Adjacent (n! - 2(n-1)!)" },
                { id: "circular", label: "Circular ((n-1)!)" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setCalcMode(m.id as typeof calcMode)}
                  className={`dmp-chip-btn ${calcMode === m.id ? "active" : ""}`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Inputs Row */}
          <div className="dmp-inputs-card">
            <div className="dmp-input-group">
              <label htmlFor="dmp-input-n" className="dmp-input-label">
                Value of n:
              </label>
              <input
                id="dmp-input-n"
                type="number"
                min={0}
                max={20}
                value={nVal}
                onChange={(e) =>
                  setNVal(Math.max(0, parseInt(e.target.value) || 0))
                }
                className="dmp-number-input"
              />
            </div>

            {(calcMode === "perm" || calcMode === "comb") && (
              <div className="dmp-input-group">
                <label htmlFor="dmp-input-r" className="dmp-input-label">
                  Value of r:
                </label>
                <input
                  id="dmp-input-r"
                  type="number"
                  min={0}
                  max={nVal}
                  value={rVal}
                  onChange={(e) =>
                    setRVal(Math.max(0, parseInt(e.target.value) || 0))
                  }
                  className="dmp-number-input"
                />
              </div>
            )}

            {calcMode === "grid" && (
              <div className="dmp-input-group">
                <label htmlFor="dmp-input-m" className="dmp-input-label">
                  Value of m (Grid Columns):
                </label>
                <input
                  id="dmp-input-m"
                  type="number"
                  min={0}
                  max={20}
                  value={mVal}
                  onChange={(e) =>
                    setMVal(Math.max(0, parseInt(e.target.value) || 0))
                  }
                  className="dmp-number-input"
                />
              </div>
            )}
          </div>

          {/* Result Card with KaTeX rendering */}
          <div className="dmp-result-card">
            <div className="dmp-result-header">
              <span className="dmp-result-badge">
                <i className="fa-solid fa-check-circle" /> Calculated Result
              </span>
            </div>

            <div className="dmp-result-value">{calcResult.result}</div>

            <div className="dmp-formula-box">
              <div className="dmp-formula-title">Mathematical Formula:</div>
              <MathFormula latex={calcResult.formula} display={true} />
            </div>

            <p className="dmp-result-desc">{calcResult.explanation}</p>
          </div>
        </div>
      )}

      {/* TAB 2: STACK PERMUTATION VALIDATOR */}
      {activeTab === "stack" && (
        <div className="dmp-panel">
          <p className="dmp-tab-intro">
            Enter a permutation of digits to check if it can be generated by a{" "}
            <strong>LIFO Stack</strong> from input sequence{" "}
            <code>(1, 2, ..., n)</code> using valid Push and Pop operations.
            Catalan numbers count all stack-sortable permutations!
          </p>

          <div className="dmp-section">
            <span className="dmp-section-label">Quick Presets:</span>
            <div className="dmp-chip-row">
              {[
                { label: "[2, 3, 1] (Valid C₃)", val: "2, 3, 1" },
                { label: "[3, 1, 2] (INVALID 231)", val: "3, 1, 2" },
                { label: "[1, 2, 3] (Valid C₃)", val: "1, 2, 3" },
                { label: "[3, 2, 1] (Valid C₃)", val: "3, 2, 1" },
                { label: "[4, 3, 2, 1] (Valid C₄)", val: "4, 3, 2, 1" },
                { label: "[3, 4, 1, 2] (INVALID C₄)", val: "3, 4, 1, 2" },
                { label: "[3, 1, 4, 2] (INVALID C₄)", val: "3, 1, 4, 2" },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setStackInput(preset.val)}
                  className={`dmp-chip-btn ${stackInput === preset.val ? "active" : ""}`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="dmp-input-group" style={{ marginBottom: "1.25rem" }}>
            <label htmlFor="dmp-stack-input" className="dmp-input-label">
              Permutation Sequence (comma or space separated):
            </label>
            <input
              id="dmp-stack-input"
              type="text"
              value={stackInput}
              onChange={(e) => setStackInput(e.target.value)}
              placeholder="e.g. 3, 1, 2"
              className="dmp-text-input"
            />
          </div>

          {stackResult && (
            <div
              className={`dmp-stack-result-card ${stackResult.valid ? "valid" : "invalid"}`}
            >
              <div className="dmp-stack-status-row">
                <i
                  className={`fa-solid ${stackResult.valid ? "fa-circle-check" : "fa-triangle-exclamation"} dmp-status-icon`}
                />
                <div>
                  <h4 className="dmp-status-heading">
                    {stackResult.valid
                      ? "VALID Stack Permutation (LIFO Achievable)"
                      : "IMPOSSIBLE Stack Permutation (Forbidden Pattern)"}
                  </h4>
                  <p className="dmp-status-subtext">
                    {stackResult.valid
                      ? `Permutation [${parsedStackArray.join(", ")}] can be formed with ${stackResult.steps.length} push/pop operations.`
                      : stackResult.reason}
                  </p>
                </div>
              </div>

              {/* Step-by-Step Simulation Trace */}
              <div className="dmp-trace-container">
                <div className="dmp-trace-title">
                  Simulation Execution Trace:
                </div>
                <div className="dmp-trace-body">
                  {stackResult.steps.map((st, idx) => (
                    <div key={idx} className="dmp-trace-row">
                      <span
                        className={`dmp-step-action ${st.action === "push" ? "push" : "pop"}`}
                      >
                        Step {idx + 1}: {st.action.toUpperCase()} {st.value}
                      </span>
                      <span className="dmp-step-stack">
                        Stack: [{st.stackState.join(", ")}]
                      </span>
                    </div>
                  ))}
                  {!stackResult.valid && (
                    <div className="dmp-trace-halt">
                      [HALTED]: Target element cannot be popped because another
                      element is trapping it inside the stack!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: GROWTH RATES */}
      {activeTab === "growth" && (
        <div className="dmp-panel">
          <p className="dmp-tab-intro">
            Compare how rapidly <strong>Factorial Growth (n!)</strong> overtakes{" "}
            <strong>Exponential Growth (2ⁿ)</strong> and Polynomial Growth (n³,
            n²). Note that <code>n! &gt; 2ⁿ</code> strictly holds for all{" "}
            <code>n ≥ 4</code>.
          </p>

          <div className="dmp-slider-card">
            <div className="dmp-slider-header">
              <span className="dmp-slider-label">
                Current Input Size (n = {growthN}):
              </span>
              <span className="dmp-growth-callout">
                {growthN >= 4
                  ? `n! is ${(Number(fact(growthN)) / 2 ** growthN).toFixed(1)}× larger than 2ⁿ`
                  : "n < 4 (Base transition zone)"}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={growthN}
              onChange={(e) => setGrowthN(parseInt(e.target.value) || 1)}
              className="dmp-range-slider"
            />
          </div>

          <div className="dmp-table-wrapper">
            <table className="dmp-data-table">
              <thead>
                <tr>
                  <th>n</th>
                  <th>n²</th>
                  <th>n³</th>
                  <th className="th-exp">2ⁿ (Exponential)</th>
                  <th className="th-fact">n! (Factorial)</th>
                  <th>Is n! &gt; 2ⁿ?</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => {
                  const fVal = fact(val);
                  const expVal = BigInt(2) ** BigInt(val);
                  const isGreater = fVal > expVal;
                  const isCurrent = val === growthN;

                  return (
                    <tr
                      key={val}
                      className={isCurrent ? "dmp-row-current" : ""}
                    >
                      <td className="td-n">
                        <strong>{val}</strong>
                      </td>
                      <td>{val ** 2}</td>
                      <td>{val ** 3}</td>
                      <td className="td-exp">{expVal.toLocaleString()}</td>
                      <td className="td-fact">{fVal.toLocaleString()}</td>
                      <td>
                        {isGreater ? (
                          <span className="dmp-badge-yes">
                            YES ({fVal} &gt; {expVal})
                          </span>
                        ) : (
                          <span className="dmp-badge-no">
                            NO ({fVal} ≤ {expVal})
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: DYCK PATHS & PARENTHESES */}
      {activeTab === "dyck" && (
        <div className="dmp-panel">
          <p className="dmp-tab-intro">
            A <strong>Dyck Path</strong> of semilength <code>n</code> consists
            of <code>n</code> Right steps and <code>n</code> Up steps on an{" "}
            <code>n × n</code> grid that{" "}
            <strong>never crosses above the diagonal y = x</strong>. Each Dyck
            path has a 1-to-1 bijection with a valid balanced parentheses
            string!
          </p>

          <div className="dmp-section" style={{ marginBottom: "1rem" }}>
            <span className="dmp-section-label">Select Grid Size (n):</span>
            <div className="dmp-chip-row">
              {[1, 2, 3, 4].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => {
                    setDyckN(v);
                    setSelectedDyckIndex(0);
                  }}
                  className={`dmp-chip-btn ${dyckN === v ? "active" : ""}`}
                >
                  n = {v} (C_{v} = {Number(calcCatalan(v))})
                </button>
              ))}
            </div>
          </div>

          <div className="dmp-dyck-grid-layout">
            {/* List of valid strings */}
            <div className="dmp-dyck-list-col">
              <div className="dmp-dyck-col-header">
                Valid Strings ({dyckWords.length} total = C_{dyckN}):
              </div>
              <div className="dmp-dyck-word-list">
                {dyckWords.map((word, idx) => (
                  <button
                    key={word}
                    type="button"
                    onClick={() => setSelectedDyckIndex(idx)}
                    className={`dmp-dyck-word-btn ${selectedDyckIndex === idx ? "active" : ""}`}
                  >
                    <span className="dmp-dyck-word-text">{word}</span>
                    <span className="dmp-dyck-word-num">#{idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dyck Path Grid Visualizer */}
            <div className="dmp-dyck-viz-col">
              <div className="dmp-viz-title">Active Path: {activeDyckWord}</div>

              {/* Render SVG Grid & Path */}
              {(() => {
                const gridSize = dyckN;
                const svgSize = 220;
                const pad = 24;
                const stepPx = (svgSize - 2 * pad) / gridSize;

                // Trace coordinates
                let cx = 0;
                let cy = 0;
                const points: [number, number][] = [[cx, cy]];

                for (const char of activeDyckWord) {
                  if (char === "(") {
                    cx += 1; // Right
                  } else {
                    cy += 1; // Up
                  }
                  points.push([cx, cy]);
                }

                const pathData = points
                  .map(([x, y], idx) => {
                    const px = pad + x * stepPx;
                    const py = svgSize - pad - y * stepPx;
                    return `${idx === 0 ? "M" : "L"} ${px} ${py}`;
                  })
                  .join(" ");

                return (
                  <svg
                    width={svgSize}
                    height={svgSize}
                    className="dmp-dyck-svg"
                  >
                    {/* Grid lines */}
                    {Array.from({ length: gridSize + 1 }).map((_, i) => (
                      <React.Fragment key={i}>
                        <line
                          x1={pad}
                          y1={pad + i * stepPx}
                          x2={svgSize - pad}
                          y2={pad + i * stepPx}
                          className="dmp-grid-line"
                        />
                        <line
                          x1={pad + i * stepPx}
                          y1={pad}
                          x2={pad + i * stepPx}
                          y2={svgSize - pad}
                          className="dmp-grid-line"
                        />
                      </React.Fragment>
                    ))}

                    {/* Diagonal line y = x (Never cross above!) */}
                    <line
                      x1={pad}
                      y1={svgSize - pad}
                      x2={svgSize - pad}
                      y2={pad}
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />

                    {/* Active Dyck Path */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Start and end points */}
                    <circle cx={pad} cy={svgSize - pad} r="5" fill="#10b981" />
                    <circle cx={svgSize - pad} cy={pad} r="5" fill="#f59e0b" />
                  </svg>
                );
              })()}

              <div className="dmp-viz-legend">
                <span className="legend-dot green" /> Start (0,0) &nbsp;
                <span className="legend-dot amber" /> End ({dyckN},{dyckN})
                &nbsp;
                <span className="legend-dot red" /> Diagonal y = x
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
