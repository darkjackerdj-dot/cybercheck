export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const code = String(body.code || "").trim();

    if (!code) {
      return Response.json(
        {
          valid: false,
          message: "License code is required.",
        },
        { status: 400 }
      );
    }

    const secret = context.env.PAYHIP_PRODUCT_SECRET;

    if (!secret) {
      return Response.json(
        {
          valid: false,
          message: "License verification is not configured.",
        },
        { status: 500 }
      );
    }

    const url = new URL("https://payhip.com/api/v2/license/verify");
    url.searchParams.set("license_key", code);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "product-secret-key": secret,
      },
    });

    const responseText = await response.text();

    if (!response.ok || !responseText.trim()) {
      return Response.json(
        {
          valid: false,
          message: "Invalid license code.",
        },
        { status: 401 }
      );
    }

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      return Response.json(
        {
          valid: false,
          message: "Invalid license response.",
        },
        { status: 502 }
      );
    }

    const license = data?.data;

    if (!license || license.enabled !== true) {
      return Response.json(
        {
          valid: false,
          message: "This license is not active.",
        },
        { status: 401 }
      );
    }

    return Response.json({
      valid: true,
      message: "License verified successfully.",
    });
  } catch {
    return Response.json(
      {
        valid: false,
        message: "Unable to verify license.",
      },
      { status: 500 }
    );
  }
}
