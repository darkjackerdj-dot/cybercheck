export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const code = String(body.code || "").trim();

    if (!code) {
      return Response.json(
        {
          valid: false,
          message: "License code is required."
        },
        { status: 400 }
      );
    }

    // Temporary test license.
    // We will replace this with a proper database-backed system later.
    const TEST_LICENSE = "CYBERCHECK-2026-TEST";

    if (code === TEST_LICENSE) {
      return Response.json({
        valid: true,
        message: "License verified successfully."
      });
    }

    return Response.json(
      {
        valid: false,
        message: "Invalid license code."
      },
      { status: 401 }
    );
  } catch {
    return Response.json(
      {
        valid: false,
        message: "Invalid request."
      },
      { status: 400 }
    );
  }
}
