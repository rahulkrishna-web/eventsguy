import { json, redirect } from '@remix-run/node';
import dotenv from 'dotenv';

dotenv.config();

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const hmac = url.searchParams.get('hmac');
  const shop = url.searchParams.get('shop');
  
  // Log the parameters for debugging
  console.log('Callback Parameters:', { code, hmac, shop });

  if (!code || !hmac || !shop) {
    return new Response('Missing required parameters', { status: 400 });
  }

  // Verify HMAC if necessary (security measure)
  // Add your HMAC verification logic here

  // Exchange the code for a permanent access token
  const accessTokenUrl = `https://${shop}/admin/oauth/access_token`;
  const params = {
    client_id: process.env.SHOPIFY_API_KEY,
    client_secret: process.env.SHOPIFY_API_SECRET,
    code: code,
  };

  const response = await fetch(accessTokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  
  if (response.ok) {
    const accessToken = data.access_token;
    // Save the access token securely, e.g., in your database
    console.log('Access Token:', accessToken);
    
    // Redirect to your app’s dashboard or a welcome page
    return redirect('/'); // Update this with your app's dashboard route
  } else {
    console.error('Error fetching access token:', data);
    return new Response('Error exchanging code for access token', { status: 500 });
  }
};
