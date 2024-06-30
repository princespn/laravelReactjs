<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductsRequest;
use App\Http\Requests\UpdateProductsRequest;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function index()
{
    $user = Auth::user();

    $products = Products::with('user','category')->where('user_id', $user->id)->get();

    if ($products->isEmpty()) {
        return response()->json([
            'status' => false,
            'message' => 'Products not found',
        ], 404);
    }

    return response()->json([
        'status' => true,
        'products' => $products,
    ], 200);
}


 

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductsRequest $request)
    {
        // Validate and create a new product

        $user = Auth::user();

        
        $product = Products::create($request->validated());

        return response()->json([
            'status' => true,
            'message' => 'Product created successfully.',
            'data' => $product
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Find product by id
        $product = Products::find($id);

        if ($product) {
            return response()->json([
                'status' => true,
                'data' => $product
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Product not found'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductsRequest $request, $id)
    {
        // Find product by id and update
        $product = Products::find($id);

        if ($product) {
            $product->update($request->validated());

            return response()->json([
                'status' => true,
                'message' => 'Product updated successfully.',
                'data' => $product
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Product not found'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Find product by id and delete
        $product = Products::find($id);

        if ($product) {
            $product->delete();

            return response()->json([
                'status' => true,
                'message' => 'Product deleted successfully.'
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Product not found'
            ], 404);
        }
    }
}
