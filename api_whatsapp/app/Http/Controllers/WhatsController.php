<?php

namespace App\Http\Controllers;

use App\Models\Chats;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WhatsController extends Controller
{
    //
    public function hello_world(Request $request)
    {

        $url = 'https://graph.facebook.com/v19.0/361576070362390/messages';
        $token = 'EAAQIAeZCHTKYBOyxbBwtJNgqgKNZBMQfSlBKyDZCgEmFx2ppbUT3IPdq26VhQZCSC7xCUtgNUHUhScUrWYUJDAP2UT4auCCdZAaIRVmvzGn16pJZCKuWOR9hZAjmjT1HsIo7y8WGVa2iwbPT0wJzPhVTV9RtJZBwBUaPoFltZBSOTvSGG32ZBqZAcGyhhnRcLRAuqz0u1KztDdTHkTR2GIS';


        $nombre = $request->name;
        $nombrecompleto = $request->fullname;
        $fecha = $request->date;
        $hora = $request->hour;
        $numero = $request->phone;

        echo($nombre);

        $data = array(
            "messaging_product" => "whatsapp",
            "recipient_type" => "individual",
            "to" => $numero,
            "type" => "template",
            "template" => array(
                "name" => "confirmacin_cita",
                "language" => array(
                    "code" => "es_MX"
                ),
                "components" => array(
                    array(
                        "type" => "body",
                        "parameters" => array(
                            array(
                                "type" => "text",
                                "text" => $nombre
                            ),
                            array(
                                "type" => "text",
                                "text" => $nombrecompleto
                            ),
                            array(
                                "type" => "text",
                                "text" => $fecha
                            ),
                            array(
                                "type" => "text",
                                "text" => $hora
                            ),
                            array(
                                "type" => "text",
                                "text" => $request->service
                            ),
                            array(
                                "type" => "text",
                                "text" => $request->price
                            ),
                            array(
                                "type" => "text",
                                "text" => $request->category
                            )
                        )
                    )
                )
            )
        );

        $data_string = json_encode($data);

        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json',
            'Content-Length: ' . strlen($data_string))
        );

        $result = curl_exec($curl);
        if ($result === false) {
            $error = curl_error($curl);
            echo "cURL Error: $error";
        } else {
            echo $result;
        }
        curl_close($curl);
    }

}
