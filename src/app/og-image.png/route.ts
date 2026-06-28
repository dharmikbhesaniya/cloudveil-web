import { openGraphImage } from "@/lib/seo/generated-image";

export const runtime = "edge";

export function GET() {
  return openGraphImage();
}
