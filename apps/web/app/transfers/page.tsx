import { AppShell } from '../../components/layout/app-shell';
import { TransferDemo } from '../../components/transfers/transfer-demo';

export default function TransfersPage() {
  return (
    <AppShell
      eyebrow="Финансовый шлюз"
      heading="QALQAN Wallet: Переводы"
      subheading="Мгновенные переводы со стипендиальных и мультивалютных счетов внутри экосистемы Академии."
    >
      <TransferDemo />
    </AppShell>
  );
}
