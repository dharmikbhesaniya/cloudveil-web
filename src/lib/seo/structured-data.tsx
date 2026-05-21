// Replace < with unicode to prevent XSS via JSON-LD injection (Next.js official recommendation)
function safeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function StructuredData({ data }: { data: object | object[] }) {
  const normalized = Array.isArray(data) ? data : [data];
  return (
    <>
      {normalized.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
        />
      ))}
    </>
  );
}
