<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\PageSpeed\Manager;

class CheckingPage extends Controller
{

    public Manager $manger;

    public function __construct(){
        // TODO переделать через DI
        $this->manger = new Manager();
    }

    public function show(Request $request){
        return Inertia::render('Checking');
    }


    public function check(Request $request){

        $pageUrl = $request->input('url');
        $results = $this->manger->checkPage($pageUrl);

        $response  = [
          'cls' => $results['cumulativeLayoutShift'],
          'fcp' => $results['firstContentfulPaint'],
          'lcp' => $results['largestContentfulPaint'],
          'si' => $results['speedIndex'],
          'tbt' =>  $results['totalBlockingTime']
        ];

        return response()->json($response, 200);
    }
}
