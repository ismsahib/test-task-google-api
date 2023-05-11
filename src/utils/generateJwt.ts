import * as jose from "jose";

export const generateJWT = async () => {
  const pkcs8 = process.env.PRIVATE_KEY as string;
  const payload = {
    iss: "test-task@iron-gizmo-385813.iam.gserviceaccount.com",
    scope: "https://www.googleapis.com/auth/documents.readonly https://www.googleapis.com/auth/spreadsheets.readonly",
    aud: "https://oauth2.googleapis.com/token",
  };

  const alg = "RS256";

  const privateKey = await jose.importPKCS8(pkcs8, alg);

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(privateKey);

  return jwt;
};
