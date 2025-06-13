export const GoogleSignin = () => {
  return (
    <>
      <script src="https://accounts.google.com/gsi/client" async />

      <div
        id="g_id_onload"
        data-client_id={process.env.GOOGLE_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="http://localhost:3000"
        data-itp_support="true"
      ></div>

      <div
        className="mt-2"
        class="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </>
  );
};
