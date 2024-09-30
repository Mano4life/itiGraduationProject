<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class stripController extends Controller
{
    public function checkout(Request $request)
    {
        // Set the Stripe secret key
        Stripe::setApiKey(config('stripe.sk'));

        // Create a checkout session
        $session = Session::create([
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'gbp',
                        'product_data' => [
                            'name' => $request->input('product_name') // Dynamically pass the product name from the request
                        ],
                        'unit_amount' => $request->input('amount') // Get amount from request
                    ],
                    'quantity' => $request->input('quantity', 1) // Default quantity to 1
                ]
            ],
            'mode' => 'payment',
            'success_url' => url('/api/payment/success'), // Change success URL to your API route
            'cancel_url' => url('/api/payment/cancel') // Change cancel URL to your API route
        ]);

        // Return the session URL as a JSON response
        return response()->json(['url' => $session->url], 200);
    }

    public function success()
    {
        // Return a success message
        return response()->json(['message' => 'Payment was successful!'], 200);
    }

    public function cancel()
    {
        // Return a cancel message
        return response()->json(['message' => 'Payment was cancelled.'], 200);
    }
}
