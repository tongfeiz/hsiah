import Stripe from 'stripe';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const catalog = JSON.parse(readFileSync(join(__dirname, '../../data/products.json'), 'utf8'));

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-05-27.dahlia',
});

const SITE_URL = process.env.SITE_URL || 'https://www.hsiahofficial.com';

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
    body: JSON.stringify(body),
  };
}

function hkdToGbpMinor(hkd) {
  return Math.round(hkd / catalog.hkdPerGbp) * 100;
}

function buildLineItems(cart, currency) {
  const lineItems = [];

  for (const item of cart) {
    const product = catalog.products.find((p) => p.slug === item.slug);
    if (!product) {
      throw new Error(`Unknown product: ${item.slug}`);
    }

    const size = String(item.size || '').trim();
    const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));
    const stock = product.stock[size];

    if (stock == null) {
      throw new Error(`Invalid size "${size}" for ${product.slug}`);
    }
    if (quantity > stock) {
      throw new Error(`Not enough stock for ${product.name} (${size})`);
    }

    const unitAmount =
      currency === 'gbp'
        ? hkdToGbpMinor(product.priceHkd)
        : Math.round(product.priceHkd * 100);

    lineItems.push({
      quantity,
      price_data: {
        currency,
        unit_amount: unitAmount,
        product_data: {
          name: product.name,
          description: `Size: ${size}`,
          metadata: {
            slug: product.slug,
            size,
          },
        },
      },
    });
  }

  if (!lineItems.length) {
    throw new Error('Cart is empty');
  }

  return lineItems;
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return json(204, {});
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return json(500, { error: 'Stripe is not configured on the server.' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  const email = String(payload.email || '').trim();
  const currency = payload.currency === 'gbp' ? 'gbp' : 'hkd';
  const cart = Array.isArray(payload.cart) ? payload.cart : [];

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { error: 'A valid email is required.' });
  }

  let lineItems;
  try {
    lineItems = buildLineItems(cart, currency);
  } catch (err) {
    return json(400, { error: err.message });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: lineItems,
      success_url: `${SITE_URL}/?checkout=success#cart`,
      cancel_url: `${SITE_URL}/?checkout=cancelled#cart`,
      metadata: {
        currency,
        item_count: String(cart.length),
      },
    });

    return json(200, { url: session.url });
  } catch (err) {
    console.error('Stripe checkout session error:', err);
    return json(500, { error: 'Unable to start checkout. Please try again.' });
  }
}
