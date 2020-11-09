<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function __construct()
    {
        //$this->middleware('auth:api');
    }

    public function products(Product $product, Request $request)
    {
        $year = $request->year;

        $products = $product->where('created_at', '>=', "{$year}-01-01")
                            ->where('created_at', '<=', date('Y-m-t', strtotime("{$year}-12")))
                            ->orderBy('created_at')
                            ->get()
                            ->groupBy(function ($query) {
                                return Carbon::parse($query->created_at)->format('m');
                            });
        
        $labels     = [];
        $datasets   = [];

        foreach($products as $product) {
            $labels[]   = "Mês ".Carbon::parse($product[0]->created_at)->format('m');
            $datasets[] = count($product);
        }
        
        return response()->json([
            'labels'    => $labels,
            'datasets'  => $datasets,
        ]);
    }
}
