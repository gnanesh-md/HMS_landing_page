import { useState } from 'react';
import {
  Body, GhostBtn, Meter, PageHeader, Panel, Pill, PrimaryBtn, Segmented, Sparkline, StatRow, Table,
  useDash, type Stat, type Tone, type ViewId,
} from './ui';
import { SurgicalChecklist } from './careViews';
import { AlertIcon, CheckIcon, DownloadIcon, FilterIcon, PlusIcon, RefreshIcon, SearchIcon, SparkIcon } from '../icons';

/* ───────────────────────── Surgery / OT schedule ───────────────────────── */

const orRooms = [
  { r: 'OR 1', cases: [{ s: 7.5, e: 10, p: 'CABG ×3', pt: 'W. Grant', sg: 'Dr. Iqbal', st: 'done' }, { s: 10.5, e: 13.5, p: 'Aortic valve replacement', pt: 'M. Diaz', sg: 'Dr. Iqbal', st: 'live' }] },
  { r: 'OR 2', cases: [{ s: 8, e: 9.5, p: 'Lap cholecystectomy', pt: 'A. Osei', sg: 'Dr. Fraser', st: 'done' }, { s: 10, e: 11.5, p: 'Inguinal hernia repair', pt: 'C. Wright', sg: 'Dr. Fraser', st: 'live' }, { s: 12.5, e: 14, p: 'Appendectomy', pt: 'J. Liu', sg: 'Dr. Fraser', st: 'next' }] },
  { r: 'OR 3', cases: [{ s: 7.5, e: 10.5, p: 'Total knee arthroplasty', pt: 'S. Klein', sg: 'Dr. Okafor', st: 'done' }, { s: 11, e: 13, p: 'Hip hemiarthroplasty', pt: 'P. Okonkwo', sg: 'Dr. Okafor', st: 'next' }] },
  { r: 'OR 4', cases: [{ s: 9, e: 12, p: 'Craniotomy', pt: 'S. Obi', sg: 'Dr. Brandt', st: 'live' }, { s: 13, e: 15, p: 'Lumbar discectomy', pt: 'E. Park', sg: 'Dr. Brandt', st: 'sched' }] },
  { r: 'OR 5', cases: [{ s: 8, e: 8.75, p: 'Cataract (L)', pt: 'H. Tanaka', sg: 'Dr. Suri', st: 'done' }, { s: 9, e: 9.75, p: 'Cataract (R)', pt: 'L. Byrne', sg: 'Dr. Suri', st: 'done' }, { s: 10, e: 10.75, p: 'Vitrectomy', pt: 'N. Cole', sg: 'Dr. Suri', st: 'live' }, { s: 11.25, e: 12, p: 'Cataract (L)', pt: 'R. Shaw', sg: 'Dr. Suri', st: 'sched' }] },
  { r: 'OR 6', cases: [{ s: 8.5, e: 10.5, p: 'C-section', pt: 'L. Moreno', sg: 'Dr. Lee', st: 'done' }, { s: 12, e: 14.5, p: 'Hysterectomy', pt: 'K. Adams', sg: 'Dr. Lee', st: 'sched' }] },
];
const caseStyle: Record<string, string> = {
  done: 'bg-slate-100 border-slate-200 text-slate-500',
  live: 'bg-brand-600 border-brand-700 text-white',
  next: 'bg-amber-50 border-amber-300 text-amber-900',
  sched: 'bg-white border-slate-300 text-slate-700',
};

