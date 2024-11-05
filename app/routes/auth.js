import { json } from '@remix-run/node';
import dotenv from 'dotenv';

dotenv.config();

export const loader = async ({ request }) => {
  const { SHOPIFY_API_KEY, SHOPIFY_SCOPES, SHOPIFY_APP_URL } = process.env;

  const url = new URL(request.url);
  const shop = url.searchParams.get('shop');

  if (!shop) {
    return json({ error: 'Missing shop parameter' }, { status: 400 });
  }

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SHOPIFY_SCOPES}&redirect_uri=${SHOPIFY_APP_URL}/auth/callback`;

  return redirect(authUrl);
};
