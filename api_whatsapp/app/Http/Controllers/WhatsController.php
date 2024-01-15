<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WhatsController extends Controller
{
    //

    public function hello_world()
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer EAAFpJu0CAHIBO2vjMSFBouzPQZABvMpZCBBHa8zTIZBOe2W83kmopveqZBCWLMPcbZBRZA55zgwKWbVhQCIruSbNAAiosvBuzKT9WdxucjUJSaau2D4hHrTUcPRdIIxYkkstxsiy7vqBJzJDWmD4MxQBkUps2PDZBIJ6tcRqR1CkZCe7LIGquukD0vSWaJ5Ok7xab56k8zZAudQ5t6wPZAI1VGUQLz0ko59VZCAZBGYZD',
            'Content-Type' => 'application/json',
        ])
            ->post('https://graph.facebook.com/v18.0/233543939832474/messages', [
                'messaging_product' => 'whatsapp',
                'to' => '527621248057',
                'type' => 'template',
                'template' => [
                    'name' => 'hello_world',
                    'language' => [
                        'code' => 'en_US',
                    ],
                ],
            ]);

        // Puedes acceder a la respuesta utilizando $response->json()
        return response()->json($response->json());
    }

    public function send_message(Request $request)
    {
        try {
            $verifyToken = "prueba";
            $query = $request->query();

            $mode = $query['hub_mode']; // Corregir aquí
            $token = $query['hub_verify_token'];
            $challenge = $query['hub_challenge'];

            if ($mode && $token) {
                if ($mode === 'subscribe' && $token == $verifyToken) { // Corregir también aquí ('subscribe' en lugar de 'suscribe')
                    return response()->json([
                        'success' => true,
                    ], 200);
                }
            }

            throw new Exception('invalid request');
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}
