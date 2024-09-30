<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class stripController extends Controller
{
    public function index(){
        return view('index');
    }

    public function checkout(){
        Stripe::setApiKey(config('stripe.sk'));

        $session = Session::create([
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'gbp',
                        'product_data' => [
                            'name' => 'send money bich'
                        ],
                        'unit_amount' => 500
                    ],
                    'quantity' => 1
                ]
                ],
            'mode' => 'payment',
            'success_url' => route('success'),
            'cancel_url' => route('index')
        ]);
        
        return redirect()->away($session->url);
    }
    
    public function success(){
        return view('index');
    }
}
