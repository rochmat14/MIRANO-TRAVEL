<?php

namespace App\Http\Controllers\API;

use App\MODEL\Armada;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ArmadaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $armada = Armada::all();

        return response()->json($armada);
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
        $armada = new Armada;

        $armada->nomor_polisi = $request->nomor_polisi;
        $armada->jenis = $request->jenis;
        $armada->jumlah_kursi = $request->jumlah_kursi;

        $armada->save();

        return response()->json($armada);
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
        $id_armada = $request->id;
        
        DB::table('armadas')->where('id', $id_armada)->update(array(
            'nomor_polisi' => $request->nomor_polisi,
            'jenis' => $request->jenis,
            'jumlah_kursi' => $request->jumlah_kursi,
        ));

        return response()->json(
            Armada::where('id', $id_armada)->get()
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
        $armada = Armada::find($id);

        if(!empty($armada) ) {
            Armada::find($id)->delete();

            $message = "Pilihan Armada berhasil di hapus";
        } else {
            $message = "Pilihan Armada tidak di temukan";
        }
        return response()->json($message);
    }
}
