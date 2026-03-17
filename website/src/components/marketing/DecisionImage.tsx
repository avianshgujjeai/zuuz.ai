"use client";
import { useState } from "react";

export function DecisionImage() {
  const [error, setError] = useState(false);
  return (
    <>
      {!error && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/images/Decision.png"
          alt="ZUUZ Decision and Execution Flow"
          onError={() => setError(true)}
          style={{ width: "100%", display: "block", borderRadius: 16 }}
        />
      )}
      {error && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          minHeight: 200, borderRadius: 16, background: "#F0F4FF",
          border: "1px dashed #C7D2FE", color: "#666",
          fontFamily: "'Montserrat',sans-serif", fontSize: 14, textAlign: "center",
          padding: 32,
        }}>
          <span>Decision flow diagram (upload Decision.png to /public/images/)</span>
        </div>
      )}
    </>
  );
}
