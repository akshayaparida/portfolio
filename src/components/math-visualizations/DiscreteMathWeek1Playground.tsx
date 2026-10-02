"use client";

import React, { useState, useMemo } from "react";

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
    // If top of stack matches, pop it
    if (stack.length > 0 && stack[stack.length - 1] === want) {
      stack.pop();
      steps.push({ action: "pop", value: want, stackState: [...stack] });
      targetIdx++;
    } else if (nextToPush <= n) {
      // Need to push more
      stack.push(nextToPush);
      steps.push({ action: "push", value: nextToPush, stackState: [...stack] });
      nextToPush++;
    } else {
      // Cannot satisfy
      break;
    }
  }

  const valid = targetIdx === n && stack.length === 0;

  // Find 231 violation if invalid
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
            reason = `Contains forbidden 231-pattern: [${a}, ${b}, ${c}] at positions (${i + 1}, ${j + 1}, ${k + 1}). When '${b}' is pushed, '${a}' is trapped beneath it, so '${c}' cannot exit before '${a}' unless '${b}' has already exited.`;
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

export default function DiscreteMathWeek1Playground() {
  const [activeTab, setActiveTab] = useState<
    "calc" | "stack" | "growth" | "dyck"
  >("calc");

  // Calculator states
  const [calcMode, setCalcMode] = useState<
    | "perm"
    | "comb"
    | "catalan"
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

  // Safe index
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
          formula: `^${n}P_${r} = \\frac{${n}!}{( ${n} - ${r} )!} = \\frac{${fact(n)}}{${fact(Math.max(0, n - r))}}`,
          result: p.toString(),
          explanation: `Number of ways to arrange ${r} distinct items from ${n} distinct items when ORDER MATTERS.`,
        };
      }
      case "comb": {
        const c = calcComb(n, r);
        return {
          formula: `^${n}C_${r} = \\binom{${n}}{${r}} = \\frac{${n}!}{${r}!( ${n} - ${r} )!} = \\frac{${fact(n)}}{${fact(r)} \\times ${fact(Math.max(0, n - r))}}`,
          result: c.toString(),
          explanation: `Number of ways to choose a subset of ${r} items from ${n} items when ORDER DOES NOT MATTER.`,
        };
      }
      case "catalan": {
        const cat = calcCatalan(n);
        const comb2n_n = calcComb(2 * n, n);
        return {
          formula: `C_${n} = \\frac{1}{${n} + 1}\\binom{${2 * n}}{${n}} = \\frac{1}{${n + 1}} \\times ${comb2n_n}`,
          result: cat.toString(),
          explanation: `The ${n}-th Catalan number. Counts valid parentheses pairs, Dyck paths, non-crossing circle chords, stack permutations, and binary trees with ${n} internal nodes.`,
        };
      }
      case "grid": {
        const totalSteps = m + n;
        const paths = calcComb(totalSteps, n);
        return {
          formula: `\\binom{${m} + ${n}}{${n}} = \\binom{${totalSteps}}{${n}} = \\frac{${totalSteps}!}{${m}! \\, ${n}!}`,
          result: paths.toString(),
          explanation: `Number of monotonic paths from (0,0) to (${m},${n}) on a grid moving only Right and Up. For an ${n}×${n} square grid, this is \\binom{2n}{n} = \\binom{${2 * n}}{${n}} = ${calcComb(2 * n, n)}.`,
        };
      }
      case "polygon": {
        const cat = n >= 3 ? calcCatalan(n - 2) : BigInt(0);
        return {
          formula: `C_{${n} - 2} = C_${Math.max(0, n - 2)} = \\frac{1}{${Math.max(1, n - 1)}}\\binom{${2 * Math.max(0, n - 2)}}{${Math.max(0, n - 2)}}`,
          result: cat.toString(),
          explanation: `Number of ways to triangulate a convex ${n}-sided polygon (${n}-gon) using ${Math.max(0, n - 3)} non-intersecting internal diagonals into ${Math.max(0, n - 2)} triangles.`,
        };
      }
      case "adjacent": {
        const ways = n >= 2 ? BigInt(2) * fact(n - 1) : fact(n);
        return {
          formula: `2 \\times (${n} - 1)! = 2 \\times ${fact(Math.max(0, n - 1))}`,
          result: ways.toString(),
          explanation: `Arrangements of ${n} distinct objects where 2 specified objects MUST stay together (treat the pair as 1 block with 2! internal orders).`,
        };
      }
      case "nonAdjacent": {
        const total = fact(n);
        const together = n >= 2 ? BigInt(2) * fact(n - 1) : BigInt(0);
        const nonAdj = total - together;
        return {
          formula: `${n}! - 2(${n} - 1)! = ${total} - ${together} = (${n} - 2) \\times (${n} - 1)!`,
          result: nonAdj.toString(),
          explanation: `Arrangements of ${n} distinct objects where 2 specified objects are NEVER together (Total - Together complement rule).`,
        };
      }
      case "circular": {
        const normalCirc = n >= 1 ? fact(n - 1) : BigInt(1);
        const necklace = n >= 3 ? normalCirc / BigInt(2) : normalCirc;
        return {
          formula: `(n - 1)! = (${n} - 1)! = ${normalCirc} \\quad [\\text{Necklace / Keyring (flip)}: \\frac{(n-1)!}{2} = ${necklace}]`,
          result: `${normalCirc} (Round Table) / ${necklace} (Necklace/Keyring)`,
          explanation: `Circular arrangements fix 1 anchor object to break rotational symmetry, yielding (n-1)!. If reversible like beads on a necklace, divide by 2.`,
        };
      }
    }
  }, [calcMode, nVal, rVal, mVal]);

  return (
    <div
      style={{
        background: "var(--surface, #111827)",
        border: "1px solid var(--border, #374151)",
        borderRadius: "16px",
        padding: "1.5rem",
        color: "var(--text-primary, #f9fafb)",
        fontFamily: "inherit",
      }}
    >
      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          borderBottom: "1px solid var(--border, #374151)",
          paddingBottom: "1rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
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
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background:
                activeTab === tab.id
                  ? "var(--accent, #3b82f6)"
                  : "var(--surface-hover, #1f2937)",
              color:
                activeTab === tab.id
                  ? "#ffffff"
                  : "var(--text-secondary, #9ca3af)",
              transition: "all 0.15s ease",
            }}
          >
            <i className={`fa-solid ${tab.icon}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: FORMULA CALCULATOR */}
      {activeTab === "calc" && (
        <div>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                color: "var(--text-secondary, #9ca3af)",
                marginBottom: "0.5rem",
                fontWeight: 600,
              }}
            >
              Select Topic / Formula:
            </label>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
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
                  style={{
                    padding: "0.4rem 0.8rem",
                    borderRadius: "6px",
                    border: "1px solid var(--border, #374151)",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    fontWeight: calcMode === m.id ? 700 : 500,
                    background:
                      calcMode === m.id
                        ? "rgba(59, 130, 246, 0.2)"
                        : "var(--surface, #1f2937)",
                    color:
                      calcMode === m.id
                        ? "#60a5fa"
                        : "var(--text-primary, #e5e7eb)",
                    borderColor:
                      calcMode === m.id ? "#3b82f6" : "var(--border, #374151)",
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Inputs Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "1rem",
              margin: "1.25rem 0",
              background: "rgba(0, 0, 0, 0.2)",
              padding: "1rem",
              borderRadius: "10px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  color: "var(--text-secondary, #9ca3af)",
                  marginBottom: "0.25rem",
                }}
              >
                Value of n:
              </label>
              <input
                type="number"
                min={0}
                max={20}
                value={nVal}
                onChange={(e) =>
                  setNVal(Math.max(0, parseInt(e.target.value) || 0))
                }
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  background: "var(--surface, #111827)",
                  border: "1px solid var(--border, #4b5563)",
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              />
            </div>

            {(calcMode === "perm" || calcMode === "comb") && (
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    color: "var(--text-secondary, #9ca3af)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Value of r:
                </label>
                <input
                  type="number"
                  min={0}
                  max={nVal}
                  value={rVal}
                  onChange={(e) =>
                    setRVal(Math.max(0, parseInt(e.target.value) || 0))
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    background: "var(--surface, #111827)",
                    border: "1px solid var(--border, #4b5563)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                />
              </div>
            )}

            {calcMode === "grid" && (
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    color: "var(--text-secondary, #9ca3af)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Value of m (Grid Columns):
                </label>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={mVal}
                  onChange={(e) =>
                    setMVal(Math.max(0, parseInt(e.target.value) || 0))
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    background: "var(--surface, #111827)",
                    border: "1px solid var(--border, #4b5563)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                />
              </div>
            )}
          </div>

          {/* Result Card */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.08))",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "12px",
              padding: "1.25rem",
            }}
          >
            <div
              style={{
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#60a5fa",
                fontWeight: 700,
                marginBottom: "0.5rem",
              }}
            >
              Calculated Result:
            </div>
            <div
              style={{
                fontSize: "1.85rem",
                fontWeight: 800,
                color: "#ffffff",
                marginBottom: "0.5rem",
              }}
            >
              {calcResult.result}
            </div>
            <div
              style={{
                fontSize: "0.9rem",
                color: "#93c5fd",
                fontFamily: "monospace",
                marginBottom: "0.75rem",
                background: "rgba(0, 0, 0, 0.3)",
                padding: "0.5rem 0.75rem",
                borderRadius: "6px",
                display: "inline-block",
              }}
            >
              Formula: {calcResult.formula}
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.88rem",
                color: "var(--text-secondary, #d1d5db)",
              }}
            >
              {calcResult.explanation}
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: STACK PERMUTATION VALIDATOR */}
      {activeTab === "stack" && (
        <div>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary, #9ca3af)",
              marginTop: 0,
            }}
          >
            Enter a permutation of digits to check if it can be generated by a{" "}
            <strong>LIFO Stack</strong> from input sequence{" "}
            <code>(1, 2, ..., n)</code> using valid Push and Pop operations.
          </p>

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "0.85rem",
                color: "#9ca3af",
                alignSelf: "center",
              }}
            >
              Quick Presets:
            </span>
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
                style={{
                  fontSize: "0.78rem",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border, #374151)",
                  background: "var(--surface, #1f2937)",
                  color: "#d1d5db",
                  cursor: "pointer",
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.82rem",
                color: "var(--text-secondary, #9ca3af)",
                marginBottom: "0.25rem",
              }}
            >
              Permutation Sequence (comma or space separated):
            </label>
            <input
              type="text"
              value={stackInput}
              onChange={(e) => setStackInput(e.target.value)}
              placeholder="e.g. 3, 1, 2"
              style={{
                width: "100%",
                padding: "0.6rem 0.8rem",
                background: "var(--surface, #111827)",
                border: "1px solid var(--border, #4b5563)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            />
          </div>

          {stackResult && (
            <div
              style={{
                borderRadius: "12px",
                border: stackResult.valid
                  ? "1px solid rgba(16, 185, 129, 0.4)"
                  : "1px solid rgba(239, 68, 68, 0.4)",
                background: stackResult.valid
                  ? "rgba(16, 185, 129, 0.08)"
                  : "rgba(239, 68, 68, 0.08)",
                padding: "1.25rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.75rem",
                }}
              >
                <i
                  className={
                    stackResult.valid
                      ? "fa-solid fa-circle-check"
                      : "fa-solid fa-triangle-exclamation"
                  }
                  style={{
                    fontSize: "1.5rem",
                    color: stackResult.valid ? "#10b981" : "#ef4444",
                  }}
                />
                <div>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: stackResult.valid ? "#10b981" : "#ef4444",
                    }}
                  >
                    {stackResult.valid
                      ? "VALID Stack Permutation (LIFO Achievable)"
                      : "IMPOSSIBLE Stack Permutation (Forbidden Pattern)"}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.85rem",
                      color: "var(--text-secondary, #9ca3af)",
                    }}
                  >
                    {stackResult.valid
                      ? `Permutation [${parsedStackArray.join(", ")}] can be formed with ${stackResult.steps.length} push/pop operations.`
                      : stackResult.reason}
                  </p>
                </div>
              </div>

              {/* Step-by-Step Simulation Trace */}
              <div style={{ marginTop: "1rem" }}>
                <div
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--text-secondary, #9ca3af)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Simulation Execution Trace:
                </div>
                <div
                  style={{
                    maxHeight: "180px",
                    overflowY: "auto",
                    background: "rgba(0, 0, 0, 0.4)",
                    borderRadius: "8px",
                    padding: "0.75rem",
                    fontFamily: "monospace",
                    fontSize: "0.82rem",
                  }}
                >
                  {stackResult.steps.map((st, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "0.2rem 0",
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <span
                        style={{
                          color: st.action === "push" ? "#60a5fa" : "#34d399",
                          fontWeight: 600,
                        }}
                      >
                        Step {idx + 1}: {st.action.toUpperCase()} {st.value}
                      </span>
                      <span style={{ color: "#9ca3af" }}>
                        Stack: [{st.stackState.join(", ")}]
                      </span>
                    </div>
                  ))}
                  {!stackResult.valid && (
                    <div
                      style={{
                        color: "#f87171",
                        fontWeight: 700,
                        paddingTop: "0.5rem",
                      }}
                    >
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
        <div>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary, #9ca3af)",
              marginTop: 0,
            }}
          >
            Compare how rapidly <strong>Factorial Growth (n!)</strong> overtakes{" "}
            <strong>Exponential Growth (2ⁿ)</strong> and Polynomial Growth (n³,
            n²). Note that <code>n! &gt; 2ⁿ</code> strictly holds for all{" "}
            <code>n ≥ 4</code>.
          </p>

          <div style={{ margin: "1rem 0" }}>
            <label
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.85rem",
                color: "var(--text-secondary, #9ca3af)",
                marginBottom: "0.5rem",
              }}
            >
              <span>Current Input Size (n = {growthN}):</span>
              <span style={{ color: "#60a5fa", fontWeight: 700 }}>
                {growthN >= 4
                  ? `n! is ${(Number(fact(growthN)) / 2 ** growthN).toFixed(1)}× larger than 2ⁿ`
                  : "n < 4 (Base transition zone)"}
              </span>
            </label>
            <input
              type="range"
              min={1}
              max={10}
              value={growthN}
              onChange={(e) => setGrowthN(parseInt(e.target.value) || 1)}
              style={{ width: "100%", cursor: "pointer" }}
            />
          </div>

          <div
            style={{
              overflowX: "auto",
              background: "rgba(0, 0, 0, 0.2)",
              borderRadius: "10px",
              padding: "0.5rem",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.85rem",
                textAlign: "left",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid var(--border, #374151)",
                    color: "#9ca3af",
                  }}
                >
                  <th style={{ padding: "0.5rem" }}>n</th>
                  <th style={{ padding: "0.5rem" }}>n</th>
                  <th style={{ padding: "0.5rem" }}>n²</th>
                  <th style={{ padding: "0.5rem" }}>n³</th>
                  <th style={{ padding: "0.5rem", color: "#fbbf24" }}>
                    2ⁿ (Exponential)
                  </th>
                  <th style={{ padding: "0.5rem", color: "#f87171" }}>
                    n! (Factorial)
                  </th>
                  <th style={{ padding: "0.5rem" }}>Is n! &gt; 2ⁿ?</th>
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
                      style={{
                        background: isCurrent
                          ? "rgba(59, 130, 246, 0.15)"
                          : "transparent",
                        fontWeight: isCurrent ? 700 : 400,
                        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <td
                        style={{
                          padding: "0.45rem 0.5rem",
                          color: isCurrent ? "#60a5fa" : "inherit",
                        }}
                      >
                        {val}
                      </td>
                      <td style={{ padding: "0.45rem 0.5rem" }}>{val}</td>
                      <td style={{ padding: "0.45rem 0.5rem" }}>{val ** 2}</td>
                      <td style={{ padding: "0.45rem 0.5rem" }}>{val ** 3}</td>
                      <td
                        style={{
                          padding: "0.45rem 0.5rem",
                          color: "#fbbf24",
                          fontFamily: "monospace",
                        }}
                      >
                        {expVal.toLocaleString()}
                      </td>
                      <td
                        style={{
                          padding: "0.45rem 0.5rem",
                          color: "#f87171",
                          fontFamily: "monospace",
                        }}
                      >
                        {fVal.toLocaleString()}
                      </td>
                      <td style={{ padding: "0.45rem 0.5rem" }}>
                        {isGreater ? (
                          <span style={{ color: "#34d399", fontWeight: 700 }}>
                            YES ({fVal} &gt; {expVal})
                          </span>
                        ) : (
                          <span style={{ color: "#9ca3af" }}>
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
        <div>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary, #9ca3af)",
              marginTop: 0,
            }}
          >
            A <strong>Dyck Path</strong> of semilength <code>n</code> consists
            of <code>n</code> Right steps and <code>n</code> Up steps on an{" "}
            <code>n × n</code> grid that{" "}
            <strong>never crosses above the diagonal y = x</strong>. Each Dyck
            path has a 1-to-1 bijection with a valid balanced parentheses
            string!
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "0.85rem",
                color: "var(--text-secondary, #9ca3af)",
              }}
            >
              Grid Size (n):
            </span>
            {[1, 2, 3, 4].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setDyckN(v);
                  setSelectedDyckIndex(0);
                }}
                style={{
                  padding: "0.3rem 0.8rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border, #374151)",
                  background:
                    dyckN === v
                      ? "var(--accent, #3b82f6)"
                      : "var(--surface, #1f2937)",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                n = {v} (C_{v} = {Number(calcCatalan(v))})
              </button>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.25rem",
            }}
          >
            {/* List of valid strings */}
            <div>
              <div
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "var(--text-secondary, #9ca3af)",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                Valid Strings ({dyckWords.length} total = C_{dyckN}):
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                  maxHeight: "220px",
                  overflowY: "auto",
                }}
              >
                {dyckWords.map((word, idx) => (
                  <button
                    key={word}
                    type="button"
                    onClick={() => setSelectedDyckIndex(idx)}
                    style={{
                      padding: "0.45rem 0.75rem",
                      borderRadius: "6px",
                      border: "1px solid",
                      borderColor:
                        selectedDyckIndex === idx
                          ? "#3b82f6"
                          : "rgba(255, 255, 255, 0.08)",
                      background:
                        selectedDyckIndex === idx
                          ? "rgba(59, 130, 246, 0.2)"
                          : "rgba(0, 0, 0, 0.2)",
                      color: selectedDyckIndex === idx ? "#60a5fa" : "#e5e7eb",
                      textAlign: "left",
                      fontFamily: "monospace",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{word}</span>
                    <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                      #{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dyck Path Grid Visualizer */}
            <div
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                borderRadius: "10px",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "#93c5fd",
                  fontFamily: "monospace",
                  marginBottom: "0.5rem",
                }}
              >
                Path: {activeDyckWord}
              </div>

              {/* Render SVG Grid & Path */}
              {(() => {
                const gridSize = dyckN;
                const svgSize = 180;
                const pad = 20;
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
                    style={{ border: "1px solid #374151", borderRadius: "8px" }}
                  >
                    {/* Grid lines */}
                    {Array.from({ length: gridSize + 1 }).map((_, i) => (
                      <React.Fragment key={i}>
                        <line
                          x1={pad}
                          y1={pad + i * stepPx}
                          x2={svgSize - pad}
                          y2={pad + i * stepPx}
                          stroke="#374151"
                          strokeDasharray="2 2"
                        />
                        <line
                          x1={pad + i * stepPx}
                          y1={pad}
                          x2={pad + i * stepPx}
                          y2={svgSize - pad}
                          stroke="#374151"
                          strokeDasharray="2 2"
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
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />

                    {/* Active Dyck Path */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Start and end points */}
                    <circle cx={pad} cy={svgSize - pad} r="4" fill="#10b981" />
                    <circle cx={svgSize - pad} cy={pad} r="4" fill="#f59e0b" />
                  </svg>
                );
              })()}

              <div
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                }}
              >
                Green = (0,0), Orange = ({dyckN},{dyckN}), Red dashed = Diagonal
                y=x
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
