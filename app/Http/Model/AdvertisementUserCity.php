<?php
/**
 * Created by PhpStorm.
 * User: huangchengwen
 * Date: 2018/4/12
 * Time: 13:55
 */

namespace App\Http\Model;


class AdvertisementUserCity extends BaseModel
{
    protected $fillable = ['user_id', 'city_id', 'advertisement_id'];
}