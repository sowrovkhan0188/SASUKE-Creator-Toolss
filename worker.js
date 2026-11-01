export default {
 async fetch(request, env) {
  const u=new URL(request.url);
  const h={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Authorization","Cache-Control":"no-store"};
  if(request.method==="OPTIONS") return new Response(null,{headers:h});
  if(u.pathname==="/status" && request.method==="GET") {
   return Response.json({enabled:(await env.SASUKE_KV.get("enabled"))!=="false",message:(await env.SASUKE_KV.get("message"))||"",version:"1.1.0"},{headers:h});
  }
  if(u.pathname==="/admin/toggle" && request.method==="POST") {
   if(!env.ADMIN_TOKEN || request.headers.get("Authorization")!==`Bearer ${env.ADMIN_TOKEN}`) return Response.json({error:"Unauthorized"},{status:401,headers:h});
   let b; try{b=await request.json()}catch{return Response.json({error:"Invalid JSON"},{status:400,headers:h})}
   if(typeof b.enabled!=="boolean") return Response.json({error:"enabled must be boolean"},{status:400,headers:h});
   await env.SASUKE_KV.put("enabled",String(b.enabled)); await env.SASUKE_KV.put("message",typeof b.message==="string"?b.message.slice(0,180):"");
   return Response.json({ok:true,enabled:b.enabled},{headers:h});
  }
  return new Response("SASUKE Creator Tools control service",{headers:h});
 }
};
