import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from './server.mjs';

test('contact endpoint validates requests, never caches them, and does not report delivery',async(t)=>{
  const app=createApp();await new Promise(r=>app.listen(0,'127.0.0.1',r));
  t.after(()=>new Promise(r=>app.close(r)));
  const base=`http://127.0.0.1:${app.address().port}`;
  const post=(body,headers={'Content-Type':'application/json'})=>fetch(base+'/api/contact',{method:'POST',body,headers});
  const valid=await post(JSON.stringify({email:'reader@example.com',message:'A sample message.'}));
  assert.equal(valid.status,200);assert.equal(valid.headers.get('cache-control'),'no-store');
  assert.match((await valid.json()).message,/Nothing was stored or emailed/);
  for(const data of [null,{}, {email:'invalid',message:'A sample message.'},{email:'reader@example.com',message:'short'}]) {
    assert.equal((await post(JSON.stringify(data))).status,400);
  }
  assert.equal((await post('{')).status,400);
  assert.equal((await post('a'.repeat(9000))).status,413);
  assert.equal((await post('{}',{'Content-Type':'text/plain'})).status,415);
  assert.equal((await fetch(base+'/api/contact')).status,405);
  assert.equal((await fetch(base+'/missing')).status,404);
});
