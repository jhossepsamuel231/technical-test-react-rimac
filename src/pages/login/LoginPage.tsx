export default function LoginPage() {
  return (
    <section aria-labelledby="login-title">
      <h1 id="login-title">Login</h1>
      <p>Vista pública (formulario irá aquí).</p>
      <button type="button" onClick={() => localStorage.setItem('isSessionReady', '1')}>
        Simular sesión lista
      </button>
    </section>
  )
}
