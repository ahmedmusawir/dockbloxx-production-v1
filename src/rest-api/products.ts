import { WC_REST_URL } from "@/constants/apiEndpoints";

const BASE_URL = WC_REST_URL;
const CONSUMER_KEY = process.env.WOOCOM_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WOOCOM_CONSUMER_SECRET;

// Perform the check only on the server side
if (typeof window === "undefined") {
  if (!BASE_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    throw new Error(
      "Missing WooCommerce REST API credentials in environment variables."
    );
  }
}

// ORDER BY DATE
// export const WOOCOM_REST_GET_ALL_PRODUCTS = (page = 1, perPage = 12) =>
//   `${BASE_URL}/products?per_page=${perPage}&page=${page}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&orderby=date&order=asc&status=publish`;

// ORDER BY MENU ORDER
export const WOOCOM_REST_GET_ALL_PRODUCTS = (page = 1, perPage = 12) =>
  `${BASE_URL}/products?per_page=${perPage}&page=${page}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&orderby=menu_order&order=asc&status=publish`;

export const WOOCOM_REST_GET_PRODUCT_BY_ID = (id: number) =>
  `${BASE_URL}/products/${id}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;

export const WOOCOM_REST_GET_VARIATION_BY_ID = (
  productId: number,
  variationId: number
): string =>
  `${BASE_URL}/products/${productId}/variations/${variationId}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;

export const WOOCOM_REST_GET_PRODUCT_BY_SLUG = (slug: string) =>
  `${BASE_URL}/products?slug=${slug}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;

export const WOOCOM_REST_GET_ALL_PRODUCT_SLUGS = (page = 1, perPage = 100) =>
  `${BASE_URL}/products?per_page=${perPage}&page=${page}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&orderby=date&order=asc&status=publish`;
