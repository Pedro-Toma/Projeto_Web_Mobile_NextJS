import { db } from "@/lib/db.js";

// GET
export async function GET() {
  return Response.json(db.categorias);
}