#!/usr/bin/env julia

function puaHexStr(x)
 s = lpad( string(x, base=16), 2 , "0")
 "&#xF00$s;"
end

println.( puaHexStr.(0:0xff) )
