<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WhatsAppController extends Controller
{
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


    public function webhook(Request $request)
    {
        try {
            $verifyToken = "prueba";
            $query = $request->query();

            $mode = $query['hub_mode']; // Corregir aquí
            $token = $query['hub_verify_token'];
            $challenge = $query['hub_challenge'];

            if ($mode && $token) {
                if ($mode === 'subscribe' && $token == $verifyToken) { // Corregir también aquí ('subscribe' en lugar de 'suscribe')
                    echo $challenge;
                }
            }
            // throw new Exception('invalid request');
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function receive()
    {
        //LEEMOS LOS DATOS ENVIADOS POR WHATSAPP
        $respuesta = file_get_contents("php://input");
        //echo file_put_contents("text.txt", "Hola");
        //SI NO HAY DATOS NOS SALIMOS
        if ($respuesta == null) {
            exit;
        }
        //CONVERTIMOS EL JSON EN ARRAY DE PHP
        $respuesta = json_decode($respuesta, true);
        //EXTRAEMOS EL TELEFONO DEL ARRAY
        $phone = $respuesta['entry'][0]['changes'][0]['value']['messages'][0]['from'] . "\n";
        //EXTRAEMOS EL MENSAJE DEL ARRAY
        $message = $respuesta['entry'][0]['changes'][0]['value']['messages'][0]['text']['body'];
        //GUARDAMOS EL MENSAJE Y LA RESPUESTA EN EL ARCHIVO text.txt

        $chat = Chats::create([
            'phone' => $phone,
            'text' => $message,
        ]);

    }
}
