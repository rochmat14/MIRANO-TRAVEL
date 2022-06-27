<?php

namespace App\Http\Controllers\API;

use App\MODEL\Jurusan;
use Illuminate\Http\Request;
USE Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class JurusanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $jurusan = Jurusan::all();

        return response()->json($jurusan);
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
        $jurusan = new Jurusan;

        $jurusan->keberangkatan = $request->keberangkatan;
        $jurusan->tujuan        = $request->tujuan;
        $jurusan->waktu         = $request->waktu;

        $jurusan->save();

        return response()->json($jurusan);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
        $id_jurusan = $request->id;
        
        DB::table('jurusans')->where('id', $id_jurusan)->update(array(
            'keberangkatan' => $request->keberangkatan,
            'tujuan'        => $request->tujuan,
            'waktu'         => $request->waktu,
        ));

        return response()->json(
            Jurusan::where('id', $id_jurusan)->get()
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
        $armada = Jurusan::find($id);

        if(!empty($armada) ) {
            Jurusan::find($id)->delete();

            $message = "Pilihan Armada berhasil di hapus";
        } else {
            $message = "Pilihan Armada tidak di temukan";
        }
        return response()->json($message);
    }
}
