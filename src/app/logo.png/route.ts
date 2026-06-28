import { brandImage } from "@/lib/seo/generated-image";

export const runtime = "edge";

export function GET() {
  return brandImage(512);
}