export function OTView() {
  const start = 7, end = 16;
  const span = end - start;
  const nowH = 10.8;
  return (
    <>
      <PageHeader
        crumb="Surgery"
        title="Operating Room Schedule"
        subtitle="Main OR suite · 6 theatres"
        actions={<><GhostBtn>Pre-op checklist</GhostBtn><PrimaryBtn><PlusIcon size={14} /> Book Case</PrimaryBtn></>}
      />
      <StatRow
        stats={[
          { v: '17', l: 'Cases Today' },
          { v: '8', l: 'Completed', c: 'text-emerald-600' },
          { v: '4', l: 'In Progress', c: 'text-brand-600' },
          { v: '78%', l: 'Utilization', c: 'text-violet-600' },
          { v: '92%', l: 'On-time Starts', c: 'text-emerald-600' },
          { v: '23m', l: 'Avg Turnover' },
        ]}
      />
      <Body>
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-4 mb-4 text-[12px] text-slate-600">
            {[['Completed', 'bg-slate-200'], ['In progress', 'bg-brand-600'], ['Up next', 'bg-amber-300'], ['Scheduled', 'bg-white border border-slate-300']].map(([l, c]) => (
              <span key={l} className="flex items-center gap-1.5"><span className={`h-3 w-3 rounded-sm ${c}`} />{l}</span>
            ))}
          </div>
          <div className="relative">
            <div className="flex ml-[72px] text-[11px] text-slate-400 mb-2">
              {Array.from({ length: span + 1 }, (_, i) => (
                <div key={i} className="flex-1 first:ml-0" style={{ flex: i === span ? '0 0 0' : undefined }}>
                  {String(start + i).padStart(2, '0')}:00
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {orRooms.map((room) => (
                <div key={room.r} className="flex items-center">
                  <div className="w-[72px] shrink-0 text-[13px] font-semibold text-slate-700">{room.r}</div>
                  <div className="relative flex-1 h-14 rounded-md bg-slate-50 border border-slate-100">
                    {Array.from({ length: span - 1 }, (_, i) => (
                      <div key={i} className="absolute top-0 bottom-0 w-px bg-slate-200/70" style={{ left: `${((i + 1) / span) * 100}%` }} />
                    ))}
                    {room.cases.map((c) => (
                      <div
                        key={c.p + c.s}
                        className={`absolute top-1 bottom-1 rounded-md border px-2 py-1 overflow-hidden ${caseStyle[c.st]}`}
                        style={{ left: `${((c.s - start) / span) * 100}%`, width: `calc(${((c.e - c.s) / span) * 100}% - 3px)` }}
                      >
                        <div className="text-[12px] font-semibold truncate">{c.p}</div>
                        <div className={`text-[11px] truncate ${c.st === 'live' ? 'text-brand-100' : 'opacity-80'}`}>{c.pt} · {c.sg}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-6 bottom-0 w-0.5 bg-red-500 pointer-events-none" style={{ left: `calc(72px + (100% - 72px) * ${(nowH - start) / span})` }}>
              <div className="absolute -top-1 -left-[3px] h-2 w-2 rounded-full bg-red-500" />
            </div>
          </div>
        </div>
        <SurgicalChecklist />
      </Body>
    </>
  );
}

/* ───────────────────────── Laboratory ───────────────────────── */

const labRows = [
  { acc: 'L-88213', pt: 'Ann Martinez', loc: 'ED 12', test: 'BMP', pri: 'STAT', st: 'Resulted', flag: 'K⁺ 6.2 H!', tat: '38m' },
  { acc: 'L-88214', pt: 'Thomas Reed', loc: 'Trauma 1', test: 'Troponin I (hs)', pri: 'STAT', st: 'Running', flag: '', tat: '22m' },
  { acc: 'L-88215', pt: 'Harold Jensen', loc: 'ICU-01', test: 'Blood culture ×2', pri: 'STAT', st: 'Incubating', flag: '', tat: '—' },
  { acc: 'L-88216', pt: 'James Liu', loc: 'ED 7', test: 'Lipase, CBC', pri: 'STAT', st: 'Received', flag: '', tat: '9m' },
  { acc: 'L-88217', pt: 'Robert Hale', loc: '3N-01', test: 'Lactate', pri: 'Urgent', st: 'Resulted', flag: '4.1 H', tat: '41m' },
  { acc: 'L-88218', pt: 'Grace Min', loc: 'ICU-02', test: 'CBC, Coags', pri: 'Routine', st: 'Verified', flag: '', tat: '1h 12m' },
  { acc: 'L-88219', pt: 'Priya Raman', loc: 'Cardio OPD', test: 'Lipid panel', pri: 'Routine', st: 'Collected', flag: '', tat: '—' },
  { acc: 'L-88220', pt: 'Victor Alvarez', loc: 'ICU-03', test: 'ABG', pri: 'STAT', st: 'Resulted', flag: 'pH 7.21 L', tat: '14m' },
];
const labTone: Record<string, Tone> = { Resulted: 'green', Verified: 'green', Running: 'blue', Incubating: 'violet', Received: 'amber', Collected: 'slate' };

export function LabView() {
  const { notify } = useDash();
  const [acked, setAcked] = useState(false);
  return (
    <>
      <PageHeader
        crumb="Laboratory"
        title="Laboratory Worklist"
        subtitle="Core lab · Chemistry, Hematology, Micro"
        actions={<><GhostBtn><RefreshIcon size={14} /> Analyzer sync</GhostBtn><PrimaryBtn><PlusIcon size={14} /> Accession Sample</PrimaryBtn></>}
      />
      <StatRow
        stats={[
          { v: '218', l: 'Samples Today' },
          { v: '31', l: 'STAT Pending', c: 'text-red-600' },
          { v: acked ? '2' : '3', l: 'Critical Values', c: 'text-red-600', sub: 'Unacknowledged' },
          { v: '42m', l: 'Median STAT TAT', c: 'text-brand-600' },
          { v: '99.2%', l: 'Analyzer Uptime', c: 'text-emerald-600' },
        ]}
      />
      <Body>
        {acked ? (
          <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 mb-4 animate-view-in">
            <CheckIcon size={16} className="text-emerald-600" />
            <div className="text-[13px] text-emerald-800 flex-1"><span className="font-semibold">Acknowledged</span> by J. Carter, RN. Dr. Chen notified by secure message.</div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 mb-4">
            <AlertIcon size={16} className="text-red-600" />
            <div className="text-[13px] text-red-800 flex-1"><span className="font-semibold">Critical result:</span> Potassium 6.2 mmol/L. Ann Martinez (ED 12). Notify ordering provider Dr. Chen.</div>
            <button onClick={() => { setAcked(true); notify('Critical value acknowledged and provider notified.'); }} className="text-[12.5px] font-semibold text-red-700 bg-white border border-red-200 hover:bg-red-100 rounded-md px-3 h-8">Acknowledge</button>
          </div>
        )}
        <Table head={['Accession', 'Patient', 'Location', 'Test', 'Priority', 'Status', 'Flag', 'TAT']} widths={['11%', '17%', '11%', '17%', '10%', '13%', '12%', '9%']}>
          {labRows.map((r) => (
            <tr key={r.acc} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
              <td className="px-4 py-3 font-mono text-[12.5px] text-slate-600">{r.acc}</td>
              <td className="px-4 py-3 font-semibold text-slate-900">{r.pt}</td>
              <td className="px-4 py-3 text-slate-600">{r.loc}</td>
              <td className="px-4 py-3 text-slate-700">{r.test}</td>
              <td className="px-4 py-3"><span className={`text-[12px] font-bold ${r.pri === 'STAT' ? 'text-red-600' : r.pri === 'Urgent' ? 'text-orange-600' : 'text-slate-500'}`}>{r.pri}</span></td>
              <td className="px-4 py-3"><Pill tone={labTone[r.st]}>{r.st}</Pill></td>
              <td className="px-4 py-3 font-mono text-[12.5px] font-semibold text-red-600">{r.flag}</td>
              <td className="px-4 py-3 font-mono text-slate-600">{r.tat}</td>
            </tr>
          ))}
        </Table>
      </Body>
    </>
  );
}

/* ───────────────────────── Pharmacy ───────────────────────── */

const rxQueue = [
  { t: '10:41', pt: 'Harold Jensen', loc: 'ICU-01', drug: 'Norepinephrine 4 mg/250 mL', dose: '0.1 mcg/kg/min IV', pri: 'STAT', alert: '' },
  { t: '10:38', pt: 'Ann Martinez', loc: 'ED 12', drug: 'Calcium gluconate 1 g', dose: 'IV once', pri: 'STAT', alert: '' },
  { t: '10:32', pt: 'Robert Hale', loc: '3N-01', drug: 'Piperacillin-tazobactam 4.5 g', dose: 'IV q6h', pri: 'Urgent', alert: 'Renal dose' },
  { t: '10:27', pt: 'Thomas Reed', loc: 'Trauma 1', drug: 'Amoxicillin 500 mg', dose: 'PO q8h', pri: 'Routine', alert: 'Allergy: PCN' },
  { t: '10:20', pt: 'Patricia Okonkwo', loc: 'ED 4', drug: 'Enoxaparin 40 mg', dose: 'SC daily', pri: 'Routine', alert: '' },
  { t: '10:14', pt: 'Grace Min', loc: 'ICU-02', drug: 'Metoprolol 25 mg', dose: 'PO BID', pri: 'Routine', alert: 'Duplicate' },
];
const stock = [
  { d: 'Ceftriaxone 1 g vial', on: 42, par: 200 },
  { d: 'Ondansetron 4 mg/2 mL', on: 65, par: 150 },
  { d: 'Insulin glargine pen', on: 18, par: 40 },
  { d: 'Heparin 5,000 u/mL', on: 120, par: 160 },
];

export function PharmacyView() {
  const { notify, action } = useDash();
  const [verified, setVerified] = useState<string[]>([]);
  const verify = (t: string, drug: string, alert: string) => {
    const name = drug.split(' ')[0];
    if (alert.startsWith('Allergy')) return notify(`Cannot verify ${name}: documented allergy. Contact the prescriber.`);
    setVerified((v) => [...v, t]);
    notify(`${name} verified and sent to dispensing.`);
  };
  return (
    <>
      <PageHeader
        crumb="Pharmacy"
        title="Pharmacy Verification"
        subtitle="Inpatient pharmacy · Order verification queue"
        actions={<><GhostBtn>Dispense log</GhostBtn><PrimaryBtn><PlusIcon size={14} /> Manual Order</PrimaryBtn></>}
      />
      <StatRow
        stats={[
          { v: String(17 - verified.length), l: 'Awaiting Verification', c: 'text-orange-500' },
          { v: '2', l: 'STAT Orders', c: 'text-red-600' },
          { v: '3', l: 'Interaction Alerts', c: 'text-red-600' },
          { v: '342', l: 'Dispensed Today', c: 'text-emerald-600' },
          { v: '6m', l: 'Median Verify Time', c: 'text-brand-600' },
        ]}
      />
      <Body>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Table head={['Time', 'Patient', 'Medication', 'Priority', 'Safety', '']} widths={['62px', '21%', '30%', '11%', '20%', '84px']}>
              {rxQueue.map((r) => (
                <tr key={r.t} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-slate-500">{r.t}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{r.pt}</div>
                    <div className="text-[12px] text-slate-500">{r.loc}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-800 font-medium truncate">{r.drug}</div>
                    <div className="text-[12px] text-slate-500">{r.dose}</div>
                  </td>
                  <td className="px-4 py-3"><span className={`text-[12px] font-bold ${r.pri === 'STAT' ? 'text-red-600' : r.pri === 'Urgent' ? 'text-orange-600' : 'text-slate-500'}`}>{r.pri}</span></td>
                  <td className="px-4 py-3">{r.alert ? <Pill tone={r.alert.startsWith('Allergy') ? 'red' : 'amber'}>{r.alert}</Pill> : <span className="text-[12px] text-slate-400">No alerts</span>}</td>
                  <td className="px-4 py-3">
                    {verified.includes(r.t) ? (
                      <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-emerald-700"><CheckIcon size={13} strokeWidth={3} /> Done</span>
                    ) : (
                      <button onClick={() => verify(r.t, r.drug, r.alert)} className="text-[12.5px] font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-md px-3 h-7">Verify</button>
                    )}
                  </td>
                </tr>
              ))}
            </Table>
          </div>
          <Panel title="Low stock" action="Reorder" onAction={() => action('Reorder Stock')}>
            <div className="space-y-4">
              {stock.map((s) => {
                const pct = Math.round((s.on / s.par) * 100);
                return (
                  <div key={s.d}>
                    <div className="flex justify-between text-[13px] mb-1.5">
                      <span className="text-slate-700 font-medium truncate pr-2">{s.d}</span>
                      <span className="text-slate-500 tabular-nums shrink-0">{s.on}/{s.par}</span>
                    </div>
                    <Meter pct={pct} color={pct < 30 ? 'bg-red-500' : pct < 50 ? 'bg-amber-500' : 'bg-brand-600'} />
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      </Body>
    </>
  );
}

/* ───────────────────────── Billing ───────────────────────── */

const claims = [
  { id: 'CLM-55120', pt: 'Patricia Okonkwo', payer: 'Medicare', svc: 'ED visit L4 + Imaging', amt: 4820, st: 'Submitted', age: 2 },
  { id: 'CLM-55118', pt: 'Robert Hale', payer: 'BCBS', svc: 'Inpatient DRG 871', amt: 38450, st: 'Coding', age: 1 },
  { id: 'CLM-55102', pt: 'Priya Raman', payer: 'Cigna', svc: 'Cardiology consult', amt: 410, st: 'Paid', age: 14 },
  { id: 'CLM-55097', pt: 'Stefan Klein', payer: 'Aetna PPO', svc: 'TKA + 2 IP days', amt: 27300, st: 'Denied', age: 21 },
  { id: 'CLM-55090', pt: 'Kevin Park', payer: 'Self-pay', svc: 'ED visit L3 + Repair', amt: 1260, st: 'Pay plan', age: 9 },
  { id: 'CLM-55084', pt: 'Grace Min', payer: 'UnitedHealth', svc: 'CABG — interim bill', amt: 61200, st: 'Pre-auth', age: 6 },
];
const claimTone: Record<string, Tone> = { Submitted: 'blue', Coding: 'violet', Paid: 'green', Denied: 'red', 'Pay plan': 'amber', 'Pre-auth': 'slate' };
const revenue = [412, 428, 405, 441, 460, 452, 478, 490, 471, 502, 518, 526];

export function BillingView() {
  return (
    <>
      <PageHeader
        crumb="Billing"
        title="Revenue Cycle"
        subtitle="Claims, payments and receivables"
        actions={<><GhostBtn><DownloadIcon size={14} /> Remittance</GhostBtn><PrimaryBtn><PlusIcon size={14} /> New Invoice</PrimaryBtn></>}
      />
      <StatRow
        stats={[
          { v: '$1.24M', l: 'Charges (MTD)' },
          { v: '$982K', l: 'Collections (MTD)', c: 'text-emerald-600' },
          { v: '38.4', l: 'Days in A/R', c: 'text-brand-600' },
          { v: '96.1%', l: 'Clean Claim Rate', c: 'text-emerald-600' },
          { v: '4.2%', l: 'Denial Rate', c: 'text-red-600' },
        ]}
      />
      <Body>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Table head={['Claim', 'Patient', 'Payer', 'Service', 'Amount', 'Status']} widths={['15%', '18%', '14%', '21%', '14%', '18%']}>
              {claims.map((c) => (
                <tr key={c.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-[12px] text-slate-600 whitespace-nowrap">{c.id}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900 truncate">{c.pt}</td>
                  <td className="px-4 py-3 text-slate-600">{c.payer}</td>
                  <td className="px-4 py-3 text-slate-600 truncate">{c.svc}</td>
                  <td className="px-4 py-3 font-mono text-slate-900 tabular-nums">${c.amt.toLocaleString()}</td>
                  <td className="px-4 py-3"><Pill tone={claimTone[c.st]}>{c.st}</Pill></td>
                </tr>
              ))}
            </Table>
          </div>
          <div className="space-y-4">
            <Panel title="Net revenue · 12 months">
              <div className="text-[24px] font-bold text-slate-900 tabular-nums">$526K <span className="text-[12.5px] font-medium text-emerald-600">+4.8% MoM</span></div>
              <div className="mt-3"><Sparkline id="rev" data={revenue} h={64} /></div>
            </Panel>
            <Panel title="A/R aging">
              <div className="space-y-3">
                {[['0–30 days', 62], ['31–60 days', 21], ['61–90 days', 11], ['90+ days', 6]].map(([l, v]) => (
                  <div key={l as string}>
                    <div className="flex justify-between text-[12.5px] mb-1"><span className="text-slate-600">{l}</span><span className="font-semibold text-slate-900">{v}%</span></div>
                    <Meter pct={v as number} />
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </Body>
    </>
  );
}

/* ───────────────────────── Analytics ───────────────────────── */

const los = [5.1, 4.9, 4.8, 4.9, 4.6, 4.5, 4.4, 4.3, 4.4, 4.2, 4.2, 4.1];
const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

export function AnalyticsView() {
  const { notify } = useDash();
  const [range, setRange] = useState<'30d' | '12m'>('12m');
  const min = 3.8, max = 5.3;
  const W = 640, H = 180;
  const pts = los.map((v, i) => [(i / (los.length - 1)) * W, ((max - v) / (max - min)) * H] as const);
  const path = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ');
  const [hover, setHover] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        crumb="Analytics"
        title="Quality & Operations Analytics"
        subtitle="Enterprise data warehouse · refreshed 5 min ago"
        actions={<><Segmented options={[{ id: '30d', label: '30 days' }, { id: '12m', label: '12 months' }]} value={range} onChange={setRange} /><GhostBtn><DownloadIcon size={14} /> Export</GhostBtn></>}
      />
      <Body>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {[
            ['Avg length of stay', '4.1 days', '−0.9d YoY'],
            ['30-day readmissions', '11.8%', '−1.6 pts YoY'],
            ['Patient satisfaction', '4.6 / 5', '+0.3 YoY'],
            ['Hand hygiene compliance', '94%', '+5 pts YoY'],
          ].map(([l, v, d]) => (
            <div key={l} className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="text-[12.5px] text-slate-500 font-medium">{l}</div>
              <div className="text-[24px] font-bold text-slate-900 mt-1 tabular-nums">{v}</div>
              <div className="text-[12px] text-emerald-600 font-medium mt-1">{d}</div>
            </div>
          ))}
        </div>
        <Panel title="Average length of stay (days)" action="Drill down" onAction={() => notify('Drill-down by unit, physician and DRG is available in the full product.')}>
          <div className="relative pl-9" onMouseLeave={() => setHover(null)}>
            {[4, 4.5, 5].map((g) => (
              <span key={g} className="absolute left-0 -translate-y-1/2 text-[11px] text-slate-500 tabular-nums" style={{ top: `${((8 + ((max - g) / (max - min)) * H) / (H + 16)) * 200}px` }}>{g.toFixed(1)}</span>
            ))}
            <svg viewBox={`-8 -8 ${W + 16} ${H + 16}`} className="w-full h-[200px] overflow-visible" preserveAspectRatio="none">
              {[4, 4.5, 5].map((g) => {
                const y = ((max - g) / (max - min)) * H;
                return <line key={g} x1={0} x2={W} y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />;
              })}
              <path d={path} fill="none" stroke="#d93654" strokeWidth={2} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
              {hover !== null && <line x1={pts[hover][0]} x2={pts[hover][0]} y1={0} y2={H} stroke="#94a3b8" vectorEffect="non-scaling-stroke" />}
              {pts.map(([x, y], i) => (
                <rect key={i} x={x - W / 24} y={-8} width={W / 12} height={H + 16} fill="transparent" onMouseEnter={() => setHover(i)} />
              ))}
            </svg>
            {hover !== null && (
              <div
                className="absolute top-0 -translate-x-1/2 pointer-events-none bg-slate-900 text-white rounded-md px-2.5 py-1.5 text-[12px] shadow-lg"
                style={{ left: `calc(36px + (100% - 36px) * ${pts[hover][0] / W})` }}
              >
                <div className="text-slate-300">{months[hover]}</div>
                <div className="font-semibold">{los[hover].toFixed(1)} days</div>
              </div>
            )}
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              {months.map((m) => <span key={m}>{m}</span>)}
            </div>
          </div>
        </Panel>
      </Body>
    </>
  );
}

/* ───────────────────────── Generic worklists ───────────────────────── */

type Worklist = {
  crumb: string;
  title: string;
  subtitle: string;
  action: string;
  stats: Stat[];
  head: string[];
  widths: string[];
  rows: { cells: string[]; status: [string, Tone] }[];
};

const worklists: Partial<Record<ViewId, Worklist>> = {
  radiology: {
    crumb: 'Radiology', title: 'Imaging Worklist', subtitle: 'CT · MRI · X-Ray · Ultrasound', action: 'Schedule Exam',
    stats: [{ v: '64', l: 'Exams Today' }, { v: '7', l: 'STAT Unread', c: 'text-red-600' }, { v: '28m', l: 'STAT Read TAT', c: 'text-brand-600' }, { v: '3', l: 'Scanners Busy', c: 'text-violet-600' }],
    head: ['Accession', 'Patient', 'Exam', 'Modality', 'Status'], widths: ['15%', '22%', '31%', '14%', '18%'],
    rows: [
      { cells: ['R-44102', 'Thomas Reed', 'CT Angio chest (PE protocol)', 'CT'], status: ['Unread STAT', 'red'] },
      { cells: ['R-44101', 'Patricia Okonkwo', 'XR Hip R 2 views', 'XR'], status: ['Reported', 'green'] },
      { cells: ['R-44099', 'James Liu', 'CT Abdomen/Pelvis w/ contrast', 'CT'], status: ['Scanning', 'blue'] },
      { cells: ['R-44097', 'Samuel Obi', 'MRI Brain w/o contrast', 'MR'], status: ['Scheduled', 'slate'] },
      { cells: ['R-44095', 'Hannah Schultz', 'US OB 2nd trimester', 'US'], status: ['Prelim', 'amber'] },
    ],
  },
  reports: {
    crumb: 'Reports', title: 'Reports Library', subtitle: 'Scheduled and on-demand reports', action: 'New Report',
    stats: [{ v: '128', l: 'Saved Reports' }, { v: '24', l: 'Scheduled', c: 'text-brand-600' }, { v: '6', l: 'Regulatory', c: 'text-violet-600' }, { v: '3', l: 'Running Now', c: 'text-orange-500' }],
    head: ['Report', 'Owner', 'Schedule', 'Last Run', 'Status'], widths: ['32%', '18%', '16%', '16%', '18%'],
    rows: [
      { cells: ['Daily census & bed utilization', 'Nursing Admin', 'Daily 06:00', 'Today 06:00'], status: ['Delivered', 'green'] },
      { cells: ['ED throughput (door-to-provider)', 'ED Director', 'Hourly', '10:00'], status: ['Delivered', 'green'] },
      { cells: ['Core measures — Sepsis SEP-1', 'Quality', 'Monthly', 'Sep 01'], status: ['Running', 'blue'] },
      { cells: ['Controlled substance reconciliation', 'Pharmacy', 'Weekly', 'Sep 22'], status: ['Review', 'amber'] },
      { cells: ['Payer mix & denials', 'Finance', 'Weekly', 'Sep 28'], status: ['Delivered', 'green'] },
    ],
  },
  admin: {
    crumb: 'Administration', title: 'Users & Access', subtitle: 'Role-based access control', action: 'Invite User',
    stats: [{ v: '1,842', l: 'Active Users' }, { v: '46', l: 'Roles' }, { v: '100%', l: 'MFA Enrolled', c: 'text-emerald-600' }, { v: '0', l: 'Failed Audits', c: 'text-emerald-600' }],
    head: ['User', 'Role', 'Department', 'Last Sign-in', 'Status'], widths: ['24%', '20%', '20%', '18%', '18%'],
    rows: [
      { cells: ['Jessica Carter', 'Registered Nurse', '3N Medical', '2 min ago'], status: ['Active', 'green'] },
      { cells: ['Dr. Arjun Shah', 'Attending Physician', 'Emergency', '5 min ago'], status: ['Active', 'green'] },
      { cells: ['Maria Lopez', 'Pharmacist', 'Pharmacy', '12 min ago'], status: ['Active', 'green'] },
      { cells: ['Ben Howard', 'Billing Specialist', 'Revenue Cycle', '3 days ago'], status: ['Password reset', 'amber'] },
      { cells: ['Temp — Agency RN', 'Registered Nurse', 'ICU', 'Never'], status: ['Pending', 'slate'] },
    ],
  },
};

export function GenericView({ id }: { id: ViewId }) {
  const w = worklists[id];
  const { go } = useDash();
  if (!w) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <button onClick={() => go('dashboard')} className="text-brand-600 font-medium">Back to dashboard</button>
      </div>
    );
  }
  return (
    <>
      <PageHeader
        crumb={w.crumb}
        title={w.title}
        subtitle={w.subtitle}
        actions={<><GhostBtn><FilterIcon size={14} /> Filter</GhostBtn><PrimaryBtn><PlusIcon size={14} /> {w.action}</PrimaryBtn></>}
      />
      <StatRow stats={w.stats} />
      <Body>
        <Table head={w.head} widths={w.widths}>
          {w.rows.map((r) => (
            <tr key={r.cells.join()} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
              {r.cells.map((c, i) => (
                <td key={i} className={`px-4 py-3.5 truncate ${i === 0 ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>{c}</td>
              ))}
              <td className="px-4 py-3.5"><Pill tone={r.status[1]}>{r.status[0]}</Pill></td>
            </tr>
          ))}
        </Table>
      </Body>
    </>
  );
}


/* ─────────────────────────── Patient 360° View ───────────────────────────── */

const p360Patients = [
  { name: 'James R. Okafor', mrn: 'MRN-100482', age: 64, sex: 'M', condition: 'Post-CABG', discharged: '2d ago', journey: 'Cardiac Recovery', responses: 4, pending: 1, sentiment: 'good', whatsapp: 'Responded', nextAppt: 'Nov 3' },
  { name: 'Priya S. Nair', mrn: 'MRN-100319', age: 42, sex: 'F', condition: 'T2 Diabetes Mgmt.', discharged: '5d ago', journey: 'Diabetes Follow-up', responses: 2, pending: 0, sentiment: 'good', whatsapp: 'Responded', nextAppt: 'Nov 8' },
  { name: 'Carlos A. Mendez', mrn: 'MRN-100547', age: 71, sex: 'M', condition: 'Hypertension / CKD', discharged: '1d ago', journey: 'Hypertension Watch', responses: 0, pending: 2, sentiment: 'alert', whatsapp: 'No Reply', nextAppt: 'Nov 1' },
  { name: 'Fatima Al-Hassan', mrn: 'MRN-100611', age: 29, sex: 'F', condition: 'Post-CS Delivery', discharged: '3d ago', journey: 'Maternal Recovery', responses: 5, pending: 0, sentiment: 'good', whatsapp: 'Responded', nextAppt: 'Nov 6' },
  { name: 'David K. Mensah', mrn: 'MRN-100388', age: 58, sex: 'M', condition: 'Hip Arthroplasty', discharged: '7d ago', journey: 'Ortho Rehabilitation', responses: 3, pending: 1, sentiment: 'warn', whatsapp: 'Delayed', nextAppt: 'Nov 10' },
  { name: 'Mei-Ling Zhao', mrn: 'MRN-100712', age: 51, sex: 'F', condition: 'Breast Cancer – Chemo', discharged: '10d ago', journey: 'Oncology Support', responses: 6, pending: 0, sentiment: 'good', whatsapp: 'Responded', nextAppt: 'Nov 4' },
];

const sentimentMap: Record<string, { dot: string; label: string; pill: 'green' | 'amber' | 'red' }> = {
  good:  { dot: 'bg-emerald-500', label: 'Stable',    pill: 'green' },
  warn:  { dot: 'bg-amber-400',   label: 'Review',    pill: 'amber' },
  alert: { dot: 'bg-rose-500',    label: 'Escalate',  pill: 'red'   },
};

const taskQueue = [
  { patient: 'Carlos A. Mendez', task: 'No survey response in 24h', due: 'Overdue', tone: 'red' as const, assignee: 'Care Team' },
  { patient: 'David K. Mensah', task: 'Reported moderate knee pain (score 6/10)', due: 'Today 5 PM', tone: 'amber' as const, assignee: 'Dr. Okafor' },
  { patient: 'James R. Okafor', task: 'Confirm cardiology appointment', due: 'Today 3 PM', tone: 'amber' as const, assignee: 'Reception' },
];

const surveyFeed = [
  { name: 'Fatima Al-Hassan', msg: '"Feeling much better, pain is 2/10. No fever."', time: '10 min ago', good: true },
  { name: 'Priya S. Nair', msg: '"Blood sugar was 142 this morning before breakfast."', time: '38 min ago', good: true },
  { name: 'Mei-Ling Zhao', msg: '"Nausea is manageable. Appetite improved."', time: '1h ago', good: true },
  { name: 'David K. Mensah', msg: '"Knee is swollen and pain went from 4 to 6 today."', time: '2h ago', good: false },
];

function SentimentDot({ s }: { s: string }) {
  const m = sentimentMap[s] ?? sentimentMap.good;
  return <span className={`inline-block h-2 w-2 rounded-full ${m.dot}`} />;
}

export function Patient360View() {
  const [tab, setTab] = useState<'patients' | 'tasks' | 'surveys' | 'analytics'>('patients');
  const [selected, setSelected] = useState<(typeof p360Patients)[0] | null>(null);

  return (
    <>
      <PageHeader
        crumb="Patient 360°"
        title="Patient 360° — Post-Discharge Care"
        subtitle="HospAI · Keppler AI-powered outreach & recovery tracking"
        actions={
          <>
            <GhostBtn>
              <FilterIcon size={13} /> Filter
            </GhostBtn>
            <PrimaryBtn>
              <PlusIcon size={13} /> Start Journey
            </PrimaryBtn>
          </>
        }
      />

      {/* KPI row */}
      <StatRow
        stats={[
          { v: '148', l: 'Active Journeys', c: 'text-brand-600' },
          { v: '87%', l: 'Response Rate', c: 'text-emerald-600' },
          { v: '12', l: 'Pending Escalations', c: 'text-rose-600' },
          { v: '31', l: 'Appts Confirmed', c: 'text-violet-600' },
          { v: '3.2d', l: 'Avg First Response' },
        ]}
      />

      {/* Sub-tabs */}
      <div className="px-6 pt-3">
        <Segmented
          options={[
            { id: 'patients', label: 'Care Journeys' },
            { id: 'tasks', label: 'Tasks & Escalations' },
            { id: 'surveys', label: 'Survey Feed' },
            { id: 'analytics', label: 'Analytics' },
          ]}

          value={tab}
          onChange={(v) => setTab(v as typeof tab)}
        />
      </div>

      <Body>
        {tab === 'patients' && (
          <div className="grid grid-cols-3 gap-4 h-full">
            {/* Left: patient list */}
            <div className="col-span-selected bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col" style={{ gridColumn: selected ? '1' : '1 / span 3' }}>
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[12px] font-semibold text-slate-700">Active Patients ({p360Patients.length})</span>
                <div className="flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-200 px-2.5 py-1">
                  <SearchIcon size={11} className="text-slate-400" />
                  <span className="text-[11px] text-slate-400">Search patients…</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {p360Patients.map((p) => {
                  const sm = sentimentMap[p.sentiment];
                  const isSelected = selected?.mrn === p.mrn;
                  return (
                    <div
                      key={p.mrn}
                      onClick={() => setSelected(isSelected ? null : p)}
                      className={`flex items-start gap-3 px-4 py-3.5 border-b border-slate-100 cursor-pointer transition-colors ${isSelected ? 'bg-brand-50 border-l-2 border-l-brand-600' : 'hover:bg-slate-50'}`}
                    >
                      {/* Avatar */}
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center shrink-0">
                        <span className="text-white text-[11px] font-bold">{p.name.split(' ').map(x => x[0]).slice(0, 2).join('')}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[13px] font-semibold text-slate-900 truncate">{p.name}</span>
                          <Pill tone={sm.pill}>{sm.label}</Pill>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 truncate">{p.mrn} · {p.condition}</div>
                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{p.whatsapp}</span>
                          <span>Discharged {p.discharged}</span>
                          <span>Next: {p.nextAppt}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: patient 360 detail panel */}
            {selected && (
              <div className="col-span-2 bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col" style={{ gridColumn: '2 / span 2' }}>
                {/* Patient banner */}
                <div className="px-5 py-4 bg-gradient-to-r from-brand-700 to-violet-700 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[15px] font-bold">{selected.name}</div>
                      <div className="text-[11px] text-brand-200 mt-0.5">{selected.mrn} · {selected.age}y · {selected.sex} · {selected.condition}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-md bg-white/20 hover:bg-white/30 px-2.5 py-1 text-[11px] font-semibold">Send Message</button>
                      <button className="rounded-md bg-white/20 hover:bg-white/30 px-2.5 py-1 text-[11px] font-semibold">View Chart</button>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-4 text-[11px]">
                    <span className="bg-white/15 rounded px-2 py-0.5">{selected.journey}</span>
                    <span className="bg-white/15 rounded px-2 py-0.5">Discharged {selected.discharged}</span>
                    <span className="bg-white/15 rounded px-2 py-0.5">Next Appt: {selected.nextAppt}</span>
                  </div>
                </div>

                {/* Recovery score + survey responses */}
                <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
                  {[
                    { label: 'Survey Responses', value: String(selected.responses), sub: `${selected.pending} pending`, color: 'text-brand-600' },
                    { label: 'WhatsApp Status', value: selected.whatsapp, sub: 'Last: 2h ago', color: selected.whatsapp === 'No Reply' ? 'text-rose-600' : 'text-emerald-600' },
                    { label: 'Recovery Sentiment', value: sentimentMap[selected.sentiment].label, sub: 'AI analysis', color: selected.sentiment === 'good' ? 'text-emerald-600' : selected.sentiment === 'warn' ? 'text-amber-600' : 'text-rose-600' },
                  ].map((s) => (
                    <div key={s.label} className="px-4 py-3 text-center">
                      <div className={`text-[18px] font-bold ${s.color}`}>{s.value}</div>
                      <div className="text-[11px] text-slate-500">{s.label}</div>
                      <div className="text-[10px] text-slate-400">{s.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Keppler AI insight */}
                <div className="mx-4 my-3 rounded-lg bg-violet-50 border border-violet-200 px-4 py-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <SparkIcon size={13} className="text-violet-600" />
                    <span className="text-[11px] font-bold text-violet-700 tracking-wide">KEPPLER AI · RECOVERY INSIGHT</span>
                  </div>
                  <p className="text-[12px] text-violet-900 leading-relaxed">
                    Patient's latest responses show <strong>stable recovery trajectory</strong>. Pain scores trended from 7/10 at discharge to 3/10 today. 
                    Recommend confirming {selected.nextAppt} appointment and sending medication adherence check-in by EOD.
                  </p>
                </div>

                {/* Timeline */}
                <div className="px-4 pb-4 flex-1 overflow-y-auto">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Journey Timeline</div>
                  {[
                    { icon: '📤', time: `Discharged ${selected.discharged}`, label: 'Discharge summary sent to patient via portal', ok: true },
                    { icon: '💬', time: 'Day 1', label: 'Welcome WhatsApp survey sent · Patient responded', ok: true },
                    { icon: '📋', time: 'Day 2', label: 'Day 2 check-in survey sent · ' + (selected.responses > 1 ? 'Responded' : 'Awaiting'), ok: selected.responses > 1 },
                    { icon: '📅', time: `Next: ${selected.nextAppt}`, label: 'Follow-up appointment scheduled · Reminder queued', ok: true },
                  ].map((e, i) => (
                    <div key={i} className="flex items-start gap-3 mb-3">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[11px] shrink-0">{e.icon}</div>
                      <div>
                        <div className="text-[11px] font-semibold text-slate-700">{e.time}</div>
                        <div className="text-[11px] text-slate-500">{e.label}</div>
                      </div>
                      <div className={`ml-auto h-2 w-2 rounded-full mt-1.5 ${e.ok ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'tasks' && (
          <div className="space-y-3">
            <div className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Open Tasks & Escalations</div>
            {taskQueue.map((t, i) => (
              <div key={i} className={`flex items-start gap-4 rounded-lg border p-4 bg-white ${t.tone === 'red' ? 'border-rose-200' : t.tone === 'amber' ? 'border-amber-200' : 'border-slate-200'}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${t.tone === 'red' ? 'bg-rose-50' : t.tone === 'amber' ? 'bg-amber-50' : 'bg-slate-50'}`}>
                  <AlertIcon size={14} className={t.tone === 'red' ? 'text-rose-600' : t.tone === 'amber' ? 'text-amber-600' : 'text-slate-500'} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-slate-900">{t.patient}</span>
                    <Pill tone={t.tone}>{t.due}</Pill>
                  </div>
                  <div className="text-[12px] text-slate-600 mt-0.5">{t.task}</div>
                  <div className="text-[11px] text-slate-400 mt-1">Assigned to: {t.assignee}</div>
                </div>
                <button className="rounded-md border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50 shrink-0">Resolve</button>
              </div>
            ))}
            <div className="text-center py-6 text-[12px] text-slate-400">No further open tasks</div>
          </div>
        )}

        {tab === 'surveys' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 text-[12px] font-semibold text-slate-700 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Survey Responses
              </div>
              <div className="divide-y divide-slate-100">
                {surveyFeed.map((r, i) => (
                  <div key={i} className={`px-4 py-3.5 ${!r.good ? 'bg-rose-50' : ''}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-semibold text-slate-900">{r.name}</span>
                      <span className="text-[10px] text-slate-400">{r.time}</span>
                    </div>
                    <p className="text-[12px] text-slate-600 italic leading-relaxed">{r.msg}</p>
                    {!r.good && <div className="mt-1.5 text-[10px] text-rose-600 font-semibold">⚠ Flagged for review</div>}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-col gap-4">
              <div className="text-[12px] font-semibold text-slate-700">Outreach Summary</div>
              {[
                { label: 'Surveys Sent (7d)', value: 248, total: 248, color: 'bg-brand-600' },
                { label: 'Delivered', value: 241, total: 248, color: 'bg-emerald-500' },
                { label: 'Responded', value: 216, total: 248, color: 'bg-violet-500' },
                { label: 'Escalated', value: 12, total: 248, color: 'bg-rose-500' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                    <span>{s.label}</span>
                    <span className="font-semibold text-slate-900">{s.value}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${s.color}`} style={{ width: `${(s.value / s.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'analytics' && (
          <div className="grid grid-cols-2 gap-4">
            <Panel title="Response Rate Trend">
              <Sparkline id="p360-response-trend" data={[62, 68, 71, 75, 79, 82, 85, 84, 87, 87]} color="#6366f1" h={80} />
              <div className="mt-2 text-[12px] text-emerald-600 font-semibold">↑ 25pp improvement over 30 days</div>
            </Panel>
            <Panel title="Journey Performance">
              {[
                { j: 'Cardiac Recovery', rate: 92, tone: 'text-emerald-600' },
                { j: 'Diabetes Follow-up', rate: 88, tone: 'text-emerald-600' },
                { j: 'Ortho Rehabilitation', rate: 76, tone: 'text-amber-600' },
                { j: 'Oncology Support', rate: 95, tone: 'text-emerald-600' },
                { j: 'Maternal Recovery', rate: 98, tone: 'text-emerald-600' },
                { j: 'Hypertension Watch', rate: 61, tone: 'text-rose-600' },
              ].map((j) => (
                <div key={j.j} className="flex items-center gap-3 mb-2">
                  <span className="text-[11px] text-slate-600 w-36 truncate">{j.j}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${j.rate}%` }} />
                  </div>
                  <span className={`text-[11px] font-bold w-8 text-right ${j.tone}`}>{j.rate}%</span>
                </div>
              ))}
            </Panel>
          </div>
        )}
      </Body>
    </>
  );
}
