import { NextResponse } from "next/server";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(2).max(80).optional(),
  email: z.string().email(),
  message: z.string().max(1000).optional()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = Schema.parse(body);


    return NextResponse.json({ ok: true, received: data }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: err.flatten() }, { status: 422 });
    }
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
