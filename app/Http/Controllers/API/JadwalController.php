<?php

namespace App\Http\Controllers\API;

use App\MODEL\Jadwal;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\MODEL\PenumpangBooking;
use Illuminate\Support\Facades\DB;

class JadwalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        // $jadwal = Jadwal::all();
        
        // $jadwal = DB::table('jadwals')
        //     ->select('tanggal_berangkat', 'armadas.jenis', 'jurusans.tujuan', 'supirs.nama')
        //     ->join('armadas', 'armadas.id', '=', 'jadwals.armada_id')
        //     ->join('jurusans', 'jurusans.id', '=', 'jadwals.jurusan_id')
        //     ->join('supirs', 'supirs.id', '=', 'jadwals.supir_id')
        //     ->get();

        $jadwal = Jadwal::join('armadas', 'armadas.id', '=', 'jadwals.armada_id')
                ->join('jurusans', 'jurusans.id', '=', 'jadwals.jurusan_id')
                ->join('supirs', 'supirs.id', '=', 'jadwals.supir_id')
                ->select('jadwals.id', 'tanggal_berangkat', 'jadwals.armada_id', 'armadas.jenis', 'jurusan_id', 'supir_id', 'armadas.jumlah_kursi', 'jurusans.keberangkatan', 'jurusans.tujuan', 'jurusans.waktu', 'supirs.nama', 'harga_tiket')
                ->get();

        return response()->json($jadwal);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $penumpang_booking = PenumpangBooking::all();

        // return $penumpang_booking;
        
        $auto_number = Jadwal::autoNumber();

        $jumlah_array = $auto_number->count();

        if($jumlah_array > 0)
        foreach($auto_number as $item) {
            $view_item = $item->id + 1;
        } else {
            $view_item = 1;
        }

        //
        $jadwal = new Jadwal;

        $jadwal->id                = $view_item;
        $jadwal->tanggal_berangkat = $request->tanggal_berangkat;
        $jadwal->armada_id         = $request->armada_id;
        $jadwal->jurusan_id        = $request->jurusan_id;
        $jadwal->supir_id          = $request->supir_id;
        $jadwal->harga_tiket       = $request->harga_tiket;

        $save_jadwal = $jadwal->save();

        if($save_jadwal) {
            $penumpangBooking = new PenumpangBooking;

            $penumpangBooking->penumpang_pasti = 0;
            $penumpangBooking->jadwal_id       = $view_item;

            $penumpangBooking->save();
        }

        return response()->json($jadwal);
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
        $id_jadwal = $request->id;
        
        DB::table('jadwals')->where('id', $id_jadwal)->update(array(
            'tanggal_berangkat' => $request->tanggal_berangkat,
            'armada_id'         => $request->armada_id,
            'jurusan_id'        => $request->jurusan_id,
            'supir_id'          => $request->supir_id,
            'harga_tiket'       => $request->harga_tiket,
        ));

        return response()->json(
            Jadwal::where('id', $id_jadwal)->get()
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
        $jadwal = Jadwal::find($id);

        if(!empty($jadwal) ) {
            Jadwal::find($id)->delete();

            $message = "Pilihan Jadwal berhasil di hapus";
        } else {
            $message = "Pilihan Jadwal tidak di temukan";
        }
        return response()->json($message);
    }

    public function laporanJadwal(Request $request) {
        $tanggal_berangkat = $request->tanggal_berangkat;
        $armada = $request->armada;
        $supir = $request->supir;
        
        $jadwal = Jadwal::join('armadas', 'armadas.id', '=', 'jadwals.armada_id')
            ->join('jurusans', 'jurusans.id', '=', 'jadwals.jurusan_id')
            ->join('supirs', 'supirs.id', '=', 'jadwals.supir_id')
            ->select('jadwals.tanggal_berangkat',
                    'armadas.jenis',
                    'armadas.jumlah_kursi',
                    'jurusans.keberangkatan',
                    'jurusans.tujuan',
                    'supirs.nama',
                    'jadwals.harga_tiket');

        if(!empty($tanggal_berangkat) && !empty($armada) &&!empty($supir)) {
            $jadwal_view = $jadwal->where([
                ['tanggal_berangkat', '=', $tanggal_berangkat],
                ['jenis', '=', $armada],
                ['supirs.nama', '=', $supir]
            ]);
        } else if(!empty($tanggal_berangkat) && !empty($armada)) {
            $jadwal_view = $jadwal->where([
                ['tanggal_berangkat', '=', $tanggal_berangkat],
                ['jenis', '=', $armada]
            ]);
        } else if(!empty($tanggal_berangkat) && !empty($supir)) {
            $jadwal_view = $jadwal->where([
                ['tanggal_berangkat', '=', $tanggal_berangkat],
                ['supirs.nama', '=', $supir]
            ]);
        } else if(!empty($armada) && !empty($supir)) {
            $jadwal_view = $jadwal->where([
                ['jenis', '=', $armada],
                ['supirs.nama', '=', $supir]
            ]);
        } else if(!empty($tanggal_berangkat)) {
            $jadwal_view = $jadwal->where(
                'tanggal_berangkat', '=', $tanggal_berangkat
            );
        } else if(!empty($armada)) {
            $jadwal_view = $jadwal->where(
                'jenis', '=', $armada
            );
        } else if(!empty($supir)) {
            $jadwal_view = $jadwal->where(
                'supirs.nama', '=', $supir
            );
        } else {
            $jadwal_view = $jadwal;
        }

        return $jadwal_view->get();
    }

    public function CariJadwal(Request $request) {
        if($request->tanggal_berangkat == "kosong"){
            $tanggal_berangkat = "";
        }else{
            $tanggal_berangkat = $request->tanggal_berangkat;

        }

        if($request->keberangkatan == "kosong"){
            $keberangkatan = "";
        }else{
            $keberangkatan = $request->keberangkatan;

        }

        if($request->tujuan == "kosong"){
            $tujuan = "";
        }else{
            $tujuan = $request->tujuan;

        }

        // $tb_jadwal = Jadwal::join('armadas', 'armadas.id', '=', 'jadwals.armada_id')
        //         ->join('jurusans', 'jurusans.id', '=', 'jadwals.jurusan_id')
        //         ->join('supirs', 'supirs.id', '=', 'jadwals.supir_id')
        //         ->select(
        //             'jadwals.id', 
        //             'tanggal_berangkat', 
        //             'jadwals.armada_id', 
        //             'armadas.jenis', 
        //             'jurusan_id', 
        //             'armadas.jumlah_kursi', 
        //             'jurusans.keberangkatan', 
        //             'jurusans.tujuan', 
        //             'jurusans.waktu', 
        //             'supirs.nama', 
        //             'harga_tiket');

        $tb_jadwal = PenumpangBooking::join('jadwals', 'jadwals.id', '=', 'penumpang_bookings.jadwal_id')
                ->join('armadas', 'armadas.id', '=', 'jadwals.armada_id')
                ->join('jurusans', 'jurusans.id', '=', 'jadwals.jurusan_id')
                ->join('supirs', 'supirs.id', '=', 'jadwals.supir_id')
                ->select(
                    'jadwals.id', 
                    'jadwals.tanggal_berangkat',
                    'jadwals.armada_id', 
                    'armadas.jenis',
                    'jurusan_id', 
                    'armadas.jumlah_kursi',
                    'jurusans.keberangkatan', 
                    'jurusans.tujuan', 
                    'jurusans.waktu', 
                    'supirs.nama', 
                    'jadwals.harga_tiket',
                    'penumpang_bookings.penumpang_pasti'
                    );
                

        if( empty($keberangkatan) && empty($tujuan) ) {
            $data = $tb_jadwal->where([
                ['tanggal_berangkat', '=', $tanggal_berangkat],])
            ->get();
            

        } elseif( empty($keberangkatan)  ) {
            $data = $tb_jadwal->where([
                ['tanggal_berangkat', '=', $tanggal_berangkat], 
                ['tujuan', '=', $tujuan],])
            ->get();

        } elseif( empty($tujuan)  ) {
            $data = $tb_jadwal->where([
                ['tanggal_berangkat', '=', $tanggal_berangkat], 
                ['keberangkatan',     '=', $keberangkatan],])
            ->get();

        } else {
            $data = $tb_jadwal->where([
                ['tanggal_berangkat', '=', $tanggal_berangkat], 
                ['keberangkatan',     '=', $keberangkatan], 
                ['tujuan',            '=', $tujuan],])
            ->get();;
        }

        if( count($data) > 0 ) {
            $message = $data;
        } else {
            // $message = "Data tidak ditemukan";
            $message = "";
        }
        
        return response()->json($message);
    }
}
