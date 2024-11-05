import { redirect } from '@remix-run/node';
import dotenv from 'dotenv';

dotenv.config();

export const loader = async ({ request }) => {
  try {
    const { SHOPIFY_API_KEY, SHOPIFY_SCOPES, SHOPIFY_APP_URL } = process.env;

    // Log the environment variables to check their values
    console.log('SHOPIFY_API_KEY:', SHOPIFY_API_KEY);
    console.log('SHOPIFY_SCOPES:', SHOPIFY_SCOPES);
    console.log('SHOPIFY_APP_URL:', SHOPIFY_APP_URL);

    const url = new URL(request.url);
    const shop = url.searchParams.get('shop');

    // Log the shop parameter
    console.log('Shop parameter:', shop);

    if (!shop) {
      return new Response('Missing shop parameter', { status: 400 });
    }

    const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SHOPIFY_SCOPES}&redirect_uri=${SHOPIFY_APP_URL}/auth/callback`;

    // Log the generated auth URL
    console.log('Auth URL:', authUrl);

    return redirect(authUrl);
  } catch (error) {
    console.error('Error in auth loader:', error);
    return new Response('Unexpected Server Error', { status: 500 });
  }
};
