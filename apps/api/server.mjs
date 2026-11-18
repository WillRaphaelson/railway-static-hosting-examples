import {createServer} from 'node:http';
import {pathToFileURL} from 'node:url';

export function createApp() {
  return createServer(async (req,res) => {
    res.setHeader('Cache-Control','no-store');
    res.setHeader('Content-Type','application/json');
    res.setHeader('X-Content-Type-Options','nosniff');
    const send = (code, data) => {res.statusCode=code;res.end(JSON.stringify(data));};
    if(req.url==='/health' && req.method==='GET') return send(200,{ok:true});
    if(req.url!=='/api/contact') return send(404,{error:'Not found.'});
    if(req.method!=='POST') {res.setHeader('Allow','POST');return send(405,{error:'Use POST.'});}
    if(!req.headers['content-type']?.split(';')[0].trim().match(/^application\/json$/i)) return send(415,{error:'Send JSON.'});
    try {
      let size=0; const chunks=[];
      for await(const chunk of req) {
        size += chunk.length;
        if(size>8192) return send(413,{error:'Request is too large.'});
        chunks.push(chunk);
      }
      const data=JSON.parse(Buffer.concat(chunks).toString());
      if(!data || typeof data!=='object') return send(400,{error:'Enter an email and message.'});
      const {email,message}=data;
      if(typeof email!=='string' || email.length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return send(400,{error:'Enter a valid email address.'});
      if(typeof message!=='string' || message.trim().length<10 || message.length>2000) return send(400,{error:'Write a message between 10 and 2,000 characters.'});
      return send(200,{message:'Sample accepted. Nothing was stored or emailed.'});
    } catch {return send(400,{error:'Send valid JSON.'});}
  });
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  const server=createApp();
  server.requestTimeout=10000;
  server.listen(Number(process.env.PORT || 3000),'::',()=>console.log('Form API ready'));
  process.on('SIGTERM',()=>server.close());
}
