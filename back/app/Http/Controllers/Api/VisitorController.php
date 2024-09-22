<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\VisitorResource;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VisitorController extends Controller
{
    public function index(){
        $visitors=Visitor::get();
        if($visitors->count() > 0)
        {
            return VisitorResource::collection($visitors);
        }
        else{
            return response()->json(['message'=>'no record in database'],200);
        }
    }
    public function store(Request $request){
        $validator=Validator::make( $request->all(),[
                'name'=>'required|string|min:3|max:10',
                 'email'=>'required|email|min:8',
                 'password'=>'required|string|min:5',
                 'role'=>'required|string',
                 'date_of_birth'=>'date',
                 'gender'=>'nullable|string|in:male,female'
        ]);
        if( $validator->fails())
         {
            return response()->json(['error'=>$validator->message()],422);
         }
       
        $visitor=Visitor::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>$request->password,
            'role'=>$request->role,
            'date_of_birth'=>$request->date_of_birth,
            'gender'=>$request->gender,
        ]);
        return response()->json(['message'=>' record  added in database','data'=>new VisitorResource($visitor)],200);
    }

    public function show(Visitor $visitor){
        return new VisitorResource($visitor);
        
    }

    public function update(Request $request,Visitor $visitor){
        $validator=Validator::make( $request->all(),[
            'name'=>'required|string|min:3|max:10',
             'email'=>'required|email|min:8',
             'password'=>'required|string|min:5',
             'role'=>'required|string',
             'date_of_birth'=>'date',
             'gender'=>'nullable|string|in:male,female'
       ]);
       if( $validator->fails())
        {
          return response()->json(['error'=>$validator->message()],422);
        }
   
        $visitor->update([
          'name'=>$request->name,
          'email'=>$request->email,
          'password'=>$request->password,
          'role'=>$request->role,
          'date_of_birth'=>$request->date_of_birth,
          'gender'=>$request->gender,
        ]);
        return response()->json(['message'=>' record  updated in database','data'=>new VisitorResource($visitor)],200);
        
    }
    public function destroy(Visitor $visitor){
        $visitor->delete();
        return response()->json(['message'=>' record  is deleted from database'],200);
    }
}
