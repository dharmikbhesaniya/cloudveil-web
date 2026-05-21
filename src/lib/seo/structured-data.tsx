export function StructuredData({ data }: { data: object | object[] }) {
  const normalized = Array.isArray(data) ? data : [data];
  return (
    <>
      {normalized.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
