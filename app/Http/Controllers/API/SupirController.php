<?php

namespace App\Http\Controllers\API;

use App\MODEL\Supir;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class SupirController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $supirs = Supir::all();

        return response()->json($supirs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $supir = new Supir;

        $supir->nama = $request->nama;
        $supir->nomor_sim = $request->nomor_sim;
        $supir->nomor_telepon = $request->nomor_telepon;
        $supir->alamat = $request->alamat;

        $supir->save();

        return response()->json($supir);
    }

    
    public function update(Request $request)
    {
        //
        $id_supir = $request->id;
        
        DB::table('supirs')->where('id', $id_supir)->update(array(
            'nama' => $request->nama,
            'nomor_sim' => $request->nomor_sim,
            'nomor_telepon' => $request->nomor_telepon,
            'alamat' => $request->alamat
        ));

        return response()->json(
            Supir::where('id', $id_supir)->get()
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $supir = Supir::find($id);

        if(!empty($supir) ) {
            Supir::find($id)->delete();

            $message = "Supir berhasil di hapus";
        } else {
            $message = "Supir tidak di temukan";
        }
        return response()->json($message);
    }
}
