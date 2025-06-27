export async function sendVerificationEmail(params) {
  const { identifier: to, provider, url } = params;
  console.log({ ...params });

  const host = "SkillSwap";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: provider.from,
      to,
      subject: `Sign in to ${host}`,
      html: html({ url, host }),
      text: text({ url, host }),
    }),
  });

  if (!res.ok)
    throw new Error("Resend error: " + JSON.stringify(await res.json()));
}

function html({ url, host }) {
  const escapedHost = host.replace(/\./g, "&#8203;.");

  const color = {
    background: "#313131",
    text: "#f5f5f5",
    subText: "#d3d4d7",
    mainBackground: "#4d4d4d",
    buttonBackground: "#cb0404",
    buttonBorder: "#cb0404",
    buttonText: "#f5f5f5",
  };

  return `
  <body style="background: ${color.background}; padding: 15px; border-radius: 5px">
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding-top: 10px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Welcome to <strong>${escapedHost}</strong>
        </td>
      </tr>

      <tr>
        <td align="center"
          style="padding-bottom: 10px; font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: ${color.subText};">
          Please click below to sign in and start sharing skills with others
        </td>
      </tr>

      <tr>
        <td align="center" style="padding: 25px 5px;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 32px; width: 150px; height: 50px" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 32px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                  in</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.subText};">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
