<?php

namespace App\Http\Controllers\API;

use App\MODEL\Booking;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\MODEL\BookingDetail;
use App\MODEL\Pembayaran;
use App\MODEL\PenumpangBooking;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function MyBooking(Request $request) {
        // $tb_booking = Booking::join('jadwals', 'jadwals.id', '=', 'bookings.jadwal_id')
        //         ->join('users', 'users.id', '=', 'bookings.user_id')
        //         ->select(
        //             'bookings.id', 
        //             'bookings.nomor_booking', 
        //             'jadwals.tanggal_berangkat', 
        //             'users.nama', 
        //             'bookings.jumlah_penumpang', 
        //             'bookings.harga_total', 
        //             'bookings.tanggal_booking', 
        //             'bookings.status_booking', 
        //             'bookings.status_bayar')->orderBy('id', 'desc');

        $tb_booking = Booking::with(
            'jadwal', 
            'jadwal.armada', 
            'jadwal.jurusan', 
            'jadwal.supir', 
            'user', 
            'bookingDetail',
            'penumpangBooking',
            'pembayaran')->orderBy('id', 'desc');

        if ( empty($request->nomor_booking) ) {
            $view_booking = $tb_booking->where([
                ['user_id', '=', $request->user_id]
            ])->get();
        }else{
            $view_booking = $tb_booking->where([
                ['nomor_booking', '=', $request->nomor_booking]
            ])->get();
        }

        return($view_booking);
    }

    public function AllBooking(Request $request) {
        // $tb_booking = Booking::join('jadwals', 'jadwals.id', '=', 'bookings.jadwal_id')
        //         ->join('users', 'users.id', '=', 'bookings.user_id')
        //         ->join('booking_details', 'booking_details.nomor_booking', '=', 'bookings.nomor_booking')
        //         ->select(
        //             'bookings.nomor_booking', 
        //             'jadwals.tanggal_berangkat', 
        //             'users.nama', 
        //             'users.jenis_kelamin',
        //             'users.nomor_telepon',
        //             'users.alamat',
        //             'users.email',
        //             'bookings.jumlah_penumpang', 
        //             'bookings.harga_total', 
        //             'bookings.tanggal_booking', 
        //             'bookings.status_booking', 
        //             'bookings.status_bayar',
        //             'booking_details.tempat_jemput')
        //         ->get();

        // return($tb_booking);

        $booking = Booking::with(
            'jadwal', 
            'jadwal.armada', 
            'jadwal.jurusan', 
            'jadwal.supir', 
            'user', 
            'bookingDetail',
            'penumpangBooking',
            'pembayaran')->orderBy('id', 'desc')->get();

        return $booking;
    }

    //
    public function store(Request $request) {
    // coding for auto number of table booking of field id
        $booking = Booking::noRef();

        $jumlah_data = $booking->count();

        if($jumlah_data > 0) {
            foreach($booking as $item) {
                $nomor_booking = "BO-".(substr($item->nomor_booking, 3) + 1);
            }
        } else {
            $nomor_booking = "BO-".(1);
        }
        
    // coding for save data booking that insert to api react js use axios
        $booking = new Booking;

        $booking->nomor_booking    = $nomor_booking;
        $booking->jadwal_id        = $request->jadwal_id;
        $booking->user_id          = $request->user_id;
        $booking->jumlah_penumpang = $request->jumlah_penumpang;
        $booking->harga_total      = $request->harga_total;
        $booking->tanggal_booking  = $request->tanggal_booking;
        $booking->status_booking   = "aktif";
        $booking->status_bayar     = "belum dibayar";

        $booking->save();

        return ($booking);
    }

    public function autoNumber() {
        $booking = Booking::noRef();

        $jumlah_data = $booking->count();

        if($jumlah_data > 0) {
            foreach($booking as $item) {
                // $nomor_booking = "BO-".($item->nomor_booking + 1);
                $nomor_booking = "BO-".(substr($item->nomor_booking, 3) + 1);
            }
        } else {
            $nomor_booking = "BO-".(1);
        }


        return($nomor_booking);
    }

    public function KonfirmasiTiket(Request $request) {
        $nomor_booking = Booking::where([
            ['nomor_booking', '=', $request->nomor_booking]
        ])->get();

        return($nomor_booking);
    }

    public function updateStatusBooking(Request $request) {
        DB::table('bookings')->where('nomor_booking', $request->nomor_booking)->update(array(
            'status_booking' => $request->status_booking,
        ));

        $company = Booking::where('bookings.nomor_booking', $request->nomor_booking)->get();
        
        foreach($company as $company) 
            $jadwalId = $company->penumpangBooking->jadwal_id;
        

        $updatePenumpangBooking = PenumpangBooking::where('jadwal_id', $jadwalId);

        if($request->status_booking == "aktif") {
            $updatePenumpangBooking->update(array('penumpang_pasti' => $request->jumlah_penumpang + $request->penumpang_pasti));
        } 
        else if ($request->status_booking == "selesai" || $request->status_booking == "cancel") {
            $updatePenumpangBooking->update(array('penumpang_pasti' => $request->penumpang_pasti - $request->jumlah_penumpang));
        }

        return response()->json(
            Booking::where('nomor_booking', $request->nomor_booking)->get()
        );
    }

    public function updateStatusBayar(Request $request) {
        // update status bayar table booking
        DB::table('bookings')->where('nomor_booking', $request->nomor_booking)->update(array(
            'status_bayar' => $request->status_bayar,
        ));

        $company = Booking::where('bookings.nomor_booking', $request->nomor_booking)->get();
        
        foreach($company as $company) 
            $jadwalId = $company->penumpangBooking->jadwal_id;
        

        $updatePenumpangBooking = PenumpangBooking::where('jadwal_id', $jadwalId);
        
        if($request->status_bayar == "lunas") {
            $updatePenumpangBooking->update(array('penumpang_pasti' => $request->jumlah_penumpang + $request->penumpang_pasti));
        } 
        else if ($request->status_bayar == "pending") {
            $updatePenumpangBooking->update(array('penumpang_pasti' => $request->penumpang_pasti - $request->jumlah_penumpang));
        }

        return response()->json($updatePenumpangBooking->get());
    }

    public function detailJadwal(Request $request) 
    {
        $jadwal = Booking::join('jadwals', 'jadwals.id', '=', 'bookings.jadwal_id')
                ->join('armadas', 'armadas.id', '=', 'jadwals.armada_id')
                ->join('jurusans', 'jurusans.id', '=', 'jadwals.jurusan_id')
                ->join('supirs', 'supirs.id', '=', 'jadwals.supir_id')
                ->select(
                    'jadwals.tanggal_berangkat',
                    'jadwals.armada_id',
                    'armadas.jenis',
                    'armadas.jumlah_kursi',
                    'jurusans.keberangkatan',
                    'jurusans.tujuan',
                    'jurusans.waktu',
                    'supirs.nama',
                    'jadwals.harga_tiket'
                );

        $view_jadwal = $jadwal->where([
            ['nomor_booking', '=', $request->nomor_booking]
        ])->get();

        return response()->json($view_jadwal);
    }

    public function detailPelanggan(Request $request) {
        $booking = Booking::join('users', 'users.id', '=', 'bookings.user_id')
                        ->select(
                            'users.nama',
                            'users.jenis_kelamin',
                            'nomor_telepon',
                            'alamat',
                            'email'
                        );

        $view_booking = $booking->where('nomor_booking', '=', $request->nomor_booking)->get();

        return json_encode($view_booking);
    }

    public function laporanBooking(Request $request) {
        $booking = Booking::join('jadwals', 'jadwals.id', '=', 'bookings.jadwal_id')
            ->join('users', 'users.id', '=', 'bookings.user_id')
            ->select(
                'bookings.nomor_booking',
                'jadwals.tanggal_berangkat',
                'users.nama',
                'bookings.jumlah_penumpang',
                'bookings.harga_total',
                'bookings.tanggal_booking',
                'bookings.status_booking',
                'bookings.status_bayar'
            );

        if(!empty($request->tanggal_booking)) {
            $booking_view = $booking->where('bookings.tanggal_booking', '=', $request->tanggal_booking);
        } else {
            $booking_view = $booking;
        }

        return($booking_view->get());
    }

    public function delete(Request $request) {
        $deleteBooking = Booking::where('nomor_booking', $request->nomor_booking)->delete();

        // jika berhasi menghapus data booking berdasarkan nomor_booking
        if($deleteBooking) {

            // menghapus data tabel BookingDetail
            $deleteBookingDetail = BookingDetail::where('nomor_booking', $request->nomor_booking)->delete();

            // jika berhasil menghapus data tabel BookingDetail
            if($deleteBookingDetail) {

                // mencari data pembayaran berdarkan nomor_booking
                $pembayaran = Pembayaran::where('nomor_booking', $request->nomor_booking)->first();

                // jika table Pembaaran berisai data yang di temukan
                if(isset($pembayaran)) {

                    // mengecek file pada folder public image laravel
                    $checkFile = public_path().'/images/'.$pembayaran->gambar_bukti;
                    
                    // jika data pada folder public image ada
                    if(file_exists($checkFile)){
    
                        // menghapus file pada folder public imgage yang dibungkus di dalam folder $checkFile
                        @unlink($checkFile);

                        // menghapus data pada table Pembayaran yang dibungkus dengan variabel $pembayaran
                        $pembayaran->delete();

                    // jika data pada folder public image tidak ditemukan
                    }else{
                        // menampilkan pesan
                        return "no file in folder public image";
                    }

                // jika gagal menghapus data tabel BookingDetail
                }else {

                    // menampilkan pesan
                    return "data is not exist";
                }
            }
        }

    }
}
