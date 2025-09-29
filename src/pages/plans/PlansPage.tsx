export default function PlansPage() {
  return (
    <section aria-labelledby="plans-title">
      <h1 id="plans-title">Planes</h1>
      <p>Vista privada (listado de planes irá aquí).</p>
      <button type="button" onClick={() => localStorage.setItem('selectedPlan', 'Plan en Casa')}>
        Simular seleccionar plan
      </button>
    </section>
  )
}
