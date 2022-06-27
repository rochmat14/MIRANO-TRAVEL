<?php

namespace App\Http\Controllers\API;

use Mail;
use Exception;
use App\MODEL\User;
use App\Mail\ForgotMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\ForgotRequest;

class UserAuthController extends Controller
{
    //
    public function register(Request $request) {
        try{
            $user = new User;

            $user->nama = $request->nama;
            $user->jenis_kelamin = $request->jenis_kelamin;
            $user->nomor_telepon = $request->nomor_telepon;
            $user->alamat = $request->alamat;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);

            $user->save();

            $token=$user->createToken('app')->accessToken;

            return response([
                'message'=> 'Successfully Registration',
                'token'=> $token,
                'user'=> $user
            ],200);
        }catch (Exception $exception) {
            return response([
                'message'=> $exception->getMessage()
            ],401);
        }
    }

    public function login(Request $request) {
        try {
            if(Auth::attempt($request->only('email', 'password'))) {
                $user = Auth::user();
                $token = $user->createToken('app')->accessToken;
                return response([
                    'message' => "successfully login",
                    'token' => $token,
                    'user' => $user
                ],200);
            }
        } catch(Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ],400);
        }
        return response([
            'message' => "Invalid Email Or Password"
        ],401);
    }

    public function index() {
        return Auth::User();
    }

    public function forgotPassword(ForgotRequest $request) {
        $email = $request->email;

        if(User::where('email', $email)->doesntExist()){
            return response([
                'message'=>'Email Not Found'
            ],404);
        }

        $password = random_int(100000, 999999);

        try {
            DB::table('users')->where('email', $email)
                ->update(['password'=>Hash::make($password)]);
            Mail::to($email)->send(new ForgotMail($password));
            return response([
                'message'=>'Reset password mail send on your mail!'
            ],200);
        } catch(Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ],400);
        }
    }
}
