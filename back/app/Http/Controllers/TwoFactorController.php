<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class TwoFactorController extends Controller
{

    public function verifyOtp(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'otp' => 'required|integer'
        ]);

        // Find the user by email
        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Check if the OTP matches and hasn't expired
        if ($user->code === $data['otp']) {
            // OTP is valid
            // Optionally: Mark the user as verified, reset the OTP, or perform other actions
            $user->resetCode(); // Reset the OTP after successful verification

            return response()->json(['message' => 'OTP verified successfully'], 200);
        }

        // OTP is invalid or expired
        return response()->json(['message' => 'Invalid or expired OTP'], 400);
    }


    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
