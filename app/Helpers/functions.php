<?php
/**
 * Created by PhpStorm.
 * User: huangchengwen
 * Date: 2018/4/10
 * Time: 15:50
 */

if (!function_exists('generate_user_auth_code')){
    function generate_user_auth_code($length = 6){
        return str_random($length);
    }
}

if (! function_exists('get_new_file_name')){
    function get_new_file_name($file, $token){
        $ext = $file->getClientOriginalExtension();
        return date('Y-m-d-H-i-s'). '-' . md5(uniqid($token, true)) . '.' . $ext;

    }
}

if (! function_exists('generate_token')){
    function generate_user_token($user_id, $prefix = 'user_token', $more_entropy = null){
        return md5($user_id . uniqid($prefix, $more_entropy));
    }
}
