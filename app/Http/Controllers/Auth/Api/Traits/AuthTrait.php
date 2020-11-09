<?php

namespace App\Http\Controllers\Auth\Api\Traits;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

trait AuthTrait
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['authenticate']]);
    }

    public function authenticate()
    {
        // grab credentials from the request
        $credentials = request()->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        $user = auth()->user();

        // all good so return the token
        return response()->json(compact('token', 'user'));
    }

    public function getUser() {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return [
                    'response'  => 'user_not_found',
                    'status'    => 404
                ];
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return [
                'response'  => 'token_expired',
                'status'    => $e->getStatusCode()
            ];
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return [
                'response'  => 'token_invalid',
                'status'    => $e->getStatusCode()
            ];
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return [
                'response'  => 'token_absent',
                'status'    => $e->getStatusCode()
            ];
        }

        return [
            'response'  => $user,
            'status'    => 200
        ];
    }
}
