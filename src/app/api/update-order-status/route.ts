import { WC_REST_URL } from "@/constants/apiEndpoints";
import { NextResponse } from "next/server";

const BASE_URL = WC_REST_URL;
const CONSUMER_KEY = process.env.WOOCOM_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WOOCOM_CONSUMER_SECRET;

// For testing, GET returns a message.
export async function GET() {
  return NextResponse.json(
    { message: "POST method required" },
    { status: 405 }
  );
}

// POST to update an order status (e.g., "processing" or "cancelled")
export async function POST(request: Request) {
  try {
    console.log("=== ORDER UPDATE DEBUG START ===");

    // Expecting orderId and newStatus in the request body
    const { orderId, newStatus } = await request.json();
    console.log("Received:", { orderId, newStatus });

    if (!orderId || !newStatus) {
      console.log("Missing required fields");

      return NextResponse.json(
        { error: "Missing orderId or newStatus" },
        { status: 400 }
      );
    }

    // Construct WooCommerce Order Update API URL
    const url = `${BASE_URL}/orders/${orderId}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;

    console.log("Request URL:", url.replace(CONSUMER_SECRET!, "[HIDDEN]"));

    // Prepare the update payload (here, updating the status field)
    const updateData = { status: newStatus };
    console.log("Update payload:", updateData);

    const response = await fetch(url, {
      method: "PUT", // Using PUT to update the order.
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    console.log("WooCommerce response status:", response.status);
    console.log("WooCommerce response ok:", response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "WooCommerce Order Update Failed", details: errorData },
        { status: response.status }
      );
    }

    console.log("About to parse success response...");

    // Parse the response from WooCommerce
    const data = await response.json();

    console.log("Parsed response data keys:", Object.keys(data));
    console.log("=== ORDER UPDATE DEBUG END ===");

    // Return the updated order data
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("=== CAUGHT ERROR ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Order Update Error:", error);
    console.error("=== END ERROR ===");
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
