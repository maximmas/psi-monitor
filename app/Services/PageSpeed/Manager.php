<?php

namespace App\Services\PageSpeed;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;

class Manager
{

    public function checkPage($url): false|array
    {
        $resp = $this->send($url);
        $json = $resp['body'];
        if(!json_validate($json)){
            echo "Not json response/n";
            return [];
        }
        $allData = json_decode($json, true);
        $data = $this->getLighthouseData($allData);
        return $data;
    }


    public function getLighthouseData(array $allData): false|array
    {
        $allowedLighthouseMetrics = [
                'totalBlockingTime',
                'largestContentfulPaint',
                'speedIndex',
                'cumulativeLayoutShift',
                'firstContentfulPaint'
        ];

        $lighthouseData = $allData['lighthouseResult'] ?? false;
        if(!$lighthouseData){
            return false;
        }

        $metrics = $lighthouseData['audits']['metrics']['details']['items'][0] ?? false;
        if(!$metrics){
            return false;
        }
        return array_filter($metrics, fn($key) => in_array($key, $allowedLighthouseMetrics), ARRAY_FILTER_USE_KEY);
    }


    public function send(string $pageUrl): array
    {

        //        curl https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://developers.google.com

        $apiEndpoint = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
        $requestUrl = $apiEndpoint . '?url=' . $pageUrl;

        try {
            $response = Http::timeout(1000)->get($requestUrl);
            $body = $response->body();
            $httpStatusCode = $response->status();
        } catch (ConnectionException|RequestException $e) {
            echo 'parser request error: ' . $e->getMessage() . PHP_EOL;
            $httpStatusCode = 0;
            $body = false;
        }

        return ['httpCode' => $httpStatusCode, 'body' => $body];
    }

}
