export default function DashboardLoading() {
  return (
    <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: '32px' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center', padding: '32px' }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}>QALQAN</div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '8px 0' }}>Загрузка профиля курсанта...</h2>
        <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
          Синхронизация расписания, академического статуса и баланса QALQAN Wallet.
        </p>
      </div>
    </div>
  );
}
