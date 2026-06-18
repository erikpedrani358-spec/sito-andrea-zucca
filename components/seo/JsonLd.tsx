type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Injects schema.org JSON-LD for search engines. */
export default function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
