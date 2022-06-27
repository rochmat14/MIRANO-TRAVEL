<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\MODEL\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function dataUser() {
        return User::all();
    }

    public function update(Request $request) {
        $id_user = $request->id; 
        
        if(empty($request->password)) {
            DB::table('users')->where('id', $id_user)->update(array(
                'email' => $request->email,
            ));
        } else {
            DB::table('users')->where('id', $id_user)->update(array(
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ));
        }

        return User::where('id', $id_user)->get();
    }

    public function userUpdate(Request $request) {
        $id_user = $request->id; 
        
        if(empty($request->password)) {
            DB::table('users')->where('id', $id_user)->update(array(
                'nama' => $request->nama,
                'jenis_kelamin' => $request->jenis_kelamin,
                'nomor_telepon' => $request->nomor_telepon,
                'alamat' => $request->alamat,
                'email' => $request->email,
            ));
        } else {
            DB::table('users')->where('id', $id_user)->update(array(
                'nama' => $request->nama,
                'jenis_kelamin' => $request->jenis_kelamin,
                'nomor_telepon' => $request->nomor_telepon,
                'alamat' => $request->alamat,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ));
        }

        return User::where('id', $id_user)->get();
    }
}
