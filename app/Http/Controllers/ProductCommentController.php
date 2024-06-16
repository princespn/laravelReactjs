<?php

namespace App\Http\Controllers\Api;

use App\Models\ProductComment;
use Illuminate\Http\Request;

class ProductCommentController extends Controller
{
    public function index($productId)
    {
        $comments = ProductComment::where('product_id', $productId)->with('user')->get();
        return response()->json($comments);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'comment' => 'required|string|max:255',
        ]);

        $comment = ProductComment::create([
            'product_id' => $request->product_id,
            'user_id' => $request->user()->id,
            'comment' => $request->comment,
        ]);

        return response()->json($comment, 201);
    }

    public function show($id)
    {
        $comment = ProductComment::with('user')->findOrFail($id);
        return response()->json($comment);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'comment' => 'required|string|max:255',
        ]);

        $comment = ProductComment::findOrFail($id);
        $comment->update([
            'comment' => $request->comment,
        ]);

        return response()->json($comment);
    }

    public function destroy($id)
    {
        $comment = ProductComment::findOrFail($id);
        $comment->delete();

        return response()->json(['message' => 'Comment deleted']);
    }
}
