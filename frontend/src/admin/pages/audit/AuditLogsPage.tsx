import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Shield, Download } from 'lucide-react';
import { adminApiClient } from '../../../services/api/adminClient';
import DataTable from '../../components/shared/DataTable';

const ACTION_STYLES: Record<string, string> = {
  CREATE: 'badge-active', UPDATE: 'badge-info', DELETE: 'badge-error',
  LOGIN: 'badge-active', LOGOUT: 'badge-inactive', LOGIN_FAILED: 'badge-error',
  APPROVE: 'badge-active', REJECT: 'badge-error', BLOCK: 'badge-error', UNBLOCK: 'badge-active',
};

export default function AuditLogsPage() {
  const [page, setPage] = useState(1);
  const [action, setAction] = useState('');
  const [resource, setResource] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin','audit', page, action, resource],
    queryFn: () => adminApiClient.get('/audit-logs', { params: { page, limit: 25, action: action || undefined, resource: resource || undefined } }),
  });

  const logs = data?.data?.data || [];
  const meta = data?.data?.meta;

  const columns: ColumnDef<any>[] = [
    {
      header: 'Timestamp', accessorKey: 'createdAt',
      cell: ({ getValue }) => (
        <div>
          <div className="text-xs font-medium">{new Date(getValue() as string).toLocaleDateString('en-IN')}</div>
          <div className="text-xs text-slate-400">{new Date(getValue() as string).toLocaleTimeString('en-IN')}</div>
        </div>
      ),
    },
    {
      header: 'User', id: 'user',
      cell: ({ row }) => row.original.user
        ? <div><div className="text-xs font-medium">{row.original.user.firstName} {row.original.user.lastName}</div><div className="text-xs text-slate-400">{row.original.user.role}</div></div>
        : <span className="text-xs text-slate-400">System</span>,
    },
    { header: 'Action', accessorKey: 'action', cell: ({ getValue }) => <span className={`status-badge ${ACTION_STYLES[getValue() as string] || 'badge-inactive'}`}>{getValue() as string}</span> },
    { header: 'Resource', accessorKey: 'resource', cell: ({ getValue }) => <span className="text-xs font-mono text-slate-600">{getValue() as string}</span> },
    { header: 'Description', accessorKey: 'description', cell: ({ getValue }) => <span className="text-xs text-slate-600 max-w-xs truncate block">{getValue() as string}</span> },
    { header: 'IP', accessorKey: 'ipAddress', cell: ({ getValue }) => <code className="text-xs text-slate-400">{(getValue() as string) || '—'}</code> },
  ];

  return (
    <div>
      <div className="section-header">
        <div><h1 className="section-title flex items-center gap-2"><Shield className="w-5 h-5 text-indigo-600" /> Audit Logs</h1><p className="section-subtitle">Real-time activity and security tracking</p></div>
        <button className="btn-admin-secondary text-xs"><Download className="w-3.5 h-3.5" /> Export CSV</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-5 shadow-sm flex flex-wrap gap-3">
        <select value={action} onChange={e => { setAction(e.target.value); setPage(1); }} className="admin-input w-auto">
          <option value="">All Actions</option>
          {['CREATE','UPDATE','DELETE','LOGIN','LOGOUT','LOGIN_FAILED','APPROVE','REJECT','BLOCK','UNBLOCK'].map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <input type="text" placeholder="Filter by resource..." value={resource} onChange={e => { setResource(e.target.value); setPage(1); }} className="admin-input flex-1 max-w-xs" />
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <DataTable data={logs} columns={columns} isLoading={isLoading} pagination={meta ? { page, limit: 25, total: meta.total, onPageChange: setPage } : undefined} />
      </div>
    </div>
  );
}
