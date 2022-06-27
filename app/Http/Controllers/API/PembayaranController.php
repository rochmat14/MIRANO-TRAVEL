<?php

namespace App\Http\Controllers\API;

use App\MODEL\Pembayaran;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Defuse\Crypto\File;
use Illuminate\Support\Facades\Response;

class PembayaranController extends Controller
{
    //
    public function store(Request $request) {
        $file      = $request->file('photo');
        $filenameOri  = $file->getClientOriginalName();
        $picture   = 'images/' . date('His') . '-' . $filenameOri;
        $filename   = date('His') . '-' . $filenameOri;
        $upload = $file->move(public_path('images/'), $picture);

        if($upload) {
            $pembayaran = new Pembayaran;
            
            $pembayaran->dari_bank          = $request->dari_bank;
            $pembayaran->ke_bank            = $request->ke_bank;
            $pembayaran->nomor_rekening     = $request->nomor_rekening;
            $pembayaran->atas_nama          = $request->atas_nama;
            $pembayaran->nominal_transfer   = $request->nominal_transfer;
            $pembayaran->gambar_bukti       = $filename;
            $pembayaran->lokasi_gambar      = $picture;
            $pembayaran->tanggal_konfirmasi = $request->tanggal_konfirmasi;
            $pembayaran->nomor_booking      = $request->nomor_booking;
    
            $pembayaran->save();
    
            $message = response()->json(["message" => "Image Uploaded Succesfully"]);
        } else {
            $message = response()->json(["message" => "Select image first."]);
        }

        return($message);
    }

    public function update (Request $request) {
        $nomor_booking = Pembayaran::where('nomor_booking', $request->nomor_booking)->get();

        foreach($nomor_booking as $item)

        $checkFile = public_path().'/images/'.$item->gambar_bukti;

        if (!empty($request->file('photo'))) {
            // check file if exist
            if(file_exists($checkFile)){
                $deleteFile = @unlink($checkFile);

                if($deleteFile){
                    // upload new file 
                    $file      = $request->file('photo');
                    $filenameOri  = $file->getClientOriginalName();
                    $picture   = 'images/' . date('His') . '-' . $filenameOri;
                    $filename   = date('His') . '-' . $filenameOri;
                    $upload = $file->move(public_path('images/'), $picture);
                    
                    if($upload){
                        $pembayaran = Pembayaran::find($item->id);
                
                        $pembayaran->dari_bank          = $request->dari_bank;
                        $pembayaran->ke_bank            = $request->ke_bank;
                        $pembayaran->nomor_rekening     = $request->nomor_rekening;
                        $pembayaran->atas_nama          = $request->atas_nama;
                        $pembayaran->nominal_transfer   = $request->nominal_transfer;
                        $pembayaran->gambar_bukti       = $filename;
                        $pembayaran->lokasi_gambar      = $picture;
                        $pembayaran->tanggal_konfirmasi = $request->tanggal_konfirmasi;
                
                        $pembayaran->save();
                        
                        return response()->json(["message" => "Data and Image Update Succesfully"]);
                    }else{
                        return response()->json(["message" => "Image is not updated."]);
                    }
                }
            }
        } else {
            $pembayaran = Pembayaran::find($item->id);
                
            $pembayaran->dari_bank          = $request->dari_bank;
            $pembayaran->ke_bank            = $request->ke_bank;
            $pembayaran->nomor_rekening     = $request->nomor_rekening;
            $pembayaran->atas_nama          = $request->atas_nama;
            $pembayaran->nominal_transfer   = $request->nominal_transfer;
            $pembayaran->tanggal_konfirmasi = $request->tanggal_konfirmasi;
                
            $pembayaran->save();

            return "just a data that is update";
        }
            
    }

    public function index () {
        $pembayaran = Pembayaran::all();

        return($pembayaran);
    }

    public function getNomorBooking (Request $request) {
        $pembayaran = Pembayaran::where([
            ['nomor_booking', '=', $request->nomor_booking]
        ])->get();

        return($pembayaran);
    }

    public function detailPambayaran(Request $request) {
        $pembayaran = Pembayaran::join('bookings', 'bookings.nomor_booking', '=', 'pembayarans.nomor_booking')
            ->select(
                'pembayarans.nomor_booking',
                'bookings.harga_total',
                'pembayarans.dari_bank',
                'pembayarans.ke_bank',
                'pembayarans.nomor_rekening',
                'pembayarans.atas_nama',
                'pembayarans.nominal_transfer',
                'pembayarans.lokasi_gambar');

        $view_pembayaran = $pembayaran->where('pembayarans.nomor_booking', '=', $request->nomor_booking)->get();

        return $view_pembayaran;
    }
}
