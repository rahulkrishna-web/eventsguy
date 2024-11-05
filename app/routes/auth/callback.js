import { json } from 'remix';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

export const loader = async ({ request }) => {
  const { SHOPIFY_API_SECRET } = process.env;

  const url = new URL(request.url);
  const { shop, code, hmac } = Object.fromEntries(url.searchParams);

  // Validate the HMAC
  const expectedHmac = crypto
    .createHmac('sha256', SHOPIFY_API_SECRET)
    .update(url.searchParams.toString())
    .digest('hex');

  if (expectedHmac !== hmac) {
    return json({ error: 'HMAC validation failed' }, { status: 403 });
  }

  // Exchange code for access token
  const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code,
    }),
  });

  const { access_token } = await tokenResponse.json();

  // Store access token securely (e.g., in a database)

  return json({ success: true, access_token });
};
