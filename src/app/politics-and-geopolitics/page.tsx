"use client";

import React, { useState, useMemo } from "react";
import BlogPageHeader from "@/components/BlogPageHeader";
import PageFooter from "@/components/PageFooter";
import InteractiveGeopoliticsMap from "@/components/politics/InteractiveGeopoliticsMap";
import {
  politicalParties,
  studentWings,
  currentGovernment,
  bilateralRelations,
  borderChallenges,
  internalSecurityThreats,
  policyThinkTanks,
} from "@/data/politicsAndGeopolitics";
import "@/styles/politics-and-geopolitics.css";

type TabSection =
  | "parties"
  | "student-wings"
  | "governance"
  | "bilateral"
  | "borders"
  | "internal-security"
  | "think-tanks";

export default function PoliticsAndGeopoliticsPage() {
  const [activeTab, setActiveTab] = useState<TabSection>("parties");
  const [searchQuery, setSearchQuery] = useState("");
  const [partyCategoryFilter, setPartyCategoryFilter] = useState<string>("all");
  const [partyAllianceFilter, setPartyAllianceFilter] = useState<string>("all");

  // Filtered Parties
  const filteredParties = useMemo(() => {
    return politicalParties.filter((party) => {
      const matchesSearch =
        searchQuery === "" ||
        party.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        party.abbreviation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        party.currentLeader.toLowerCase().includes(searchQuery.toLowerCase()) ||
        party.coreIdeologies.some((i) =>
          i.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        party.corePhilosophy
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        party.primaryBase.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        partyCategoryFilter === "all" || party.category === partyCategoryFilter;

      const matchesAlliance =
        partyAllianceFilter === "all" || party.alliance === partyAllianceFilter;

      return matchesSearch && matchesCategory && matchesAlliance;
    });
  }, [searchQuery, partyCategoryFilter, partyAllianceFilter]);

  // Filtered Student Wings
  const filteredStudentWings = useMemo(() => {
    return studentWings.filter((wing) => {
      return (
        searchQuery === "" ||
        wing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wing.abbreviation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wing.parentPartyOrIdeology
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        wing.keyCampusHubs.some((hub) =>
          hub.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        wing.coreIssues.some((issue) =>
          issue.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      );
    });
  }, [searchQuery]);

  // Filtered Bilateral Relations
  const filteredBilateral = useMemo(() => {
    return bilateralRelations.filter((rel) => {
      return (
        searchQuery === "" ||
        rel.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rel.partnershipTitle
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        rel.keyStrategicConvergences.some((c) =>
          c.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        rel.frictionPointsAndChallenges.some((f) =>
          f.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      );
    });
  }, [searchQuery]);

  // Filtered Border Challenges
  const filteredBorders = useMemo(() => {
    return borderChallenges.filter((border) => {
      return (
        searchQuery === "" ||
        border.borderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        border.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
        border.keySectors.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        border.majorFlashpointsAndChallenges.some((m) =>
          m.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      );
    });
  }, [searchQuery]);

  // Filtered Internal Security
  const filteredSecurity = useMemo(() => {
    return internalSecurityThreats.filter((threat) => {
      return (
        searchQuery === "" ||
        threat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        threat.threatDescription
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        threat.mechanismsAndVectors.some((m) =>
          m.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        threat.majorInterventionsAndBans.some((b) =>
          b.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      );
    });
  }, [searchQuery]);

  // Filtered Think Tanks
  const filteredThinkTanks = useMemo(() => {
    return policyThinkTanks.filter((tt) => {
      return (
        searchQuery === "" ||
        tt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tt.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tt.focusAreas.some((fa) =>
          fa.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        tt.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  const resetFilters = () => {
    setSearchQuery("");
    setPartyCategoryFilter("all");
    setPartyAllianceFilter("all");
  };

  return (
    <div className="pol-container">
      {/* Top Header */}
      <BlogPageHeader
        title="Politics, Internal Security & Geopolitics"
        backLink="/"
        backTitle="Back to Portfolio"
      />

      <main className="pol-main">
        {/* Hero Section */}
        <section className="pol-hero">
          <div className="pol-hero-badge-wrap">
            <i className="fa-solid fa-landmark"></i>
            <span>Indian Statecraft &amp; Global Geopolitics</span>
          </div>

          <h1 className="pol-hero-title">
            Politics, Security &amp; Geopolitical Architecture
          </h1>

          <p className="pol-hero-desc">
            An encyclopedic, objective dossier covering India&apos;s recognized
            political parties, 18th Lok Sabha coalition governance, campus
            student wings, great power dynamics (USA, Russia, China, Europe),
            border security frontiers (LAC, LoC, IOR, Myanmar), and internal
            security threats (FCRA foreign funding, PFI UAPA ban, and
            counter-terror financing).
          </p>

          {/* Metrics Pill Row */}
          <div className="pol-stats-grid">
            <div className="pol-stat-pill">
              <i className="fa-solid fa-flag"></i>
              <span>Parties Tracked:</span>
              <span className="pol-stat-count">{politicalParties.length}</span>
            </div>
            <div className="pol-stat-pill">
              <i className="fa-solid fa-user-graduate"></i>
              <span>Student Wings:</span>
              <span className="pol-stat-count">{studentWings.length}</span>
            </div>
            <div className="pol-stat-pill">
              <i className="fa-solid fa-check-to-slot"></i>
              <span>18th Lok Sabha:</span>
              <span className="pol-stat-count">
                NDA ({currentGovernment.governingSeats}) vs I.N.D.I.A (
                {currentGovernment.oppositionSeats})
              </span>
            </div>
            <div className="pol-stat-pill">
              <i className="fa-solid fa-earth-americas"></i>
              <span>Great Power Relations:</span>
              <span className="pol-stat-count">
                {bilateralRelations.length}
              </span>
            </div>
            <div className="pol-stat-pill">
              <i className="fa-solid fa-shield-halved"></i>
              <span>Border Frontiers:</span>
              <span className="pol-stat-count">{borderChallenges.length}</span>
            </div>
            <div className="pol-stat-pill">
              <i className="fa-solid fa-lock"></i>
              <span>Internal Security Vectors:</span>
              <span className="pol-stat-count">
                {internalSecurityThreats.length}
              </span>
            </div>
          </div>
        </section>

        {/* Interactive Strategic Security & Geopolitical Map */}
        <section aria-label="Interactive Strategic Map">
          <InteractiveGeopoliticsMap />
        </section>

        {/* Section Navigation & Search Deck */}
        <div className="pol-nav-card">
          {/* Main Module Tabs */}
          <div className="pol-main-tabs" role="tablist">
            <button
              onClick={() => setActiveTab("parties")}
              className={`pol-tab-btn ${activeTab === "parties" ? "active" : ""}`}
            >
              <i className="fa-solid fa-landmark"></i>
              <span>Parties &amp; Ideologies ({politicalParties.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("student-wings")}
              className={`pol-tab-btn ${activeTab === "student-wings" ? "active" : ""}`}
            >
              <i className="fa-solid fa-graduation-cap"></i>
              <span>Student Wings ({studentWings.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("governance")}
              className={`pol-tab-btn ${activeTab === "governance" ? "active" : ""}`}
            >
              <i className="fa-solid fa-building-columns"></i>
              <span>18th Lok Sabha &amp; Cabinet</span>
            </button>
            <button
              onClick={() => setActiveTab("bilateral")}
              className={`pol-tab-btn ${activeTab === "bilateral" ? "active" : ""}`}
            >
              <i className="fa-solid fa-globe"></i>
              <span>Great Power Relations ({bilateralRelations.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("borders")}
              className={`pol-tab-btn ${activeTab === "borders" ? "active" : ""}`}
            >
              <i className="fa-solid fa-shield"></i>
              <span>Border Frontiers ({borderChallenges.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("internal-security")}
              className={`pol-tab-btn ${activeTab === "internal-security" ? "active" : ""}`}
            >
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span>
                Internal Security &amp; FCRA ({internalSecurityThreats.length})
              </span>
            </button>
            <button
              onClick={() => setActiveTab("think-tanks")}
              className={`pol-tab-btn ${activeTab === "think-tanks" ? "active" : ""}`}
            >
              <i className="fa-solid fa-book-bookmark"></i>
              <span>Think Tanks ({policyThinkTanks.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="pol-search-box">
            <i className="fa-solid fa-magnifying-glass pol-search-icon"></i>
            <input
              type="text"
              placeholder={`Search in ${activeTab.replace("-", " ")} (e.g., BJP, Congress, ABVP, LAC, Quad, FCRA, PFI)...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pol-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="pol-search-clear"
                title="Clear search"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          {/* Subfilters (Only on Parties Tab) */}
          {activeTab === "parties" && (
            <div className="pol-subfilters-row">
              {/* Category Filter */}
              <div className="pol-filter-group">
                <span className="pol-filter-label">Category:</span>
                <button
                  onClick={() => setPartyCategoryFilter("all")}
                  className={`pol-filter-btn ${partyCategoryFilter === "all" ? "active" : ""}`}
                >
                  All
                </button>
                <button
                  onClick={() => setPartyCategoryFilter("national")}
                  className={`pol-filter-btn ${partyCategoryFilter === "national" ? "active" : ""}`}
                >
                  National Parties
                </button>
                <button
                  onClick={() => setPartyCategoryFilter("regional")}
                  className={`pol-filter-btn ${partyCategoryFilter === "regional" ? "active" : ""}`}
                >
                  Regional Parties
                </button>
                <button
                  onClick={() => setPartyCategoryFilter("identity-religious")}
                  className={`pol-filter-btn ${partyCategoryFilter === "identity-religious" ? "active" : ""}`}
                >
                  Identity &amp; Religious
                </button>
              </div>

              {/* Alliance Filter */}
              <div className="pol-filter-group">
                <span className="pol-filter-label">Alliance:</span>
                <button
                  onClick={() => setPartyAllianceFilter("all")}
                  className={`pol-filter-btn ${partyAllianceFilter === "all" ? "active" : ""}`}
                >
                  All
                </button>
                <button
                  onClick={() => setPartyAllianceFilter("NDA")}
                  className={`pol-filter-btn ${partyAllianceFilter === "NDA" ? "active" : ""}`}
                >
                  NDA
                </button>
                <button
                  onClick={() => setPartyAllianceFilter("I.N.D.I.A")}
                  className={`pol-filter-btn ${partyAllianceFilter === "I.N.D.I.A" ? "active" : ""}`}
                >
                  I.N.D.I.A
                </button>
                <button
                  onClick={() =>
                    setPartyAllianceFilter("Unallied / Independent")
                  }
                  className={`pol-filter-btn ${partyAllianceFilter === "Unallied / Independent" ? "active" : ""}`}
                >
                  Unallied
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================================================================ */}
        {/* TAB 1: POLITICAL PARTIES & IDEOLOGIES */}
        {/* ================================================================ */}
        {activeTab === "parties" && (
          <div>
            {filteredParties.length > 0 ? (
              <div className="pol-cards-grid">
                {filteredParties.map((party) => (
                  <article key={party.id} className="pol-card">
                    <div>
                      {/* Header */}
                      <div className="pol-card-header">
                        <div className="pol-card-title-wrap">
                          <h2 className="pol-card-title">
                            {party.name} ({party.abbreviation})
                          </h2>
                          <span className="pol-card-subtitle">
                            Symbol: {party.symbol} • Est. {party.foundedYear} •
                            HQ: {party.headquarters}
                          </span>
                          <div className="pol-badges-wrap">
                            <span className="pol-badge">
                              {party.categoryLabel}
                            </span>
                            <span
                              className={`pol-badge ${
                                party.alliance === "NDA"
                                  ? "pol-badge-nda"
                                  : party.alliance === "I.N.D.I.A"
                                    ? "pol-badge-india-alliance"
                                    : "pol-badge-independent"
                              }`}
                            >
                              Alliance: {party.alliance}
                            </span>
                            <span className="pol-badge">
                              {party.politicalPosition}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Leadership & Status */}
                      <div className="text-xs text-[var(--text-muted)] mb-3">
                        <p>
                          <strong>Leader:</strong> {party.currentLeader}
                        </p>
                        <p className="mt-1">
                          <strong>Status:</strong> {party.governanceStatus}
                        </p>
                      </div>

                      {/* Core Ideologies */}
                      <div className="pol-card-section">
                        <span className="pol-section-heading">
                          Core Ideology &amp; Philosophy
                        </span>
                        <p className="pol-card-desc">{party.corePhilosophy}</p>
                        <div className="pol-tags-row">
                          {party.coreIdeologies.map((ideology) => (
                            <span key={ideology} className="pol-tag-pill">
                              #{ideology}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Economic & Foreign Policy Views */}
                      <div className="pol-card-section">
                        <span className="pol-section-heading">
                          Economic &amp; Foreign Policy Stance
                        </span>
                        <p className="text-xs text-[var(--text-secondary)] mb-2">
                          <strong>Economic:</strong> {party.economicVision}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">
                          <strong>Foreign Policy:</strong>{" "}
                          {party.foreignPolicyStance}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pol-card-footer">
                      <span className="pol-footer-meta">
                        Base: {party.primaryBase}
                      </span>
                      {party.officialWebsite && (
                        <a
                          href={party.officialWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pol-ext-btn"
                        >
                          <span>Official Portal</span>
                          <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="pol-empty-state">
                <i className="fa-solid fa-magnifying-glass pol-empty-icon"></i>
                <h3 className="pol-empty-title">No Political Parties Found</h3>
                <p className="pol-empty-text">
                  No parties matched your current search and filter criteria.
                </p>
                <button onClick={resetFilters} className="pol-reset-btn">
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 2: STUDENT POLITICAL WINGS */}
        {/* ================================================================ */}
        {activeTab === "student-wings" && (
          <div>
            {filteredStudentWings.length > 0 ? (
              <div className="pol-cards-grid">
                {filteredStudentWings.map((wing) => (
                  <article key={wing.id} className="pol-card">
                    <div>
                      {/* Header */}
                      <div className="pol-card-header">
                        <div className="pol-card-title-wrap">
                          <h2 className="pol-card-title">
                            {wing.name} ({wing.abbreviation})
                          </h2>
                          <span className="pol-card-subtitle">
                            Motto: &quot;{wing.motto}&quot; • Founded:{" "}
                            {wing.foundedYear}
                          </span>
                          <div className="pol-badges-wrap">
                            <span className="pol-badge">
                              {wing.ideologicalStance}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-[var(--text-muted)] mb-3">
                        <strong>Affiliation:</strong>{" "}
                        {wing.parentPartyOrIdeology}
                      </p>

                      <p className="pol-card-desc">{wing.description}</p>

                      {/* Key Campus Hubs */}
                      <div className="pol-card-section">
                        <span className="pol-section-heading">
                          Key University Hubs
                        </span>
                        <div className="pol-tags-row">
                          {wing.keyCampusHubs.map((hub) => (
                            <span key={hub} className="pol-tag-pill">
                              <i className="fa-solid fa-building-columns mr-1"></i>
                              {hub}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Core Issues */}
                      <div className="pol-card-section">
                        <span className="pol-section-heading">
                          Core Campus Agitations
                        </span>
                        <ul className="pol-bullet-list">
                          {wing.coreIssues.map((issue, idx) => (
                            <li key={idx}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pol-card-footer">
                      <span className="pol-footer-meta">
                        {wing.historicalSignificance}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="pol-empty-state">
                <i className="fa-solid fa-magnifying-glass pol-empty-icon"></i>
                <h3 className="pol-empty-title">No Student Wings Found</h3>
                <p className="pol-empty-text">
                  No campus organizations matched your search query.
                </p>
                <button onClick={resetFilters} className="pol-reset-btn">
                  Reset Search
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 3: 18th LOK SABHA & UNION GOVERNANCE */}
        {/* ================================================================ */}
        {activeTab === "governance" && (
          <div>
            {/* Overview Stats Grid */}
            <div className="pol-gov-overview-grid">
              <div className="pol-gov-stat-card">
                <div className="pol-gov-stat-val text-amber-600 dark:text-amber-400">
                  {currentGovernment.governingAlliance} (
                  {currentGovernment.governingSeats})
                </div>
                <div className="pol-gov-stat-sub">
                  Prime Minister: {currentGovernment.primeMinister} • Majority:{" "}
                  {currentGovernment.majorityMark} /{" "}
                  {currentGovernment.totalLokSabhaSeats}
                </div>
              </div>

              <div className="pol-gov-stat-card">
                <div className="pol-gov-stat-val text-sky-600 dark:text-sky-400">
                  {currentGovernment.principalOppositionAlliance} (
                  {currentGovernment.oppositionSeats})
                </div>
                <div className="pol-gov-stat-sub">
                  Leader of Opposition:{" "}
                  {currentGovernment.leaderOfOppositionLokSabha}
                </div>
              </div>

              <div className="pol-gov-stat-card">
                <div className="pol-gov-stat-val">
                  {currentGovernment.speakerLokSabha}
                </div>
                <div className="pol-gov-stat-sub">
                  Speaker of the Lok Sabha • Term:{" "}
                  {currentGovernment.lokSabhaTerm}
                </div>
              </div>
            </div>

            {/* Coalition Partners Breakdown */}
            <div className="mb-6 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                Key NDA Governing Coalition Partners
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentGovernment.keyAlliancePartners.map((partner) => (
                  <span
                    key={partner.party}
                    className="pol-tag-pill font-medium"
                  >
                    <strong>{partner.party}</strong>: {partner.seats} seats (
                    {partner.role})
                  </span>
                ))}
              </div>
            </div>

            {/* Key Cabinet Portfolios */}
            <h3 className="text-base font-bold text-[var(--heading-color)] mb-4">
              Key Union Cabinet Portfolios (Strategic Ministers)
            </h3>
            <div className="pol-cabinet-grid">
              {currentGovernment.cabinetMinisters.map((cab) => (
                <div key={cab.portfolio} className="pol-cabinet-card">
                  <span className="pol-cabinet-portfolio">{cab.portfolio}</span>
                  <div className="pol-cabinet-name">
                    {cab.minister} ({cab.party})
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {cab.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 4: GREAT POWER RELATIONS & TRIANGLES */}
        {/* ================================================================ */}
        {activeTab === "bilateral" && (
          <div>
            {filteredBilateral.length > 0 ? (
              <div className="pol-cards-grid">
                {filteredBilateral.map((rel) => (
                  <article key={rel.id} className="pol-card">
                    <div>
                      {/* Header */}
                      <div className="pol-card-header">
                        <div className="pol-card-title-wrap">
                          <h2 className="pol-card-title">
                            {rel.flag} {rel.country}
                          </h2>
                          <span className="pol-card-subtitle">
                            {rel.partnershipTitle}
                          </span>
                          <div className="pol-badges-wrap">
                            <span className="pol-badge font-semibold">
                              {rel.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="pol-card-desc">{rel.executiveSummary}</p>

                      {/* Convergences */}
                      <div className="pol-card-section">
                        <span className="pol-section-heading text-emerald-600 dark:text-emerald-400">
                          Strategic Convergences &amp; Alliances
                        </span>
                        <ul className="pol-bullet-list">
                          {rel.keyStrategicConvergences.map((conv, idx) => (
                            <li key={idx}>{conv}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Friction Points */}
                      <div className="pol-card-section">
                        <span className="pol-section-heading text-rose-600 dark:text-rose-400">
                          Friction Points &amp; Strategic Challenges
                        </span>
                        <ul className="pol-bullet-list">
                          {rel.frictionPointsAndChallenges.map((fric, idx) => (
                            <li key={idx}>{fric}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Defense & Trade */}
                      <div className="pol-card-section">
                        <span className="pol-section-heading">
                          Defense &amp; Technology Transfers
                        </span>
                        <p className="text-xs text-[var(--text-secondary)] mb-2">
                          {rel.defenseAndTechCooperation}
                        </p>
                        <span className="pol-section-heading">
                          Economic &amp; Trade Dynamics
                        </span>
                        <p className="text-xs text-[var(--text-secondary)]">
                          {rel.economicAndTradeDynamics}
                        </p>
                      </div>
                    </div>

                    <div className="pol-card-footer">
                      <span className="pol-footer-meta">
                        Multilateral: {rel.multilateralCorrelation}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="pol-empty-state">
                <i className="fa-solid fa-magnifying-glass pol-empty-icon"></i>
                <h3 className="pol-empty-title">No Bilateral Dossiers Found</h3>
                <p className="pol-empty-text">
                  No great power dossiers matched your search query.
                </p>
                <button onClick={resetFilters} className="pol-reset-btn">
                  Reset Search
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 5: BORDER FRONTIERS & NATIONAL SECURITY */}
        {/* ================================================================ */}
        {activeTab === "borders" && (
          <div>
            {filteredBorders.length > 0 ? (
              <div className="pol-cards-grid">
                {filteredBorders.map((border) => (
                  <article key={border.id} className="pol-card">
                    <div>
                      {/* Header */}
                      <div className="pol-card-header">
                        <div className="pol-card-title-wrap">
                          <h2 className="pol-card-title">
                            {border.borderName}
                          </h2>
                          <span className="pol-card-subtitle">
                            Front: {border.front} • Length:{" "}
                            {border.borderLength}
                          </span>
                          <div className="pol-badges-wrap">
                            <span className="pol-badge">
                              Against: {border.counterpartCountry}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="pol-card-desc">
                        {border.strategicSignificance}
                      </p>

                      {/* Current Posture */}
                      <div className="text-xs text-[var(--text-muted)] mb-3">
                        <p>
                          <strong>Current Force Posture:</strong>{" "}
                          {border.currentSecurityPosture}
                        </p>
                      </div>

                      {/* Key Sectors */}
                      <div className="pol-card-section">
                        <span className="pol-section-heading">
                          Key Operational Sectors
                        </span>
                        <div className="pol-tags-row">
                          {border.keySectors.map((sector) => (
                            <span key={sector} className="pol-tag-pill">
                              {sector}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Flashpoints & Challenges */}
                      <div className="pol-card-section">
                        <span className="pol-section-heading text-rose-600 dark:text-rose-400">
                          Major Flashpoints &amp; Threats
                        </span>
                        <ul className="pol-bullet-list">
                          {border.majorFlashpointsAndChallenges.map(
                            (flash, idx) => (
                              <li key={idx}>{flash}</li>
                            ),
                          )}
                        </ul>
                      </div>

                      {/* Infrastructure & Modernization */}
                      <div className="pol-card-section">
                        <span className="pol-section-heading text-emerald-600 dark:text-emerald-400">
                          Infrastructure &amp; Modernization Measures
                        </span>
                        <ul className="pol-bullet-list">
                          {border.infrastructureAndDefensiveMeasures.map(
                            (infra, idx) => (
                              <li key={idx}>{infra}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="pol-empty-state">
                <i className="fa-solid fa-magnifying-glass pol-empty-icon"></i>
                <h3 className="pol-empty-title">No Border Frontiers Found</h3>
                <p className="pol-empty-text">
                  No frontiers matched your search query.
                </p>
                <button onClick={resetFilters} className="pol-reset-btn">
                  Reset Search
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 6: INTERNAL SECURITY, RADICALIZATION & FCRA */}
        {/* ================================================================ */}
        {activeTab === "internal-security" && (
          <div>
            {filteredSecurity.length > 0 ? (
              <div className="pol-cards-grid">
                {filteredSecurity.map((threat) => (
                  <article key={threat.id} className="pol-card">
                    <div>
                      {/* Header */}
                      <div className="pol-card-header">
                        <div className="pol-card-title-wrap">
                          <h2 className="pol-card-title">{threat.title}</h2>
                          <div className="pol-badges-wrap">
                            <span className="pol-badge font-semibold">
                              {threat.categoryLabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="pol-card-desc">
                        {threat.threatDescription}
                      </p>

                      {/* Mechanisms & Vectors */}
                      <div className="pol-card-section">
                        <span className="pol-section-heading text-rose-600 dark:text-rose-400">
                          Threat Mechanisms &amp; Illicit Vectors
                        </span>
                        <ul className="pol-bullet-list">
                          {threat.mechanismsAndVectors.map((mech, idx) => (
                            <li key={idx}>{mech}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Legal & Regulatory Framework */}
                      <div className="pol-card-section">
                        <span className="pol-section-heading">
                          Legal &amp; Regulatory Framework (FCRA / UAPA)
                        </span>
                        <ul className="pol-bullet-list">
                          {threat.regulatoryAndLegalFramework.map(
                            (law, idx) => (
                              <li key={idx}>{law}</li>
                            ),
                          )}
                        </ul>
                      </div>

                      {/* Major State Interventions & Bans */}
                      <div className="pol-card-section">
                        <span className="pol-section-heading text-emerald-600 dark:text-emerald-400">
                          Major Interventions, Raids &amp; UAPA Bans
                        </span>
                        <ul className="pol-bullet-list">
                          {threat.majorInterventionsAndBans.map(
                            (interv, idx) => (
                              <li key={idx}>{interv}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="pol-card-footer">
                      <span className="pol-footer-meta">
                        Enforcing Agencies:{" "}
                        {threat.enforcementAgencies.join(" • ")}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="pol-empty-state">
                <i className="fa-solid fa-magnifying-glass pol-empty-icon"></i>
                <h3 className="pol-empty-title">
                  No Internal Security Vectors Found
                </h3>
                <p className="pol-empty-text">
                  No threats matched your search query.
                </p>
                <button onClick={resetFilters} className="pol-reset-btn">
                  Reset Search
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 7: POLICY THINK TANKS & STRATEGIC JOURNALS */}
        {/* ================================================================ */}
        {activeTab === "think-tanks" && (
          <div>
            {filteredThinkTanks.length > 0 ? (
              <div className="pol-cards-grid">
                {filteredThinkTanks.map((tt) => (
                  <article key={tt.id} className="pol-card">
                    <div>
                      {/* Header */}
                      <div className="pol-card-header">
                        <div className="pol-card-title-wrap">
                          <h2 className="pol-card-title">{tt.name}</h2>
                          <span className="pol-card-subtitle">
                            Org: {tt.organization} • {tt.country}
                          </span>
                          <div className="pol-badges-wrap">
                            <span className="pol-badge">{tt.tier}</span>
                          </div>
                        </div>
                      </div>

                      <p className="pol-card-desc">{tt.description}</p>

                      {/* Focus Areas */}
                      <div className="pol-card-section">
                        <span className="pol-section-heading">
                          Core Research Focus Areas
                        </span>
                        <div className="pol-tags-row">
                          {tt.focusAreas.map((fa) => (
                            <span key={fa} className="pol-tag-pill">
                              #{fa}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pol-card-footer">
                      <span className="pol-footer-meta">{tt.country}</span>
                      <a
                        href={tt.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pol-ext-btn"
                      >
                        <span>Visit Research Portal</span>
                        <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="pol-empty-state">
                <i className="fa-solid fa-magnifying-glass pol-empty-icon"></i>
                <h3 className="pol-empty-title">No Think Tanks Found</h3>
                <p className="pol-empty-text">
                  No institutions matched your search query.
                </p>
                <button onClick={resetFilters} className="pol-reset-btn">
                  Reset Search
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Page Footer */}
      <PageFooter
        moduleName="Politics & Geopolitics Hub"
        issueLabel="politics-geopolitics"
      />
    </div>
  );
}
