<?php

namespace App\Http\Controllers\API;

use App\MODEL\Booking;
use App\MODEL\BookingDetail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BookingDetailController extends Controller
{
    //
    public function store(Request $request) {
        // coding for auto number of table booking of field id
        $booking = BookingDetail::noRef();

        $jumlah_data = $booking->count();

        if($jumlah_data > 0) {
            foreach($booking as $item) {
                $nomor_booking = "BO-".(substr($item->nomor_booking, 3) + 1);
            }
        } else {
            $nomor_booking = "BO-".(1);
        }

        foreach($request->bookingRincian as $item) {
            $bookingDetil = new BookingDetail();
            
            $bookingDetil->nama          = $item['nama_penumpang'];
            $bookingDetil->nomor_id      = $item['nomor_id'];
            $bookingDetil->tempat_jemput = $item['tempat_jemput'];
            $bookingDetil->nomor_kursi   = $item['nomor_kursi'];
            $bookingDetil->nomor_booking = $nomor_booking;
            $bookingDetil->jadwal_id     = $item['jadwal_id'];

            $bookingDetil->save();
        }

        return ($nomor_booking);
    }

    public function jumlahPenumpang(Request $request) {
        $booking_detil = BookingDetail::where('nomor_booking', '=', $request->nomor_booking)->get();

        return $booking_detil;
    }

    public function jumlahKursi(Request $request) {
        $booking_detil = BookingDetail::join('jadwals', 'jadwals.id', '=', 'booking_details.jadwal_id')
            ->join('armadas', 'armadas.id', '=', 'jadwals.armada_id')
            ->join('bookings', 'bookings.nomor_booking', '=', 'booking_details.nomor_booking')
            ->select(
                'jadwals.tanggal_berangkat',
                'armadas.jumlah_kursi',
                'booking_details.nama',
                'booking_details.nomor_kursi',
                'bookings.status_booking',
                'bookings.status_bayar')
            ->where([
                ['booking_details.jadwal_id', $request->jadwal_id],
                ['bookings.status_booking', 'aktif'],
                ['bookings.status_bayar', 'lunas']
                ])
            ->get();

        return $booking_detil;
    }
}
