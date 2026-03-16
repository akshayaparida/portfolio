export default function ModuleSkeleton() {
  return (
    <article
      className="module-card"
      style={{
        opacity: 0.7,
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
    >
      <div className="module-header">
        <div
          style={{
            width: "80px",
            height: "1.25rem",
            backgroundColor: "#e5e7eb",
            borderRadius: "0.25rem",
            marginBottom: "0.5rem",
          }}
        />
        <div
          style={{
            width: "60%",
            height: "2rem",
            backgroundColor: "#e5e7eb",
            borderRadius: "0.25rem",
            marginBottom: "0.5rem",
          }}
        />
        <div
          style={{
            width: "90%",
            height: "1rem",
            backgroundColor: "#f3f4f6",
            borderRadius: "0.25rem",
            marginBottom: "0.25rem",
          }}
        />
        <div
          style={{
            width: "80%",
            height: "1rem",
            backgroundColor: "#f3f4f6",
            borderRadius: "0.25rem",
          }}
        />
      </div>

      <div className="theory-section" style={{ marginTop: "2rem" }}>
        <div className="section-header">
          <div
            style={{
              width: "100px",
              height: "1.5rem",
              backgroundColor: "#e5e7eb",
              borderRadius: "0.25rem",
            }}
          />
        </div>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "1rem",
              backgroundColor: "#f3f4f6",
              borderRadius: "0.25rem",
            }}
          />
          <div
            style={{
              width: "100%",
              height: "1rem",
              backgroundColor: "#f3f4f6",
              borderRadius: "0.25rem",
            }}
          />
          <div
            style={{
              width: "90%",
              height: "1rem",
              backgroundColor: "#f3f4f6",
              borderRadius: "0.25rem",
            }}
          />
          <div
            style={{
              width: "95%",
              height: "1rem",
              backgroundColor: "#f3f4f6",
              borderRadius: "0.25rem",
            }}
          />
          <div
            style={{
              width: "70%",
              height: "1rem",
              backgroundColor: "#f3f4f6",
              borderRadius: "0.25rem",
            }}
          />
        </div>

        <div
          style={{
            marginTop: "2rem",
            width: "100%",
            height: "12rem",
            backgroundColor: "#f3f4f6",
            borderRadius: "0.5rem",
          }}
        />
      </div>
    </article>
  );
}
