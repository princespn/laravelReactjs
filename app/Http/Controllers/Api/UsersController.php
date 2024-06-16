<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    //

    public function Register(Request $request)
    {

        // dd($request->name);

        $validator = Validator::make($request->all(), [
            "name" => "required|string",
            "password_confirmation" => "required|string",
            "email" => "required|string|email|unique:users",
            "password" => "required|string|confirmed",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "message" => "Validation errors",
                "errors" => $validator->errors(),
            ], 401);
        }

        $user = User::create([
            "name" => $request->name,
            "phone" => $request->phone,
            "email" => $request->email,
            "password" => bcrypt($request->password),

        ]);

        $token = $user->createToken('API Token')->plainTextToken;

        return response()->json([

            "status" => true,
            "massage" => "User Register successfully.",
            "token" => $token,
            "data" => $user,
        ], 200);

    }

    public function Login(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // If validation fails, return a response with errors
        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "message" => "Validation errors",
                "errors" => $validator->errors(),
            ], 402);
        }

        // Attempt to authenticate the user
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Get the authenticated user
            $user = Auth::user();

            // Generate an API token for the user
            $token = $user->createToken('API Token')->plainTextToken;

            // Return a success response with the token and user data
            return response()->json([
                "status" => true,
                "message" => "User logged in successfully.",
                "token" => $token,
                "data" => $user,
            ], 200);
        } else {
            // Return an error response if authentication fails
            return response()->json([
                "status" => false,
                "message" => "Invalid credentials.",
            ], 401);
        }
    }

    public function getProfile(Request $request)
    {
        // Get the authenticated user
        $user = Auth::user();

        // Return user profile data as JSON response
        return response()->json([
            "status" => true,
            "message" => "User profile retrieved successfully.",
            "user" => $user,
        ], 200);
    }

    //

    public function updateProfile(Request $request)
    {
        // Validate the incoming request data
        if (!empty($request->name)) {
            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string|max:255',

            ]);
        } else if (!empty($request->phone)) {

            $validator = Validator::make($request->all(), [
                'phone' => 'sometimes|required|string|max:15',

            ]);
        } else {

            $validator = Validator::make($request->all(), [
                'password' => 'sometimes|nullable|string|confirmed|min:8',
            ]);
        }

        // If validation fails, return a response with errors
        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "message" => "Validation errors",
                "errors" => $validator->errors(),
            ], 422);
        }

        // Get the authenticated user
        $user = Auth::user();

        // Update user profile
        $user->name = $request->name ?? $user->name;
        $user->phone = $request->phone ?? $user->phone;
        $user->email = $request->email ?? $user->email;

        if ($request->filled('password')) {
            $user->password = bcrypt($request->password);
        }

        // Save the user profile
        $updated = $user->save();

        // Check if the save was successful
        if ($updated) {
            return response()->json([
                "status" => true,
                "message" => "Profile updated successfully.",
                "user" => $user,
            ], 200);
        } else {
            return response()->json([
                "status" => false,
                "message" => "Failed to update profile.",
            ], 500);
        }
    }

    //

    public function userDetails()
    {
        $users = User::all();
        if ($users) {
            return response()->json([
                "status" => true,
                "message" => "Get all user data successfully.",
                "users" => $users,
            ], 200);
        } else {
            return response()->json([
                "status" => false,
                "message" => "Failed to Get all user data.",
            ], 500);
        }
    }


    public function logout(Request $request)
    {
        Auth::logout();

        $request->user()->tokens()->delete();

        return redirect('/');
    }
}
