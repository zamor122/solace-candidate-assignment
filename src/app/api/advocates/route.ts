import {ilike, or} from "drizzle-orm";
import db from "../../../db";
import {advocates} from "../../../db/schema";

export async function GET(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);

    const searchTerm = url.searchParams.get("st") || "";
    const sanitizedSearchTerm = sanitizeSearchTerm(searchTerm);

    const data = sanitizedSearchTerm
      ? await db
          .select()
          .from(advocates)
          .where(
            or(
              ilike(advocates.firstName, `%${sanitizedSearchTerm}%`),
              ilike(advocates.lastName, `%${sanitizedSearchTerm}%`),
              ilike(advocates.city, `%${sanitizedSearchTerm}%`),
              ilike(advocates.degree, `%${sanitizedSearchTerm}%`)
            )
          )
      : await db.select().from(advocates);

    if (!data || data.length === 0) {
      return jsonResponse(
        { message: "No advocates found" },
        { status: 404 }
      );
    }

    return jsonResponse({ data }, { status: 200 });
  } catch (error: any) {
    console.error("Error processing request:", error);

    return jsonResponse(
      {
        message: "Internal Server Error. Please try again later.",
        error: error.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}

function sanitizeSearchTerm(term: string): string {
  const trimmedTerm = term.trim();

  if (trimmedTerm.length > 100 || !/^[a-zA-Z0-9 ]*$/.test(trimmedTerm)) {
    return "";
  }

  return trimmedTerm;
}

function jsonResponse(
  body: Record<string, any>,
  { status = 200}: { status?: number; }
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

