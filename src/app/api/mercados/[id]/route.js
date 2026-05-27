import { db } from "@/lib/db.js";

// GET por ID
export async function GET(request, context) {
  const { id } = await context.params;
  const numericId = Number(id);

  const mercado = db.mercados.find((m) => m.id === numericId);

  if (!mercado) {
    return new Response("Produto não encontrado", { status: 404 });
  }

  return Response.json(mercado);
}