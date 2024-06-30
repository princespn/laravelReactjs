<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'discription',
        'price',
        'user_id', // Assuming user_id is the foreign key
        'category_id', // Assuming user_id is the foreign key
        // Other fields
    ];

    /**
     * Get the user that owns the product.
     */
   

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function category()
    {
        return $this->belongsTo(Categories::class);
    }
}
