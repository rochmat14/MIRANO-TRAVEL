<?php

namespace App\Http\Controllers\API;

use Mail;
use Exception;
use App\MODEL\Admin;
use App\Mail\ForgotMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotRequest;

class AdminAuthController extends Controller
{
    //
    public function register(Request $request) {
        try{
            $admin = new Admin;

            $admin->nama = $request->nama;
            $admin->jenis_kelamin = $request->jenis_kelamin;
            $admin->nomor_telepon = $request->nomor_telepon;
            $admin->alamat = $request->alamat;
            $admin->email = $request->email;
            $admin->password = Hash::make($request->password);

            $admin->save();

            $token=$admin->createToken('app')->accessToken;

            return response([
                'message'=> 'Successfully Registration',
                'token'=> $token,
                'admin'=> $admin
            ],200);
        }catch (Exception $exception) {
            return response([
                'message'=> $exception->getMessage()
            ],401);
        }
    }

    public function update(Request $request) {
        $id_admin = $request->id; 
        
        if(empty($request->password)) {
            DB::table('admins')->where('id', $id_admin)->update(array(
                'nama' => $request->nama,
                'jenis_kelamin' => $request->jenis_kelamin,
                'nomor_telepon' => $request->nomor_telepon,
                'alamat' => $request->alamat,
                'email' => $request->email,
            ));
        } else {
            DB::table('admins')->where('id', $id_admin)->update(array(
                'nama' => $request->nama,
                'jenis_kelamin' => $request->jenis_kelamin,
                'nomor_telepon' => $request->nomor_telepon,
                'alamat' => $request->alamat,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ));
        }

        return DB::table('admins')->where('id', $id_admin)->get();

        // $admin = DB::table('users')->get();
        // return $admin;
    }

    public function login(Request $request) {
        try {
            if(Auth::guard('admin')->attempt($request->only('email', 'password'))) {
                $admin = Auth::guard('admin')->user();
                $token = $admin->createToken('app')->accessToken;
                return response([
                    'message' => "successfully login",
                    'token' => $token,
                    'admin' => $admin
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

    public function forgotPassword(ForgotRequest $request) {
        $email = $request->email;

        if(Admin::where('email', $email)->doesntExist()){
            return response([
                'message'=>'Email Not Found'
            ],404);
        }

        $password = random_int(100000, 999999);

        try {
            DB::table('admins')->where('email', $email)
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

    public function index() {
        return Auth::user();
    }
}
