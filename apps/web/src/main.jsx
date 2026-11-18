import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

function App() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setStatus('Submitting…');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Please try again.');
      setStatus(result.message);
      form.reset();
    } catch(error) { setStatus(error.message || 'The API is unavailable. Please try again.'); }
    finally { setBusy(false); }
  }
  return <div className="shell">
    <header><a className="brand" href="/">Field Notes<span> / </span></a><nav><a href="/guides/hosting">Hosting guide</a><a href="#contact">Contact</a></nav></header>
    <main>
      <div className="eyebrow">DEVELOPER FIELD GUIDE</div>
      <h1>A React frontend<br/>with a separate API.</h1>
      <p className="intro">Build your pages once. Add a small API when your site needs to handle a request.</p>
      <div className="columns"><section className="article">
        <div className="number">01 / FRONTEND</div><h2>Serve the files you build</h2>
        <p>This React app is built with Vite. Its HTML, styles, and JavaScript can be served as static files.</p>
        <div className="number">02 / BACKEND</div><h2>Keep form processing separate</h2>
        <p>The contact form sends a request to a Node.js API through the frontend's web server. The API validates the fields and returns a response.</p>
        <a className="text-link" href="/guides/hosting">Open a nested route <span>↗</span></a>
      </section><section className="form-card" id="contact">
        <div className="number">TRY THE REQUEST</div><h2>Send a sample message</h2>
        <p className="small">Demo only. Messages are validated, then discarded. No email is sent.</p>
        <form onSubmit={submit}><label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com"/></label><label>Message<textarea name="message" required minLength={10} maxLength={2000} rows={4} placeholder="Write at least 10 characters."/></label><button disabled={busy} type="submit">{busy ? 'Sending…' : 'Submit sample'}<span>↗</span></button><p className="status" role="status" aria-live="polite">{status}</p></form>
      </section></div>
    </main><footer><span>React + Vite / Node.js API</span><span>Static hosting example</span></footer>
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
